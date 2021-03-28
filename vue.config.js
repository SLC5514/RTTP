'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     title: '转介绍'
  //   },
  //   tplmanage: {
  //     entry: 'tpl-manage/index.js',
  //     template: 'tpl-manage/index.html',
  //     filename: 'tpl-manage/index.html',
  //     title: '转介绍后台'
  //   },
  // },
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
      },
      '/api': {
        target: 'http://gl.huoyusaas.com',
        changeOrigin: true,
      }
    },
  }
}
