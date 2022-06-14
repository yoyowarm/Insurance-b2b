<template>
  <div>
    <FormTitle title="類別 參數設定" class="text-lg mb-14"/>
    <CommonBoard class="category rotate">
      <NavMenu
        class="menu rotate"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
        rotate
      />
      <div class="column-5 mb-4">
        <InputGroup noMt>
          <Select slot="input" defaultText="選擇類別"/>
        </InputGroup>
      </div>
      <div class="flex w-full">
        <TableGroup class="w-full" :data="categoryListTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in categoryListTable.rows">
          <div :slot="`quote-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Checkbox  :id="`quote-${index}`"/>
          </div>
          <div :slot="`eye-${index}`" :key="`operate${index}`" class="w-full flex justify-center">
            <font-awesome-icon class="text-main text-lg" :icon="['fas','eye']" />
            <!-- <font-awesome-icon class="text-main text-lg" :icon="['fas','eye-slash']" /> -->
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
import InputGroup from '@/components/InputGroup'
import TableGroup from '@/components/TableGroup'
import NavMenu from '@/components/NavMenu'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import Pagination from '@/components/pagination'
import WindowResizeListener from '@/components/WindowResizeListener'
import { categoryListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    Pagination,
    WindowResizeListener,
    TableGroup,
    Select,
    InputGroup,
    Checkbox
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      categoryListTable: categoryListTable(),
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
      const slotArr = [ 'quote', 'eye']
      for (let i = 0; i < this.categoryListTable.rows.length; i++) {
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
@media screen and (max-width: 600px) {
  .category.rotate {
    margin-top: 0;
    padding-left: 50px;
  }
  .menu.rotate{
    top: 20px;
    left: -5px;
    @apply absolute
  }
}
</style>