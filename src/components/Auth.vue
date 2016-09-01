<script>
/**
 * @ignore  =====================================================================================
 * @fileoverview 身份认证组件
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-31
 * @ignore  =====================================================================================
 */

  import TabBar from './auth/TabBar.vue'

  export default {
    components: {
      TabBar,
    },
  }
</script>


<template>
  <div class="auth">
    <tab-bar></tab-bar>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .auth {
    margin-top: -5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 15rem;
    background-color: #fff;
    > body {
      flex: auto;
    }
  }
</style>