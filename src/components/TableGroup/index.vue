<template>
  <div class="table-group">
    <TableHead ref="head" :head="data.head" :scrollX="scrollX"/>
    <TableBody ref="body" :rows="data.rows" :head="data.head" @popup="(e) => $emit('popup',e)" :scrollX="scrollX" :urlKey="urlKey" :statusKey="statusKey">
      <template v-for="(slot,index) in slotName">
         <div class="" :slot="slot" :key="`${slot}${index}`"><slot :name="slot"/></div>
      </template>
    </TableBody>
  </div>
</template>

<script>
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'
export default {
  components: {
    TableHead,
    TableBody
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    slotName: {
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
  },
  methods: {
    syncScroller: function () {
      let nodes = Array.prototype.filter.call(arguments, item => item instanceof HTMLElement)
      let max = nodes.length
      if (!max || max === 1) return
      let sign = 0; // 用于标注
      nodes.forEach((ele) => {
        ele.addEventListener('scroll', function () { // 给每一个节点绑定 scroll 事件
          if (!sign) { // 标注为 0 时 表示滚动起源
              sign = max - 1;
              let top = this.scrollTop
              let left = this.scrollLeft
              for (let node of nodes) { // 同步所有除自己以外节点
                  if (node == this) continue;
                  node.scrollTo(left, top);
              }
          } else
          -- sign
        });
      });
    }
  },
  mounted() {
    if(this.$refs.head && this.$refs.body) {
      this.syncScroller(this.$refs.head.$el, this.$refs.body.$el)
    }

    
  }
}
</script>

<style scoped lang="postcss">
  
</style>