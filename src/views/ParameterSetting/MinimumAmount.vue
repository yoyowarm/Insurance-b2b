<template>
  <div>
    <FormTitle title="縣市最低保額 參數設定" class="text-lg mb-14"/>
    <CommonBoard class="category rotate">
      <NavMenu
        class="menu rotate"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
        rotate
      />
      <div class="flex w-full">
        <TableGroup class="w-full" :data="minimumAmountTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in minimumAmountTable.rows">
          <div :slot="`slot1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
            <InputGroup class="-mt-2 w-full" noMt>
              <Input slot="input" placeholder="請輸入金額"/>
            </InputGroup>
          </div>
          <div :slot="`slot2-${index}`" :key="`slot2${index}`" class="flex whitespace-no-wrap pr-3">
            <InputGroup class="-mt-2 w-full" noMt>
              <Input slot="input" placeholder="請輸入金額"/>
            </InputGroup>
          </div>
          <div :slot="`slot3-${index}`" :key="`slot3${index}`" class="flex whitespace-no-wrap pr-3">
            <InputGroup class="-mt-2 w-full" noMt>
              <Input slot="input" placeholder="請輸入金額"/>
            </InputGroup>
          </div>
          <div :slot="`slot4-${index}`" :key="`slot4${index}`" class="flex whitespace-no-wrap pr-3">
            <InputGroup class="-mt-2 w-full" noMt>
              <Input slot="input" placeholder="請輸入金額"/>
            </InputGroup>
          </div>
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="w-full flex justify-center">
            <Button outline>編輯</Button>
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
import Input from '@/components/InputGroup/Input.vue'
import TableGroup from '@/components/TableGroup'
import NavMenu from '@/components/NavMenu'
import Pagination from '@/components/pagination'
import Button from '@/components/Button'
import WindowResizeListener from '@/components/WindowResizeListener'
import { minimumAmountTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    Pagination,
    WindowResizeListener,
    TableGroup,
    InputGroup,
    Input,
    Button
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      minimumAmountTable: minimumAmountTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 0,
      itemLists:[
        { text: '處所', value: 0 }
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
      const slotArr = [ 'slot1', 'slot2', 'slot3', 'slot4', 'operate']
      for (let i = 0; i < this.minimumAmountTable.rows.length; i++) {
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