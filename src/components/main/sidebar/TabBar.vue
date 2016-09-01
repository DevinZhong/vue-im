<script>
  import { getCurrentList } from '../../../vuex/getters'
  import { selectList } from '../../../vuex/actions/appActions'
  import { listTypes } from '../../../shared/constants'

  export default {
    data() {
      return {
        listTypes,
      }
    },
    vuex: {
      getters: {
        currentList: getCurrentList,
      },
      actions: {
        selectList,
      },
    },
    methods: {
      ifSelected(tag) {
        switch (tag) {
          case 'session':
            return this.currentList === listTypes.SESSION_LIST
          case 'friend':
            return this.currentList === listTypes.FRIEND_LIST
          case 'group':
            return this.currentList === listTypes.GROUP_LIST
          default:
            return false
        }
      },
    },
  }
</script>

<template>
  <div class="tab_bar">
    <i class="material-icons" :class="{ active: ifSelected('session') }" @click="selectList(listTypes.SESSION_LIST)">
      {{ ifSelected('session') ? 'chat_bubble' : 'chat_bubble_outline' }}
    </i>
    <i class="material-icons" :class="{ active: ifSelected('friend') }" @click="selectList(listTypes.FRIEND_LIST)">
      {{ ifSelected('friend') ? 'person' : 'person_outline' }}
    </i>
    <i class="material-icons" :class="{ active: ifSelected('group') }" @click="selectList(listTypes.GROUP_LIST)">
      {{ ifSelected('group') ? 'people' : 'people_outline' }}
    </i>
  </div>
</template>

<style lang="scss" scoped>
  .tab_bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    > i {
      margin: .5rem 0;
      font-size: 1.5rem;
      cursor: pointer;
      color: #CBCCCD;
      user-select: none;
      &.active {
        color: #3CAF36;
      }
    }
  }
</style>