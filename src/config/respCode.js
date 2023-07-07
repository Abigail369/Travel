/**
 * @description 响应代码配置
 */
module.exports = {
  respCode: { //再封装一层，防止被Object.assign()合并在同一层级，从而方便导入与使用
    SUCCESS: "00000",//执行成功
    USER_PASSWORD_ERR: "A0007", //用户登录密码错误
    USER_TOKEN_INVALID: "A0011", // "token无效或已过期"
    USER_WRONG_VERIFY_CODE: "A0026", //验证码错误
  }
}
