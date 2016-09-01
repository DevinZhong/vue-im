<script>
  import UserPanel from './sidebar/UserPanel.vue'
  import SearchBar from './sidebar/SearchBar.vue'
  import TabBar from './sidebar/TabBar.vue'
  import SessionList from './sidebar/SessionList.vue'
  import FriendList from './sidebar/FriendList.vue'
  import GroupList from './sidebar/GroupList.vue'
  import { getCurrentList } from '../../vuex/getters'
  import { listTypes } from '../../shared/constants'

  export default {
    data() {
      return {
        listTypes,
      }
    },
    props: {
      relationshipSessions: {
        type: Object,
        required: true,
      },
    },
    components: {
      UserPanel,
      SearchBar,
      TabBar,
      SessionList,
      FriendList,
      GroupList,
    },
    vuex: {
      getters: {
        currentList: getCurrentList,
      },
    },
  }
</script>


<template>
  <div class="sidebar">
    <user-panel></user-panel>
    <search-bar></search-bar>
    <tab-bar></tab-bar>
    <div class="list">
      <session-list :relationship-sessions="relationshipSessions" v-show="currentList === listTypes.SESSION_LIST"></session-list>
      <friend-list v-show="currentList === listTypes.FRIEND_LIST"></friend-list>
      <group-list v-show="currentList === listTypes.GROUP_LIST"></group-list>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.sidebar {
    flex: 0 0 14rem;
    max-width: 14rem;
    display: flex;
    flex-direction: column;
    color: #f4f4f4;
    background-color: #2e3238;
    > div.list {
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: .3rem;
        height: .3rem;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 1rem;
      }
      &:hover {
        &::-webkit-scrollbar-thumb {
          background-color: #c3c3c3;
        }
      }
    }
  }
</style>