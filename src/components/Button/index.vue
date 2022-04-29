<template>
  <button class="button" :class="{outline}"><slot/></button>
</template>

<script>
export default {
  props: {
    outline: {
      type: Boolean,
      default: false
    },
  }
}
</script>
<style scoped lang="postcss">
.button {
  @apply flex items-center justify-center px-4 py-2 rounded-full text-white bg-main;
}
.outline {
  @apply border-2 border-main text-main bg-white font-bold;
}
</style>
