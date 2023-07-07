import request from '../utils/request'

export function getParkingInfo(data) {
  return request({
    url: '/admin/parking/getParkingInfo',
    method: 'get',
    params: data,
  })
}

export function getParkingDetail(data) {
  return request({
    url: '/admin/parking/getParkingDetail',
    method: 'get',
    params:data
  })
}

export function getParkingHistoryInfo(data){
  return request({
    url: '/admin/parkingHistory/getParkingHistoryOnSpecificDay',
    method: 'get',
    params: data,
  })
}
