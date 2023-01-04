<template>
  <CommonBoard class="product-list">
    <TableGroup :data="productListTable" :slotName="slotArray" boldFont>
      <template v-for="(item,index) in productListTable.rows">
        <div :slot="`title-${index}`" :key="`title${index}`" class="flex whitespace-no-wrap custom-column">
          <span @click="download(item)" class="link">{{item.title}}</span>
        </div>
      </template>
    </TableGroup>
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
import WindowResizeListener from '@/components/WindowResizeListener'
import { mapState } from 'vuex'
import FileSaver from 'file-saver'

export default {
  components:{
    CommonBoard,
    TableGroup,
    Pagination,
    LoadingScreen,
    WindowResizeListener
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      productListTable: {
        head: [
          {
            text: '發布日期',
            value: 'createTime',
            size: '1-6'
          },
          {
            text: '檔案名稱',
            value: 'title',
            size: '3-6'
          },
        ],
        rows: []
      },
      currentTag: 1,
      itemLists:[
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
      const slotArr = ['title']
      for (let i = 0; i < this.productListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  watch: {
    async currentTag(e) {
      await this.getProducts('',e)
    },
    async currentPage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
      await this.getProducts(page)
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
    async getCategories() {
      const res = await this.$store.dispatch('documentDownload/GetCategories')
      this.itemLists = res.data.content.map(i => {
        return {text: i.name, value: i.id}
      })
    },
    async getProducts(page, tag) {
      const data = {
        take: 10,
        skip: page ? (page-1)*10 : (this.currentPage-1)*10,
        categoryId:tag ? tag :this.currentTag,
      }
      const productList = await this.$store.dispatch('documentDownload/GetDocumentSettings', data)
      this.$store.dispatch('app/updatedCurrentPage',1)
      this.$store.dispatch('app/updatedTotalPage',Math.ceil(productList.data.content.totalCount/10))
      this.productListTable.rows = productList.data.content.documents.map(item => {
        return {
          ...item,
          createTime: item.createTime.split('T')[0],
          categoryText: this.itemLists.find(i => i.value === item.categoryId).text,
        }
      })
    },
    async download(item) {
      const res = await this.$store.dispatch('documentDownload/DownloadDocument', item.id)
      var blob1 = new Blob([res.data], {type: "application/octet-stream"});
      FileSaver.saveAs(blob1, `${item.fileName}`);
    }
  },
  async mounted() {
    this.$store.dispatch('app/updatedCurrentPage',1)
    await this.getCategories()
    await this.getProducts('',1)
  }
}
</script>

<style scoped lang="postcss">
  .product-list {
    @apply  w-full relative
  }
  .menu {
    top: -39px;
    @apply absolute
  }
  .link {
    color: #1076EE;
    @apply cursor-pointer
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
    .custom-column {
    @apply justify-center text-gray-600 bg-gray-100 text-center p-1 rounded-b-xl font-semibold;
  }
}
</style>