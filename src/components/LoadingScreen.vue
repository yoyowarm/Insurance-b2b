<template>
  <div class="popup" :class="{'open':isLoading }">
    <div class="loader loader--style2" title="1">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="60px" height="60px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"/>
        </path>
      </svg>
      <div class="text-white mt-2">資料加載中...</div>
    </div>
    <div class="mask-bg" @click="$emit('update:open', true)"/>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
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
  .mask-bg {
    @apply inset-0 bg-black opacity-75 w-screen h-screen z-20 overflow-hidden fixed
  }
  svg path,
  svg rect{
    fill: #B3112C;
  }
  .loader{
    margin: 0 auto;
    height: 100px;
    width: 100px;
    text-align: center;
    vertical-align: top;
    position: fixed;
    z-index: 999;
    top: 30%;
    left: 0;
    right: 0;
    @apply flex flex-col items-center justify-center;
  }
</style>