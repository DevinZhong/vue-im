<script>
  import {
    getGroups,
    getGroupBaseInfoMap,
    getCurrentGroup,
    getFilter,
  } from '../../../vuex/getters'
  import { selectGroup } from '../../../vuex/actions/appActions'
  import Avatar from '../../../shared/components/Avatar.vue'
  import { infoTypes, listTypes } from '../../../shared/constants'
  import { generateSimpleMapIndex } from '../../../shared/utils'

  export default {
    components: {
      Avatar,
    },
    vuex: {
      getters: {
        groups: getGroups,
        groupBaseInfoMap: getGroupBaseInfoMap,
        currentGroup: getCurrentGroup,
        filter: getFilter,
      },
      actions: {
        selectGroup,
      },
    },
    computed: {
      groupMap() {
        const groupMap = {}
        for (const gid of Object.keys(this.groups)) {
          const group = Object.assign({}, this.groups[gid], this.groupBaseInfoMap[gid])
          groupMap[gid] = group
        }
        return groupMap
      },
      groupMapIndex() {
        return generateSimpleMapIndex(this.groupMap, listTypes.GROUP_LIST)
      },
    },
    filters: {
      search(index) {
        return index.filter(gid => (this.groupMap[gid].name || '').indexOf(this.filter) > -1)
      },
    },
    methods: {
      select(gid) {
        this.selectGroup(gid)
        this.$router.go({ name: infoTypes.GROUP_INFO })
      },
    },
  }
</script>

<template>
  <div class="group_list">
    <div v-for="gid of groupMapIndex | search" class="group" @click="select(gid)" :class="{ active: currentGroup === gid }">
      <avatar :src="groupMap[gid].avatar" :username="groupMap[gid].name"></avatar>
      <span class="name">{{ groupMap[gid].name }}</span>
      <i class="ext material-icons">{{ groupMap[gid].shielded ? 'notifications_off' : 'notifications_none' }}</i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div.group_list {
    display: flex;
    flex-direction: column;
    > div.group {
      display: flex;
      align-items: center;
      padding: .25rem 1rem;
      cursor: pointer;
      > span.name {
        margin-left: .5rem;
        flex: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > i.ext.material-icons {
        width: 1rem;
        height: 1rem;
        font-size: 1rem;
        color: #696C70;
      }
      &.active {
        background-color: #3A3F45;
        > i.ext.material-icons {
          color: #F4F4F4;
        }
      }
    }
  }
</style>