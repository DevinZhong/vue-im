<script>
  import Avatar from '../../../../shared/components/Avatar.vue'
  import {
    getUid,
    getFriends,
    getCurrentSession,
    getUserBaseInfoMap,
  } from '../../../../vuex/getters'
  import { sessionTypes } from '../../../../shared/constants'
  import { resolveSessionType } from '../../../../shared/utils'
  import moment from 'moment'

  export default {
    props: {
      sessionType: {
        type: String,
        required: true,
      },
      message: {
        type: Object,
        required: true,
      },
    },
    components: {
      Avatar,
    },
    vuex: {
      getters: {
        uid: getUid,
        friends: getFriends,
        currentSession: getCurrentSession,
        userBaseInfoMap: getUserBaseInfoMap,
      },
    },
    computed: {
      isGroupSession() {
        return resolveSessionType(this.currentSession) === sessionTypes.GROUP_SESSION
      },
      isReady() {
        if (!this.message) {
          return false
        } else if (!this.message.uid) {
          return false
        } else if (!this.currentSession) {
          return false
        }
        return true
      },
    },
    methods: {
      // 判断是否为用户自身发的消息
      isSelf(uid) {
        return uid === this.uid
      },

      isFriend(uid) {
        return uid in this.friends
      },

      needShowName(message) {
        if (this.isSelf(message.uid)) {
          return false
        } else if (this.isGroupSession) {
          return true
        }
        return false
      },

      /**
       * 解析用户信息
       */
      resolveUserInfo(uid) {
        return this.userBaseInfoMap[uid]
      },

      /**
       * 解析用户名
       * 根据会话类型，分别从用户字典和群组字典里索引
       */
      resolveUsername(message) {
        const info = this.userBaseInfoMap[message.uid]
        return info.note || info.nickname || info.email
      },

      resolveAvatar(message) {
        return this.resolveUserInfo(message.uid).avatar
      },

      resolveTime(message) {
        return moment(+message.timestamp).format('LT')
      },
    },
  }
</script>

<template>
  <div v-if="isReady" class="message" :class="{ self: isSelf(message.uid) }">
    <div class="time">
      <span>{{ resolveTime(message) }}</span>
    </div>
    <div class="body">
      <div class="avatar">
        <avatar :src="resolveAvatar(message)" :username="resolveUsername(message)" size="2rem" margin="0" border-radius=".25rem"></avatar>
      </div>
      <div class="container">
        <span v-if="needShowName(message)" class="username">{{ resolveUsername(message) }}</span>
        <p v-if="message.isPicture" class="content">
          <img v-if="message.isPicture" :src="message.content">
        </p>
        <!--<p v-else class="content">{{ message.content }}</p>-->
        <p v-else class="content">{{ message.content }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div.message {
    margin: .5rem 0;
    max-width: 36rem;
    display: flex;
    flex-direction: column;
    > div.time {
      display: flex;
      justify-content: center;
      > span {
        padding: 0 1rem;
        font-size: .6rem;
        background-color: #dcdcdc;
        color: #fff;
      }
    }
    > div.body {
      flex: auto;
      display: flex;
      > div.avatar {
        flex: none;
        align-self: flex-start;
        margin: 0 .25rem;
      }
      > div.container {
        flex: auto;
        display: flex;
        flex-direction: column;
        > span.username {
          margin: 0 .5rem;
          font-size: .6rem;
        }
        > p.content {
          margin: .2rem .5rem 0 .5rem;
          background-color: #b2e281;
          padding: .4rem;
          border-radius: .2rem;
          position: relative;
          font-size: .9rem;
          white-space: pre-wrap;
          > img {
            max-width: 30rem;
          }
          &::before {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            right: 100%;
            border: .5rem solid transparent;
            border-right: .4rem solid #b2e281;
          }
        }
      }
    }
    &.self {
      > div.body {
        flex-direction: row-reverse;
        > div.container {
          > p.content {
            &::before {
              left: 100%;
              border-right: none;
              border-left: .4rem solid #b2e281;
            }
          }
        }
      }
    }
  }
</style>