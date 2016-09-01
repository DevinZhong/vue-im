<script>
  import Avatar from '../../../shared/components/Avatar.vue'
  import { infoTypes } from '../../../shared/constants'
  import Menu from './Menu.vue'
  import { getUid, getUserBaseInfoMap } from '../../../vuex/getters'

  export default {
    components: {
      Avatar,
      Menu,
    },
    vuex: {
      getters: {
        uid: getUid,
        userBaseInfoMap: getUserBaseInfoMap,
      },
    },
    computed: {
      userInfo() {
        return this.userBaseInfoMap[this.uid] || {}
      },
      avatar() {
        return this.userInfo.avatar
      },
      username() {
        if (this.userInfo.nickname) {
          return this.userInfo.nickname
        }
        return this.userInfo.email
      },
      routerName() {
        return infoTypes.USER_INFO
      },
    },
  }
</script>


<template>
  <div class="user_panel">
    <div class="user_info" v-link="{ name: routerName }">
      <avatar :src="avatar" :username="username" :rounded="true"></avatar>
      <span class="username">{{ username }}</span>
    </div>
    <menu></menu>
  </div>
</template>


<style lang="scss" scoped>
  div.user_panel {
    flex: none;
    display: flex;
    align-items: center;
    padding: .6rem .6rem;
    > div.user_info {
      flex: auto;
      display: flex;
      align-items: center;
      font-size: 1.25rem;
      cursor: pointer;
      > span.username {
        max-width: 9rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>