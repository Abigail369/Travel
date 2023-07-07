/**
 * 定制element-ui的Message，防止message的频繁展示
 * 逻辑：若消息存在且类型和内容都一致则什么也不做，否则创建新的消息
 * 即屏蔽完全一致的弹框重复弹出
 **/
import {Message} from 'element-ui'

let messageDom = null
const myMessage = (options) => {
  if (messageDom &&
    messageDom.type === options.type &&
    messageDom.message === options.message) {
    /**注意message内容若为catch的error对象，需要toString才能判断相同，否则仍会重复出现*/
    //若消息存在且类型和内容都一致则什么也不做
  } else {
    //否则创建新的
    messageDom = Message(options)
  }

}
const typeArr = ['success', 'error', 'warning', 'info']
typeArr.forEach(type => {
  myMessage[type] = options => {
    if (typeof options === 'string') options = {message: options}
    options.type = type
    return myMessage(options)
  }
})

export default myMessage;
