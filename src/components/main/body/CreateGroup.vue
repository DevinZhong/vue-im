<script>
  import TitleBar from '../../../shared/components/TitleBar.vue'
  import Avatar from '../../../shared/components/Avatar.vue'
  import { rootRef, infoTypes } from '../../../shared/constants'
  import { getUid } from '../../../vuex/getters'
  import { selectGroup } from '../../../vuex/actions/appActions'

  export default {
    data() {
      return {
        avatar: '',
        name: '',
        desc: '',
      }
    },
    vuex: {
      getters: {
        uid: getUid,
      },
      actions: {
        selectGroup,
      },
    },
    components: {
      TitleBar,
      Avatar,
    },
    methods: {
      changeAvatar(e) {
        try {
          const file = e.target.files[0]
          if (!/image\/\w+/.test(file.type)) {
            return
          }
          const reader = new FileReader()
          reader.onload = () => {
            this.avatar = reader.result
          }
          reader.readAsDataURL(file)
        } catch (ex) {
          return
        }
      },
      confirm() {
        const gid = `${this.uid}(${Date.now()})`
        const timestamp = Date.now()
        rootRef.child(`public/baseInfo/groups/${gid}`).set({
          name: this.name,
          creatorId: this.uid,
          desc: this.desc,
          avatar: this.avatar,
        }, (err) => {
          if (err) {
            this.$els.footer.innerHTML = '错误：请确保头像小于1MB'
            return
          }
          rootRef.child(`groups/${gid}/members/${this.uid}`).set({
            joinTime: timestamp,
            shielded: false,
          }, () => {
            rootRef.child(`users/${this.uid}/groups/${gid}`).set({
              shielded: false,
              checkTime: timestamp,
            }, () => {
              this.selectGroup(gid)
              this.$router.go({ name: infoTypes.GROUP_INFO })
            })
          })
        })
      },
    },
  }
</script>


<template>
  <div class="create_group">
    <title-bar title="建立群组"></title-bar>
    <div class="body">
      <div class="name">
        <label>组名</label>
        <input v-model="name" type="text">
      </div>
      <div class="avatar">
        <avatar :src="avatar" size="8rem" :username="name" margin=".4rem" border-radius=".4rem"></avatar>
        <input v-el:file type="file" @change="changeAvatar">
        <button @click="$els.file.click()">更改头像</button>
      </div>
      <div class="desc">
        <textarea v-model="desc" cols="30" rows="10" placeholder="群组描述"></textarea>
      </div>
      <div class="create">
        <button @click="confirm">创建</button>
      </div>
    </div>
    <footer v-el:footer></footer>
  </div>
</template>


<style lang="scss" scoped>
  div.create_group {
    flex: auto;
    display: flex;
    flex-direction: column;
    > div.body {
      margin-top: 1rem;
      flex: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      > div {
        &.name {
          > label {
            font-size: 1rem;
          }
          > input {
            font-size: 1rem;
            line-height: 1.3rem;
            padding-left: 1rem;
            width: 10rem;
            border-radius: .2rem;
            border: 1px solid #42AC3E;
            outline: none;
          }
        }
        &.avatar {
          margin: .8rem;
          display: flex;
          align-items: flex-end;
          > input {
            display: none;
          }
          > button {
            margin: .4rem .6rem;
            padding: .2rem;
            border-radius: .3rem;
            font-size: .6rem;
            background-color: #42AC3E;
            outline: none;
            opacity: .8;
            border: 1px solid transparent;
            &:hover {
              opacity: 1;
              cursor: pointer;
            }
          }
        }
        &.desc {
          > textarea {
            padding: .5rem;
            font-size: 1.2rem;
            border-radius: .5rem;
            outline: none;
            resize: none;
          }
        }
        &.create {
          > button {
            padding: .5rem .7rem;
            border-radius: .5rem;
            font-size: 1rem;
            background-color: #42AC3E;
            outline: none;
            opacity: .8;
            border: 1px solid transparent;
            &:hover {
              opacity: 1;
              cursor: pointer;
            }
          }
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