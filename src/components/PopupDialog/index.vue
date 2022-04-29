<template>
  <div class="popup" ref="modal" :class="{'open':value }">
    <div class="dialog">
      <div class="header">{{headerText}}
        <div class="icon" @click="$emit('ok')">
          <font-awesome-icon icon="times-circle" />
        </div>
      </div>
      <div v-if="hasHtml" class="body" v-html="htmlText">{{htmlText}}</div>
      <div v-else class="body"><slot/></div>
    </div>
    <div class="mask-bg" @click="$emit('ok')"/>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: ''
    },
    hasHtml: {
      type: Boolean,
      default: false
    },
    htmlText: {
      type: String,
      default: ''
    }
  },
   data () {
    return {
      value: false
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
    top: 20%;
    left: 0;
    right:0;
    margin: 0 auto;
    max-width: 640px;
    width: 100%;
    z-index: 100;
    @apply bg-white rounded-2xl;
    .header {
      height: 50px;
      @apply flex items-center justify-center relative bg-main w-full rounded-t-2xl text-white text-lg;
    }
    .icon {
      @apply absolute inset-y-0 my-auto right-0 mr-3 text-3xl cursor-pointer;
    }
    .body {
      overflow: scroll;
      max-height: 60vh;
      @apply  p-6
    }
  }
  .mask-bg {
    @apply inset-0 bg-black opacity-75 w-screen h-screen z-20 overflow-hidden fixed
  }

  @media (max-width: 770px) {
    .dialog {
      width: 90%;
      @apply bg-white rounded-2xl;

    }
  }
</style>