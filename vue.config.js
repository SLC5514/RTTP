'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/styles/variable.scss';`,
      },
    },
  },
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/wx': {
        target: 'http://407364bcd69cf6b3a1b0c981a7380c.huoyusaas.com',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/wx': ''
        // }
      }
    },
  }
}
