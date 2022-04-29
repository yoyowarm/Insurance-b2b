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
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "泰安商業火災保險報價系統";
        return args;
      })
  },

}
