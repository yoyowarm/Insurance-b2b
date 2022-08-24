<template>
  <div class="flex flex-wrap">
    <div class="dashboardGroup">
      <CommonBoard
        v-for="(item, index) in Object.keys(quotationState)"
        :key="index"
        class="dashboard md:mr-5 lg:mr-7"
        :class="{'fail' :item === 'unFinishQuotationAmount', 'success': item === 'finishQuotationAmount', 'warn': item === 'fifteenDaysEffectiveAmount', 'finish': item === 'alreadyIssueAmount'}">
        <div class="flex justify-start">
          <img v-if="item === 'unFinishQuotationAmount'" :src="failIcon" alt="">
          <img v-if="item === 'finishQuotationAmount'" :src="successIcon" alt="">
          <img v-if="item === 'fifteenDaysEffectiveAmount'" :src="warnIcon" alt="">
          <img v-if="item === 'alreadyIssueAmount'" :src="finishIcon" alt="">
          <div class="flex flex-col justify-center">
            <span class="font-semibold text-base md:text-xl lg:text-xl text-gray-700">{{stateText[item]}}</span>
            <span class="text-fail font-bold text-base md:text-xl lg:text-xl tracking-tighter"
            :class="{'text-fail' :item === 'unFinishQuotationAmount', 'text-success': item === 'finishQuotationAmount', 'text-warn': item === 'fifteenDaysEffectiveAmount', 'text-finish': item === 'alreadyIssueAmount'}">
              單數
              <!-- <span>：{{item.text.replace(/\/[0-9]{0,}/g, '')}}</span> -->
              <span class="text-lg md:text-3xl lg:text-4xl pr-2">{{quotationState[item]}}</span>
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
              :options="stateList"
              :selected="stateSelected.Value.toString()"
              @emitItem="e => stateSelected = e"
            />
          </InputGroup>
          <InputGroup class="w-full" noMt>
            <Select
              slot="input"
              defaultText="選擇類型"
              :options="typeList"
              :selected="typeSelected.Value.toString()"
              @emitItem="e => typeSelected = e"
            />
          </InputGroup>
          <InputGroup class="w-full" noMt>
            <DatePicker slot="input" :dateObject="startDate" @emitDateItem="(e) => startDate = e" suffix="起"/>
          </InputGroup>
          <InputGroup class="w-full" noMt>
            <DatePicker slot="input" :dateObject="endDate" @emitDateItem="(e) => endDate = e" suffix="迄" disabled/>
          </InputGroup>
          <InputGroup class="w-full" noMt>
            <Input
              slot="input"
              placeholder="輸入要保人姓名"
              :value="ApplicantName"
              @updateValue="(e) => ApplicantName = e"
            />
          </InputGroup>
          <Button @click.native="getQuotationList" class="copy-button">查詢</Button>
        </div>
        <TableGroup :data="quotationListTable" :slotName="slotArray" scrollX>
          <template v-for="(item,index) in quotationListTable.rows">
            <div :slot="`edit-${index}`" :key="`edit${index}`" class="flex flex-col justify-center items-center">
              <span class="download" @click="popup(item)">列印</span>
              <span class="download" @click="review(item.type,item.orderNo)">查看</span>
              <span class="download" @click="copyQuotation(item.type,item.orderNo)">複製</span>
            </div>
          </template>
        </TableGroup>
        <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
      </CommonBoard>
    </div>
    <DownloadFile :open.sync="open" :orderNo="orderNo" :item="downloadQuotation" headerText="列印文件"/>
    <WindowResizeListener @resize="handleResize"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
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
import LoadingScreen from '@/components/LoadingScreen.vue'
import editCopyQuotation from '@/utils/mixins/editCopyQuotation'
import DownloadFile from '@/components/PopupDialog/DownloadFile.vue'
import { quotationListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  mixins: [editCopyQuotation],
  components: {
    CommonBoard,
    TableGroup,
    Pagination,
    WindowResizeListener,
    InputGroup,
    Input,
    Select,
    Button,
    DatePicker,
    LoadingScreen,
    DownloadFile
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      open: false,
      downloadQuotation: {},
      failIcon,
      successIcon,
      warnIcon,
      finishIcon,
      ApplicantName: '',
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
          "type": "unFinishQuotationAmount",
          "text": "1/0"
        },
        {
          "type": "finishQuotationAmount",
          "text": "1/0"
        },
        {
          "type": "fifteenDaysEffectiveAmount",
          "text": "15/26"
        },
        {
          "type": "alreadyIssueAmount",
          "text": "15/26"
        },
      ],
      stateList: [
        {
          Text: '未完成報價',
          Value: 1
        },
        {
          Text: '報價完成',
          Value: 2
        },
        {
          Text: '在15天內保單生效',
          Value: 3
        },
        {
          Text: '已出單',
          Value: 4
        },
      ],
      stateSelected: {
        Text: '選擇狀態',
        Value: 0
      },
      typeList: [
        {
          Text: '全部',
          Value: '0'
        },
        {
          Text: '處所',
          Value: 1
        },
        {
          Text: '活動',
          Value: 2
        }
      ],
      typeSelected: {
        Text: '全部',
        Value: '0'
      },
      quotationList: quotationListTable(),
      quotationState: {
        unFinishQuotationAmount: 0,
        finishQuotationAmount: 0,
        fifteenDaysEffectiveAmount: 0,
        alreadyIssueAmount: 0,
      },
      stateText: {
        unFinishQuotationAmount: '報價中',
        finishQuotationAmount: '報價完成',
        fifteenDaysEffectiveAmount: '15天有效',
        alreadyIssueAmount: '已發行',
      }
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
      'orderNo': state => state.common.orderNo,
    }),
    slotArray () {
      const arr = []
      const slotArr = [ 'edit']
      for (let i = 0; i < this.quotationListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    },
    quotationListTable: {
      get() {
        return this.quotationList
      },
      set(val) {
        this.quotationList = val
      }
    }
  },
  watch: {
    async currentPage() {
      await this.getQuotationList()
    },
    quotationStatus() {
      if(this.currentPage > 1) {
        this.changePage(1)
      } else {
        this.getQuotationList()
      }
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    changePage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
    },
    async getQuotationList() {
      const data = {
        Skip: (this.currentPage-1)*10,
        Take: 10,
        State: this.stateSelected.Value == '0' ? '' : this.stateSelected.Value,
        Type: this.typeSelected.Value == '0' ? '' : this.typeSelected.Value,
        ApplicantName: this.ApplicantName,
      }
      if(this.startDate.year !== '' && this.startDate.month !== '' && this.startDate.day !== '') {
        data.QuotationDateBegin = `${Number(this.startDate.year)+1911}-${this.startDate.month}-${this.startDate.day}`
      }
      if(this.endDate.year !== '' && this.endDate.month !== '' && this.endDate.day !== '') {
        data.QuotationDateEnd = `${Number(this.endDate.year)+1911}-${this.endDate.month}-${this.endDate.day}`
      }
      const quotationList = await this.$store.dispatch('quotation/GetQuotationList', data)
      this.quotationListTable = { head: [...this.quotationListTable.head], rows:[...quotationList.data.content.quotations.map(item => {
        return {
          ...item,
          quotationDate: item.quotationDate? item.quotationDate.split('T')[0] : '',
          typeText: item.type === 1 ? '處所' : item.type === 2 ? '活動' : '',
          stateText: item.state === 1 ? this.stateText['unFinishQuotationAmount'] : item.state === 2 ? this.stateText['finishQuotationAmount'] : item.state === 3 ? this.stateText['fifteenDaysEffectiveAmount'] : item.state === 4 ? this.stateText['alreadyIssueAmount'] : '',
        }
      })
      ]}
      this.$store.dispatch('app/updatedTotalPage',Math.ceil(quotationList.data.content.totalCount/10))
    },
    review(type, orderNo) {
      this.$store.dispatch('common/updateOrderNo', orderNo)
      this.$router.push(`/${type == 1 ? 'place' : 'activity'}-quotation/step3`)
    },
    popup(item) {
      console.log(item)
      this.downloadQuotation = item
      this.open = true
      this.$store.dispatch('common/updateOrderNo', item.orderNo)
    },
    async copyQuotation(type,orderNo) {
      this.$store.dispatch('common/updateOrderNo', orderNo)
      await this.quotationDetail(type,orderNo)
      this.$router.push(`/${type == 1 ? 'place' : 'activity'}-quotation/step1`)
    },
    async quotationDetail(type,orderNo) {
      const detail = await this.$store.dispatch(`quotation/Get${type == 1?'Place': 'Activity'}QuotationDetail`, orderNo)
      const data = {
        ...detail.data.content,
        insuranceAmounts: detail.data.content.insuranceAmounts.map((item,index) => {
          return {
            ...item,
            // eslint-disable-next-line no-prototype-builtins
            selected: item.hasOwnProperty('isSelected') ? item.isSelected : (index == 0 ? true : false),
            fixed: false,
            insuranceTotalAmount: item.insuranceTotalAmount/10000,
            mergeSingleAmount: item.mergeSingleAmount/10000,
            perAccidentBodyAmount: item.perAccidentBodyAmount/10000,
            perAccidentFinanceAmount: item.perAccidentFinanceAmount/10000,
            perBodyAmount: item.perBodyAmount/10000,
            parameter: {
              basicFee: '',
              finalHC: '',
              sizeParameter: '',
              selfInflictedParameter: '',
              shortPeriodParameter: '',
              additionalCostParameter: '',
              mutiSizeParameter: '',
              additionTermCoefficientParameter: '',
              aggAOACoefficient: '',
              amount: '',
            }
          }
        })
      }
      this.$store.dispatch(`${type == 1?'place' : 'activity'}/updatedQuotationData`,data)
    },
  },
  async mounted() {
    this.$store.dispatch('app/updatedCurrentPage',1)
    await this.getQuotationList()
    const data = await this.$store.dispatch('quotation/GetQuotationState')
    this.quotationState = data.data.content
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