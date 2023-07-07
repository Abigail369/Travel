import request from '../utils/request'

export function getDroneList(data) {
  return request({
    url: '/navi/drone/getAllDronesInfo',
    method: 'post',
    requestBase:'VUE_APP_URL_NAVI',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}
//上传相机控制命令
export function cameraCommand(data) {
  return request({
    url: '/navi/drone/cameraCommand',
    requestBase:'VUE_APP_URL_NAVI',

    method: 'post',
    data: data
  })
}
//上传无人机云台控制命令
export function gimbleCommand(data) {
  return request({
    url: '/navi/drone/gimbleCommand',
    requestBase:'VUE_APP_URL_NAVI',

    method: 'post',
    data: data
  })
}
// 获取无人机状态信息
export function getDroneInfo(droneId) {
  return request({
    url: '/navi/drone/getDroneInfo' + '?droneId=' + droneId,
    requestBase:'VUE_APP_URL_NAVI',

    method: 'get'
  })
}


//上传无人机控制命令
export function droneCommand(data) {
  return request({
    url: '/navi/drone/droneCommand',
    method: 'post',
    data: data
  })
}
