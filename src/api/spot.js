import request from '../utils/request'

export function getSpotInfo(data) {
  return request({
    url: '/admin/spot/getSpotInfo',
    method: 'get',
    params: data,
  })
}

export function getSpotDetail(data) {
  return request({
    url: '/admin/spot/getSpotDetail',
    method: 'get',
    params:data
  })
}
