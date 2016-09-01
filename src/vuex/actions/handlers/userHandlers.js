/**
 * @ignore  =====================================================================================
 * @fileoverview 监听用户相关数据使用的回调函数
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-30
 * @ignore  =====================================================================================
 */

import mutationTypes from '../../mutation-types'
import { rootRef } from '../../../shared/constants'


let state // vuex的state的引用
let dispatch // action里dispatch的引用


/**
 * 使用快照信息刷新用户基本信息字典
 * @param snapshot {Object} 后端服务返回的用户基本信息节点快照
 */
function baseInfoHandler(snapshot) {
  dispatch(mutationTypes.REFRESH_STATE, `userBaseInfoMap.${snapshot.key()}`, snapshot.val())
}


/**
 * 检查列表中的各用户是否已注册到用户基本信息字典，
 * 若没注册，从后端读取用户基本信息并写入字典
 * @param users {Object} 用户列表对象，属性为用户ID
 */
function initBaseInfo(users) {
  for (const uid of Object.keys(users)) {
    if (!state.userBaseInfoMap[uid]) {
      rootRef.child(`public/baseInfo/users/${uid}`)
        .once('value', baseInfoHandler)
    }
  }
}


/**
 * 导出一个对象，便于使用
 */
export default {
  /**
   * 初始化state和dispatch
   */
  init(stateRef, dispatchRef) {
    state = stateRef
    dispatch = dispatchRef
  },

  baseInfoHandler,

  initBaseInfo,

  /**
   * 监听好友列表使用的回调函数，
   * 更新好友列表，同时将检查好友列表中是否有未注册到用户基本信息字典中的好友，
   * 若有将其注册
   * @param snapshot {Object} 后端好友列表节点快照，属性为好友ID
   */
  friendsHandler(snapshot) {
    const friends = snapshot.val() || {}
    initBaseInfo(friends)
    dispatch(mutationTypes.REFRESH_STATE, 'friends', friends)
  },

  /**
   * 监听后台用户基本信息改变使用的回调函数
   * 若变化的用户有在用户基本信息字典中注册，将对应更新字典中的数据
   * @param snapshot {Object} 后端发生变化的用户基本信息节点的快照
   */
  userChangeHandler(snapshot) {
    if (state.userBaseInfoMap[snapshot.key()]) {
      dispatch(mutationTypes.REFRESH_STATE, `userBaseInfoMap.${snapshot.key()}`,
        snapshot.val())
    }
  },
}
