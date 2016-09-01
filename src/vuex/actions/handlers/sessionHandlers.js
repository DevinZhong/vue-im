/**
 * @ignore  =====================================================================================
 * @fileoverview 监听会话相关数据使用的回调函数
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-30
 * @ignore  =====================================================================================
 */

import mutationTypes from '../../mutation-types'
import { rootRef } from '../../../shared/constants'
import userHandlers from './userHandlers'
import groupHandlers from './groupHandlers'


let state // vuex的state的引用
let dispatch // action里dispatch的引用


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

  /**
   * 监听好友请求列表使用的回调函数，
   * 更新好友请求列表，同时将检查请求发出者是否已在用户基本信息字典中注册，
   * 若没有则在字典中注册（初始化用户基本信息）
   * @param snapshot {Object} 后端好友请求列表快照
   */
  requestsHandler(snapshot) {
    const requests = snapshot.val() || {}
    dispatch(mutationTypes.REFRESH_STATE, 'requests', requests)
    userHandlers.initBaseInfo(requests)
  },

  /**
   * 监听群组邀请列表使用的回调函数，
   * 更新群组邀请列表，同时将检查邀请发出者及所对应群组的信息是否已在基本信息字典中注册，
   * 若没有，则在基本信息字典中注册（即初始化信息）
   * @param snapshot {Object} 后端群组邀请列表的快照
   */
  invitationsHandler(snapshot) {
    const invitations = snapshot.val() || {}
    dispatch(mutationTypes.REFRESH_STATE, 'invitations', invitations)
    for (const gid of Object.keys(invitations)) {
      // 检查群组信息
      if (!state.groupBaseInfoMap[gid]) {
        rootRef.child(`public/baseInfo/groups/${gid}`)
          .once('value', groupHandlers.baseInfoHandler)
      }
      // 检查邀请发出者信息
      if (!state.userBaseInfoMap[invitations[gid].uid]) {
        rootRef.child(`public/baseInfo/users/${invitations[gid].uid}`)
          .once('value', userHandlers.baseInfoHandler)
      }
    }
  },

  /**
   * 监听好友会话使用的回调函数，
   * 将更新会话字典内容
   * @param snapshot {Object} 后端好友会话列表快照
   */
  sessionsHandler(snapshot) {
    const sessions = snapshot.val() || {}
    for (const sid of Object.keys(sessions)) {
      dispatch(mutationTypes.REFRESH_STATE, `sessionMap.${sid}`, sessions[sid], true)
    }
  },
}
