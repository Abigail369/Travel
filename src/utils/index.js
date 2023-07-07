//标准化时间
export function dateFormat() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  var week = "星期" + "日一二三四五六".charAt(date.getDay());
  // 拼接
  return year + "年" + month + "月" + day + "日 " + hours + ":" + minutes + ":" + seconds + " " + week;
}

export function numFilter2(value) {
  // 截取当前数据到小数点后两位
  let realVal = parseFloat(value).toFixed(2);
  return realVal;
}

export function numFilter8(value) {
  // 截取当前数据到小数点后八位
  let realVal = parseFloat(value).toFixed(8);
  return realVal;
}

//自定义统计字符串长度，中文字符占1，英文占0.5
export function strLenCustom(str) {
  str = str.trim()
  let realLength = 0, len = str.length, charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
  }
  return realLength / 2.0;
}

//将数字转成数组
export function getArray(num) {
  var arr = []
  while (num > 0) {
    arr.push(num % 10)
    num = parseInt(num / 10)
  }
  return arr.reverse()
}

export const deg2rad = Math.PI / 180.0;
export const rad2deg = 180.0 / Math.PI;
