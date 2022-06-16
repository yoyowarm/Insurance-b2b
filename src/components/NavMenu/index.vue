<template>
  <div class="nav-menu" :class="{rotate}">
    <Item
      v-for="(item,index) in itemLists"
      :key="index"
      :text="item.text"
      :active="item.value === currentTag"
      :disabled="item.disabled"
      @click.native="()=>{if(!item.disabled)$emit('updatedMenu', item.value)}"/>
  </div>
</template>

<script>
import Item from './item.vue'
export default {
  components: {
    Item,
  },
  props: {
    itemLists: {
      type: Array,
      default: () => []
    },
    currentTag: {
      type: Number,
      default: 0
    },
  },
}
</script>

<style scoped lang="postcss">
  .nav-menu {
    @apply flex flex-row;
  }
@media screen and (max-width: 600px) {
  .nav-menu.rotate{
    @apply flex-col
  }
}
</style>