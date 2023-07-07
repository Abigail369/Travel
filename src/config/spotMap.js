/**
 * @description spot映射表
 */

//批量导入图片
const req = require.context('../../static/img/pinIcon/spot', false, /\.png$/)
const importAll = context => {
  const map = {}
  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift() // 移除.
    map[keyArr.join('.').replace(/\.png$/g, '')] = context(key)
  }
  return map
}
const nameImgMap = importAll(req)

export const SPOT_TYPE_MAP = {
  1: '景点',
  2: '卫生间',
  3: '出入口',
  4: '服务点',
  5: '餐饮',
  6: '购物',
  7: '售票处',
  8: '停车场',
  9: '住宿',
  10: '娱乐',
}

export const SPOT_NAME_TYPE_MAP = {  //景点类型id映射
  SPOT: 1,
  TOILET: 2,
  ENTRANCE: 3,
  SERVICE: 4,
  RESTAURANT: 5,
  SHOPPING: 6,
  TICKET: 7,
  PARKING: 8,
  HOTEL: 9,
  ENTERTAINMENT: 10
}

export const SPOT_OTHER_LIST = [//被归为其他类别的List
  3, 4, 6, 7, 9, 10
]

export const SPOT_TYPE_ICON_MAP = { //景点类型id与图标对象映射
  1: nameImgMap['spot'], //景点
  2: nameImgMap['toilet'], //卫生间
  3: nameImgMap['entrance'], //出入口
  4: nameImgMap['service'], //服务点
  5: nameImgMap['restaurant'], //餐饮
  6: nameImgMap['shopping'], //购物
  7: nameImgMap['ticket'], //售票处
  8: nameImgMap['parking'], //停车场
  9: nameImgMap['hotel'], //住宿
  10: nameImgMap['entertainment'], //娱乐
}
