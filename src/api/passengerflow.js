import request from '../utils/request'

export function getAreaPopulationInfo(data) {
  return request({
    url: '/admin/area/getAreaInfo',
    method: 'get',
    params:data

  })
}
export function getAreaPopulationDetail(data) {
  return request({
    url: '/admin/areaPopulation/getAreaPopulationDetail',
    method: 'get',
    params:data
  })
}
export function getAreaPopulationOnSpecificDay(data) {
  return request({
    url: '/admin/areaPopulation/getAreaPopulationOnSpecificDay',
    method: 'get',
    params:data
  })
}

export function simulator(data) {
  return request({
    url: '/admin/areaPopulation/simulator',
    method: 'post',
    data,
  })
}
