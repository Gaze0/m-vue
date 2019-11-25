const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('components', path.resolve(__dirname, './src/components'))
      .set('utils', path.resolve(__dirname, './src/utils'))
      .set('index', path.resolve(__dirname, './src/pages/index'))
      .set('shop', path.resolve(__dirname, './src/pages/shop'))
      .set('vuestore', path.resolve(__dirname, './src/store'))
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://mall.zhengzai.tv',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mediaapi': {
        target: 'http://mediaapi.zhengzai.tv/api',
        changeOrigin: true,
        pathRewrite: {
          '^/mediaapi': ''
        }
      },
      '/json':{
        target:'http://m.zhengzai.tv/static/data/address/province.json',
        changeOrigin: true,
        pathRewrite: {
          '^/json': ''
        }
      }
    }
  }
}