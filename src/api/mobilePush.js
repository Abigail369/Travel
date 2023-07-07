import request from '../utils/request'

export function getMessageInfo(data) {
  return request({
    url: '/admin/pushMessage/getMessageInfo',
    method: 'get',
    params: data
  })
}

export function pushArea(data) {
  return request({
    url: '/admin/pushMessage/pushArea',
    method: 'post',
    data: data
  })
}

export function getMessageDetail(data) {
  return request({
    url: '/admin/pushMessage/getMessageDetail',
    method: 'get',
    params: data
  })
}

export function updateMessage(data) {
  return request({
    url: '/admin/pushMessage/updateMessage',
    method: 'post',
    data: data
  })
}
