<template>
  <div class="popup" ref="modal" :class="{'open':open, }">
    <div class="dialog" :class="{'fullScreen':fullScreen}">
      <div class="header">異動比對
        <div class="icon"  @click="() =>{$emit('cancel');$emit('update:open', false)}">
          <font-awesome-icon icon="times-circle" />
        </div>
      </div>
      <div class="body">
        <TableGroup :data="modifyLogTable" class="mb-4" :slotName="slotArray" scrollX >
          <template v-for="(item,index) in modifyLogTable.rows">
            <div :key="`modifyDetails-${index}`" :slot="`modifyDetails-${index}`">
              <template v-for="(detail,index2) in item.modifyDetails ">
                <div :key="`modifyDetails-${index}-${index2}`" class="flex">
                  <div class="mr-2">{{detail.field}}</div>
                  <span v-if="detail.originData" class="mr-2">{{detail.originData}}</span>
                  <span class="mr-3">改為</span>
                  <div class="text-main">{{detail.modifyData}}</div>
                </div>
            </template>
            </div>
          </template>
        </TableGroup>
      </div>
    </div>
    <div class="mask-bg" @click="() =>{$emit('cancel');$emit('update:open', false)}"/>
  </div>
</template>

<script>
import TableGroup from '@/components/TableGroup'
export default {
  components: {
    TableGroup
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    ok: {
      type: String,
      default: 'ok'
    },
    cancel: {
      type: String,
      default: 'cancel'
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    modifyLogData: {
      type: Array,
      default: () => []
    },
  },
   data () {
    return {
      value: false,
      modifyLogTable: {
        head: [
          {
            text: '最後異動時間',
            value: 'modifyTime',
            size: '2-6'
          },
          {
            text: '變更人員',
            value: 'employee',
            size: '2-6'
          },
          {
            text: '異動欄位 / 資料',
            value: 'modifyDetails',
            size: '5-6'
          },
        ],
        rows: []
      },
    }
  },
  watch: {
    modifyLogData (val) {
      this.modifyLogTable.rows = val
    },
  },
  computed: {
    slotArray () {
      const arr = []
      const slotArr = ['modifyDetails']
      for (let i = 0; i < this.modifyLogData.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  methods: {
    show () {
      this.value = true
    }
  },
  mounted() {
    this.modifyLogTable.rows = this.modifyLogData
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
    top: 5%;
    left: 0;
    right:0;
    margin: 0 auto;
    max-width: 80%;
    width: 100%;
    z-index: 100;
    @apply bg-white rounded-2xl;
    &.fullScreen {
      top: 5%;
      max-width: 80%;
      width: 80%;
      height: auto;
      overflow: hidden;
      .body {
        overflow-y: auto;
        max-height: 100vh;
      }
    }
    .header {
      height: 50px;
      @apply flex items-center justify-center relative bg-main w-full rounded-t-2xl text-white text-lg;
    }
    .icon {
      @apply absolute inset-y-0 my-auto right-0 mr-3 text-3xl cursor-pointer;
    }
    .body {
      overflow: scroll;
      max-height: 80vh;
      @apply  p-6
    }
  }
  .mask-bg {
    @apply inset-0 bg-black opacity-75 w-screen h-screen z-20 overflow-hidden fixed
  }

  @media (max-width: 770px) {
    .dialog {
      width: 90%;
      @apply bg-white rounded-2xl;

    }
  }
</style>