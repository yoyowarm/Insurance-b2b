<template>
  <div>
    <FormTitle title="另行報價和權重(數值大者優先) 條款設定" class="text-lg mb-14"/>
    <CommonBoard class="category rotate">
      <NavMenu
        class="menu"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
      />
      <div class="flex w-full">
        <TableGroup class="w-full" :data="weightListTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in weightListTable.rows">
          <div :slot="`weight-${index}`" :key="`weight${index}`" class="flex whitespace-no-wrap">
            <Input value="1" class="md:mr-4 weight-input w-full sm:w-24"/>
          </div>
          <div :slot="`switch-${index}`" :key="`switch${index}`" class="flex whitespace-no-wrap">
            <span class="cursor-pointer text-main pr-3">是</span><span class="text-gray-300 pr-3">/</span><span class="cursor-pointer text-gray-300">否</span>
          </div>
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Button class="w-full sm:w-24" outline>編輯</Button>
          </div>
        </template>
      </TableGroup>
      </div>
      <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
      <WindowResizeListener @resize="handleResize"/>
    </CommonBoard>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import TableGroup from '@/components/TableGroup'
import Input from '@/components/InputGroup/Input.vue'
import NavMenu from '@/components/NavMenu'
import Pagination from '@/components/pagination'
import Button from '@/components/Button'
import WindowResizeListener from '@/components/WindowResizeListener'
import { weightListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    Pagination,
    WindowResizeListener,
    TableGroup,
    Input,
    Button
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      weightListTable: weightListTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 0,
      itemLists:[
        { text: '處所', value: 0 },
        { text: '活動', value: 1 }
      ],
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    slotArray () {
      const arr = []
      const slotArr = [ 'weight','switch', 'operate']
      for (let i = 0; i < this.weightListTable.rows.length; i++) {
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
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      console.log(page)
      // this.$store.dispatch('app/updatedCurrentPage',page)
    },
  }
}
</script>

<style scoped lang="scss">
  .category {
    margin-top: 40px;
    @apply  w-full relative
  }
  .menu {
    top: -39px;
    @apply absolute
  }
  .weight-input {
    @apply rounded-full h-full border-2 border-gray-300 text-center
  }
</style>