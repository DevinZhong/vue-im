<script>
  import ListItem from './ListItem'

  export default {
    props: {
      list: {
        type: Object,
        required: true,
      },
      listType: {
        type: String,
        required: true,
      },
    },
    components: {
      ListItem,
    },
    computed: {
      canShow() {
        return Object.keys(this.list).length > 0
      },
      title() {
        if (this.listType === 'user') {
          return '查找到的用户'
        } else if (this.listType === 'group') {
          return '查找到的群组'
        }
        return ''
      },
    },
  }
</script>


<template>
  <div v-if="canShow" class="list">
    <span class="title">{{ title }}</span>
    <div class="body">
      <list-item v-for="info in list" :id="$key" :info="info" :list-type="listType"></list-item>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.list {
    flex: auto;
    display: flex;
    flex-direction: column;
    > span.title {
      flex: 0 0 2rem;
      background-color: #bbb;
      text-align: center;
      line-height: 2rem;
      font-size: 1.2rem;
    }
    > div.body {
      flex: auto;
    }
  }
</style>