<script>
  import Avatar from '../../../../shared/components/Avatar.vue'
  import OpenSession from './OpenSession.vue'
  import {
    getUid,
    getUserBaseInfoMap,
    getCurrentFriend,
    getFriends,
  } from '../../../../vuex/getters'
  import { rootRef } from '../../../../shared/constants'
  import moment from 'moment'

  export default {
    components: {
      Avatar,
      OpenSession,
    },
    vuex: {
      getters: {
        uid: getUid,
        userBaseInfoMap: getUserBaseInfoMap,
        currentFriend: getCurrentFriend,
        friends: getFriends,
      },
    },
    computed: {
      baseInfo() {
        return this.userBaseInfoMap[this.currentFriend] || {}
      },
      config() {
        return this.friends[this.currentFriend] || {}
      },
      dateOfBirth() {
        return moment(this.baseInfo.dateOfBirth).format('MM-DD')
      },
    },
    methods: {
      updateNote(e) {
        try {
          if (e.target.innerHTML === this.config.note) {
            return
          }
          rootRef.child(`users/${this.uid}/friends/${this.currentFriend}`).update({
            note: e.target.innerHTML,
          })
        } finally {
          if (!e.target.innerHTML) {
            e.target.innerHTML = '备注'
          }
        }
      },
    },
  }
</script>


<template>
  <div class="friend_info">
    <div class="avatar">
      <avatar :src="baseInfo.avatar" size="5rem" :username="baseInfo.nickname || baseInfo.email" margin=".4rem" border-radius=".4rem"></avatar>
    </div>
    <div class="name_bundle">
      <span class="name">{{ baseInfo.nickname || baseInfo.email }}</span>
      <span class="note" @blur="updateNote" contenteditable="true">{{ config.note || '备注' }}</span>
    </div>
    <span class="desc">{{ baseInfo.desc }}</span>
    <span class="uid">{{ 'ID：' + currentFriend }}</span>
    <span class="email">{{ baseInfo.email }}</span>
    <span class="date_of_birth">{{ '生日：' + dateOfBirth }}</span>
    <span class="gender">{{ '性别：' + baseInfo.gender }}</span>
    <span class="city">{{ '城市：' + baseInfo.city }}</span>
    <open-session></open-session>
  </div>
</template>


<style lang="scss" scoped>
  div.friend_info {
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div.avatar {
      margin: 2rem 0 .5rem;
    }
    > div.name_bundle {
      display: flex;
      align-items: center;
      > span {
        &.name {
          font-size: 1.2rem;
          flex: auto;
        }
        &.note {
          margin-left: .4rem;
        }
      }
    }
    > span.uid {
      font-size: .4rem;
      color: #888;
    }
  }
</style>