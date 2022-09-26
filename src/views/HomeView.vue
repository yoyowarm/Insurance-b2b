<template>
  <div class="flex flex-wrap">
    <div class="dashboardGroup">
      <CommonBoard
        v-for="(item, index) in state"
        :key="index"
        class="dashboard md:mr-5 lg:mr-7"
        @click.native="$router.push({path:'/quotation/list', query:{type:item.type}})"
        :class="{'fail' :item.type === '未核保', 'success': item.type === '已核保', 'warn': item.type === '十五天內生效'}">
        <div class="flex justify-start">
          <img v-if="item.type === '未核保'" :src="failIcon" alt="">
          <img v-if="item.type === '已核保'" :src="successIcon" alt="">
          <img v-if="item.type === '十五天內生效'" :src="warnIcon" alt="">
          <div class="flex flex-col justify-center">
            <span class="font-semibold text-xl text-gray-700">{{item.type}}</span>
            <span class="text-fail font-bold text-base md:text-xl lg:text-xl tracking-tighter"
            :class="{'text-fail' :item.type === '未核保', 'text-success': item.type === '已核保', 'text-warn': item.type === '十五天內生效'}">
              單數
              <span>：{{item.text.replace(/\/[0-9]{0,}/g, '')}}</span>
              <span class="px-1 md:px-2 ">/</span>
              <span class="text-lg md:text-3xl lg:text-4xl pr-2">{{item.text.replace(/[0-9]{0,}\//g, '')}}</span>
              <span>件</span>
            </span>
          </div>
        </div>
      </CommonBoard>
    </div>
    <CommonBoard class="w-full" title="最新消息">
      <img slot="icon" class="w-7 h-8 mr-1" src="../assets/images/icon_sms.png" alt="">
      <template slot="right">
        <DynamicLink type="router" path="/news/list" class="more">
            <div class="flex items-end h-full">
              <img src="../assets/images/icon_expand_circle_down.png" alt="">
              <span class="text-base text-main">查看更多</span>
            </div>
          </DynamicLink>
      </template>
      <TableGroup :data="newsListTable" @popup="popup"/>
    </CommonBoard>
      <DynamicLink type="router" path="/news/list" class="w-full mobile-more">
        <Button class="w-full mt-4 mb-6">
            查看更多
        </Button>
      </DynamicLink>
    <div class="flex flex-wrap lg:flex-no-wrap justify-around w-full mt-6">
      <CommonBoard class="w-full lg:w-1/2 lg:mr-9" title="商品資訊">
        <img slot="icon" class="w-7 h-8 mr-1" src="../assets/images/icon_work_outline.png" alt="">
        <template slot="right">
          <DynamicLink type="router" path="/product/list" class="more">
            <div class="flex items-end h-full">
              <img src="../assets/images/icon_expand_circle_down.png" alt="">
              <span class="text-base text-main">查看更多</span>
            </div>
          </DynamicLink>
        </template>
        <TableGroup :data="productListTable" urlKey="ProductName"/>
      </CommonBoard>
      <DynamicLink type="router" path="/product/list" class="mobile-more w-full mt-4 mb-6">
        <Button class="w-full">
            查看更多
        </Button>
      </DynamicLink>
      <CommonBoard class="w-full md:mt-6 lg:mt-0 lg:w-1/2" title="報價明細">
        <img slot="icon" class="w-7 h-8 mr-1" src="../assets/images/icon_list_alt.png" alt="">
        <template slot="right">
          <DynamicLink type="router" path="/quotation/list" class="more">
            <div class="flex items-end h-full">
              <img src="../assets/images/icon_expand_circle_down.png" alt="">
              <span class="text-base text-main">查看更多</span>
            </div>
          </DynamicLink>
        </template>
        <TableGroup :data="quotationListTable"/>
      </CommonBoard>
      <DynamicLink type="router" path="/quotation-list" class="w-full mobile-more">
        <Button class="w-full mt-4 mb-6">
            查看更多
        </Button>
      </DynamicLink>
    </div>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import TableGroup from '@/components/TableGroup'
import DynamicLink from '@/components/DynamicLink'
import Button from '@/components/Button/index.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import failIcon from '@/assets/images/not_checked_state.png'
import successIcon from '@/assets/images/checked_state.png'
import warnIcon from '@/assets/images/after_effect_state.png'
import { NewsPopup } from '@/utils/popups'
import { mapState } from 'vuex'
export default {
  name: 'TestView',
  components: {
    CommonBoard,
    TableGroup,
    DynamicLink,
    Button,
    LoadingScreen
  },
  data () {
    return {
      failIcon,
      successIcon,
      warnIcon,
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
      productListTable: {
        head: [
        {
          text: '發布日期',
          value: 'LaunchDate',
          size: '2-6'
        },
        {
          text: '商品名稱',
          value: 'ProductName',
          size: '5-6'
        },

      ],
      rows: []
    },
      quotationListTable: {
        head: [
          {
            text: '報價日期',
            value: 'CreateDate',
            size: '2-6'
          },
          {
            text: '狀態',
            value: 'State',
            size: '2-6'
          },
          {
            text: '報價單編號',
            value: 'SerialNo',
            size: '3-6'
          },
          {
            text: '要保人',
            value: 'ApplicantName',
            size: '1-6'
          },

        ],
        rows: []
      },
      state: []
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'token': state => state.home.token,
      'userInfo': state => state.home.userInfo,
    })
  },
  methods: {
    popup(id) {
      NewsPopup.create({
        headerText: this.newsListTable.rows[id].Title,
        hasHtml: true,
        htmlText: `<div>${this.newsListTable.rows[id].Content}</div>`,
        lanuchDate: this.newsListTable.rows[id].LanuchDate,
      })
    },
    async getTop3Quotation() {
      const quotation = await this.$store.dispatch('quotation/quotationForTop3', this.userInfo.UserId)
      this.quotationListTable.rows = quotation.data
      this.quotationListTable.rows.map(item => {
        if(item.State === '十五天內生效') {
          item.class = 'text-warn'
        }
        if(item.State === '已核保') {
          item.class = 'text-success'
        }
        if(item.State === '未核保') {
          item.class = 'text-fail'
        }
      })
    },
    async getTop3top3Products() {
      const products = await this.$store.dispatch('product/top3Products')
      this.productListTable.rows = products.data
    },
    async getTop3News() {
      const news = await this.$store.dispatch('news/top3News')
      this.newsListTable.rows = news.data
    },
    async getAllState() {
      const state = await this.$store.dispatch('resource/AllState', {SalesLayer: this.userInfo.salesLayer, UserId: this.userInfo.UserId})
      this.state = state.data
    }
  },
  async mounted () {
    let params = (new URL(document.location)).searchParams
     const key = params.get("k");
    if (key || this.token) {
      this.$store.dispatch('home/setToken', key ? key : this.token)
    }
    if(this.token) {
      try {
        const checkUser = await this.$store.dispatch('home/checkUser', this.token)
        this.$store.dispatch('home/updatedUserInfo', checkUser.data.User.UserInfo)
      } catch (error) {
        await this.$store.dispatch('home/refreshToken', this.token)
        const checkUser = await this.$store.dispatch('home/checkUser', this.token)
        this.$store.dispatch('home/updatedUserInfo', checkUser.data.User.UserInfo)
        await this.getTop3Quotation()
        await this.getTop3top3Products()
        await this.getTop3News()
        await this.getAllState()
      }
        await this.getTop3Quotation()
        await this.getTop3top3Products()
        await this.getTop3News()
        await this.getAllState()
    }
  }
}
</script>

<style scoped lang="postcss">
  .dashboardGroup {
    @apply flex w-full mb-7 relative
  }
  .dashboard {
    width: 300px;
  }
  .dashboard img { 
    width: 68px;
    height: 100%
  }
  .dashboard>>>.board {
    margin-top:0px;
    @apply p-2 py-4
  }
  .dashboard.fail>>>.board {
    border-bottom: 5px solid #EC4343;
  }
  .dashboard.success>>>.board {
    border-bottom: 5px solid #3AA551;
  }
  .dashboard.warn>>>.board {
    border-bottom: 5px solid #FE8F0E;
  }
  .mobile-more {
    @apply hidden
  }
  @media screen and (max-width: 1179px) {
    .dashboard {
      @apply mx-auto
    }
    .dashboard>>>.board {
      @apply p-2 py-1
    }
    .fail {
      @apply absolute left-0 right-0 mx-auto
    }
    .success {
      margin-right:3%
    }
  }

  @media screen and (max-width: 640px) {
    .dashboardGroup {
      @apply flex-wrap
    }
    .dashboard {
    width: 200px;
  }
    .dashboard img { 
      width: 46px;
      height: 100%
    }
    .dashboard>>>.board {
      @apply py-1
    }
    .success {
      margin-right: 0px
    }
    .fail, .success, .warn {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    >>>.board {
      @apply p-1
    }
    .more {
      @apply hidden
    }
    .mobile-more {
      @apply block
    }
  }
</style>