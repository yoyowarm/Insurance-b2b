<template>
  <div class="table-body" :class="{scrollX, 'overflow-x-auto': scrollX}">
      <template v-for="(item, index) in rows">
        <div v-if="windowWidth >= 600" class="item cursor-pointer" :key="index" @click="$emit('review',item)">
          <template v-for="(headItem,headIndex) in head">
            <span :key="`${headItem.value}-${headIndex}`" class="text-gray-600 text-sm hidden">{{headItem.text}}</span>
            <div v-if="$slots[`${headItem.value}-${index}`]" :key="`${headItem.text}-${headIndex}`" :class="[`w-${headItem.size}`,scrollX ? '' :'truncate']">
              <slot :name="`${headItem.value}-${index}`"/>
            </div>
            <div v-if="!$slots[`${headItem.value}-${index}`]" :key="`${headItem.text}-${headIndex}`" :class="[`w-${headItem.size}`,scrollX ? '' :'truncate']">
              <DynamicLink v-if="item.link && headItem.value === 'Title'" type="router" :path="item.link">
                <span class="link" :class="{'font-semibold': boldFont}">{{item[headItem.value]}}</span>
              </DynamicLink>
              <a v-else-if="item.Url && headItem.value === urlKey" :href="item.Url" download>
                <span class="link" :class="{'font-semibold': boldFont}">{{item[headItem.value]}}</span>
              </a>
              <span v-else-if="item.ID && headItem.value === 'Title'" class="link cursor-pointer" @click="$emit('popup', index)">{{item[headItem.value]}}</span>
              <span class="text-gray-600" v-else-if="item.class && headItem.value === statusKey" :class="item.class" v-html="item[headItem.value]">
                {{item[headItem.value] ? item[headItem.value].replace(/<(\/*)[^>]*>/g,'') : ''}}
              </span>
              <span class="text-gray-600" :class="{'font-semibold': boldFont}" v-else>{{item[headItem.value] ? item[headItem.value].replace(/<(\/*)[^>]*>/g,'') : ''}}</span>
            </div>
          </template>
        </div>
        <div v-else class="item" :class="{'bg-gray-200 px-3 mb-4 rounded-2xl': windowWidth <= 600}" :key="index" @click="$emit('review',item)">
          <div class="" :class="{'column-2-wide' : column2, 'column-3-wide': column3}">
            <template v-for="(headItem,headIndex) in head">
              <div :key="`${headItem.value}-${headIndex}`" >
                <span class="text-gray-100 bg-main rounded-t-xl text-center p-1 text-sm hidden">{{headItem.text}}</span>
                <div v-if="$slots[`${headItem.value}-${index}`]" :key="`${headItem.text}-${headIndex}`" :class="[scrollX ? '' :'truncate']">
                  <slot :name="`${headItem.value}-${index}`"/>
                </div>
                <div v-if="!$slots[`${headItem.value}-${index}`]" :key="`${headItem.text}-${headIndex}`"  :class="[,scrollX ? '' :'truncate']">
                  <DynamicLink v-if="item.link && headItem.value === 'Title'" type="router" :path="item.link">
                    <span class="link bg-gray-100" :class="{'font-semibold': boldFont}">{{item[headItem.value]}}</span>
                  </DynamicLink>
                  <a v-else-if="item.Url && headItem.value === urlKey" :href="item.Url" download>
                    <span class="link bg-gray-100" :class="{'font-semibold': boldFont}">{{item[headItem.value]}}</span>
                  </a>
                  <span v-else-if="item.ID && headItem.value === 'Title'" class="link cursor-pointer bg-gray-100" @click="$emit('popup', index)">{{item[headItem.value]}}</span>
                  <span class="text-gray-600 bg-gray-100 text-center p-1 rounded-b-xl  min-h-4" v-else-if="item.class && headItem.value === statusKey" :class="item.class" v-html="item[headItem.value]">
                    {{item[headItem.value] ? item[headItem.value].replace(/<(\/*)[^>]*>/g,'') : ''}}
                  </span>
                  <span class="text-gray-600 bg-gray-100 text-center p-1 rounded-b-xl  min-h-4" :class="{'font-semibold': boldFont}" v-else>{{item[headItem.value] ? item[headItem.value].replace(/<(\/*)[^>]*>/g,'') : ''}}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
    </template>
    <div v-if="rows.length === 0" class="text-gray-300 flex justify-center w-full p-4 select-none">無資料</div>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import DynamicLink from '@/components/DynamicLink'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  components: {
    DynamicLink,
    WindowResizeListener
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
    },
    column2: {
      type: Boolean,
      default: false
    },
    column3: {
      type: Boolean,
      default: false
    },
    boldFont: {
      type: Boolean,
      default: false
    }
  },
   data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
  }
}
</script>

<style scoped lang="scss">
  .table-body {
    &::-webkit-scrollbar {
      display: none;
    }
    @apply px-4 py-2 text-gray-900;
  }
  .table-body .item {
    border-bottom: 1px solid #EBEEF1;
    @apply py-3 flex w-full items-start;
  }
  .table-body.scrollX .item {
    border-bottom: 0px;
    @apply pb-0;
    > div {
      border-top: 1px solid #EBEEF1;
      @apply pt-3;
    }
  }
  .table-body.scrollX .item:first-child {
    > div {
      border-top: 0px;
      @apply pt-0;
    }
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

    .table-body .item div {
      @apply w-full mb-2 ;
    }
  }
  
</style>