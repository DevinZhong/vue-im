<script>
  import {
    getCurrentSession,
    getGroupDetails,
    getUid,
    getFriends,
    getGroups,
    getUserBaseInfoMap,
    getGroupBaseInfoMap,
  } from '../../../../vuex/getters'
  import { sessionTypes, rootRef } from '../../../../shared/constants'
  import Avatar from '../../../../shared/components/Avatar.vue'
  import moment from 'moment'

  export default {
    props: {
      session: {
        type: Object,
        required: true,
      },
      timestamp: {
        type: String,
        required: true,
      },
      constantString: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        canShowDetail: false,
      }
    },
    components: {
      Avatar,
    },
    vuex: {
      getters: {
        groupDetails: getGroupDetails,
        friends: getFriends,
        groups: getGroups,
        userBaseInfoMap: getUserBaseInfoMap,
        groupBaseInfoMap: getGroupBaseInfoMap,
        currentSession: getCurrentSession,
        getUid,
      },
    },
    computed: {
      isGroupInvitations() {
        return this.currentSession === sessionTypes.GROUP_INVITATIONS
      },
      isFriendRequests() {
        return this.currentSession === sessionTypes.FRIEND_REQUESTS
      },
      isGroupRequests() {
        return this.currentSession === sessionTypes.GROUP_REQUESTS
      },
      relationship() {
        return this.session[this.timestamp]
      },
      uid() {
        return this.relationship.uid
      },
      gid() {
        return this.relationship.gid || ''
      },
      username() {
        return this.userBaseInfoMap[this.uid].nickname || this.userBaseInfoMap[this.uid].email
      },
      avatar() {
        if (this.isGroupInvitations) {
          return this.groupBaseInfoMap[this.gid].avatar
        }
        return this.userBaseInfoMap[this.uid].avatar
      },
      time() {
        return moment(+this.timestamp).format('LT')
      },
      groupName() {
        if (this.isGroupInvitations || this.isGroupRequests) {
          return this.groupBaseInfoMap[this.gid].name
        }
        return ''
      },
      desc() {
        if (this.relationship.content) {
          return this.relationship.content
        } else if (this.isGroupInvitations) {
          return this.groupBaseInfoMap[this.gid].desc
        }
        return ''
      },
      disabled() {
        if (this.isGroupInvitations && this.groups[this.gid]) {
          return true
        } else if (this.isFriendRequests && this.friends[this.uid]) {
          return true
        } else if (this.isGroupRequests && this.groupDetails[this.gid].members[this.uid]) {
          return true
        }
        return false
      },
    },
    methods: {
      showDetail() {
        this.canShowDetail = !this.canShowDetail
      },
      accept() {
        const now = Date.now()
        if (this.isGroupInvitations) {
          rootRef.child(`groups/${this.gid}/members/${this.getUid}/joinTime`).set(now)
          rootRef.child(`users/${this.getUid}/groups/${this.gid}`).set({
            shielded: false,
            checkTime: now,
          })
        } else if (this.isFriendRequests) {
          rootRef.child(`users/${this.uid}/friends/${this.getUid}/note`).set('')
          rootRef.child(`users/${this.getUid}/friends/${this.uid}`).set({
            shielded: false,
            note: '',
          })
        } else if (this.isGroupRequests) {
          rootRef.child(`groups/${this.gid}/members/${this.uid}`).set({
            shielded: false,
            joinTime: now,
          })
          rootRef.child(`users/${this.uid}/groups/${this.gid}/checkTime`).set(now)
        }
      },
      reject() {
        if (this.isGroupInvitations) {
          rootRef.child(`users/${this.getUid}/invitations/${this.gid}`).set(null)
        } else if (this.isFriendRequests) {
          rootRef.child(`users/${this.getUid}/requests/${this.uid}`).set(null)
        } else if (this.isGroupRequests) {
          rootRef.child(`groups/${this.gid}/requests/${this.uid}`).set(null)
        }
      },
    },
  }
</script>


<template>
  <div class="relationship">
    <div class="time">
      <span>{{ time }}</span>
    </div>
    <div class="container">
      <avatar :src="avatar" :username="isGroupInvitations ? groupName : username" size="4rem" margin=".3rem" border-radius=".3rem"></avatar>
      <div class="relationship_info">
        <div class="summary">
          <span v-if="uid in friends" class="title">您的好友</span>
          <span class="username" @click="showDetail">{{ username }}</span>
          <span>{{ constantString }}</span>
          <span class="groupName">{{ groupName }}</span>
        </div>
        <div class="desc">
          <span class="label">描述信息：</span>
          <span class="content">{{ desc }}</span>
        </div>
      </div>
      <div class="decide">
        <button @click="accept" :disabled="disabled">接受</button>
        <button @click="reject" :disabled="disabled">拒绝</button>
      </div>
    </div>
    <div class="admin_info" v-if="canShowDetail">
      <span>todo</span>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.relationship {
    flex: none;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    > div.time {
      flex: 100%;
      margin-bottom: .5rem;
      display: flex;
      justify-content: center;
      > span {
        padding: 0 1rem;
        background-color: #dcdcdc;
        font-size: .6rem;
        color: #fff;
      }
    }
    > div.container {
      background-color: #b2e281;
      border-radius: 1rem;
      flex: auto;
      padding: 1rem 0;
      display: flex;
      justify-content: space-around;
      > div.relationship_info {
        display: flex;
        flex-direction: column;
        > div.summary {
          > span {
            &.username,
            &.groupName {
              font-size: 1rem;
            }
          }
        }
        > div.desc {
          margin-top: .4rem;
          flex: auto;
          display: flex;
          flex-direction: column;
          > span {
            &.label {
              color: #666;
            }
          }
        }
      }
      > div.decide {
        align-self: center;
        display: flex;
        flex-direction: column;
        > button {
          margin: .2rem;
          width: 4rem;
          height: 2rem;
          color: #fff;
          background-color: green;
          outline: none;
          border-radius: .3rem;
          cursor: pointer;
          &[disabled] {
            opacity: .5;
            cursor: not-allowed;
          }
        }
      }
    }
    > div.admin_info {
      flex: 100%;
    }
  }
</style>