<script>
/**
 * @ignore  =====================================================================================
 * @fileoverview 标题组件
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-26
 * @ignore  =====================================================================================
 */

  import { resolveSessionType } from '../utils'
  import { getGroupBaseInfoMap, getUserBaseInfoMap, getCurrentSession } from '../../vuex/getters'


  /**
   * 按会话类型分类的标题生成方案
   */
  const solutions = {
    FRIEND_REQUESTS() {
      return '好友请求'
    },
    GROUP_REQUESTS() {
      return '群组请求'
    },
    GROUP_SESSION() {
      return this.groupBaseInfoMap[this.currentSession].name
    },
    FRIEND_SESSION() {
      const info = this.userBaseInfoMap[this.currentSession]
      return info.note || info.nickname || info.email
    },
  }

  export default {
    props: {
      title: {
        type: String,
        required: false,
      },
    },
    vuex: {
      getters: {
        groupBaseInfoMap: getGroupBaseInfoMap,
        userBaseInfoMap: getUserBaseInfoMap,
        currentSession: getCurrentSession,
      },
    },
    computed: {
      // 计算标题内容
      content() {
        // 若父组件有传入title，直接使用
        if (this.title) {
          return this.title
        }

        // 解析会话类型
        const sessionType = resolveSessionType(this.currentSession)

        // 若会话类型解析结果为空，返回空串
        if (!sessionType) {
          return ''
        }

        // 使用对应的解决方案生成内容
        return solutions[sessionType].bind(this)()
      },
    },
  }
</script>


<template>
  <div class="title">
    <span>{{ content }}</span>
  </div>
</template>


<style lang="scss" scoped>
  div.title {
    flex: 0 0 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 2.5rem;
    border-bottom: 1px solid #d6d6d6;
    margin: 0 1rem;
  }
</style>