<script>
  import Avatar from '../../../../shared/components/Avatar.vue'
  import { getGroupBaseInfoMap, getCurrentGroup } from '../../../../vuex/getters'
  import OpenSession from './OpenSession.vue'

  export default {
    components: {
      Avatar,
      OpenSession,
    },
    vuex: {
      getters: {
        groupBaseInfoMap: getGroupBaseInfoMap,
        currentGroup: getCurrentGroup,
      },
    },
    computed: {
      baseInfo() {
        return this.groupBaseInfoMap[this.currentGroup] || {}
      },
    },
  }
</script>


<template>
  <div class="group_base_info">
    <div class="avatar">
      <avatar :src="baseInfo.avatar" size="5rem" :username="baseInfo.name" margin=".4rem" border-radius=".4rem"></avatar>
    </div>
    <span class="name">{{ baseInfo.name }}</span>
    <span class="desc">{{ baseInfo.desc }}</span>
    <open-session></open-session>
  </div>
</template>


<style lang="scss" scoped>
  div.group_base_info {
    flex: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      &.name {
        margin: .5rem;
        font-size: 1.2rem;
      }
      &.desc {
        font-size: .7rem;
      }
    }
  }
</style>