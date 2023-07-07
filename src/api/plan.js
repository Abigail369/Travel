import request from '../utils/request'

export function getPlanInfo(data) {
  return request({
    url: '/admin/plan/getPlanInfo',
    method: 'get',
    params:data
  })
}

export function getPlanDetail(data) {
  return request({
    url: '/admin/plan/getPlanDetail',
    method: 'get',
    params:data
  })
}
