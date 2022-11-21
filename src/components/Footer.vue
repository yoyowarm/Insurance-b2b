<template>
  <div class="footer" :class="{pagination}">
    <div class="flex flex-row justify-center relative w-full">
      <div>
        <p class="text-gray-400">{{hh}}: {{mm}} : {{ss}}</p>
        <p class="text-gray-400">{{year}}/{{month}}/{{day}}</p>
      </div>
      <span v-if="!pagination" class="text-white cursor-pointer text-center ml-10 absolute right-5" @click="scrollTo">
        <font-awesome-icon :icon="['fas','arrow-up']" /><br>
        <span>回頂端</span>
      </span>
    </div>
    
    
    <div class="flex flex-row w-full" v-if="pagination">
      <Select :options="pageNumber" :selected="currentPage.toString()" @emitItem="e=> emitSelectItem(e)" class="select" defaultText="選擇頁面"/>
      <span class="text-white cursor-pointer text-center ml-10" @click="scrollTo">
        <font-awesome-icon :icon="['fas','arrow-up']" /><br>
        <span>回頂端</span>
      </span>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'
import { mapState } from 'vuex'
export default {
  props: {
    pagination: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Select
  },
  computed: {
    ...mapState({
    'currentPage': state => state.app.currentPage,
    'totalPage': state => state.app.totalPage,
  }),
    pageNumber () {
      let arr = []
      for(let i = 1; i <= this.totalPage; i++) {
        arr.push({Value:i, Text: i})
      }
      return arr
    },
  },
  data() {
    return {
      year: new Date().getYear()+ 1900,
      month: new Date().getMonth() +1,
      day: new Date().getDate(),
      hh: '00',
      mm: '00',
      ss: '00',
    }
  },
  methods: {
    startTime(){
      var today = new Date();
      var hh = today.getHours();
      var mm = today.getMinutes();
      var ss = today.getSeconds();
      mm = this.checkTime(mm);
      ss = this.checkTime(ss);
      this.hh = hh
      this.mm = mm
      this.ss = ss
      setTimeout(this.startTime, 500);
    },
    checkTime(i){
      if(i < 10) {
        i = "0" + i;
      }
      return i;
    },
    emitSelectItem(e) {
      this.$store.dispatch('app/updatedCurrentPage',e.Value)
    },
    scrollTo() {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  },
  mounted() {
    this.startTime()
  }
}
</script>

<style scoped lang="scss">
.footer {
  min-height: 69px;
  width: 100%;
  padding: 15px;
  @apply hidden bg-main text-sm;
}
.select {
  width: 80%;
  height:100%;
  border: 1px solid #BFBFBF;
  border-radius: 50px;
  padding: 6px;
  @apply bg-white
}
@media screen and (max-width: 770px) {
  .footer {
    @apply flex flex-col justify-center items-center bottom-0 left-0 right-0 z-10;
    &.pagination {
      @apply fixed;
    }
  }
}
</style>