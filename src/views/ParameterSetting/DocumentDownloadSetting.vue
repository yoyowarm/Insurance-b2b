<template>
<div>
  <FormTitle title="文件下載設定" class="text-lg"/>
  <CommonBoard class="product-list">
    <div class="column-5 sm:mb-4">
      <div class="col-start-5 flex justify-end">
        <Button class="sm:mr-2 w-full sm:w-32" @click.native="callDialog(0,'新增文件','新增文件')" outline>新增</Button>
      </div>
    </div>
    <TableGroup :data="productListTable" :slotName="slotArray" scrollX boldFont>
      <template v-for="(item,index) in productListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex flex-row whitespace-no-wrap">
            <Button outline class="mr-3" @click.native="callDialog(1,'編輯文件','儲存文件',item)">編輯</Button>
            <Button @click.native="callDialog(2,'刪除文件','確認刪除',item)">刪除</Button>
          </div>
        </template>
    </TableGroup>
    <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
    <WindowResizeListener @resize="handleResize"/>
  </CommonBoard>
  <PopupDialog
      :open.sync="openDialog"
      :headerText="dialog.title"
      confirm
      cancel="取消"
      :ok="dialog.okText"
      @cancel="closeDialog"
      @ok="confirmDialog"
    >
      <div v-if="dialog.type == 2">
      確定刪除此文件嗎？
    </div>
    <div v-if="dialog.type !== 2" class="flex flex-col">
      <div class="column-4 mb-5">
        <InputGroup class="col-span-4" title="名稱">
          <Input slot="input" placeholder="請輸入名稱" :value="currentItem.title" @updateValue="e => currentItem.title = e"/>
        </InputGroup>
      </div>
      <div class="column-4 mb-5">
        <InputGroup class="col-span-2" title="前台排序">
          <Input slot="input" numberOnly placeholder="請輸入排序" :value="currentItem.sort" @updateValue="e => currentItem.sort = e"/>
        </InputGroup>
        <InputGroup class="col-span-2" title="上傳儻案">
        <div slot="input">
          <label for="aa" class="text-gray-400 pl-4 text-lg w-full cursor-pointer">
          {{currentItem.fileName}}
        </label>
          <input id="aa" type="file" name="fileUpload"  accept=".csv,.pdf,.xls,.txt,.doc" class="w-full" @change="newFile">
        </div>
        </InputGroup>
      </div>
    </div>
  </PopupDialog>
</div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import TableGroup from '@/components/TableGroup'
import Pagination from '@/components/pagination'
import LoadingScreen from '@/components/LoadingScreen.vue'
import WindowResizeListener from '@/components/WindowResizeListener'
import Button from '@/components/Button'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import { mapState } from 'vuex'
import PopupDialog from '@/components/PopupDialog/dialog.vue'

export default {
  components:{
    CommonBoard,
    TableGroup,
    Pagination,
    LoadingScreen,
    WindowResizeListener,
    FormTitle,
    Button,
    PopupDialog,
    InputGroup,
    Input,
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentItem: {
        categoryId: '1',
        fileName: '上傳檔案',
      },
      file: null,
      productListTable: {
        head: [
          {
            text: '檔案名稱',
            value: 'title',
            size: '2-6'
          },
          {
            text: '最後更新時間',
            value: 'createTime',
            size: '3-6'
          },
          {
            text: '操作',
            value: 'operate',
            size: '2-6'
          },
        ],
        rows: []
      },
      itemLists:[],
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
      const slotArr = ['operate']
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
    callDialog(type,title, okText, item) {
      this.openDialog = true
      this.dialog.title = title
      this.dialog.type = type
      this.currentItem = item
      this.currentItem = {
        categoryId: '1',
        fileName: '上傳檔案',
      }
      if(item)this.currentItem = JSON.parse(JSON.stringify(item))
      if(okText) this.dialog.okText = okText
    },
    closeDialog() {
      this.openDialog = false
      this.currentItem = {}
    },
    async newFile(e) {
      this.currentItem.fileName = e.target.files[0].name
      this.file = e.target.files[0]
    },
    async confirmDialog() {
      const data = {
          CategoryId: '1',
          Title: this.currentItem.title,
          Sort: this.currentItem.sort,
      }
      if (this.dialog.type == 0) {
        data.file = this.file
        await this.$store.dispatch('documentDownload/AddDocument',data)
      }
      if (this.dialog.type == 1) {
        data.id = this.currentItem.id
        if (this.file) data.file = this.file
        console.log(this.file)
        await this.$store.dispatch('documentDownload/UpdateDocument',data)
      }
      if (this.dialog.type == 2) {
        await this.$store.dispatch('documentDownload/DeleteDocument', this.currentItem.id)
      }
      await this.getProducts(this.currentPage)
      this.openDialog = false
      this.currentItem = {}
      this.file = null
    },
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
      await this.getProducts()
    },
    async getCategories() {
      const res = await this.$store.dispatch('documentDownload/GetCategories')
      this.itemLists = res.data.content.map(i => {
        return {Text: i.name, Value: i.id}
      })
    },
    async getProducts(page) {
      const data = {
        take: 10,
        skip: page ? (page-1)*10 : (this.currentPage-1)*10,
      }
      const productList = await this.$store.dispatch('documentDownload/GetDocumentSettings', data)
      this.$store.dispatch('app/updatedCurrentPage',1)
      this.$store.dispatch('app/updatedTotalPage',Math.ceil(productList.data.content.totalCount/10))
      this.productListTable.rows = productList.data.content.documents.map(item => {
        return {
          ...item,
          createTime: item.createTime.split('T')[0] + ' ' + item.createTime.split('T')[1].split('.')[0],
        }
      })
    },
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
    margin-top: 40px;
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
}
[name="fileUpload"] {
  display: none;
}
</style>