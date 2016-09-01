<script>
  import { getSessionMap } from '../../../vuex/getters'
  import { generateSessionMapIndex } from '../../../shared/utils'
  import SessionListItem from './SessionListItem.vue'

  export default {
    props: {
      relationshipSessions: {
        type: Object,
        required: true,
      },
    },
    components: {
      SessionListItem,
    },
    vuex: {
      getters: {
        sessionMap: getSessionMap,
      },
    },
    computed: {
      completeSessionMap() {
        return Object.assign({}, this.sessionMap, this.relationshipSessions)
      },
      sessionMapIndex() {
        return generateSessionMapIndex(this.completeSessionMap)
      },
    },
  }
</script>


<template>
  <div class="session_list">
    <session-list-item v-for="indexNode of sessionMapIndex" :sid="indexNode.sid" :timeline="indexNode.timestamps" :complete-session-map="completeSessionMap"></session-list-item>
  </div>
</template>


<style lang="scss" scoped>
  div.session_list {
    display: flex;
    flex-direction: column;
  }
</style>