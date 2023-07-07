import request from '../utils/request'

export function getKnowledgeInfo(data) {
  return request({
    url: '/admin/knowledge/getKnowledgeInfo',
    method: 'get',
    params: data,
  })
}

export function getKnowledgeDetail(data) {
  return request({
    url: '/admin/knowledge/getKnowledgeDetail',
    method: 'get',
    params:data
  })
}

export function getKnowledgeTypeInfo(data) {
  return request({
    url: '/admin/knowledgeType/getKnowledgeTypeInfo',
    method: 'get',
    params:data
  })
}
