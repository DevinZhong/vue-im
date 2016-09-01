<script>
  import { rootRef } from '../../../shared/constants'

  export default {
    data() {
      return {
        folded: true,
      }
    },
    methods: {
      unfold() {
        if (this.folded) {
          document.documentElement.addEventListener('click', this.handler, false)
        }
      },
      handler() {
        this.folded = !this.folded
        if (this.folded) {
          document.documentElement.removeEventListener('click', this.handler, false)
        }
      },
      quit() {
        rootRef.unauth()
        this.$router.go({ name: 'login' })
      },
    },
  }
</script>


<template>
  <div class="menu">
    <i class="material-icons" @click="unfold">menu</i>
    <div v-show="!folded" class="menu_list">
      <div v-link="{ name: 'discover' }" class="discover">
        <i class="material-icons">supervisor_account</i>
        <span>发现</span>
      </div>
      <div v-link="{ name: 'createGroup' }" class="create_group">
        <i class="material-icons">person_add</i>
        <span>建组</span>
      </div>
      <div @click="quit" class="logout">
        <i class="material-icons">exit_to_app</i>
        <span>退出</span>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .menu {
    flex: none;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    > i {
      font-size: 1.5rem;
      width: 100%;
      height: 100%;
      user-select: none;
    }
    > div.menu_list {
      position: absolute;
      top: 100%;
      right: 0;
      width: 5rem;
      background-color: #fff;
      color: #000;
      border-radius: .25rem;
      display: flex;
      flex-direction: column;
      > div {
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        padding: .2rem;
        &:hover {
          cursor: pointer;
          background-color: #eee;
        }
        > i {
          width: 1.6rem;
          height: 1.6rem;
          font-size: 1.6rem;
          user-select: none;
        }
        > span {
          flex: auto;
          text-align: center;
          user-select: none;
        }
      }
    }
  }
</style>