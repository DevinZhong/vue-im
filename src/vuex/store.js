/**
 * @ignore  =====================================================================================
 * @fileoverview vuex的store
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-25
 * @ignore  =====================================================================================
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mutationTypes from './mutation-types'
import { listTypes } from '../shared/constants'
import { initBaseData, refreshState } from './mutations'


Vue.use(Vuex)


const state = {

  uid: '', // 用户ID

  /**
   * 个人信息详情
   */
  friends: {}, // 好友列表
  groups: {}, // 群组列表
  requests: {}, // 请求列表
  invitations: {}, // 邀请列表

  /**
   * 群组信息详情字典，每个元素都包含基本成员信息，
   * 若为群组，还包括请求信息
   */
  groupDetails: {},

  userBaseInfoMap: {}, // 用户信息字典
  groupBaseInfoMap: {}, // 群组信息字典
  sessionMap: {}, // 会话字典
  enterContentMap: {}, // 用户暂存消息字典

  localData: {}, // 应用本地数据缓存

  filter: '', // 列表信息过滤词

  currentList: listTypes.SESSION_LIST, // 当前显示列表

  currentFriend: '', // 当前选中好友
  currentGroup: '', // 当前选中群组
  currentSession: '', // 当前选中会话
}


const mutations = {

  // 初始化基本数据
  [mutationTypes.INIT_BASE_DATA]: initBaseData,

  // 添加、更新或删除state内容
  [mutationTypes.REFRESH_STATE]: refreshState,
}


/**
 * 导出store
 */
export default new Vuex.Store({
  state,
  mutations,
})
