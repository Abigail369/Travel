export function transTime(dateTime) {
  var date = new Date(dateTime)
  let year = date.getFullYear()
  let month =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 //'04'
  let da = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let HH = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var time = year + '-' + month + '-' + da + ' ' + HH + ':' + m + ':' + s
  return time

  // return new Date(dateTime * 1000).format(
  //   "yyyy-MM-dd hh:mm:ss"
  // )
}