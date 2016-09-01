<script>
  import { rootRef, sessionTypes } from '../../../../shared/constants'
  import { getCurrentSession, getUid, getEnterContentMap } from '../../../../vuex/getters'
  import { resolveSessionType } from '../../../../shared/utils'
  import { updateEnterContent } from '../../../../vuex/actions/appActions'

  export default {
    vuex: {
      getters: {
        currentSession: getCurrentSession,
        uid: getUid,
        enterContentMap: getEnterContentMap,
      },
      actions: {
        updateEnterContent,
      },
    },
    computed: {
      enterContent: {
        get() {
          return this.enterContentMap[this.currentSession]
        },
        set(newValue) {
          this.updateEnterContent(newValue)
        },
      },
    },
    methods: {
      sendArbiter() {
        if (this.enterContent.length > 0) {
          const message = {
            uid: this.uid,
            isPicture: false,
            content: this.enterContent,
          }
          const timestamp = Date.now()
          if (resolveSessionType(this.currentSession) === sessionTypes.FRIEND_SESSION) {
            rootRef
              .child(`users/${this.currentSession}/sessions/${this.uid}/${timestamp}`)
              .set(message, () => {
                rootRef
                  .child(`users/${this.uid}/sessions/${this.currentSession}/${timestamp}`)
                  .set(message, () => {
                    this.enterContent = ''
                  })
              })
          } else if (resolveSessionType(this.currentSession) === sessionTypes.GROUP_SESSION) {
            rootRef.child(`groups/${this.currentSession}/session/${timestamp}`).set(message, () => {
              this.enterContent = ''
            })
          }
        }
      },
    },
  }
</script>


<template>
  <div class="action_bar">
    <span class="hint">按下Ctrl+Enter换行</span>
    <button @click="sendArbiter">发送</button>
  </div>
</template>


<style lang="scss" scoped>
  div.action_bar {
    flex: 0 0 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 .5rem;
    > span {
      color: #888;
      font-size: .6rem;
      margin-right: .4rem;
    }
    > button {
      border: 1px solid #c1c1c1;
      border-radius: .2rem;
      background-color: #fff;
      color: #222;
      padding: .15rem 1.5rem;
      font-size: .7rem;
      text-decoration: none;
      outline: none;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
    }
  }
</style>