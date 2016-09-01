/**
* @ignore  =====================================================================================
* @fileoverview 应用层级Action
* @author  devinzhong@outlook.com
* @version 0.4.0
* @ignore  created in 2016-8-26
* @ignore  =====================================================================================
*/

import mutationTypes from '../mutation-types'


export function selectFriend({ dispatch }, fid) {
  dispatch(mutationTypes.REFRESH_STATE, 'currentFriend', fid)
}

export function selectGroup({ dispatch }, gid) {
  dispatch(mutationTypes.REFRESH_STATE, 'currentGroup', gid)
}

export function selectSession({ dispatch }, sid, next) {
  dispatch(mutationTypes.REFRESH_STATE, 'currentSession', sid, false, next)
}

export function selectList({ dispatch }, listType) {
  dispatch(mutationTypes.REFRESH_STATE, 'currentList', listType)
}

export function setFilter({ dispatch }, filter) {
  dispatch(mutationTypes.REFRESH_STATE, 'filter', filter)
}

export function updateEnterContent({ dispatch, state }, content) {
  dispatch(mutationTypes.REFRESH_STATE, `enterContentMap.${state.currentSession}`, content)
}
