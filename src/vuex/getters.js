/**
 * @ignore  =====================================================================================
 * @fileoverview vuex的getters
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-25
 * @ignore  =====================================================================================
 */


// 取用户ID
export function getUid(state) {
  return state.uid
}


/**
 * 取个人详细信息，即个人拥有的各种列表的信息
 */
export const getFriends = state => state.friends
export const getGroups = state => state.groups
export const getRequests = state => state.requests
export const getInvitations = state => state.invitations


/**
 * 取出各种数据字典
 */
export const getGroupDetails = state => state.groupDetails
export const getUserBaseInfoMap = state => state.userBaseInfoMap
export const getGroupBaseInfoMap = state => state.groupBaseInfoMap
export const getSessionMap = state => state.sessionMap
export const getEnterContentMap = state => state.enterContentMap


/**
 * 取出当前选中状态
 */
export const getCurrentFriend = state => state.currentFriend
export const getCurrentGroup = state => state.currentGroup
export const getCurrentSession = state => state.currentSession
export const getCurrentList = state => state.currentList


// 取出过滤词
export const getFilter = state => state.filter
