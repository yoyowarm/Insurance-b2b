<template>
  <div>
    <CommonBoard class="w-full mb-7" title="被保險人資料">
      <InsuranceInfoFin :info="quotationData.insuraned" type="InsuranedData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="要保險人資料">
      <InsuranceInfoFin :info="quotationData.applicant" type="ApplicantData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="投保資料">
      <InsuranceContent
        :lists="activityInfo"
        :info="quotationData.activityInsureInfo"
        :cityList="cityList"
        :areaList="areaList"
      />
    </CommonBoard>
    <InsuranceAmountListFin
      :lists.sync="quotationData.insuranceAmounts"
      :orderNo="orderNo"
      :infoList="quotationData.activityInsureInfo.activityInfo"
      :countyAmount="countyAmount"
      @getQuotationDetail="quotationDetail"
      type="activity"
    />
    <div class="flex flex-row justify-center items-center w-full mt-8">
      <Button v-if="InsuranceActive !== 7"  @click.native="packHome" class="my-8 w-40 md:w-64 mr-5">儲存報價單</Button>
      <Button v-if="(PolicyStatus == 0 || PolicyStatus == 1 || PolicyStatus == 2 || PolicyStatus == 6 || PolicyStatus == 7) && InsuranceActive !== 6 && InsuranceActive !== 7" @click.native="copyQuotation" class="my-8 w-40 md:w-64 mr-5">更正報價</Button>
      <Button v-if="viewModel" @click.native="openDialog = true" class="my-8 w-40 md:w-64 ">確認核保</Button>
      <Button
        v-if="(PolicyStatus == 1 || PolicyStatus == 0) && InsuranceActive !== 7 && InsuranceActive !== 6 && quotationData.insuranceAmounts.length > 0 && quotationData.insuranceAmounts.find(item => !item.selected && !item.insuranceAmount)"
        @click.native="finishQuotation()"
        :disabled="quotationData.insuranceAmounts.some(item => item.isSelected)"
        class="my-8 w-40 md:w-64 "
        style="background: #DB9F2C">
        開始核保
      </Button>
       <Button
        v-else-if="(PolicyStatus == 7 || PolicyStatus == 0) && quotationData.insuranceAmounts.length > 0 && quotationData.insuranceAmounts.find(item => !item.selected && item.insuranceAmount) && (InsuranceActive > 4 && InsuranceActive !== 6 && InsuranceActive !== 7)"
        :disabled="quotationData.insuranceAmounts.some(item => item.isSelected) || quotationData.insuranceAmounts.filter(item => item.selected && item.insuranceAmount == '- -').length > 0"
        @click.native="finishQuotation('FinishQuotation')"
        class="my-8 w-40 md:w-64 ">確認報價</Button>
      <template v-if="InsuranceActive == 7">
        <Button v-if="underwriteStatus.underwriteLevel <= underwriteStatus.underwriteTargetLevel && underwriteStatus.employeeUnderwriteLevel != 6" class="my-8 w-40 md:w-64 mr-5">向上核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 1 && underwriteStatus.employeeUnderwriteLevel >= underwriteStatus.underwriteTargetLevel" class="my-8 w-40 md:w-64 mr-5">完成核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 1 && underwriteStatus.employeeUnderwriteLevel >= underwriteStatus.underwriteTargetLevel" class="my-8 w-40 md:w-64 mr-5">不予核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 0" class="my-8 w-40 md:w-64 mr-5">確認審核結果</Button>
      </template>
    </div>
    <ViewModelSticker v-if="viewModel" @openDialog="(e) => historyDialog = e"/>
    <QuoteHistory :open.sync="historyDialog"/>
    <PopupDialog
      :open.sync="openDialog"
      headerText="修改保費-活動"
      confirm
      cancel="取消"
      ok="確認核壓保費"
    >
      <p>報價單標號：070FQ013601 被保險人：王曉明</p>
      <div class="column-2 mt-3">
        <InputGroup title="附加條款加費係數">
          <Input slot="input"/>
        </InputGroup>
        <InputGroup title="AGG>AOA*2係數">
          <Input slot="input"/>
        </InputGroup>
      </div>
      <InputGroup class="w-full mt-2" title="期間係數">
        <Input slot="input"/>
      </InputGroup>
      <InputGroup class="w-full mt-2" title="保費">
        <div slot="input" class="w-full pr-24 relative">
          <Input />
          <Button class="absolute right-0 -top-1 w-16 md:w-20 h-full" style="height: 50px">試算</Button>
        </div>
      </InputGroup>
    </PopupDialog>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import Button from '@/components/Button'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import InsuranceInfoFin from '@/components/Common/InsuranceInfoFin'
