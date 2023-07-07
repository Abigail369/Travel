import request from "../utils/request";

// 获取游客信息
export function getTouristAnalysis() {
  return request({
    url: "/admin/touristAnalysis/getTouristStatistics",
    method: "get"
  });
}
// 获取出行方式
export function getTicketDetailByDate(specificDate) {
  return request({
    url: "/admin/ticketAnalysis/getTicketDetailOnSpecificDay",
    method: "get",
    params: {
      specificDate: specificDate
    }
  });
}
// 获取停车场数据
export function getCarportData() {
  return request({
    url: "/admin/vehicleAnalysis/getParkingAccumulative4",
    method: "get"
  });
}
