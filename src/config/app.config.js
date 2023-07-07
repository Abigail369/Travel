/**
 * @author arain
 * @email 1298119036@qq.com
 * @create date 2023-3-3 13:52
 * @modify date
 * @desc 页面中的各类静态变量
 */
export const ALARM_TYPE_MAP = {
   1: '当前拥堵报警',
  // 2: '预测拥堵报警',
  // 3: '地质灾害报警',
  // 4: '恶劣天气报警',
  5: '微信小程序报警',
  6: '清园滞留报警'
}
export const ALARM_TYPE= [1,5,6]

export const PUSH_MESSAGE_TYPE_MAP = {
  1: '当前拥堵报警',
  2: '预测拥堵报警',
  3: '地质灾害报警',
  4: '恶劣天气报警',
  5: '微信小程序报警回复',
  6: '清园滞留报警'
}
export const PUSH_MESSAGE_SEARCH_TYPE= [1,2,3,4,5,6]
export const PUSH_MESSAGE_ADD_TYPE= [1,2,3,4,6]
export const ALARM_PROCESS_MAP = {
  0: '报警确认',
  1: '已处理',
  // 2: '误报警',
}
export const ALARM_PROCESS= [0,1]

export const CROWD_LEVEL_MAP = {
  1: '通畅',
  2: '基本通畅',
  3: '轻度拥堵',
  4: '中度拥堵',
  5: '严重拥堵',
}
export const CROWD_LEVEL_COLOR_MAP = {
  1: [0, 1, 0, 1],
  2: [153/255, 255/255, 170/255, 1],
  3: [243/255, 249/255, 154/255, 1],
  4: [1, 1, 0, 1],
  5: [1, 0, 0, 1],
}
export const CROWD_LEVEL= [1,2,3,4,5]

