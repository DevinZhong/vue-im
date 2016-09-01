<script>
  export default {
  }
</script>

<template>
  <div class="tab_bar">
    <div v-link="{ name: 'login' }" :class="{ active: $route.name === 'login' }">登录</div>
    <div v-link="{ name: 'register' }" :class="{ active: $route.name === 'register' }">注册</div>
  </div>
</template>

<style lang="scss" scoped>
  .tab_bar {
    flex: 0 0 2.5rem;
    border-bottom: 1px solid green;
    margin-bottom: .25rem;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    > div {
      background-color: green;
      flex: 1 1 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 1rem;
      opacity: .8;
      &:hover {
        opacity: 1;
      }
      &.active {
        opacity: 1;
      }
    }
  }
</style>