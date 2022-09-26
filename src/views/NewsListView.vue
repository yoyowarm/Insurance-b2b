<template>
  <CommonBoard class="w-full">
    <TableGroup :data="newsListTable" @popup="popup"/>
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
import { NewsPopup } from '@/utils/popups'
import { mapState } from 'vuex'
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
      newsListTable: {
        head: [
          {
            text: '發布日期',
            value: 'LanuchDate',
            size: '1-6'
          },
          {
            text: '消息標題',
            value: 'Title',
            size: '2-6'
          },
          {
            text: '消息內文',
            value: 'Content',
            size: '3-6'
          },
        ],
        rows: []
      },
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    })
  },
  watch: {
    async currentPage() {
      await this.getNews()
    },
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
      await this.getNews()
    },
    async getNews() {
      const newsList = await this.$store.dispatch('news/newsByPageSetting', this.currentPage)
      this.$store.dispatch('app/updatedTotalPage',newsList.data.TotalPage)
      this.newsListTable.rows = newsList.data.data
    },
    popup(index) {
      NewsPopup.create({
        headerText: this.newsListTable.rows[index].Title,
        hasHtml: true,
        htmlText: `<div>${this.newsListTable.rows[index].Content}</div>`,
        lanuchDate: this.newsListTable.rows[index].LanuchDate,
      })
    }
  },
  async mounted() {
    this.$store.dispatch('app/updatedCurrentPage',1)
    await this.getNews()
  }
}
</script>

<style scoped lang="postcss">
  
</style>