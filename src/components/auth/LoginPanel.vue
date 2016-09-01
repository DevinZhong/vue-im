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
        rootRef.authWithPassword({
          email: this.email,
          password: this.password,
        }, (err, authData) => {
          if (!err) {
            this.initApp(authData.uid)
            // 登录成功后跳转到主页面
            this.$router.go('/main')
          }
        })
      },
    },
  }
</script>

<template>
  <div class="login_panel">
    <form action="" @submit.prevent="submit">
      <input-box :content.sync="email" input-type="email" hint="请输入注册邮箱"></input-box>
      <input-box :content.sync="password" input-type="password" hint="请输入密码"></input-box>
      <button-box input-type="submit" input-value="登录"></button-box>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .login_panel {
    display: flex;
    flex-direction: column;
  }
</style>