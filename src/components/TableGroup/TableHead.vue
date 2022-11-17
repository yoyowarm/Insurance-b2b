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

<style scoped lang="scss">
  .table-head {
    scrollbar-width: thin;
    &::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
  height: 4px;
}
&::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}
    @apply overflow-scroll rounded-lg px-4 py-2 flex flex-row justify-start w-full;
  }
  @media (max-width: 600px) {
    .table-head {
      @apply hidden;
    }
  }
</style>