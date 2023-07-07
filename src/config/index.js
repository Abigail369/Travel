/**
 * @description 2个子配置，通用配置|响应代码配置合并导出
 */

const setting = require('./setting')
const respCode = require('./respCode')
export default Object.assign({}, setting, respCode) //合并json对象
