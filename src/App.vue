<script>
import store from './vuex/store'

export default {
  store,
}
</script>


<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>


<style lang="scss">
  html {
    height: 100%;
    /*这里根元素字体大小设为125%（20px），而不是62.5%（10px），是为了
    避开谷歌浏览器的默认最小字体大小限制，同时使页面保持可缩放*/
    font-size: 125%;
    box-sizing: border-box;
    overflow-y: hidden;
    overflow-x: hidden;
    > body {
      margin: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Microsoft YaHei';
      line-height: 1.5;
      font-size: 0.8rem;
      background: url('./assets/bg.jpg') center center / cover no-repeat;
    }
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  /*@media (max-width: 1000px) {
    div.app {
      position: absolute;
      left: 0;
    }
  }*/
</style>