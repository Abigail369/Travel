import request from '../utils/request'

export function getStaffInfo(data) {
  return request({
    url: '/admin/worker/getWorkerInfo',
    method: 'get',
    params: data
  })
}

