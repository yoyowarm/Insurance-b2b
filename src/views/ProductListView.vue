<template>
  <CommonBoard class="product-list rotate">
    <NavMenu
      class="menu rotate"
      :itemLists="itemLists"
      :currentTag="currentTag"
      @updatedMenu="(e) => currentTag = e"
      rotate
    />
    <div class="flex w-full">
      <TableGroup class="w-full lg:w-1/2 lg:pr-2.5" :data="leftTableData"/>
      <TableGroup v-if="rightTableData.rows.length > 0" class="w-full lg:w-1/2 lg:pl-2.5" :data="rightTableData"/>
    </div>
    <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
    <WindowResizeListener @resize="handleResize"/>
  </CommonBoard>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import TableGroup from '@/components/TableGroup'
import Pagination from '@/components/pagination'
import LoadingScreen from '@/components/LoadingScreen.vue'
import NavMenu from '@/components/NavMenu'
import WindowResizeListener from '@/components/WindowResizeListener'
import { mapState } from 'vuex'
export default {
  components:{
    CommonBoard,
    TableGroup,
    Pagination,
    LoadingScreen,
    NavMenu,
    WindowResizeListener
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      productListTable: {
        head: [
          {
            text: '發布日期',
            value: 'LaunchDate',
            size: '2-6'
          },
          {
            text: '類型',
            value: 'Type',
            size: '1-6'
          },
          {
            text: '商品名稱',
            value: 'Name',
            size: '3-6'
          },
        ],
        rows: []
      },
      currentTag: 0,
      itemLists:[
        { text: '全部商品', value: 0 },
        { text: '商品 DM', value: 1 },
        { text: '要保書', value: 2 },
        { text: '保單條款', value: 3 },
        { text: '申請書', value: 4 },
        { text: '其他', value: 5 },
      ],
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    leftTableData() {
      return {head: this.productListTable.head, rows: this.productListTable.rows.slice(0,9).sort((a,b) => new Date(a.LaunchDate) - new Date(b.LaunchDate))}
    },
    rightTableData() {
      return {head: this.productListTable.head, rows: this.productListTable.rows.slice(9,18).sort((a,b) => new Date(a.LaunchDate) - new Date(b.LaunchDate))}
    },
  },
  watch: {
    async currentTag() {
      await this.getProducts()
    },
    async currentPage() {
      await this.getProducts()
    },
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
      await this.getProducts()
    },
    async getProducts() {
      this.productListTable.rows = []
      const data = {
        Page: this.currentPage,
        PageSize: 18,
        Condictions: {
          productCategory: this.currentTag
        }
      }
      const productList = await this.$store.dispatch('product/productsByGroup', data)
      this.$store.dispatch('app/updatedTotalPage',productList.data.totalPage)
      productList.data.data.map(item => {
        item.ProductNameAndUrl.map(i => {
          this.productListTable.rows.push(i)
        })
      })
    }
  },
  async mounted() {
    this.$store.dispatch('app/updatedCurrentPage',1)
    await this.getProducts()
  }
}
</script>

<style scoped lang="postcss">
  .product-list {
    margin-top: 40px;
    @apply  w-full relative
  }
  .menu {
    top: -39px;
    @apply absolute
  }
@media screen and (max-width: 600px) {
  .product-list.rotate {
    margin-top: 0;
    padding-left: 50px;
  }
  .menu.rotate{
    top: 20px;
    left: -5px;
    @apply absolute
  }
  >>> .board {
    min-height: 400px;
  }
}
</style>