<script>
  import { rootRef, sessionTypes } from '../../../../shared/constants'
  import { getCurrentSession, getUid, getEnterContentMap } from '../../../../vuex/getters'
  import { updateEnterContent } from '../../../../vuex/actions/appActions'
  import { resolveSessionType } from '../../../../shared/utils'

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
      sendArbiter(e) {
        if (!e.ctrlKey && this.enterContent.length > 0) {
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
            rootRef
              .child(`groups/${this.currentSession}/session/${timestamp}`)
              .set(message, () => {
                this.enterContent = ''
              })
          }
        } else {
          this.enterContent += '\n'
        }
      },
    },
  }
</script>


<template>
  <div class="input_area">
    <textarea v-model="enterContent" @keyup.enter="sendArbiter"></textarea>
  </div>
</template>


<style lang="scss" scoped>
  div.input_area {
    flex: auto;
    display: flex;
    > textarea {
      flex: auto;
      padding: .5rem;
      background-color: inherit;
      font-size: 1.1rem;
      outline: none;
      border: none;
      resize: none;
    }
  }
</style>