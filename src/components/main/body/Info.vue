<script>
  import TitleBar from '../../../shared/components/TitleBar.vue'

  export default {
    components: {
      TitleBar,
    },
  }
</script>


<template>
  <div class="info">
    <title-bar title="详细资料"></title-bar>
    <router-view></router-view>
  </div>
</template>


<style lang="scss" scoped>
  div.info {
    flex: auto;
    display: flex;
    flex-direction: column;
    > div.body {
      flex: auto;
      padding-bottom: 10rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    > footer {
      background-color: #999;
      align-self: flex-end;
    }
  }
</style>