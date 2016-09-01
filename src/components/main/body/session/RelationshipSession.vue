<script>
  import { getCurrentSession } from '../../../../vuex/getters'
  import { sessionTypes } from '../../../../shared/constants'
  import Relationship from './Relationship.vue'

  export default {
    props: {
      relationshipSessions: {
        type: Object,
        required: true,
      },
    },
    components: {
      Relationship,
    },
    vuex: {
      getters: {
        currentSession: getCurrentSession,
      },
    },
    computed: {
      session() {
        return this.relationshipSessions[this.currentSession]
      },
      timeline() {
        const timestamps = Object.keys(this.session)
        timestamps.sort()
        return timestamps
      },
      isReady() {
        if (this.currentSession !== sessionTypes.GROUP_INVITATIONS &&
          this.currentSession !== sessionTypes.FRIEND_REQUESTS &&
          this.currentSession !== sessionTypes.GROUP_REQUESTS) {
          return false
        }
        return true
      },
      constantString() {
        if (this.currentSession === sessionTypes.GROUP_INVITATIONS) {
          return ' 邀请您加入 '
        } else if (this.currentSession === sessionTypes.FRIEND_REQUESTS) {
          return ' 请求加您为好友 '
        } else if (this.currentSession === sessionTypes.GROUP_REQUESTS) {
          return ' 请求加入 '
        }
        return ''
      },
    },
  }
</script>


<template>
  <div v-if="isReady" class="relationship_session">
    <relationship v-for="timestamp of timeline" :session="session" :timestamp="timestamp" :constant-string="constantString"></relationship>
  </div>
</template>


<style lang="scss" scoped>
  div.relationship_session {
    flex: auto;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
</style>