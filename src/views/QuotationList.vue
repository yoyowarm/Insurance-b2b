<template>
  <div class="flex flex-wrap">
    <div class="dashboardGroup">
      <CommonBoard
        v-for="(item, index) in state"
        :key="index"
        class="dashboard md:mr-5 lg:mr-7"
        :class="{'fail' :item.type === '未核保', 'success': item.type === '已核保', 'warn': item.type === '十五天後生效', 'finish': item.type === '已出單'}">
        <div class="flex justify-start">
          <img v-if="item.type === '未核保'" :src="failIcon" alt="">
          <img v-if="item.type === '已核保'" :src="successIcon" alt="">
          <img v-if="item.type === '十五天後生效'" :src="warnIcon" alt="">
          <img v-if="item.type === '已出單'" :src="finishIcon" alt="">
          <div class="flex flex-col justify-center">
            <span class="font-semibold text-base md:text-xl lg:text-xl text-gray-700">{{item.type}}</span>
            <span class="text-fail font-bold text-base md:text-xl lg:text-xl tracking-tighter"
            :class="{'text-fail' :item.type === '未核保', 'text-success': item.type === '已核保', 'text-warn': item.type === '十五天後生效', 'text-finish': item.type === '已出單'}">
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
    <div class="flex justify-around w-full mt-6">
      <CommonBoard class="w-full" title="報價明細">
        <img slot="icon" class="w-7 h-8 mr-1" src="../assets/images/icon_list_alt.png" alt="">
        <template slot="right" v-if="windowWidth > 770">
          <div class="flex flex-row">
            <span class="flex items-end h-full mr-4">
              <span class="text-base text-main"><font-awesome-icon class="mr-1" icon="far fa-trash-alt" />清除過期報價單</span>
            </span>
            <span class="download text-base"><font-awesome-icon class="mr-1" icon="external-link-alt" /><span>匯出報價</span></span>
          </div>
        </template>
        <div class="column-6 pb-6">
          <InputGroup class="w-full" noMt>
            <Select
              slot="input"
              defaultText="選擇狀態"
            />
          </InputGroup>
          <InputGroup class="w-full" noMt>
            <Select
              slot="input"
              defaultText="選擇類型"
            />
          </InputGroup>
          <InputGroup class="w-full" noMt>
            <DatePicker slot="input" :dateObject="startDate" suffix="起"/>
          </InputGroup>
          <InputGroup class="w-full" noMt>
            <DatePicker slot="input" :dateObject="endDate" suffix="迄" disabled/>
          </InputGroup>
          <InputGroup class="w-full" noMt>
            <Input
              slot="input"
              placeholder="輸入要保人姓名"
            />
          </InputGroup>
          <Button class="copy-button">查詢</Button>
        </div>
        <TableGroup :data="quotationListTable" :slotName="slotArray" scrollX>
          <template v-for="(item,index) in quotationListTable.rows">
            <div v-if="index === 0" slot="edit" :key="`edit${index}`" class="flex flex-row">
              <Button class="copy-button mr-2" outline>查看</Button>
              <Button class="copy-button" outline>複製</Button>
            </div>
          </template>
        </TableGroup>
        <Pagination v-if="windowWidth > 770" :totalPage="10" :currentPage="1" @changePage="changePage"/>
      </CommonBoard>
    </div>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import TableGroup from '@/components/TableGroup'
import Button from '@/components/Button/index.vue'
import failIcon from '@/assets/images/not_checked_state.png'
import successIcon from '@/assets/images/checked_state.png'
import warnIcon from '@/assets/images/after_effect_state.png'
import finishIcon from '@/assets/images/finish_state.png'
import Pagination from '@/components/pagination'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select/index.vue'
import DatePicker from '@/components/DatePicker/index.vue'
import { quotationListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  components: {
    CommonBoard,
    TableGroup,
    Pagination,
    WindowResizeListener,
    InputGroup,
    Input,
    Select,
    Button,
    DatePicker
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      failIcon,
      successIcon,
      warnIcon,
      finishIcon,
      startDate: {
        year: '',
        month: '',
        day: ''
      },
      endDate: {
        year: '',
        month: '',
        day: ''
      },
      state: [
        {
          "type": "未核保",
          "text": "1/0"
        },
        {
          "type": "已核保",
          "text": "1/0"
        },
        {
          "type": "十五天後生效",
          "text": "15/26"
        },
        {
          "type": "已出單",
          "text": "15/26"
        },
      ],
      quotationListTable: quotationListTable(),
      slotArray: [
        {name: 'edit', class: 'w-2-6'}
      ],
    }
  },
  computed: {
    ...mapState({
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    })
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    changePage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
    },
  }
}
</script>

<style scoped lang="postcss">
  .download {
    color: #1076EE;
    @apply cursor-pointer
  }
  .copy-button {
    min-width: 96px;
    height: 40px;
    margin-top: 0.625rem
  }
  .dashboardGroup {
    @apply flex w-full relative flex-wrap
  }
  .dashboard {
    width: 260px;
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
  .dashboard.finish>>>.board {
    border-bottom: 5px solid #29B4E0;
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
    .fail, .success, .warn, .finish {
      width: 48%;
      margin: 0px 1%
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
    .copy-button {
      width: 50%;
    }
  }
</style>