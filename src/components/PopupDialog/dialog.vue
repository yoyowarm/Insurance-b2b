<template>
  <div class="popup" ref="modal" :class="{'open':open, }">
    <div class="dialog" :class="{'fullScreen':fullScreen}">
      <div class="header">{{headerText}}
        <div class="icon"  @click="() =>{$emit('cancel');$emit('update:open', false)}">
          <font-awesome-icon icon="times-circle" />
        </div>
      </div>
      <div class="body" :class="{ minHeight }"><slot/></div>
      <div v-if="confirm" class="flex w-full justify-around py-4">
        <Button outline @click.native="()=>{$emit('cancel');$emit('update:open', false)}">{{cancel}}</Button>
        <Button @click.native="() => {$emit('ok'); $emit('update:open', false)}">{{ok}}</Button>
      </div>
    </div>
    <div class="mask-bg" @click="() =>{ if (maskClose) {$emit('cancel');$emit('update:open', false)}}"/>
  </div>
</template>

<script>
import Button from '@/components/Button'
export default {
  components: {
    Button
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: ''
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: false
    },
    ok: {
      type: String,
      default: 'ok'
    },
    cancel: {
      type: String,
      default: 'cancel'
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Boolean,
      default: false
    }
  },
   data () {
    return {
      value: false
    }
  },
  watch: {
    open(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  methods: {
    show () {
      this.value = true
    }
  }
}
</script>

<style scoped lang="scss">
  .popup {
    @apply hidden relative;
    &.open {
      @apply block;
    }
  }
  .dialog {
    position: fixed;
    top: 10%;
    left: 0;
    right:0;
    margin: 0 auto;
    max-width: 640px;
    width: 100%;
    z-index: 100;
    overflow: hidden;
    @apply bg-white rounded-2xl;
    &.fullScreen {
      top: 5%;
      max-width: 80%;
      width: 80%;
      height: auto;
      overflow: hidden;
      .body {
        overflow-y: scroll;
        max-height: 100vh;
        
      }
      
    }
    .header {
      height: 50px;
      @apply flex items-center justify-center relative bg-main w-full rounded-t-2xl text-white text-lg;
    }
    .icon {
      @apply absolute inset-y-0 my-auto right-0 mr-3 text-3xl cursor-pointer;
    }
    .body {
      overflow-y: hidden;
      max-height: 70vh;
      @apply  p-6;
      &.minHeight {
        height: 70vh;
      }
    }
  }
  .mask-bg {
    @apply inset-0 bg-black opacity-75 w-screen h-screen z-20 overflow-hidden fixed
  }

  @media (max-width: 770px) {
    .dialog {
      width: 80%;
      top:10%;
      max-height: 80vh;
      @apply bg-white rounded-2xl;

    }
  }
</style>