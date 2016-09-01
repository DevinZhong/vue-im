<script>
  import Avatar from '../../../../shared/components/Avatar.vue'
  import { getUid, getUserBaseInfoMap } from '../../../../vuex/getters'
  import { rootRef } from '../../../../shared/constants'
  import moment from 'moment'

  export default {
    components: {
      Avatar,
    },
    vuex: {
      getters: {
        uid: getUid,
        userBaseInfoMap: getUserBaseInfoMap,
      },
    },
    computed: {
      userInfo() {
        return this.userBaseInfoMap[this.uid] || {}
      },
      dateOfBirth() {
        return moment(this.userInfo.dateOfBirth).format('YYYY-MM-DD')
      },
    },
    methods: {
      updateAvatar(e) {
        try {
          const file = e.target.files[0]
          if (!/image\/\w+/.test(file.type)) {
            return
          }
          const reader = new FileReader()
          reader.onload = () => {
            const avatar = reader.result
            rootRef.child(`public/baseInfo/users/${this.uid}`).update({
              avatar,
            }, (err) => {
              if (err) {
                this.$els.footer.innerHTML = '错误：请确保头像小于1MB'
              }
            })
          }
          reader.readAsDataURL(file)
        } catch (ex) {
          return
        }
      },
      updateNickname(e) {
        rootRef.child(`public/baseInfo/users/${this.uid}`).update({
          nickname: e.target.value,
        })
      },
      updateDesc(e) {
        rootRef.child(`public/baseInfo/users/${this.uid}`).update({
          desc: e.target.value,
        })
      },
      updateDateOfBirth(e) {
        rootRef.child(`public/baseInfo/users/${this.uid}`).update({
          dateOfBirth: +moment(e.target.value),
        })
      },
      updateGender(e) {
        rootRef.child(`public/baseInfo/users/${this.uid}`).update({
          gender: e.target.value,
        })
      },
      updateCity(e) {
        rootRef.child(`public/baseInfo/users/${this.uid}`).update({
          city: e.target.value,
        })
      },
    },
  }
</script>

<template>
  <div class="user_info">
    <div class="body">
      <div class="avatar" @click="$els.file.click()">
        <input v-el:file type="file" @change="updateAvatar" accept="image/png,image/jpeg,image/gif" style="display:none;">
        <avatar :src="userInfo.avatar || ''" size="5rem" margin=".4rem" border-radius=".4rem" :username="userInfo.email"></avatar>
      </div>
      <span class="email">{{ userInfo.email }}</span>
      <input class="nickname" :value="userInfo.nickname" @blur="updateNickname" placeholder="昵称">
      <input class="desc" :value="userInfo.desc" @blur="updateDesc" placeholder="个性签名">
      <input class="date_of_birth" :value="dateOfBirth" @blur="updateDateOfBirth" type="date">
      <input class="gender" :value="userInfo.gender" @blur="updateGender" placeholder="性别">
      <input class="city" :value="userInfo.city" @blur="updateCity" placeholder="城市">
    </div>
    <footer v-el:footer></footer>
  </div>
</template>

<style lang="scss" scoped>
  div.user_info {
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div.body {
      flex: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      > div.avatar {
        margin: 2rem 0 1rem;
        cursor: pointer;
      }
      > span.email {
        margin-bottom: .5rem;
        color: #888;
        font-size: .6rem;
      }
      > input {
        background-color: transparent;
        border: none;
        outline: none;
        text-align: center;
        font-size: 1rem;
        line-height: 1.5rem;
        &.date_of_birth {
          margin-left: 3rem;
        }
      }
    }
    > footer {
      align-self: flex-end;
      padding: 0 .4rem;
      background-color: red;
      color: #fff;
    }
  }
</style>