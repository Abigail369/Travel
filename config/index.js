'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const {
  bkURL,
  apiPrefix,
  droneApiPrefix,
  traceApiPrefix,
  devPort,
  naviStreamApiPrefix
} = require('../src/config/setting')
let proxyTableObj = {}
proxyTableObj[naviStreamApiPrefix] = {//使用这种方式为了动态设置键
  target: bkURL, // 注意！此处为后端提供的真实接口
  changeOrigin: true, // 允许跨域
  //secure: false, //代理target是不安全的https时,需要设置这个值为false
  logLevel: 'debug',
  withCredentials: true,
  // pathRewrite: { //后端包含，则不用重写
  //   // 如果接口中是没有api的，那就直接置空，'^/api': ''，
  //   '^/tms': '/tms'
  // }
}
proxyTableObj[traceApiPrefix] = {//使用这种方式为了动态设置键
  target: bkURL, // 注意！此处为后端提供的真实接口
  changeOrigin: true, // 允许跨域
  //secure: false, //代理target是不安全的https时,需要设置这个值为false
  logLevel: 'debug',
  withCredentials: true,
  // pathRewrite: { //后端包含，则不用重写
  //   // 如果接口中是没有api的，那就直接置空，'^/api': ''，
  //   '^/tms': '/tms'
  // }
}
proxyTableObj[droneApiPrefix] = {//使用这种方式为了动态设置键
  target: bkURL, // 注意！此处为后端提供的真实接口
  changeOrigin: true, // 允许跨域
  //secure: false, //代理target是不安全的https时,需要设置这个值为false
  logLevel: 'debug',
  withCredentials: true,

  // pathRewrite: { //后端包含，则不用重写
  //   // 如果接口中是没有api的，那就直接置空，'^/api': ''，
  //   '^/tms': ''
  // }
}
proxyTableObj[apiPrefix] = {//使用这种方式为了动态设置键
  target: bkURL, // 注意！此处为后端提供的真实接口
  changeOrigin: true, // 允许跨域
  //secure: false, //代理target是不安全的https时,需要设置这个值为false
  // logLevel: 'debug',
  withCredentials: true,
  // pathRewrite: { //后端包含，则不用重写
  //   // 如果接口中是没有api的，那就直接置空，'^/api': ''，
  //   '^/tms': '/tms'
  // }
}

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: proxyTableObj,//处理跨域

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: devPort, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
