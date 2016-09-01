<script>
  import TitleBar from '../../../shared/components/TitleBar.vue'
  import SearchBar from './discover/SearchBar.vue'
  import List from './discover/List.vue'
  import { rootRef } from '../../../shared/constants'

  export default {
    data() {
      return {
        keyword: '',
        users: {},
        groups: {},
      }
    },
    components: {
      TitleBar,
      SearchBar,
      List,
    },
    methods: {
      search() {
        /**
         * 清空上一次的搜索结果
         */
        this.users = {}
        this.groups = {}

        // 因为后面将在用户节点上执行多次查询，将节点的引用保存
        const usersRef = rootRef.child('public/baseInfo/users')
        // 因为对搜索结果的回调处理方法是相同的，都是将添加到结果列表里，所以这里统一定义
        const addUser = snapshot => {
          this.users = Object.assign({}, this.users, {
            [snapshot.key()]: snapshot.val(),
          })
        }

        /**
         * 分别视关键字为用户ID、昵称、邮箱，进行三次精确查询
         * 注意这里不用担心结果重复，相同ID将相互覆盖
         */
        usersRef.orderByKey().equalTo(this.keyword).on('child_added', addUser)
        usersRef.orderByChild('nickname').equalTo(this.keyword).on('child_added', addUser)
        usersRef.orderByChild('email').equalTo(this.keyword).on('child_added', addUser)


        // 因为后面将在群组节点上执行多次查询，将节点的引用保存
        const groupsRef = rootRef.child('public/baseInfo/groups')
        // 因为对搜索结果的回调处理方法是相同的，都是将添加到结果列表里，所以这里统一定义
        const addGroup = snapshot => {
          this.groups = Object.assign({}, this.groups, {
            [snapshot.key()]: snapshot.val(),
          })
        }

        /**
         * 分别视关键字为群组ID、群组名、群组创建者ID进行三次精确查询
         * 注意这里不用担心结果重复，相同ID将相互覆盖
         */
        groupsRef.orderByKey().equalTo(this.keyword).on('child_added', addGroup)
        groupsRef.orderByChild('name').equalTo(this.keyword).on('child_added', addGroup)
        groupsRef.orderByChild('creatorId').equalTo(this.keyword).on('child_added', addGroup)
      },
    },
  }
</script>


<template>
  <div class="discover">
    <title-bar title="发现"></title-bar>
    <div class="body">
      <form action="" @submit.prevent="search">
        <search-bar :keyword.sync="keyword"></search-bar>
      </form>
      <list :list="users" list-type="user"></list>
      <list :list="groups" list-type="group"></list>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.discover {
    flex: auto;
    display: flex;
    flex-direction: column;
    > div.body {
      flex: auto;
      padding-bottom: 10rem;
      display: flex;
      flex-direction: column;
      > form {
        flex: none;
      }
    }
  }
</style>