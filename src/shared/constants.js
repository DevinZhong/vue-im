/**
 * @ignore  =====================================================================================
 * @fileoverview 模块间共享的常量
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-26
 * @ignore  =====================================================================================
 */

import Wilddog from 'wilddog'
import LOGO from '../assets/logo.png'

/**
 * 野狗根引用
 */
export const rootRef = new Wilddog('https://vue-im.wilddogio.com')


/**
 * localStorage本地数据索引
 * 说明：根据此索引能取出应用的所有本地数据，即所有本地用户的会话字典。
 *      在这个字典中以当前用户的uid做索引，就能拿到当前用户的本地会话字典。
 */
export const INDEX = 'VUE-IM-v2' // v2版本的后台基于野狗的BaaS服务


/**
 * vue的LOGO，用作于默认用户头像和好友请求、入群申请、入群邀请等系统会话头像
 */

export { LOGO }


/**
 * 类型常量
 */
const SESSION_LIST = 'SESSION_LIST'
const FRIEND_LIST = 'FRIEND_LIST'
const GROUP_LIST = 'GROUP_LIST'
const FRIEND_SESSION = 'FRIEND_SESSION'
const GROUP_SESSION = 'GROUP_SESSION'
const FRIEND_REQUESTS = 'FRIEND_REQUESTS'
const GROUP_REQUESTS = 'GROUP_REQUESTS'
const GROUP_INVITATIONS = 'GROUP_INVITATIONS'
const FRIEND_INFO = 'FRIEND_INFO'
const GROUP_INFO = 'GROUP_INFO'
const USER_INFO = 'USER_INFO'


/**
 * 导出列表类型
 */
export const listTypes = {
  SESSION_LIST,
  FRIEND_LIST,
  GROUP_LIST,
}


/**
 * 导出会话类型
 */
export const sessionTypes = {
  FRIEND_SESSION,
  GROUP_SESSION,
  FRIEND_REQUESTS,
  GROUP_REQUESTS,
  GROUP_INVITATIONS,
}

/**
 * 导出信息类型
 */
export const infoTypes = {
  FRIEND_INFO,
  GROUP_INFO,
  USER_INFO,
}
