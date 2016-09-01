<script>
  import { rootRef, sessionTypes } from '../../../../shared/constants'
  import { resolveSessionType } from '../../../../shared/utils'
  import { getCurrentSession, getUid } from '../../../../vuex/getters'

  export default {
    vuex: {
      getters: {
        uid: getUid,
        currentSession: getCurrentSession,
      },
    },
    methods: {
      sendPic(e) {
        try {
          const file = e.target.files[0]
          if (!/image\/\w+/.test(file.type)) {
            return
          }
          const reader = new FileReader()
          reader.onload = () => {
            const message = {
              uid: this.uid,
              content: reader.result,
              isPicture: true,
            }
            const timestamp = Date.now()
            if (resolveSessionType(this.currentSession) === sessionTypes.FRIEND_SESSION) {
              rootRef
                .child(`users/${this.currentSession}/sessions/${this.uid}/${timestamp}`)
                .set(message, () => {
                  rootRef
                    .child(`users/${this.uid}/sessions/${this.currentSession}/${timestamp}`)
                    .set(message)
                })
            } else if (resolveSessionType(this.currentSession) === sessionTypes.GROUP_SESSION) {
              rootRef
                .child(`groups/${this.currentSession}/session/${timestamp}`)
                .set(message)
            }
            return
          }
          reader.readAsDataURL(file)
        } catch (ex) {
          return
        }
      },
    },
  }
</script>


<template>
  <div class="toolbar">
    <!--<div class="insert_emoticon">
      <i class="material-icons">insert_emoticon</i>
    </div>-->
    <div class="send_pic">
      <i class="material-icons" @click="$els.pic.click()">insert_photo</i>
      <input v-el:pic type="file" @change="sendPic" accept="image/png,image/jpeg,image/gif">
    </div>
    <!--<div class="send_file">
      <i class="material-icons">insert_drive_file</i>
    </div>-->
  </div>
</template>


<style lang="scss" scoped>
  div.toolbar {
    flex: 0 0 2rem;
    padding: 0 .3rem;
    display: flex;
    align-items: center;
    > div {
      margin: 0 .1rem;
      > input {
        display: none;
      }
      > i {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #4D4D4D;
      }
    }
  }
</style>