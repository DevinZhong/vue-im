<script>
  import {
    getUserBaseInfoMap,
    getGroupBaseInfoMap,
    getCurrentSession,
    getFriends,
    getFilter,
  } from '../../../vuex/getters'
  import { LOGO } from '../../../shared/constants'
  import { selectSession } from '../../../vuex/actions/appActions'
  import Avatar from '../../../shared/components/Avatar.vue'
  import moment from 'moment'

  export default {
    props: {
      sid: {
        type: String,
        required: true,
      },
      timeline: {
        type: Array,
        required: true,
      },
      completeSessionMap: {
        type: Object,
        required: true,
      },
    },
    components: {
      Avatar,
    },
    vuex: {
      getters: {
        userBaseInfoMap: getUserBaseInfoMap,
        groupBaseInfoMap: getGroupBaseInfoMap,
        currentSession: getCurrentSession,
        friends: getFriends,
        filter: getFilter,
      },
      actions: {
        selectSession,
      },
    },
    computed: {
      canShow() {
        if (this.sessionName) {
          return this.sessionName.indexOf(this.filter) > -1
        }
        return false
      },
      friendInfo() {
        return Object.assign({}, this.userBaseInfoMap[this.sid], this.friends[this.sid])
      },
      groupInfo() {
        return this.groupBaseInfoMap[this.sid]
      },
      sessionName() {
        const nameMap = {
          FRIEND_REQUESTS: '好友请求',
          GROUP_INVITATIONS: '群组邀请',
          GROUP_REQUESTS: '入群申请',
        }
        if (Object.keys(this.friendInfo).length > 0) {
          return this.friendInfo.note || this.friendInfo.nickname || this.friendInfo.email
        } else if (this.groupInfo) {
          return this.groupInfo.name
        }
        return nameMap[this.sid]
      },
      avatar() {
        if (Object.keys(this.friendInfo).length > 0) {
          return this.friendInfo.avatar
        } else if (this.groupInfo) {
          return this.groupInfo.avatar
        }
        return LOGO
      },
      latestMessage() {
        if (this.timeline.length > 0) {
          const session = this.completeSessionMap[this.sid]
          const latestTimestamp = this.timeline[this.timeline.length - 1]
          return session[latestTimestamp].content
        }
        return ''
      },
      latestTime() {
        const latestTimestamp = this.timeline[this.timeline.length - 1]
        return moment(+latestTimestamp).format('LT')
      },
    },
    methods: {
      select() {
        this.selectSession(this.sid)
        if (Object.keys(this.friendInfo).length > 0 || this.groupInfo) {
          this.$router.go({ name: 'messageSession' })
        } else {
          this.$router.go({ name: 'relationshipSession' })
        }
      },
    },
  }
</script>


<template>
  <div v-if="canShow" class="session_list_item" @click="select" :class="{ active: currentSession === sid }">
    <avatar :src="avatar" :username="sessionName"></avatar>
    <div class="body">
      <div class="container">
        <span class="name">{{ sessionName }}</span>
        <span class="latest_time">{{ latestTime }}</span>
      </div>
      <span class="latest_message">{{ latestMessage }}</span>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.session_list_item {
    display: flex;
    align-items: center;
    padding: .25rem .5rem;
    cursor: pointer;
    > div.body {
      margin-left: .5rem;
      flex: auto;
      display: flex;
      flex-direction: column;
      > div.container {
        flex: auto;
        display: flex;
        padding: 0 .3rem;
        justify-content: space-between;
        > span.name {
          max-width: 6.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        > span.latest_time {
          color: #6b6f7c
        }
      }
      > span.latest_message {
        max-width: 10.5rem;
        flex: none;
        color: #989898;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &.active {
      background-color: #3A3F45;
      > div.body {
        > div.container {
          > span.latest_time {
            color: #fff;
          }
        }
        > span.latest_message {
          color: #fff;
        }
      }
    }
  }
</style>