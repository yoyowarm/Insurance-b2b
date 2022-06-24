const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const _ = require('lodash');

function getDbPath() {
	return path.resolve(__dirname, './db.json')
}
const dbPath = getDbPath()
const routePath = path.resolve(__dirname, './routes.json')
const server = jsonServer.create()

const router = jsonServer.router(dbPath)
const middlewares = jsonServer.defaults()
const extras = fs
	.readdirSync(path.resolve(__dirname, './middlewares/'))
	.filter(i => i.match(/\.js$/))
	.map(i => {
		console.log(`Loading middleware: ${i}`)
		return require(path.resolve(__dirname, './middlewares/', i))
	})
function enableWatch(app) {
	console.log('  Watching...');

	const watchedDir = path.dirname(dbPath);

	let readError = false;

	fs.watch(watchedDir, (event, file) => {
		// https://github.com/typicode/json-server/issues/420
		// file can be null
		if (file) {
			const watchedFile = path.resolve(watchedDir, file);

			if (watchedFile === path.resolve(dbPath)) {
				let obj;

				try {
					obj = JSON.parse(fs.readFileSync(watchedFile));

					if (readError) {
						console.log(`  Read error has been fixed :)`);
						readError = false;
					}
				} catch (e) {
					readError = true;
					console.log(`  Error reading ${watchedFile}`);
					console.error(e.message);
					return;
				} // Compare .json file content with in memory database


				const isDatabaseDifferent = !_.isEqual(obj, app.db.getState());

				if (isDatabaseDifferent) {
					console.log(`  ${watchedFile} has changed, reloading...`);
					const parsed = JSON.parse(fs.readFileSync(watchedFile));

					router.db.setState(parsed);
				}
			}
		}
	}); // Watch routes

	{
		const watchedDir = path.dirname(routePath);
		fs.watch(watchedDir, (event, file) => {
			if (file) {
				const watchedFile = path.resolve(watchedDir, file);

				if (watchedFile === path.resolve(routePath)) {
					console.log(`  ${routePath} has changed, reloading...`);

					rewriter = jsonServer.rewriter(JSON.parse(fs.readFileSync(routePath, { encoding: 'utf8' })))
				}
			}
		});
	}
}

router.render = ((req, res) => {
	const cloned = JSON.parse(JSON.stringify(res.locals.data))
	const walked = new WeakMap()

	function rewritePaths(obj, keys) {
		if (walked.has(obj)) return
		walked.set(obj, true)
		Object.keys(obj).forEach(key => obj[key] != null && typeof obj[key] === 'object' && rewritePaths(obj[key], keys))
	}
	rewritePaths(cloned)
	res.jsonp(cloned)
})
for (let med of extras) {
	server.use(med)
}
server.db = router.db
server.jsonRouter = router

server.db.write(server.db.value())
let rewriter = jsonServer.rewriter(JSON.parse(fs.readFileSync(routePath, { encoding: 'utf8' })))
server.use(middlewares)
server.use((req, res, next) => rewriter(req, res, next))
server.use(router)
enableWatch(server)

server.listen(3000, () => {
	console.log('JSON Server is running')
})