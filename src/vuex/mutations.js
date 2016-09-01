/**
 * @ignore  =====================================================================================
 * @fileoverview 初始化及更新state
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-26
 * @ignore  =====================================================================================
 */

import { INDEX, listTypes } from '../shared/constants'


/**
 * 初始化基本数据
 * @param state {Object} vuex的state
 * @param uid {String} 用户ID
 * @param next {Function} 回调函数
 * @ignore 副作用：将更新state.uid, state.localData, state.sessionMap
 */
export function initBaseData(state, uid, next) {
  /**
   * 若存在用户登录痕迹，同时不是当前用户，清空原数据
   */
  if (state.uid && state.uid !== uid) {
    state.friends = {}
    state.groups = {}
    state.requests = {}
    state.invitations = {}
    state.groupDetails = {}
    state.sessionMap = {}
    state.enterContentMap = {}
    state.currentList = listTypes.SESSION_LIST
    state.currentFriend = ''
    state.currentGroup = ''
    state.currentSession = ''
    state.filter = ''
  }

  // 初始化用户ID
  state.uid = uid

  // 将应用本地数据缓存到state，减少每次读取的消耗
  state.localData = JSON.parse(localStorage.getItem(INDEX)) || {}

  // 根据用户ID，从本地数据中拷贝出用户会话
  state.sessionMap = state.localData[uid] || {}

  // 回调
  next()
}


/**
 * 根据路径，初始化，更新，或删除state里的信息，并触发setter
 * @param state {Object} vuex的state
 * @param path {Object} 要更新的信息在state里的路径
 * @param info {Object} 具体要添加或修改的信息
 * @param [updateMode] {Boolean} 更新模式，若启用此模式，没更新到的属性将保留
 * @param [next] {Function} 回调函数，用于少数更新需要同步执行的情况
 * @return {undefined} 没有返回值，对传入的state有副作用
 * @ignore 副作用：将修改state的属性值
 */
export function refreshState(state, path, info, updateMode, next) {
  // 断开路径，拆分成节点数组
  const pathArray = path.split('.')

  // 若路径不指向已注册的state，直接返回，不做处理
  if (state[pathArray[0]] === undefined) {
    return
  }

  // pointer为逐层定位属性的一个指针
  let pointer = state

  /**
   * 遍历路径节点，对state信息进行修改
   */
  for (let i = 0; i < pathArray.length; i++) {
    // 如果指针不是对象类型，那他将不会有子属性，非法，直接返回，不做处理
    if (typeof pointer !== 'object') {
      return
    }

    /**
     * 遍历到最后节点时，执行核心处理逻辑
     */
    if (i === pathArray.length - 1) {
      // 若info为null，删除该节点
      if (info === null) {
        /**
         * 若i为0，说明pathArray长度只有1，pointer[pathArray[i]]为状态本身，清空即可，
         * 清空后直接返回，因为已经触发setter了
         */
        if (i === 0) {
          pointer[pathArray[i]] = {}
          return
        }
        delete pointer[pathArray[i]]
      } else if (typeof info === 'object') {
        // 若指定的属性没有内容，开辟个空对象
        if (!pointer[pathArray[i]]) {
          pointer[pathArray[i]] = {}
        }
        /**
         * 设置模式直接用新值取代旧值，
         * 普通模式将对原值进行更新
         */
        if (updateMode) {
          // 若info为对象类型，遍历info
          for (const key of Object.keys(info)) {
            /**
             * 若对应节点的值为null，删除该节点，
             * 否则，更新节点值
             */
            if (info[key] === null) {
              delete pointer[pathArray[i]][key]
            } else {
              pointer[pathArray[i]][key] = info[key]
            }
          }
        } else {
          pointer[pathArray[i]] = info
        }
      } else {
        // info为普通类型，直接用来刷新state的值
        pointer[pathArray[i]] = info
        /**
         * 若i为0，说明pathArray长度只有1，pointer[pathArray[i]]为字典本身，
         * 更新后直接返回，因为setter已经触发
         */
        if (i === 0) {
          return
        }
      }
      break
    }

    // 若下一个节点没有，创建一个空对象
    if (pointer[pathArray[i]] !== '' &&
      pointer[pathArray[i]] !== 0 &&
      !pointer[pathArray[i]]) {
      pointer[pathArray[i]] = {}
    }
    pointer = pointer[pathArray[i]]
  }

  // 触发setter
  state[pathArray[0]] = Object.assign({}, state[pathArray[0]])

  // 若更新的是会话字典，需要同时刷新localStorage
  if (pathArray[0] === 'sessionMap') {
    state.localData[state.uid] = state.sessionMap
    localStorage.setItem(INDEX, JSON.stringify(state.localData))
  }

  // 若有回调函数就调用
  if (next) {
    next()
  }
}
