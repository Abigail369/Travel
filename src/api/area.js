import request from '../utils/request'

export function getAreaInfo(data) {
  return request({
    url: '/admin/area/getAreaInfo',
    method: 'get',
    params:data
  })
}

export function getWarningDetail(data) {
  return request({
    url: '/admin/warning/getWarningDetail',
    method: 'get',
    params:data
  })
}
