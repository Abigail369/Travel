import request from '../utils/request'

export function getShopSalesRanking(data) {
  return request({
    url: '/admin/shopAnalysis/getShopSalesRanking',
    method: 'get',
    params: data
  })
}

export function getShopSalesVolumeRanking(data) {
  return request({
    url: '/admin/shopAnalysis/getShopSalesVolumeRanking',
    method: 'get',
    params: data
  })
}
