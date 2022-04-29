<template>
  <div class="table-body" :class="{scrollX, 'overflow-x-auto': scrollX}">
      <template v-for="(item, index) in rows">
        <div class="item" :key="index">
        <template v-for="(headItem,headIndex) in head">
          <span :key="`${headItem.value}-${headIndex}`" class="text-gray-600 text-sm hidden">{{headItem.text}}</span>
          <slot v-if="$slots[headItem.value]" :name="headItem.value"/>
          <div v-if="!$slots[headItem.value]" :key="`${headItem.text}-${headIndex}`" :class="[`w-${headItem.size}`,scrollX ? '' :'truncate']">
            <DynamicLink v-if="item.link && headItem.value === 'Title'" type="router" :path="item.link">
              <span class="link">{{item[headItem.value]}}</span>
            </DynamicLink>
            <a v-else-if="item.Url && headItem.value === urlKey" :href="item.Url" download>
              <span class="link">{{item[headItem.value]}}</span>
            </a>
            <span v-else-if="item.ID && headItem.value === 'Title'" class="link cursor-pointer" @click="$emit('popup', index)">{{item[headItem.value]}}</span>
            <span class="text-gray-600" v-else-if="item.class && headItem.value === statusKey" :class="item.class" v-html="item[headItem.value]">
              {{item[headItem.value].replace(/<(\/*)[^>]*>/g,'')}}
            </span>
            <span class="text-gray-600" v-else>{{item[headItem.value].replace(/<(\/*)[^>]*>/g,'')}}</span>
          </div>
        </template>
        </div>
    </template>
    <div v-if="rows.length === 0" class="text-gray-300 flex justify-center w-full p-4 select-none">無資料</div>
  </div>
</template>

<script>
import DynamicLink from '@/components/DynamicLink'
export default {
  components: {
    DynamicLink
  },
  props: {
    head: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    urlKey: {
      type: String,
      default: 'Name'
    },
    statusKey: {
      type: String,
      default: 'State'
    }
  }
}
</script>

<style scoped lang="postcss">
  .table-body {
    @apply px-3 text-gray-900
  }
  .table-body .item {
    border-bottom: 1px solid #EBEEF1;
    @apply py-3 flex w-full items-start
  }
  .link {
    color: #1076EE
  }
  @media (max-width: 600px) {
    .table-body .item {
      @apply flex-col ;
    }

    .table-body .item span {
      @apply block
    }

    .table-body .item > div {
      @apply w-full mb-2 ;
    }
  }
  
</style>