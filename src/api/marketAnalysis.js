import request from '../utils/request'

export function getParkingIncome(data) {
  return request({
    url: '/admin/vehicleAnalysis/getParkingIncome',
    method: 'get',
    params: data
  })
}
