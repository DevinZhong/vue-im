<script>
  import TitleBar from '../../../shared/components/TitleBar.vue'
  import { getUserBaseInfoMap, getGroupBaseInfoMap, getCurrentSession } from '../../../vuex/getters'

  export default {
    props: {
      relationshipSessions: {
        type: Object,
        required: true,
      },
    },
    components: {
      TitleBar,
    },
    vuex: {
      getters: {
        userBaseInfoMap: getUserBaseInfoMap,
        groupBaseInfoMap: getGroupBaseInfoMap,
        currentSession: getCurrentSession,
      },
    },
  }
</script>


<template>
  <div class="session">
    <title-bar></title-bar>
    <router-view :relationship-sessions="relationshipSessions"></router-view>
  </div>
</template>


<style lang="scss" scoped>
  div.session {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
</style>