import InsuranceAmountListFin from '@/components/Common/InsuranceAmountListFin.vue'
import InsuranceContent from '@/components/Activity/InsuranceContent'
import ViewModelSticker from '@/components/viewModelSticker'
import QuoteHistory from '@/components/PopupDialog/QuoteHistory'
// import routeChange from '@/utils/mixins/routeChange'
import LoadingScreen from '@/components/LoadingScreen.vue'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import { mapState } from 'vuex'
import { Popup } from '@/utils/popups'
export default {
  // mixins: [routeChange],
  components: {
    CommonBoard,
    Button,
    InsuranceInfoFin,
    InsuranceAmountListFin,
    InsuranceContent,
    ViewModelSticker,
    QuoteHistory,
    LoadingScreen,
    PopupDialog,
    InputGroup,
    Input,
  },
  data() {
    return {
      historyDialog: false,
      openDialog: false,
      quotationData: {
        insuranceAmounts: [],
        activityInsureInfo: {
          activityInfo: []
        }
      },
      countyAmount: [],
      cityList: [],
      areaList:[],
      underwriteStatus: {},
    }
  },
  computed: {
    ...mapState({
      'Insuraned': state => state.activity.Insuraned,
      'Relation': state => state.activity.Relation,
      'Applicant': state => state.activity.Applicant,
      'sameAsInsured': state => state.activity.sameAsInsured,
      activityInfo: state => state.activity.activityInfo,
      viewModel: state => state.common.viewModel,
      insuranceAmountList: state => state.activity.insuranceAmountList,
      'loading': state => state.app.loading,
      orderNo: state => state.common.orderNo,
      mainOrderNo: state => state.common.mainOrderNo,
      InsuranceActive: state => state.activity.InsuranceActive,
      PolicyStatus: state => state.activity.PolicyStatus,

    }),
    InsuranedData: {
      get() {
        return this.Insuraned
      },
      set(value) {
        this.$store.dispatch('activity/updatedInsuraned', value)
      }
    },
    ApplicantData: {
      get() {
        return this.Applicant
      },
      set(value) {
        this.$store.dispatch('activity/updatedApplicant', value)
      }
    },
    insuranceAmountListData: {
      get() {
        return this.insuranceAmountList
      },
      set(value) {
        this.$store.dispatch('activity/updatedInsuranceAmountList', value)
      }
    },
  },
  methods: {
    async quotationDetail() {
      const detail = await this.$store.dispatch('quotation/GetActivityQuotationDetail', {orderno: this.orderNo,mainOrderNo: this.mainOrderNo})
      this.quotationData = {
        ...detail.data.content,
        insuranceAmounts: detail.data.content.insuranceAmounts.map((item) => {
          return {
            ...item,
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
       this.$store.dispatch(`activity/updatedQuotationData`,this.quotationData)
    },
    packHome() {
      this.$router.push('/quotation-ist')
      this.$store.dispatch('activity/clearAll')
      this.$store.dispatch('activity/updatedUUID', '')
      this.$store.dispatch('common/updateOrderNo',{orderNo: '',mainOrderNo: ''})
    },
    async copyQuotation() {
      if(this.InsuranceActive == 6) return
      this.$store.dispatch('common/updateOrderNo', {orderNo:this.orderNo,mainOrderNo: this.mainOrderNo})
      await this.quotationDetail()
      this.$store.dispatch(`activity/updatedInsuranceActive`,1)
      this.$router.push(`/activity-quotation/step1`)
    },
    async finishQuotation(key) {
      Popup.create({
        hasHtml: true,
        maskClose: false,
        confirm: true,
        ok: '確定',
        cancel: '取消',
        htmlText: `<p>${key? '完成報價' : '開始核保' }後將無法改動報價內容，確定完成報價？</p>`,
      }).then(async () => {
        if(key) {
          await this.$store.dispatch('quotation/FinishQuotation', {orderNo: this.orderNo})
        } else {
          await this.$store.dispatch('underwrite/BeginUnderwriting',{orderno: this.orderNo})
        }
        this.packHome()
        this.$store.dispatch('common/updatedCalculateModel', false)
        this.$store.dispatch(`activity/updatedInsuranceActive`,0)
      })
    },
    async pageInit() {
      const districts = await this.$store.dispatch('resource/Districts')
      const county = await this.$store.dispatch('resource/CountyMinimumSettings')
      this.countyAmount = county.data.content
      districts.data.content.map(item => {
        this.cityList.push({
          ...item,
          Value: item.cityId,
          Text: item.cityName
        })
        item.countyDistricts.map(subItem => {
          this.areaList.push({
            ...subItem,
            Value: subItem.areaId,
            Text: subItem.areaName
          })
        })
      })
    }
  },
  async mounted() {
    await this.quotationDetail()
    await this.pageInit()
    if(this.InsuranceActive == 7) {
      const underwriteStatus = await this.$store.dispatch('underwrite/GetUnderwriteStatusParameter', this.orderNo)
      this.underwriteStatus = underwriteStatus.data.content
    }
  },
}
</script>

<style scoped lang="postcss">
  
</style>