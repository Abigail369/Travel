import axios from 'axios'   //引入 axios
import CustomMessage from '../utils/customMessage'    //引入定制的的 Message 模块，用于信息提示，防止token到期等情况的重复提示
import router from '../router'
import Config from '../config'
// const {apiPrefix, respCode} = require('../config').default //require也可以导入export default导出的，但babel@6开始需要加default

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: Config.apiPrefix, // api 的 base_url
  timeout: 5000, // request timeout  设置请求超时时间
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})


//请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    let token = localStorage.getItem("accessToken");
    if (token != null && token != "") {//有token则添加到header
      config.headers['accessToken'] = localStorage.getItem('accessToken')
    }
    if (config.requestBase && config.requestBase == 'VUE_APP_URL_NAVI') {
      config.baseURL = '';
    }
    //没有则不管，得到响应后由响应拦截器负责路由
    return config;
  },
  error => {
    // 对请求错误做些什么，自己定义
    CustomMessage({  //使用定制的message进行信息提示
      message: error.config.baseURL + error.config.url + " : " + error.toString(),
      type: "error"
    });
    return Promise.reject(error);
  })

//响应拦截器
axiosInstance.interceptors.response.use(
  response => {  // 服务器状态码是2开头的的情况
    if (response.status === 200) {// 如果返回的状态码为200
      switch (response.data.code) {
        case Config.respCode.SUCCESS: //请求成功。为了区分拆出来了
          return response;
          break;
        case Config.respCode.USER_TOKEN_INVALID: //token无效或已过期
          CustomMessage({
            message: 'token无效或已过期，请重新登录',
            type: 'info'
          });
          localStorage.removeItem('accessToken');
          router.push({
            path: '/login',
          }).catch(error => {//过滤掉重复路由报错
            if (error.name != "NavigationDuplicated") {
              throw error;
            }
          });
          break;
        default: //其他的也直接返回。
          return response;
      }
    } else {
      return response;
    }
  },
  // 服务器状态码不是2开头的的情况
  error => {
    //此处进行通用消息提示，请求发起处不用每次在then后catch内进行通用错误消息展示
    CustomMessage({
      message: error.config.baseURL + error.config.url + " : " + error.toString(),
      type: 'error'
    })
    return Promise.reject(error);
  }
)

export default axiosInstance
