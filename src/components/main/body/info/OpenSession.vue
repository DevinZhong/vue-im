<script>
  import { selectList, selectSession } from '../../../../vuex/actions/appActions'
  import { getCurrentFriend, getCurrentGroup, getCurrentList } from '../../../../vuex/getters'
  import { listTypes } from '../../../../shared/constants'

  export default {
    vuex: {
      getters: {
        currentFriend: getCurrentFriend,
        currentGroup: getCurrentGroup,
        currentList: getCurrentList,
      },
      actions: {
        selectList,
        selectSession,
      },
    },
    methods: {
      sessionStart() {
        if (this.currentList === listTypes.FRIEND_LIST) {
          this.selectSession(this.currentFriend, () => {
          })
        } else if (this.currentList === listTypes.GROUP_LIST) {
          this.selectSession(this.currentGroup, () => {
          })
        } else {
          return
        }
        this.$router.go({ name: 'messageSession' })
        this.selectList(listTypes.SESSION_LIST)
      },
    },
  }
</script>


<template>
  <div class="open_session">
    <button @click="sessionStart" class="sendMessage">发消息</button>
  </div>
</template>


<style lang="scss" scoped>
  button.sendMessage {
    margin-top: 2rem;
    width: 10rem;
    height: 2rem;
    text-align: center;
    color: #fff;
    font-size: .7rem;
    line-height: 2rem;
    background-color: #42AC3E;
    border: none;
    outline: none;
    border-radius: .2rem;
    cursor: pointer;
  }
</style>