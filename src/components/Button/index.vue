<template>
  <button class="button" :class="{outline,disabled}"><slot/></button>
</template>

<script>
export default {
  props: {
    outline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="scss">
.button {
  @apply flex items-center justify-center px-4 py-2 rounded-full text-white bg-main;
  &.disabled {
    @apply cursor-not-allowed bg-gray-300 pointer-events-none;
  }
}
.outline {
  @apply border-2 border-main text-main bg-white font-bold;
  &.disabled {
    @apply cursor-not-allowed border-gray-300 text-gray-300 bg-white pointer-events-none;
  }
}

</style>
