import request from '../utils/request'

export function getTicketDetail(data) {
  return request({
    url: '/admin/ticketAnalysis/getTicketDetailOnSpecificDay',
    method: 'get',
    params: data
  })
}
