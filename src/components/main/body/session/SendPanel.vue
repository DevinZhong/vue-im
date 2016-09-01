<script>
  import Toolbar from './Toolbar.vue'
  import InputArea from './InputArea.vue'
  import ActionBar from './ActionBar.vue'

  export default {
    data() {
      return {
      }
    },
    components: {
      Toolbar,
      InputArea,
      ActionBar,
    },
  }
</script>


<template>
  <div class="send_panel">
    <toolbar></toolbar>
    <input-area></input-area>
    <action-bar></action-bar>
  </div>
</template>


<style lang="scss" scoped>
  div.send_panel {
    flex: 0 0 10rem;
    border-top: 1px solid #d6d6d6;
    display: flex;
    flex-direction: column;
  }
</style>