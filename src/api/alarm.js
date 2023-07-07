import request from '../utils/request'

export function getWarningInfo(data) {
  return request({
    url: '/admin/warning/getWarningInfo',
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

export function replyWarningDetail(data) {
  return request({
    url: '/admin/warning/reply',
    method: 'post',
    data:data
  })
}

