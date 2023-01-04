<template>
  <div class="popup" ref="modal" :class="{'open':open }">
    <div class="dialog">
      <div class="header">
        <h2>報價單歷程</h2>
        <div class="icon" @click="$emit('update:open',false)">
          <font-awesome-icon icon="times-circle" />
        </div>
      </div>
      <div class="px-2">
        <TableGroup :data="historyTable" class="mb-4" :slotName="slotArray" scrollX >
          <template v-for="(item,index) in historyTable.rows">
            <div :key="`operate-${index}`" :slot="`operate-${index}`" class="flex custom-column">
              <span class="text-main">{{item.action}}</span>
            </div>
          </template>
        </TableGroup>
      </div>
      <WindowResizeListener @resize="handleResize"/>
    </div>
    <div class="mask-bg" @click="$emit('update:open',false)"/>
  </div>
</template>

<script>
import TableGroup from '@/components/TableGroup'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    historyData: {
      type: Array,
      default: () => []
    },
  },
  components: {
    TableGroup,
    WindowResizeListener
  },
  watch: {
    historyData (val) {
      this.historyTable.rows = val
    },
    windowWidth(val) {
      if(val <= 600) {
        this.historyTable.head[2].size = '3-6'
      } else {
        this.historyTable.head[2].size = '6-6'
      }
    }
  },
   data () {
    return {
      windowWidth: window.innerWidth,
      value: false,
      historyTable: {
        head: [
          {
            text: '日期',
            value: 'date',
            size: '2-6'
          },
          {
            text: '單位/身份',
            value: 'employee',
            size: '2-6'
          },
          {
            text: '操作',
            value: 'operate',
            size: '6-6'
          },
        ],
        rows: []
      }
    }
  },
  computed: {
    slotArray () {
      const arr = []
      const slotArr = ['operate']
      for (let i = 0; i < this.historyData.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    show () {
      this.value = true
    }
  },
  mounted() {
    this.historyTable.rows = this.historyData
    if(this.windowWidth <= 600) {
      this.historyTable.head[2].size = '3-6'
    } else {
      this.historyTable.head[2].size = '6-6'
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
    overflow: auto;
    @apply bg-white rounded-2xl;
    .header {
      .date {
        @apply text-gray-600 text-sm;
      }
      @apply relative w-full rounded-t-2xl p-4 pb-2 text-gray-800 text-lg;
    }
    .icon {
      width: 25px;
      height: 25px;
      border-radius: 50px;
      @apply absolute inset-y-0 right-3 my-auto text-3xl text-main cursor-pointer;
    }
    .body {
      overflow: auto;
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
  .custom-column {
    @apply justify-center text-gray-600 bg-gray-100 text-center p-1 rounded-b-xl font-semibold;
  }
</style>