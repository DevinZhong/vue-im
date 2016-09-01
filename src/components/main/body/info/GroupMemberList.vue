<script>
  import { getCurrentGroup, getGroupDetails } from '../../../../vuex/getters'
  import GroupMember from './GroupMember.vue'

  export default {
    props: {
      isAdmin: {
        type: Boolean,
        required: true,
      },
    },
    components: {
      GroupMember,
    },
    vuex: {
      getters: {
        groupDetails: getGroupDetails,
        currentGroup: getCurrentGroup,
      },
    },
    computed: {
      members() {
        if (this.groupDetails[this.currentGroup]) {
          return this.groupDetails[this.currentGroup].members
        }
        return {}
      },
    },
  }
</script>


<template>
  <div class="group_member_list">
    <header>
      <span class="avatar">头像</span>
      <span class="nickname">昵称</span>
      <span class="email">邮箱</span>
      <span class="note">备注</span>
      <span class="status">状态</span>
      <span v-if="isAdmin" class="action">操作</span>
    </header>
    <div class="body">
      <group-member v-for="member in members" :member-config="member" :member-id="$key" :is-admin="isAdmin"></group-member>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.group_member_list {
    flex: auto;
    display: flex;
    flex-direction: column;
    > header {
      display: flex;
      margin-top: .5rem;
      border-bottom: 1px solid #777;
      > span {
        text-align: center;
        &.avatar {
          flex: 5rem;
        }
        &.nickname {
          flex: 6rem;
        }
        &.email {
          flex: 10rem;
        }
        &.note {
          flex: 5rem;
        }
        &.status {
          flex: 4rem;
        }
        &.action {
          flex: 6rem;
        }
      }
    }
  }
</style>