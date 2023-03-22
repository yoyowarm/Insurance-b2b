<template>
  <PopupDialog
    :open.sync="openDialog"
    headerText="報價討論版"
    :maskClose="false"
    minHeight
    @cancel="() => { openDialog = false }"
  > 
    <div class="relative pb-14 overflow-y-auto messageContent" ref="messageContent" @wheel="scrolledToBottom" @scroll="scrolling">
      <div class="commentItem" v-for="(i,index) in messageList" :key="index">
        <div class="flex flex-row items-center mb-2">
          <p>{{ i.eMployeeName }}({{ i.employeeId }})</p>
          <p class="text-xs text-gray-500 pl-2">{{ i.messageTime.replace('T', ' ').split('.')[0] }}</p>
        </div>
        <p>{{ i.content }}</p>
        
      </div>
      <div v-if="messageList.length === 0" class="text-gray-400 pointer-events-none">目前無最新留言</div>
      <div ref="scrollToView"/>
    </div>
    <div class="footer">
      <div v-if="hasNewMessages && messageList.length > 0" @click="scrollBottom" class="text-gray-800 bg-gray-300 w-40 p-2 absolute z-20 text-center rounded-xl -top-12 m-auto left-0 right-0 cursor-pointer">有新訊息，滑到底部</div>
      <Input :value="message" @updateValue="e => message = e" @enterInput="sendMessage" :maxLength="2000" class="w-full" placeholder="在此輸入您的留言...限制字數2000字以內"/>
      <div @click="sendMessage" class="send">
        <img src="../../assets/images/send.svg" >
      </div>
    </div>
  </PopupDialog>
</template>

<script>
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import Input from '@/components/InputGroup/Input.vue'
import { mapState } from 'vuex'
export default {
  components: {
    PopupDialog,
    Input
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    messageList: {
      type: Array,
      default: () => []
    },
    mainOrderNo: {
      type: String,
      default: ''
    },
    quotationPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      message:'',
      scrollBottomed: true,
      hasNewMessages: false,
    }
  },
  computed: {
    openDialog: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('update:open', val)
      }
    },
    ...mapState({
      userInfo: state => state.home.userInfo,
    })
  },
  watch: {
    messageList (val) {
      if(val.length > 0 && !this.scrollBottomed) {
        this.hasNewMessages = true
      }
      if (this.scrollBottomed) {
        this.$nextTick(() => {
          this.scrollBottom()
        })
      }
    },
    open(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
      if(val) {
        this.$nextTick(() => {
          this.scrollBottom()
        })
      }
    }
  },
  methods: {
    async sendMessage() {
      if(this.message === '') return
      if(!this.quotationPage || this.mainOrderNo !== '') {
        await this.$store.dispatch('common/addCountents', {
          mainOrderNo: this.mainOrderNo,
          newMessageContents: [
            {content: this.message}
          ]
        })
        this.$emit('updatedMessage')
      }
      const arr = JSON.parse(JSON.stringify(this.messageList))
      arr.push({
        employeeId: this.userInfo.userid,
        eMployeeName: this.userInfo.sub,
        messageTime: new Date().toISOString(),
        content: this.message
      })
      this.$store.dispatch('common/updatedChatMessage', arr)
      this.message = ''
    },
    scrollBottom() {
      this.$refs.messageContent.scrollTo({
        top: this.$refs.messageContent.scrollHeight - this.$refs.messageContent.clientHeight,
        behavior: "smooth"
      } )
      this.scrollBottomed = true
      this.hasNewMessages = false
    },
    scrolledToBottom() {
      let messages = this.$refs.messageContent
      if (!messages) return false
      if (messages.scrollTop + messages.clientHeight !== messages.scrollHeight) {
        this.scrollBottomed = false
      } else this.scrollBottomed = true
    },
    scrolling() {
      let messages = this.$refs.messageContent
      if (!messages) return
      if (this.scrollBottomed) return
      this.hasNewMessages = false
      this.unread = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  @apply flex justify-end items-center absolute bottom-0 right-0 w-full h-16 px-4 bg-white rounded-b-2xl border-t-2;
}

.messageContent {
  max-height: 65vh;
  height: 65vh
}
.commentItem {
  @apply border-dotted border-b-2 py-3
}
.send {
  width: 40px;
  height: 40px;
  background-color: #B3112C;
  @apply flex justify-center items-center rounded-full p-2 cursor-pointer;
}
</style>