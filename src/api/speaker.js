import request from '../utils/request'

export function getSpeakerInfo(data) {
  return request({
    url: '/admin/speaker/getSpeakerInfo',
    method: 'get',
    params:data
  })
}

export function getSpeakerDetail(data) {
  return request({
    url: '/admin/speaker/getSpeakerDetail',
    method: 'get',
    params:data
  }) 
}
