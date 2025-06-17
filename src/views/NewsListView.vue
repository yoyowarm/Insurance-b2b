<template>
  <CommonBoard class="w-full">
    <TableGroup :data="newsListTable" @popup="popup" :slotName="newsSlotArray" boldFont>
      <template v-for="(item,index) in newsListTable.rows">
          <div :slot="`title-${index}`" :key="`title${index}`" class="flex whitespace-no-wrap custom-column">
            <span @click="popup(item)" class="link">{{item.title}}</span>
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
            value: 'lumchTime',
            size: '1-6'
          },
          {
            text: '消息標題',
            value: 'title',
            size: '2-6'
          },
          {
            text: '消息內文',
            value: 'content',
            size: '5-6'
          },
        ],
        rows: [
          {
            lumchTime: '2025/06/01',
            title: '系統更新公告',
            content: '本網站於 6/5 進行系統維護，屆時部分功能將暫停服務。'
          },
          {
            lumchTime: '2025/06/10',
            title: '新版功能上線',
            content: '全新「報表匯出」功能已上線，歡迎前往功能頁體驗。'
          },
          {
            lumchTime: '2025/06/15',
            title: '假日服務時間調整',
            content: '端午連假期間，客服將於每日 9:00-15:00 提供服務。'
          },
          {
            lumchTime: '2025/06/16',
            title: '常見問題集更新',
            content: '我們新增了針對用戶回報問題的 FAQ 區，歡迎參閱。'
          },
          {
            lumchTime: '2025/06/17',
            title: '平台使用人數突破 10 萬！',
            content: '感謝支持，我們將持續優化平台與服務。'
          }
        ]
      },
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    newsSlotArray () {
      const arr = []
      const slotArr = ['title']
      for (let i = 0; i < this.newsListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
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
      await this.getNews(page)
    },
    async getNews() {
      // const newsList = await this.$store.dispatch('news/GetNewsList', {skip: page ? (page-1)*10 : (this.currentPage-1)*10, isEnable: true})
      // this.$store.dispatch('app/updatedTotalPage',newsList.data.TotalPage)
      // this.newsListTable.rows = newsList.data.content.news.map(i => {
      //   return {
      //     ...i,
      //     lumchTime: i.lumchTime.split('T')[0]
      //   }
      // })
      // this.$store.dispatch('app/updatedCurrentPage',1)
      // this.$store.dispatch('app/updatedTotalPage',Math.ceil(newsList.data.content.totalCount/10))
    },
    popup(item) {
      NewsPopup.create({
        headerText: item.title,
        hasHtml: true,
        htmlText: `<div>${item.content}</div>`,
        lanuchDate: item.lumchTime,
      })
    },
  },
  async mounted() {
    this.$store.dispatch('app/updatedCurrentPage',1)
    await this.getNews()
  }
}
</script>

<style scoped lang="postcss">
  .link {
    color: #1076EE;
    @apply cursor-pointer
  }
  @media (max-width: 600px) {
    .custom-column {
    @apply justify-center text-gray-600 bg-gray-100 text-center p-1 rounded-b-xl font-semibold;
  }
  }
</style>