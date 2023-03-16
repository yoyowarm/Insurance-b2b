<template>
  <div class="popup" ref="modal" :class="{'open':open }">
    <div class="dialog">
      <div class="body">
        <div class="icon" @click="$emit('update:open', false)">
          <font-awesome-icon icon="times-circle" />
        </div>
        <p class="my-2 text-gray-800">報價單歷程</p>
        <TableGroup :data="historyList" :slotName="slotArray">
            <template v-for="(item,index) in historyList.rows">
              <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex flex-col">
              <template v-for="(operate) in item.operate">
                <div class="" :key="operate">
                  {{operate}}
                </div>
              </template>
            </div>
            </template>
        </TableGroup>
      </div>
    </div>
    <div class="mask-bg" @click="$emit('update:open', false)"/>
  </div>
</template>

<script>
import TableGroup from '@/components/TableGroup'
import { historyList } from '@/utils/mockData'
export default {
  components: {
    TableGroup
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: ''
    },
  },
   data () {
    return {
      value: false,
      historyList: historyList(),
    }
  },
  watch: {
    open(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  methods: {
    show () {
      this.value = true
    }
  },
  computed: {
    slotArray () {
      const arr = []
      const slotArr = [ 'operate']
      for (let i = 0; i < this.historyList.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
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
    overflow: hidden;
    @apply bg-white rounded-2xl;
    .header {
      .date {
        @apply text-gray-600 text-sm;
      }
      @apply relative w-full rounded-t-2xl p-4 pb-2 text-gray-800 text-lg;
    }
    .icon {
      width: 29px;
      height: 29px;
      border-radius: 50px;
      @apply absolute top-3 my-auto right-3 text-3xl text-main cursor-pointer bg-white;
    }
    .body {
      overflow-y: scroll;
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
</style>