<script>
  import Avatar from '../../../../shared/components/Avatar.vue'
  import {
    getUid,
    getGroupBaseInfoMap,
    getCurrentGroup,
    getUserBaseInfoMap,
  } from '../../../../vuex/getters'
  import { rootRef } from '../../../../shared/constants'
  import OpenSession from './OpenSession.vue'

  export default {
    props: {
      memberId: {
        type: String,
        required: true,
      },
      memberConfig: {
        type: Object,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
      },
    },
    components: {
      Avatar,
      OpenSession,
    },
    vuex: {
      getters: {
        uid: getUid,
        userBaseInfoMap: getUserBaseInfoMap,
        groupBaseInfoMap: getGroupBaseInfoMap,
        currentGroup: getCurrentGroup,
      },
    },
    computed: {
      baseInfo() {
        return this.userBaseInfoMap[this.memberId]
      },
      isSelf() {
        return this.memberId === this.uid
      },
    },
    methods: {
      focus(e) {
        if (!this.memberConfig.note) {
          e.target.innerHTML = ''
        }
      },
      updateNote(e) {
        try {
          // 如果备注信息没有改变，不用写后台
          if (e.target.innerHTML === this.memberConfig.note) {
            return
          }
          rootRef.child(`groups/${this.currentGroup}/members/${this.uid}/note`)
            .set(e.target.innerHTML)
        } finally {
          if (!e.target.innerHTML) {
            e.target.innerHTML = '空'
          }
        }
      },
      silence() {
        if (this.isSelf) {
          return
        }
        rootRef.child(`groups/${this.currentGroup}/members/${this.memberId}/shielded`)
          .set(!this.memberConfig.shielded)
      },
      kickOut() {
        if (this.isSelf) {
          return
        }
        rootRef.child(`users/${this.memberId}/groups/${this.currentGroup}`).set(null, () => {
          rootRef.child(`groups/${this.currentGroup}/members/${this.memberId}`).set(null)
        })
      },
    },
  }
</script>


<template>
  <div class="group_member">
    <div class="avatar">
      <avatar :src="baseInfo.avatar" size="3rem" :username="baseInfo.nickname || baseInfo.email" border-radius=".3rem" margin=".3rem"></avatar>
    </div>
    <span class="nickname">{{ baseInfo.nickname }}</span>
    <span class="email">{{ baseInfo.email }}</span>
    <span class="note" :class="{ empty: !memberConfig.note }" :contenteditable="isSelf" @blur="updateNote" @focus="focus">{{ memberConfig.note || '空' }}</span>
    <span class="status">{{ memberConfig.shielded ? '禁言' : '正常' }}</span>
    <div v-if="isAdmin" class="action">
      <button @click="silence" :disabled="isSelf">{{ memberConfig.shielded ? '解禁' : '禁言' }}</button>
      <button @click="kickOut" :disabled="isSelf">踢出</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.group_member {
    margin-top: .5rem;
    display: flex;
    border-bottom: 1px solid #777;
    > div.avatar {
      flex: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      &.nickname {
        flex: 6rem;
      }
      &.email {
        flex: 10rem;
      }
      &.note {
        flex: 5rem;
        &.empty {
          color: LightSlateGray;
        }
      }
      &.status {
        flex: 4rem;
      }
    }
    > div.action {
      flex: 6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > button {
        margin: .1rem;
        width: 3rem;
        color: #fff;
        font-size: .8rem;
        line-height: 1.3rem;
        background-color: red;
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