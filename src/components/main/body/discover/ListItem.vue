<script>
  import Avatar from '../../../../shared/components/Avatar.vue'
  import { rootRef } from '../../../../shared/constants'
  import { getUid, getFriends, getGroups } from '../../../../vuex/getters'

  export default {
    data() {
      return {
        isSent: false,
        showBox: false,
        content: '',
      }
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      info: {
        type: Object,
        required: true,
      },
      listType: {
        type: String,
        required: true,
      },
    },
    vuex: {
      getters: {
        uid: getUid,
        friends: getFriends,
        groups: getGroups,
      },
    },
    computed: {
      name() {
        if (this.listType === 'user') {
          return this.info.nickname || this.info.email
        } else if (this.listType === 'group') {
          return this.info.name
        }
        return ''
      },
      disabled() {
        if (this.uid === this.id
          || this.friends[this.id]
          || this.groups[this.id]) {
          return true
        } else if (this.isSent) {
          return true
        }
        return false
      },
      buttonContent() {
        if (this.isSent) {
          return '请求已发送'
        } else if (this.listType === 'user') {
          return '加为好友'
        } else if (this.listType === 'group') {
          return '申请加入'
        }
        return ''
      },
    },
    components: {
      Avatar,
    },
    methods: {
      sendRequest() {
        if (this.listType === 'user') {
          rootRef.child(`users/${this.id}/requests/${this.uid}`).set({
            timestamp: Date.now(),
            content: this.content,
          })
        } else if (this.listType === 'group') {
          rootRef.child(`groups/${this.id}/requests/${this.uid}`).set({
            gid: this.id,
            timestamp: Date.now(),
            content: this.content,
          })
        }
        this.isSent = true
        this.showBox = false
        return
      },
      popUpBox() {
        this.showBox = true
      },
    },
  }
</script>


<template>
  <div class="list_item">
    <div class="basic_box">
      <avatar :src="info.avatar" :username="name" size="4rem" margin=".4rem" border-radius=".4rem"></avatar>
      <div class="container">
        <span class="name">{{ name }}</span>
        <span class="desc">{{ info.desc }}</span>
      </div>
      <button @click.prevent="popUpBox" :disabled="disabled">{{ buttonContent }}</button>
    </div>
    <div class="request_box" v-if="showBox">
      <form action="" @submit.prevent="sendRequest">
        <input class="content" type="text" v-model="content" placeholder="描述你自己">
        <input class="submit" type="submit" value="发出请求">
      </form>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  div.list_item {
    flex: auto;
    > div.basic_box {
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      > div.container {
        flex: auto;
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        align-items: center;
        > span {
          &.name {
            font-size: 1.2rem;
          }
          &.desc {
            font-size: .8rem;
          }
        }
      }
      > button {
        padding: .7rem;
        border-radius: .5rem;
        font-size: 1rem;
        background-color: green;
        outline: none;
        opacity: .8;
        border: 1px solid transparent;
        &:hover {
          opacity: 1;
          cursor: pointer;
        }
        &[disabled] {
          opacity: .5;
          cursor: not-allowed;
        }
      }
    }
    > div.request_box {
      > form {
        margin: 1rem 0;
        display: flex;
        justify-content: center;
        > input {
          height: 2rem;
          outline: none;
          border: 1px solid green;
          &.content {
            border-radius: .5rem 0 0 .5rem;
            text-align: center;
            border-right: none;
          }
          &.submit {
            border-radius: 0 .5rem .5rem 0;
            border-left: none;
            cursor: pointer;
            background-color: #ddd;
            &:hover {
              background-color: #ccc;
            }
          }
        }
      }
    }
  }
</style>