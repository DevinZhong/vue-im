/**
 * @ignore  =====================================================================================
 * @fileoverview vue-router配置脚本，导出路由模块
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-31
 * @ignore  =====================================================================================
 */


import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from './components/Auth.vue'
import LoginPanel from './components/auth/LoginPanel.vue'
import RegisterPanel from './components/auth/RegisterPanel.vue'

import Main from './components/Main.vue'

import Session from './components/main/body/Session.vue'
import MessageSession from './components/main/body/session/MessageSession.vue'
import RelationshipSession from './components/main/body/session/RelationshipSession.vue'

import Info from './components/main/body/Info.vue'
import UserInfo from './components/main/body/info/UserInfo.vue'
import FriendInfo from './components/main/body/info/FriendInfo.vue'
import GroupInfo from './components/main/body/info/GroupInfo.vue'
import GroupBaseInfo from './components/main/body/info/GroupBaseInfo.vue'
import GroupMemberList from './components/main/body/info/GroupMemberList.vue'

import Discover from './components/main/body/Discover.vue'

import CreateGroup from './components/main/body/CreateGroup.vue'

import { infoTypes } from './shared/constants'


// 使用vue-router
Vue.use(VueRouter)

const router = new VueRouter()


/**
 * 配置路由
 */
router.map({
  // 应用主页面
  '/main': {
    component: Main,
    subRoutes: {
      // 会话模块
      '/session': {
        component: Session,
        subRoutes: {
          // 消息会话模块
          '/messageSession': {
            name: 'messageSession',
            component: MessageSession,
          },

          // 关系会话模块
          '/relationshipSession': {
            name: 'relationshipSession',
            component: RelationshipSession,
          },
        },
      },

      // 信息详情模块
      '/info': {
        component: Info,
        subRoutes: {
          // 好友详情模块
          '/friendInfo': {
            name: infoTypes.FRIEND_INFO,
            component: FriendInfo,
          },
          // 群组详情模块
          '/groupInfo': {
            name: infoTypes.GROUP_INFO,
            component: GroupInfo,
            subRoutes: {
              // 默认显示群组基本信息
              '/': {
                name: 'groupBaseInfo',
                component: GroupBaseInfo,
              },
              // 群组基本信息
              '/baseInfo': {
                name: 'groupBaseInfo',
                component: GroupBaseInfo,
              },
              // 群组成员列表
              '/memberList': {
                name: 'groupMemberList',
                component: GroupMemberList,
              },
            },
          },
          // 用户详情模块
          '/userInfo': {
            name: infoTypes.USER_INFO,
            component: UserInfo,
          },
        },
      },

      /**
       * 发现模块
       */
      '/discover': {
        name: 'discover',
        component: Discover,
      },

      /**
       * 建立群组模块
       */
      '/createGroup': {
        name: 'createGroup',
        component: CreateGroup,
      },
    },
  },

  // 认证模块
  '/auth': {
    component: Auth,
    subRoutes: {
      // 默认跳转到登录模块
      '/': {
        name: 'login',
        component: LoginPanel,
      },
      // 登录模块
      '/login': {
        name: 'login',
        component: LoginPanel,
      },
      // 注册模块
      '/register': {
        name: 'register',
        component: RegisterPanel,
      },
    },
  },
})


/**
 * 配置路由重定向，默认跳转到应用页面，将所有非法路径访问重定向到认证模块
 */
router.redirect({
  '/': '/main',
  '*': '/auth',
})


/**
 * 导出路由模块
 */
export default router
