<script>
  import MessageView from './MessageView.vue'
  import SendPanel from './SendPanel.vue'

  export default {
    components: {
      MessageView,
      SendPanel,
    },
  }
</script>


<template>
  <div class="message_session">
    <message-view></message-view>
    <send-panel></send-panel>
  </div>
</template>


<style lang="scss" scoped>
  div.message_session {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
</style>