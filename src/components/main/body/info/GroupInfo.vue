<script>
  import {
    getUid,
    getGroupBaseInfoMap,
    getCurrentGroup,
  } from '../../../../vuex/getters'
  import { rootRef } from '../../../../shared/constants'

  export default {
    data() {
      return {
        userId: '',
      }
    },
    vuex: {
      getters: {
        uid: getUid,
        groupBaseInfoMap: getGroupBaseInfoMap,
        currentGroup: getCurrentGroup,
      },
    },
    computed: {
      isAdmin() {
        const baseInfo = this.groupBaseInfoMap[this.currentGroup]
        if (!baseInfo) {
          return false
        }
        return baseInfo.creatorId === this.uid
      },
    },
    methods: {
      sendInvitation() {
        if (!this.isAdmin) {
          return
        }
        rootRef.child(`users/${this.userId}/invitations/${this.currentGroup}`).set({
          uid: this.uid,
          timestamp: Date.now(),
          content: '',
        })
      },
    },
  }
</script>


<template>
  <div class="group_info">
    <div class="invitation_box" v-if="isAdmin">
      <form action="" @submit.prevent="sendInvitation">
        <input class="userId" type="text" v-model="userId" placeholder="用户ID">
        <input class="submit" type="submit" value="发出邀请">
      </form>
    </div>
    <div class="tag">
      <button v-link="{ name: 'groupBaseInfo' }" :disabled="$route.name === 'groupBaseInfo'">基本信息</button>
      <button v-link="{ name: 'groupMemberList' }" :disabled="$route.name === 'groupMemberList'">成员详情</button>
    </div>
    <router-view :is-admin="isAdmin"></router-view>
  </div>
</template>


<style lang="scss" scoped>
  div.group_info {
    flex: auto;
    display: flex;
    flex-direction: column;
    > div.invitation_box {
      > form {
        margin: 1rem 0;
        display: flex;
        justify-content: center;
        > input {
          height: 2rem;
          outline: none;
          border: 1px solid green;
          &.userId {
            min-width: 14rem;
            border-radius: .5rem 0 0 .5rem;
            text-align: center;
            border-right: none;
          }
          &.submit {
            border-radius: 0 .5rem .5rem 0;
            border-left: none;
            cursor: pointer;
            background-color: #ddd;
            &:hover {
              background-color: #ccc;
            }
          }
        }
      }
    }
    div.tag {
      align-self: flex-end;
      margin: .3rem 1rem;
      > button {
        margin: .1rem;
        color: #fff;
        font-size: .8rem;
        line-height: 1.3rem;
        background-color: #42AC3E;
        outline: none;
        border: none;
        border-radius: .3rem;
        cursor: pointer;
        &[disabled] {
          opacity: .5;
          cursor: not-allowed;
        }
      }
    }
  }
</style>