import request from '../utils/request'

export function login(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data,
  })
}

export function logout(data) {
  return request({
    url: '/admin/user/logout',
    method: 'post',
    data,
  })
}
