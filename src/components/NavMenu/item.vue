<template>
  <div class="menu-item" :class="{active, disabled, rotate, bigItem}">
    {{text}}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rotate: {
      type: Boolean,
      default: false
    },
    bigItem: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped lang="scss">
  .menu-item {
    width: 107px;
    height: 38px;
    @apply flex justify-center items-center bg-white rounded-t-lg border-gray-300 border-2 border-b-0 text-gray-400 mr-2 cursor-pointer;
    &.active {
      @apply text-white rounded-t-lg bg-main border-0 cursor-default;
    }
    &.disabled {
      @apply text-gray-200 cursor-not-allowed;
    }
    &.bigItem {
      width: auto;
      min-width: 107px
    }
  }
  @media (min-width: 601px) and (max-width:950px) {
    .menu-item {
      width: 80px;

    }
  }
  @media screen and (max-width: 600px) {
  .menu-item.rotate{
    width: 55px;
    height: 85px;
    margin-top: 0;
    padding: 5px;
    padding-left: 10px;
    text-align: center;
    margin-bottom: 7px;
    border-radius: 10px 0px 0px 10px;
    border-right: 0px;
    @apply border-b-2;
    &.active {
      border-radius: 10px 0px 0px 10px;
    }
    &.bigItem {
      width: 55px;
      height: 85px;
      min-width:auto
    }
  }
}
</style>