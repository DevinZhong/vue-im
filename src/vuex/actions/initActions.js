/**
* @ignore  =====================================================================================
* @fileoverview 初始化应用
* @author  devinzhong@outlook.com
* @version 0.4.0
* @ignore  created in 2016-8-24
* @ignore  =====================================================================================
*/


import mutationTypes from '../mutation-types'
import { rootRef } from '../../shared/constants'
import userHandlers from './handlers/userHandlers'
import groupHandlers from './handlers/groupHandlers'
import sessionHandlers from './handlers/sessionHandlers'


/**
 * 根据用户ID初始化应用
 * @param dispatch {Object} 从参数store解构而出，用于派发state突变（mutation）
 * @param state {Object} 从参数store解构而出，统一存储了vuex中状态
 * @param uid {String} 用户ID，初始化将围绕此ID进行
 */
export const initApp = ({ dispatch, state }, uid) => {
  // 先初始化基本数据，包括state.localData， state.uid， state.sessionMap
  dispatch(mutationTypes.INIT_BASE_DATA, uid, () => {
    /**
     * 初始化用于处理监听的回调函数
     */
    userHandlers.init(state, dispatch)
    groupHandlers.init(state, dispatch)
    sessionHandlers.init(state, dispatch)

    // 初始化用户信息
    if (!state.userBaseInfoMap[uid]) {
      rootRef.child(`public/baseInfo/users/${uid}`)
        .once('value', userHandlers.baseInfoHandler)
    }

    // 监听好友列表
    rootRef.child(`users/${uid}/friends`)
      .on('value', userHandlers.friendsHandler)

    // 监听群组列表
    rootRef.child(`users/${uid}/groups`)
      .on('value', groupHandlers.groupsHandler)

    // 监听好友请求列表
    rootRef.child(`users/${uid}/requests`)
      .on('value', sessionHandlers.requestsHandler)

    // 监听群组邀请列表
    rootRef.child(`users/${uid}/invitations`)
      .on('value', sessionHandlers.invitationsHandler)

    // 监听好友会话列表
    rootRef.child(`users/${uid}/sessions`)
      .on('value', sessionHandlers.sessionsHandler)

    // 监听所有用户基本信息的变化，用于更新用户基本信息字典
    rootRef.child('public/baseInfo/users')
      .on('child_changed', userHandlers.userChangeHandler)

    // 监听所有群组基本信息的变化，用于更新群组基本信息字典
    rootRef.child('public/baseInfo/groups')
      .on('child_changed', groupHandlers.groupChangeHandler)

    /**
     * 在好友会话节点上注册服务断开事件，
     * 当服务断开时，将好友会话内容清空。
     * 不用担心会话丢失，在应用运行的过程中，
     * 会话消息一直与本地localStorage保持同步。
     */
    rootRef.child(`users/${uid}/sessions`)
      .onDisconnect().set({})
  })
}
