<template>
  <div class="table-head bg-main-gray" :class="{scrollX, 'overflow-x-auto': scrollX}">
      <template v-for="(item, index) in head">
        <div :key="index" :class="`w-${item.size}`">
          {{item.text}}
        </div>
      </template>
  </div>
</template>

<script>
export default {
  props: {
    head: {
      type: Array,
      default: () => []
    },
    scrollX: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="postcss">
  .table-head {
    @apply rounded-lg px-4 py-2 flex flex-row justify-start w-full;
  }
  @media (max-width: 600px) {
    .table-head {
      @apply hidden;
    }
  }
</style>