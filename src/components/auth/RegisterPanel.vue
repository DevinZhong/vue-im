<script>
  import InputBox from './input-bundle/InputBox.vue'
  import ButtonBox from './input-bundle/ButtonBox.vue'
  import { rootRef } from '../../shared/constants'
  import { initApp } from '../../vuex/actions/initActions'

  export default {
    data() {
      return {
        email: '',
        password: '',
        passwordRepeat: '',
      }
    },
    components: {
      InputBox,
      ButtonBox,
    },
    vuex: {
      actions: {
        initApp,
      },
    },
    methods: {
      submit() {
        // 登录前校验
        if (!this.password || this.password !== this.passwordRepeat) {
          return
        }
        // 创建用户
        rootRef.createUser({
          email: this.email,
          password: this.password,
        }, (createError) => {
          if (!createError) {
            // 新建用户成功则接着登录
            rootRef.authWithPassword({
              email: this.email,
              password: this.password,
            }, (authError, authData) => {
              if (!authError) {
                // 登录成功后写入用户基本信息
                rootRef.child(`public/baseInfo/users/${authData.uid}`).set({
                  email: this.email,
                  nickname: '',
                  desc: '这家伙很懒，啥也没留下',
                  gender: '保密',
                  dateOfBirth: 0,
                  city: '',
                  avatar: '',
                }, (writeError) => {
                  if (!writeError) {
                    // 信息写入成功后跳转到主页面
                    this.$router.go('/main')
                  }
                })
              }
            })
          }
        })
      },
    },
  }
</script>

<template>
  <div class="register_panel">
    <form action="" @submit.prevent="submit">
      <input-box :content.sync="email" input-type="email" hint="请输入您的邮箱"></input-box>
      <input-box :content.sync="password" input-type="password" hint="请输入您的密码"></input-box>
      <input-box :content.sync="passwordRepeat" input-type="password" hint="请确认您的密码"></input-box>
      <button-box input-type="submit" input-value="注册"></button-box>
    </form>

  </div>
</template>

<style lang="scss" scoped>
  .register_panel {
    display: flex;
    flex-direction: column;
  }
</style>