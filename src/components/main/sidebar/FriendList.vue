<script>
  import {
    getFriends,
    getUserBaseInfoMap,
    getCurrentFriend,
    getFilter,
  } from '../../../vuex/getters'
  import { selectFriend } from '../../../vuex/actions/appActions'
  import Avatar from '../../../shared/components/Avatar.vue'
  import { generateSimpleMapIndex } from '../../../shared/utils'
  import { infoTypes, listTypes } from '../../../shared/constants'


  export default {
    components: {
      Avatar,
    },
    vuex: {
      getters: {
        friends: getFriends,
        userBaseInfoMap: getUserBaseInfoMap,
        currentFriend: getCurrentFriend,
        filter: getFilter,
      },
      actions: {
        selectFriend,
      },
    },
    computed: {
      friendMap() {
        const friendMap = {}
        for (const fid of Object.keys(this.friends)) {
          const friend = Object.assign({}, this.friends[fid], this.userBaseInfoMap[fid])
          friendMap[fid] = friend
        }
        return friendMap
      },
      friendMapIndex() {
        return generateSimpleMapIndex(this.friendMap, listTypes.FRIEND_LIST)
      },
    },
    methods: {
      resolveName(fid) {
        const info = this.friendMap[fid]
        return info.note || info.nickname || info.email || ''
      },
      select(fid) {
        this.selectFriend(fid)
        this.$router.go({ name: infoTypes.FRIEND_INFO })
      },
    },
    filters: {
      search(list) {
        return list.filter(fid => this.resolveName(fid).indexOf(this.filter) > -1)
      },
    },
  }
</script>


<template>
  <div class="friend_list">
    <div v-for="fid of friendMapIndex | search" class="friend" @click="select(fid)" :class="{ active: currentFriend === fid }">
      <avatar :src="friendMap[fid].avatar" :username="resolveName(fid)" size="1.5rem"></avatar>
      <span class="nickname">{{ resolveName(fid) }}</span>
      <i class="ext material-icons">{{ friendMap[fid].shielded ? 'notifications_off' : 'notifications_none' }}</i>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.friend_list {
    display: flex;
    flex-direction: column;
    > div.friend {
      display: flex;
      align-items: center;
      padding: .25rem 1rem;
      cursor: pointer;
      > span.nickname {
        margin-left: .5rem;
        flex: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > i.ext.material-icons {
        width: 1rem;
        height: 1rem;
        font-size: 1rem;
        color: #696C70;
      }
      &.active {
        background-color: #3A3F45;
        > i.ext.material-icons {
          color: #F4F4F4;
        }
      }
    }
  }
</style>