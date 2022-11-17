const timestamp = new Date().getTime()
module.exports = {
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        ws: true,
      }
    }
  },
  configureWebpack: {
    output: {
      filename: `[name].${timestamp}.js`,
      chunkFilename: `[name].${timestamp}.js`
    },
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "公共責任保險報價系統";
        return args;
      })
  },
  publicPath: process.env.NODE_ENV === 'uat'
    ? '/PLIB2B/'
    : '/'

}
