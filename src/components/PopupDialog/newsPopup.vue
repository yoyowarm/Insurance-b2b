<template>
  <div class="popup" ref="modal" :class="{'open':value }">
    <div class="dialog">
      <div class="header">
        <span class="date">發布日期 {{lanuchDate}}</span>
        <h2>
          {{headerText}}
        </h2>
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
    },
    lanuchDate: {
      type: String,
      default: ''
    },
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
    top: 8%;
    left: 0;
    right:0;
    margin: 0 auto;
    max-width: 80%;
    width: 80%;
    height: 87%;
    z-index: 100;
    @apply bg-white rounded-2xl;
    .header {
      .date {
        @apply text-gray-600 text-sm;
      }
      @apply relative w-full rounded-t-2xl p-4 pb-2 text-gray-800 text-lg;
    }
    .icon {
      width: 29px;
      height: 29px;
      border-radius: 50px;
      @apply absolute inset-y-0 -top-30 my-auto right-0 text-3xl text-white cursor-pointer bg-main;
    }
    .body {
      overflow-y: auto;
      max-height: 60vh;
      @apply  p-6 pt-2 text-gray-500
    }
  }
  .mask-bg {
    @apply inset-0 bg-black opacity-75 w-screen h-screen z-20 overflow-hidden fixed
  }
  svg {
    margin-bottom: 10px;
  }
  @media (max-width: 770px) {
    .dialog {
      width: 90%;
      @apply bg-white rounded-2xl;

    }
  }
</style>