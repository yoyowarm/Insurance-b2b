<template>
  <div class="flex flex-wrap">
    <div class="flex justify-around w-full mt-6">
      <CommonBoard class="w-full relative">
        <NavMenu
          class="menu"
          :itemLists="itemLists"
          :currentTag="currentTag"
          @updatedMenu="(e) => currentTag = e"
        />
        <div v-if="currentTag == 1 || currentTag == 2" class="column-6 p-3 pb-6">
          <InputGroup class="w-full" title="核保狀態">
            <Select
              slot="input"
              defaultText="選擇狀態"
              :options="verifyStatusLists"
              :selected="(verifyStatus).toString()"
              @emitItem="(item) => verifyStatus = item.Value"
            />
          </InputGroup>
          <InputGroup class="w-full" title="公司單位">
            <Select
              slot="input"
              defaultText="選擇公司單位"
              :options="NGroupLists"
              :selected="(NGroup).toString()"
              @emitItem="(item) => NGroup = item.Value"
            />
          </InputGroup>
          <InputGroup class="w-full" title="核保階級">
            <Select
              slot="input"
              defaultText="選擇階級"
              :options="layerLists"
              :selected="(layer).toString()"
              @emitItem="(item) => layer = item.Value"
            />
          </InputGroup>
        </div>
        <div class="column-6 p-3 pb-6 ">
          <InputGroup class="w-full" title="被保險人姓名">
            <Input
              slot="input"
              placeholder="輸入被保人姓名"
              :value="InsuredName"
              @updateValue="(e) => InsuredName = e"
            />
          </InputGroup>
          <InputGroup class="w-full" title="要保險人姓名">
            <Input
              slot="input"
              placeholder="輸入要保人姓名"
              :value="ApplicantName"
              @updateValue="(e) => ApplicantName = e"
            />
          </InputGroup>
          <InputGroup class="w-full" title="關聯號">
            <Input
              slot="input"
              placeholder="輸入關聯號"
              :value="MainOrderNo"
              @updateValue="(e) => MainOrderNo = e"
            />
          </InputGroup>
          <InputGroup class="w-full" title="經手人代號">
            <Input
              slot="input"
              placeholder="輸入經手人代號"
              :value="IOffIcer"
              @updateValue="(e) => IOffIcer = e"
            />
          </InputGroup>
          <InputGroup class="w-full" title="類型">
            <Select
              slot="input"
              defaultText="選擇類型"
              :options="typeList"
              :selected="typeSelected.Value.toString()"
              @emitItem="e => typeSelected = e"
            />
          </InputGroup>
          <InputGroup class="w-full col-span-2 md:col-span-1" title="報價日期">
            <DatePicker slot="input" :dateObject="startDate" @emitDateItem="(e) => startDate = e" suffix="起" formerYears/>
          </InputGroup>
          <!-- <InputGroup class="w-full" noMt>
            <DatePicker slot="input" :dateObject="endDate" @emitDateItem="(e) => endDate = e" suffix="迄" disabled/>
          </InputGroup> -->
        </div>
        <div class="w-full flex justify-center mt-6 border-dashed border-0 border-t-2 h-10 relative">
          <Button @click.native="getQuotationList(true)" class="absolute -top-5 w-32"><span class="whitespace-no-wrap">查詢</span></Button>
        </div>
        <div v-if="currentTag == 0" class="column-6 p-3 pb-6">
          <InputGroup class="w-full" title="報價單狀態">
            <Select
              slot="input"
              defaultText="選擇狀態"
              :options="stateList"
              :selected="stateSelected.Value.toString()"
              @emitItem="e => stateSelected = e"
            />
          </InputGroup>
        </div>
       
        <QuotationList :list="quotationList" :currentTag="currentTag" @updateQuotationList="getQuotationList"/>
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
import Button from '@/components/Button/index.vue'
import Pagination from '@/components/pagination'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select/index.vue'
import DatePicker from '@/components/DatePicker/index.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import editCopyQuotation from '@/utils/mixins/editCopyQuotation'
import DownloadFile from '@/components/PopupDialog/DownloadFile.vue'
import QuotationList from '@/components/QuotationList.vue'
import NavMenu from '@/components/NavMenu'
import { mapState } from 'vuex'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  mixins: [editCopyQuotation],
  components: {
    CommonBoard,
    Pagination,
    WindowResizeListener,
    InputGroup,
    Input,
    Select,
    Button,
    DatePicker,
    LoadingScreen,
    DownloadFile,
    QuotationList,
    NavMenu
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      currentTag: 0,
      itemLists:[
        { text: '報價明細', value: 0 }
      ],
      open: false,
      downloadQuotation: {},
      ApplicantName: '',
      InsuredName: '',
      IOffIcer: '',
      MainOrderNo: '',
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
          "type": "waitUnderwriting",
          "text": "1/0"
        },
        {
          "type": "finishUnderwriting",
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
          Text: '待核保',
          Value: 1
        },
        {
          Text: '已核保',
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
        {
          Text: '取消',
          Value: 99
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
      quotationList: [],
      stateText: {
        1: '待核保',
        2: '核保中',
        6: '請洽核保',
        7: '已核保',
        8: '完成報價',
        9: '已出單',
        99: '取消'
      },
      quotationStateText: {
        1: '待核保',
        2: '已核保',
        3: '在15天內保單生效',
        4: '已出單',
        5: '核保中',
        6: '請洽核保',
        99: '取消'
      },
      verifyStatus: 2,//審核狀態
      verifyStatusLists: [
        {Text: '全部',Value:2},
        {Text: '核保中',Value:1},
        {Text: '待確認審核結果',Value:0},
      ],//審核狀態列表
      NGroup: '',//公司
      NGroupLists: [],//公司列表
      layer: '7',//階級
      layerLists: [
        {Text: '全部',Value: '7'},
        {Text: '第二階',Value: '2'},
        {Text: '第三階',Value: '3'},
        {Text: '第四階',Value: '4'},
        {Text: '第五階',Value: '5'},
        {Text: '第六階',Value: '6'},
      ],//階級列表
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
      'orderNo': state => state.common.orderNo,
      'token': state => state.home.token
    }),
  },
  watch: {
    async currentPage() {
      // await this.getQuotationList()
    },
    async currentTag(val,oldVal) {
      if(val !== oldVal) {
        this.$route.query.tag = val
        // await this.$store.dispatch('app/getSetting')//取得設定是否有討論版
        // await this.getQuotationList(true)
      }
    },
    quotationStatus() {
      if(this.currentPage > 1) {
        this.changePage(1)
      } else {
        // this.getQuotationList()
      }
    },
    stateSelected: {
      async handler(val,old) {
        if(this.currentTag == 0 && val.Value !== old.Value) {
          // await this.getQuotationList()
        }
      },
      deep: true
    },
    '$route.path': {
      async handler(val,old) {
        if(val !== old) {
          if(val == '/quotation-list') {
            this.currentTag = 0
            this.itemLists = [{ text: '報價明細', value: 0 }]
          } else {
            this.currentTag = 1
            this.itemLists = [{ text: '核保明細', value: 1 },{ text: '核保歷程', value: 2}]
          }
          this.ApplicantName = ''
          this.InsuredName = ''
          this.IOffIcer = ''
          this.MainOrderNo= ''
          this.startDate= {
            year: '',
            month: '',
            day: ''
          }
          this.endDate ={
            year: '',
            month: '',
            day: ''
          }
        }
      },
      deep: true
    },
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    changePage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
    },
    async getQuotationList(reset) {
      if(reset) {
        this.$store.dispatch('app/updatedCurrentPage',1)
      }
      this.quotationList = []
      const data = {
        Skip:  (this.currentPage-1)*10,
        Take: 10,
        QuotationListState: this.stateSelected.Value == '0' ? '' : this.stateSelected.Value,
        Type: this.typeSelected.Value == '0' ? '' : this.typeSelected.Value,
        ApplicantName: this.ApplicantName,
        InsuredName: this.InsuredName,
        IOffIcer: this.IOffIcer,
        MainOrderNo: this.MainOrderNo,
      }
      if(this.startDate.year !== '' && this.startDate.month !== '' && this.startDate.day !== '') {
        data.QuotationDateBegin = `${Number(this.startDate.year)+1911}-${this.startDate.month}-${this.startDate.day}`
      }
      if(this.endDate.year !== '' && this.endDate.month !== '' && this.endDate.day !== '') {
        data.QuotationDateEnd = `${Number(this.endDate.year)+1911}-${this.endDate.month}-${this.endDate.day}`
      }
      this.quotationList = [
        {
          "serialNo": "10000",
          "daySettleDate": "2025-06-01",
          "InsurancePremiums": 950,
          "insuranceAmount": 500000,
          "quotationDate": "2025-06-01",
          "insuranceBeginTime": "2025-07-01T00:00:00",
          "insuranceEndTime": "2026-07-01T00:00:00",
          "policyStatus": 7,
          "stateText": "已核保",
          "mainOrderNo": "MO-10000",
          "orderNo": "O-10000",
          "type": 1,
          "policyNo": "PN-10000",
          "isFinishQuotation": false,
          "iofficer": "H318",
          "insuredName": "保戶1",
          "applicantName": "保戶1"
        },
        {
          "serialNo": "10001",
          "daySettleDate": null,
          "InsurancePremiums": 950,
          "insuranceAmount": 500000,
          "quotationDate": "2025-06-02",
          "insuranceBeginTime": "2025-07-02T00:00:00",
          "insuranceEndTime": "2026-07-02T00:00:00",
          "policyStatus": 7,
          "stateText": "已核保",
          "mainOrderNo": "MO-10001",
          "orderNo": "O-10001",
          "type": 2,
          "policyNo": "PN-10001",
          "isFinishQuotation": false,
          "iofficer": "H318",
          "insuredName": "保戶2",
          "applicantName": "保戶2"
        },
        {
          "serialNo": "10002",
          "daySettleDate": "2025-06-03",
          "InsurancePremiums": 800,
          "insuranceAmount": 500000,
          "quotationDate": "2025-06-03",
          "insuranceBeginTime": "2025-07-03T00:00:00",
          "insuranceEndTime": "2026-07-03T00:00:00",
          "policyStatus": 1,
          "stateText": "待核保",
          "mainOrderNo": "MO-10002",
          "orderNo": "O-10002",
          "type": 2,
          "policyNo": "PN-10002",
          "isFinishQuotation": true,
          "iofficer": "H318",
          "insuredName": "保戶3",
          "applicantName": "保戶3"
        },
        {
          "serialNo": "10003",
          "daySettleDate": null,
          "InsurancePremiums": null,
          "insuranceAmount": null,
          "quotationDate": "2025-06-04",
          "insuranceBeginTime": "2025-07-04T00:00:00",
          "insuranceEndTime": "2026-07-04T00:00:00",
          "policyStatus": 99,
          "stateText": "取消",
          "mainOrderNo": "MO-10003",
          "orderNo": "O-10003",
          "type": 2,
          "policyNo": "PN-10003",
          "isFinishQuotation": false,
          "iofficer": "H318",
          "insuredName": "保戶4",
          "applicantName": "保戶4"
        },
        {
          "serialNo": "10004",
          "daySettleDate": "2025-06-05",
          "InsurancePremiums": 1200,
          "insuranceAmount": 500000,
          "quotationDate": "2025-06-05",
          "insuranceBeginTime": "2025-07-05T00:00:00",
          "insuranceEndTime": "2026-07-05T00:00:00",
          "policyStatus": 8,
          "stateText": "完成報價",
          "mainOrderNo": "MO-10004",
          "orderNo": "O-10004",
          "type": 2,
          "policyNo": "PN-10004",
          "isFinishQuotation": false,
          "iofficer": "H318",
          "insuredName": "保戶5",
          "applicantName": "保戶5"
        }
      ]
      if(this.currentTag == 0) {
        // const quotationList = await this.$store.dispatch('quotation/GetQuotationList', data)
        
        // this.$store.dispatch('app/updatedTotalPage',Math.ceil(quotationList.data.content.totalCount/10))
      } else {
        // let quotationList = null
        // data.UnderwriteDirection = this.verifyStatus == 2 ? '' : this.verifyStatus
        // data.GroupName = this.NGroup == '選擇公司單位' ? '' : this.NGroup
        // data.Level = this.layer == '7' ? '' : this.layer
        // if(this.currentTag == 1) {
        //   quotationList = await this.$store.dispatch('underwrite/GetUnderwriteQuotationList', data)
        // } else if (this.currentTag ==2) {
        //   quotationList = await this.$store.dispatch('underwrite/GetUnderwriteReviewedList', data)
        // }
        // this.quotationList = [...quotationList.data.content[this.currentTag == 1 ? 'underwrites' : 'underwriteReviews'].map(item => {
        //   return {
        //     ...item,
        //     serialNo: item.serialNo.toString(),
        //     underwriteStateText: this.currentTag ==1 ? (item.underwriteState === 0 ? '待確認核保結果' : '核保中') : this.quotationStateText[item.quotationListState],
        //     quotationDate: item.quotationDate? item.quotationDate.split(' ')[0] : '',
        //     insuranceAmount: item.insuranceAmount ? item.insuranceAmount : '- -',
        //     waitConfirmEmployeeName: item.waitConfirmEmployeeName ? item.waitConfirmEmployeeName : '- -',
        //     underwriteEmployee: item.underwriteEmployee ? item.underwriteEmployee : '- -',
        //   }
        // })]
        // this.$store.dispatch('app/updatedTotalPage',Math.ceil(quotationList.data.content.totalCount/10))
      }
      
    },
    async quotationDetail(type) {
      // const detail = await this.$store.dispatch(`quotation/Get${type == 1?'Place': 'Activity'}QuotationDetail`, orderNo)
      const data = {
        insuranceAmounts: [
          {
            insuranceTotalAmount: 500000 / 10000,           // => 50
            mergeSingleAmount: 300000 / 10000,              // => 30
            perAccidentBodyAmount: 200000 / 10000,          // => 20
            perAccidentFinanceAmount: 100000 / 10000,       // => 10
            perBodyAmount: 150000 / 10000,                  // => 15
            selected: true,
            fixed: false,
            parameter: {
              basicFee: '500',
              finalHC: '100',
              sizeParameter: '1.2',
              selfInflictedParameter: '0.9',
              shortPeriodParameter: '1.1',
              additionalCostParameter: '200',
              mutiSizeParameter: '1.0',
              additionTermCoefficientParameter: '0.95',
              aggAOACoefficient: '1.05',
              amount: '500000'
            }
          },
          {
            insuranceTotalAmount: 300000 / 10000,           // => 30
            mergeSingleAmount: 200000 / 10000,              // => 20
            perAccidentBodyAmount: 100000 / 10000,          // => 10
            perAccidentFinanceAmount: 50000 / 10000,        // => 5
            perBodyAmount: 80000 / 10000,                   // => 8
            selected: false,
            fixed: false,
            parameter: {
              basicFee: '300',
              finalHC: '80',
              sizeParameter: '1.0',
              selfInflictedParameter: '1.0',
              shortPeriodParameter: '1.0',
              additionalCostParameter: '150',
              mutiSizeParameter: '0.9',
              additionTermCoefficientParameter: '0.92',
              aggAOACoefficient: '1.02',
              amount: '300000'
            }
          }
        ],
        questionnaire: true // 加上這行，讓之前的條件成立
      }
      this.$store.dispatch(`${type == 1?'place' : 'activity'}/updatedQuotationData`,data)
    },
  },
  async mounted() {
    // await this.$store.dispatch('app/getSetting')//取得設定是否有討論版
    this.$store.dispatch('app/updatedCurrentPage',1)
    if(this.$route.query.type) {
      const target = this.stateList.find(i => i.Text == this.$route.query.type)
      this.stateSelected = target
    } 
    if(this.$route.path == '/underwriting-list') {
      if(this.$route.query.tag == 2) {
        this.currentTag =2
      } else {
        this.currentTag =1
      }
      this.itemLists = [{ text: '核保明細', value: 1 },{ text: '核保歷程', value: 2}]
    }
    await this.getQuotationList()
    // const data = await this.$store.dispatch('quotation/GetQuotationState')
    // this.quotationState = data.data.content
    // const group = await this.$store.dispatch('resource/GetTaianNGroup')
    // this.NGroupLists = group.data.content.map(i => {
    //   return {
    //     Value: i,
    //     Text: i
    //   }
    // })
    // this.NGroupLists.unshift({
    //   Value: '',
    //   Text: '全部'
    // })
    
  },
  destroyed() {
    this.$store.dispatch('common/updatedChatMessage', [])
  }
}
</script>

<style scoped lang="postcss">
  .download {
    color: #1076EE;
    @apply cursor-pointer
  }
  .menu {
    top: -27px;
    @apply absolute
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