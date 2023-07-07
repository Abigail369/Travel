import request from '../utils/request'

export function getProductSalesVolumeRanking(data) {
  return request({
    url: '/admin/productAnalysis/getProductSalesVolumeRanking',
    method: 'get',
    params: data
  })
}

export function getProductSalesRanking(data) {
  return request({
    url: '/admin/productAnalysis/getProductSalesRanking',
    method: 'get',
    params: data
  })
}
