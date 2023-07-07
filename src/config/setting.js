/**
 * @description 通用配置
 */
module.exports = {
  // 后端接口基础地址。后端完整地址为bkURL+apiPrefix，目前仅用于dev环境解决跨域
  // bkURL: 'https://bd45.yunyouqilu.com',
  bkURL: 'http://43.139.145.156',
  // 管理系统地址，用于点击按钮跳转
  managerURL: 'https://bd45.yunyouqilu.com/tms-manager/',
  // 接口前缀字符串，用于dev环境解决跨域以及后端nginx转发。
  apiPrefix: '/tms-fork',
  droneApiPrefix: '/navi',
  naviStreamApiPrefix: '/navi_stream',
  traceApiPrefix: '/qly',
  // dev环境端口
  devPort: 8080,
  //拉流相关配置
  StreamerURL: 'http://localhost:8000',//本地Streamer接口地址
}
