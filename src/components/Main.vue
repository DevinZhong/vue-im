<script>
/**
 * @ignore  =====================================================================================
 * @fileoverview 主程序组件
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-31
 * @ignore  =====================================================================================
 */

  import Sidebar from './main/Sidebar.vue'
  import { rootRef, sessionTypes } from '../shared/constants'
  import { initApp } from '../vuex/actions/initActions'
  import { getRequests, getInvitations, getGroupDetails } from '../vuex/getters'


  export default {
    components: {
      Sidebar,
    },
    vuex: {
      getters: {
        requests: getRequests,
        invitations: getInvitations,
        groupDetails: getGroupDetails,
      },
      actions: {
        initApp,
      },
    },
    computed: {
      /**
       * 从好友请求列表、群组邀请列表、群组如群申请列表里整理出关系会话，用于下传给子组件
       */
      relationshipSessions() {
        const relationshipSessions = {}
        if (this.requests && Object.keys(this.requests).length > 0) {
          const requestSessions = {}
          for (const rid of Object.keys(this.requests)) {
            Object.assign(requestSessions, {
              [this.requests[rid].timestamp]: {
                uid: rid,
                content: this.requests[rid].content,
              },
            })
          }
          Object.assign(relationshipSessions, {
            [sessionTypes.FRIEND_REQUESTS]: requestSessions,
          })
        }
        if (this.invitations && Object.keys(this.invitations).length > 0) {
          const invitationSessions = {}
          for (const gid of Object.keys(this.invitations)) {
            Object.assign(invitationSessions, {
              [this.invitations[gid].timestamp]: {
                uid: this.invitations[gid].uid,
                gid,
                content: this.invitations[gid].content,
              },
            })
          }
          Object.assign(relationshipSessions, {
            [sessionTypes.GROUP_INVITATIONS]: invitationSessions,
          })
        }

        /**
         * 整合群组请求到一个会话
         */
        const groupRequests = {}
        for (const gid of Object.keys(this.groupDetails)) {
          const requests = this.groupDetails[gid].requests
          if (requests && Object.keys(requests).length > 0) {
            for (const rid of Object.keys(requests)) {
              Object.assign(groupRequests, {
                [requests[rid].timestamp]: {
                  uid: rid,
                  gid: requests[rid].gid,
                  content: requests[rid].content,
                },
              })
            }
          }
        }
        if (Object.keys(groupRequests).length > 0) {
          Object.assign(relationshipSessions, {
            [sessionTypes.GROUP_REQUESTS]: groupRequests,
          })
        }
        return relationshipSessions
      },
    },
    created() {
      /**
       * 检测是否已验证，
       * 若已验证，初始化应用，否则，跳转到登录页面
       */
      const authData = rootRef.getAuth()
      if (authData) {
        const uid = authData.uid
        this.initApp(uid)
      } else {
        this.$router.go('/auth')
      }
    },
  }
</script>


<template>
  <div class="main">
    <sidebar :relationship-sessions="relationshipSessions"></sidebar>
    <div class="body">
      <router-view :relationship-sessions="relationshipSessions"></router-view>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.main {
    display: flex;
    width: 50rem;
    min-width: 40rem;
    height: 38rem;
    max-height: 100vh;
    background-color: #eee;
    > div.body {
      flex: auto;
      display: flex;
    }
  }
  
  @media (min-width: 800px) and (max-width: 1000px) {
    div.main {
      height: 100vh;
      width: 100vw;
    }
  }

  @media (max-width: 800px) {
    div.main {
      width: 40rem;
    }
  }
</style>