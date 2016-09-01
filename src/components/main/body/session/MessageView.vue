<script>
  import Message from './Message.vue'
  import { getSessionMap, getCurrentSession } from '../../../../vuex/getters'
  import { resolveSessionType, generateSessionMapIndex } from '../../../../shared/utils'
  import { sessionTypes } from '../../../../shared/constants'

  export default {
    data() {
      return {
        latestTimestamp: '',
      }
    },
    components: {
      Message,
    },
    vuex: {
      getters: {
        sessionMap: getSessionMap,
        currentSession: getCurrentSession,
      },
    },
    computed: {
      sessionMapIndex() {
        return generateSessionMapIndex(this.sessionMap)
      },
      isReady() {
        if (!this.currentSession) {
          return false
        } else if (this.type !== sessionTypes.FRIEND_SESSION &&
          this.type !== sessionTypes.GROUP_SESSION) {
          return false
        }
        return true
      },
      type() {
        return resolveSessionType(this.currentSession)
      },
      session() {
        return this.sessionMap[this.currentSession]
      },
      messageList() {
        let timestamps = []
        try {
          for (const indexNode of this.sessionMapIndex) {
            if (indexNode.sid === this.currentSession) {
              timestamps = indexNode.timestamps
            }
          }
          if (timestamps.length > 0) {
            const latestTimestamp = timestamps[timestamps.length - 1]
            if (latestTimestamp !== this.latestTimestamp) {
              this.$nextTick(() => {
                this.$els.view.scrollTop = Number.MAX_VALUE
              })
              this.latestTimestamp = latestTimestamp
            }
          }
          const messageList = []
          for (const timestamp of timestamps) {
            const message = this.session[timestamp]
            message.timestamp = timestamp
            messageList.push(message)
          }
          return messageList
        } catch (e) {
          return []
        }
      },
    },
  }
</script>


<template>
  <div v-if="isReady" class="message_view" v-el:view>
    <message v-for="message of messageList" :session-type="type" :message="message"></message>
  </div>
  <div v-else class="message_view"></div>
</template>


<style lang="scss" scoped>
  div.message_view {
    height: 25rem;
    flex: auto;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: .5rem;
      height: .5rem;
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
</style>