/**
 * @ignore  =====================================================================================
 * @fileoverview 监听群组相关数据使用的回调函数
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-30
 * @ignore  =====================================================================================
 */

import mutationTypes from '../../mutation-types'
import { rootRef } from '../../../shared/constants'
import userHandlers from './userHandlers'


let state // vuex的state的引用
let dispatch // action里dispatch的引用


/**
 * 使用快照信息刷新群组基本信息字典
 * @param snapshot {Object} 后端群组基本信息的一个快照
 */
function baseInfoHandler(snapshot) {
  dispatch(mutationTypes.REFRESH_STATE, `groupBaseInfoMap.${snapshot.key()}`, snapshot.val())
}


/**
 * 监听群组成员列表所用的回调函数的生成器，
 * 将根据群组ID，生成一个绑定群组ID的回调函数
 * @param gid {String} 群组ID，生成的回调函数将与此ID绑定
 */
function membersHandlerMaker(gid) {
  /**
   * 返回一个监听群组成员列表信息所用的回调函数，
   * 将更新群组成员列表，同时，检查列表成员是否有未在用户基本信息字典中注册的，
   * 若有，从后端取出基本信息，并注册
   */
  return snapshot => {
    const members = snapshot.val() || {}
    dispatch(mutationTypes.REFRESH_STATE, `groupDetails.${gid}.members`, members)
    userHandlers.initBaseInfo(members)
  }
}


/**
 * 监听群组会话所用的回调函数的生成器
 * 将根据群组ID，生成一个监听此群组会话所用的回调函数
 * @param gid {String} 群组ID，生成的回调函数将与此ID绑定
 */
function sessionHandlerMaker(gid) {
  /**
   * 返回一个监听群组会话所用的回调函数
   * 将更新会话字典内容
   */
  return snapshot => {
    dispatch(mutationTypes.REFRESH_STATE, `sessionMap.${gid}`, snapshot.val(), true)
  }
}


/**
 * 监听群组请求所用的回调函数的生成器
 * 将根据群组ID，生成一个监听此群组群组入群申请所用的回调函数
 * @param gid {String} 群组ID， 生成的回调函数将与此ID绑定
 */
function requestsHandlerMaker(gid) {
  /**
   * 返回一个监听群组入群申请所用的回调函数
   * 将更新群组请求列表，同时检查请求发起者是否有在用户基本信息字典注册，
   * 若没有，从后端取出数据注册
   */
  return snapshot => {
    const requests = snapshot.val() || {}
    userHandlers.initBaseInfo(requests)
    dispatch(mutationTypes.REFRESH_STATE, `groupDetails.${gid}.requests`, requests)
  }
}


export default {
  /**
   * 初始化state和dispatch
   */
  init(stateRef, dispatchRef) {
    state = stateRef
    dispatch = dispatchRef
  },

  baseInfoHandler,

  /**
   * 监听群组列表所用的回调函数
   * 将更新群组列表，同时检查群组是否已在群组基本信息字典中注册，
   * 若没有，对该群组进行必要的初始化，初始化包括以下内容：
   * 初始化群组基本信息、初始化成员信息并保持监听、初始化会话信息并保持监听、
   * 若当前用户为群组创建者，初始化群组入群申请列表，并保持监听
   * @param snapshot {Object} 后端群组列表节点的一个快照
   */
  groupsHandler(snapshot) {
    const groups = snapshot.val() || {}
    dispatch(mutationTypes.REFRESH_STATE, 'groups', groups)
    for (const gid of Object.keys(groups)) {
      /**
       * 若群组字典中还没有这个群组的信息，
       * 进行以下初始化操作
       */
      if (!state.groupBaseInfoMap[gid]) {
        // 初始化群组基本信息
        rootRef.child(`public/baseInfo/groups/${gid}`)
          .once('value', baseInfoHandler)

        // 初始化群组成员信息，并保持监听
        rootRef.child(`groups/${gid}/members`)
          .on('value', membersHandlerMaker(gid))

        // 初始化群组会话信息，并保持监听
        rootRef.child(`groups/${gid}/session`)
          .on('value', sessionHandlerMaker(gid))

        /**
         * 若当前用户为群组创建者（群组ID的前面部分为用户ID），
         * 还需要监听群组请求
         */
        if (new RegExp(state.uid).test(gid)) {
          rootRef.child(`groups/${gid}/requests`)
            .on('value', requestsHandlerMaker(gid))
        }
      }
    }
  },

  /**
   * 监听后台群组基本信息改变所使用的回调函数
   * 若信息变化的的群组已有在群组基本信息字典中注册，更新字典中该群组的基本信息
   * @param snapshot {Object} 后端发生变化的群组基本信息快照
   */
  groupChangeHandler(snapshot) {
    if (state.groupBaseInfoMap[snapshot.key()]) {
      dispatch(mutationTypes.REFRESH_STATE, `groupBaseInfoMap.${snapshot.key()}`,
        snapshot.val())
    }
  },
}
