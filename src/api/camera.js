import request from '../utils/request'

export function getCameraInfo(data) {
  return request({
    url: '/admin/camera/getCameraInfo',
    method: 'get',
    params: data,
  })
}

export function getCameraDetail(data) {
  return request({
    url: '/admin/camera/getCameraDetail',
    method: 'get',
    params: data
  })
}

export function getCameraControl(data) {
  return request({
    url: '/admin/hikvision/cameraControl',
    method: 'get',
    params: data
  })
}

export function getCameraRtspUrl(data) {
  return request({
    url: '/admin/camera/generateTemperateRtsp',
    method: 'get',
    params: data,
  })
}

export function terminateTemperateRtsp(data) {
  return request({
    url: '/admin/camera/terminateTemperateRtsp',
    method: 'post',
    data,
  })
}
