<template>
  <div>
    <CommonBoard class="w-full mb-7" title="被保險人資料">
      <InsuranceInfoFin :info="quotationData.insuraned" type="InsuranedData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="要保險人資料">
      <InsuranceInfoFin :info="quotationData.applicant" type="ApplicantData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="投保資料">
      <InsuranceContent :info="quotationData.placeInsureInfo? quotationData.placeInsureInfo : {}"/>
    </CommonBoard>
    <InsuranceAmountListFin
      :lists.sync="quotationData.insuranceAmounts"
      :orderNo="orderNo"
      :infoList="quotationData.placeInsureInfo ? quotationData.placeInsureInfo.placeInfo : []"
      :countyAmount="countyAmount"
      :InsuranceActive="InsuranceActive"
      :parameter="parameter"
      :underwriteCoefficient="underwriteCoefficient"
      @getQuotationDetail="quotationDetail"
      type="place"
    />
    <div class="button-group">
      <Button v-if="InsuranceActive !== 7"  @click.native="packHome" class="my-3 md:my-8 w-64 mr-0 md:mr-5">儲存報價單</Button>
      <Button v-if="(PolicyStatus == 0 || PolicyStatus == 1 || PolicyStatus == 2 || PolicyStatus == 6 || PolicyStatus == 7) && InsuranceActive !== 6 && InsuranceActive !== 7 && InsuranceActive !== 8" @click.native="copyQuotation(1)" class="my-3 md:my-8 w-64 md:mr-5">更正報價</Button>
      <Button v-if="viewModel" @click.native="openDialog = true" class="my-3 md:my-8 w-64 ">確認核保</Button>
      <Button
        v-if="(PolicyStatus == 1 || PolicyStatus == 0) && InsuranceActive !== 7 && InsuranceActive !== 6 && quotationData.insuranceAmounts.length > 0 && quotationData.insuranceAmounts.find(item => !item.selected && !item.insuranceAmount)"
        @click.native="finishQuotation()"
        :disabled="quotationData.insuranceAmounts.some(item => item.isSelected)"
        class="my-3 md:my-8 w-64 "
        style="background: #DB9F2C">
        送出核保
      </Button>
       <Button
        v-else-if="(PolicyStatus == 7 || PolicyStatus == 0) && quotationData.insuranceAmounts.length > 0 && quotationData.insuranceAmounts.find(item => !item.selected && item.insuranceAmount) && (InsuranceActive > 4 && InsuranceActive !== 6 && InsuranceActive !== 7)"
        :disabled="quotationData.insuranceAmounts.some(item => item.isSelected) || quotationData.insuranceAmounts.filter(item => item.selected && item.insuranceAmount == '- -').length > 0"
        @click.native="finishQuotation('FinishQuotation')"
        class="my-3 md:my-8 w-64 ">確認報價</Button>
      <template v-if="InsuranceActive == 7">
        <Button  @click.native="copyQuotation(7)" class="my-3 md:my-8 w-64 md:mr-5">更正</Button>
        <Button v-if="(underwriteStatus.underwriteDirection == 1 && underwriteStatus.employeeUnderwriteLevel != 6) || (underwriteStatus.underwriteDirection == 0 && underwriteStatus.isLastActionEditUnderwrite && underwriteStatus.employeeUnderwriteLevel != 6)" class="my-3 md:my-8 w-64 md:mr-5" @click.native="updateUnderwrite(1)">向上核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 1 && underwriteStatus.employeeUnderwriteLevel >= underwriteStatus.underwriteTargetLevel" class="my-3 md:my-8 w-64 md:mr-5" @click.native="updateUnderwrite(2)">完成核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 1" class="my-3 md:my-8 w-64 md:mr-5" @click.native="updateUnderwrite(3)">不予核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 0  && !underwriteStatus.isLastActionEditUnderwrite" class="my-3 md:my-8 w-64 md:mr-5" @click.native="updateUnderwrite(4)">確認審核結果</Button>
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
import InsuranceContent from '@/components/Place/InsuranceContent'
import ViewModelSticker from '@/components/viewModelSticker'
import QuoteHistory from '@/components/PopupDialog/QuoteHistory'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import editCopyQuestionnaire from '@/utils/mixins/editCopyQuestionnaire'
// import routeChange from '@/utils/mixins/routeChange'
import { mapState } from 'vuex'
import { Popup } from '@/utils/popups'
export default {
  mixins: [editCopyQuestionnaire],
  components: {
    CommonBoard,
    Button,
    InsuranceInfoFin,
    InsuranceAmountListFin,
    InsuranceContent,
    ViewModelSticker,
    QuoteHistory,
    PopupDialog,
    InputGroup,
    Input,
    LoadingScreen
  },
  data() {
    return {
      historyDialog: false,
      openDialog: false,
      correct:false,
      // quotationData: {
      //   insuranceAmounts: [{
      //     parameter: {
      //       basicFee: '',
      //       finalHC: '',
      //       sizeParameter: '',
      //       selfInflictedParameter: '',
      //       shortPeriodParameter: '',
      //       additionalCostParameter: '',
      //       mutiSizeParameter: '',
      //       additionTermCoefficientParameter: '',
      //       aggAOACoefficient: '',
      //       amount: '',
      //     }
      //   }],
      //   placeInsureInfo:{
      //     placeInfo: [],
      //   }
      // },
      underwriteStatus: {},
      countyAmount: [],
      underwriteCoefficient: ''
    }
  },
  computed: {
    ...mapState({
      'Insuraned': state => state.place.Insuraned,
      'Relation': state => state.place.Relation,
      'Applicant': state => state.place.Applicant,
      'sameAsInsured': state => state.place.sameAsInsured,
      placeInfo: state => state.place.placeInfo,
      viewModel: state => state.common.viewModel,
      'loading': state => state.app.loading,
      insuranceAmountList: state => state.place.insuranceAmountList,
      orderNo: state => state.common.orderNo,
      mainOrderNo: state => state.common.mainOrderNo,
      InsuranceActive: state => state.place.InsuranceActive,
      PolicyStatus: state => state.place.PolicyStatus,
      parameter: state => state.place.parameter,
      quotationData: state => state.place.quotationData,
      questionnaire: state => state.place.questionnaire,
    }),
    InsuranedData: {
      get() {
        return this.Insuraned
      },
      set(value) {
        this.$store.dispatch('place/updatedInsuraned', value)
      }
    },
    ApplicantData: {
      get() {
        return this.Applicant
      },
      set(value) {
        this.$store.dispatch('place/updatedApplicant', value)
      }
    },
    insuranceAmountListData: {
      get() {
        return this.insuranceAmountList
      },
      set(value) {
        this.$store.dispatch('place/updatedInsuranceAmountList', value)
      }
    },
  },
  methods: {
    async copyQuotation(InsuranceActive) {
      if(this.InsuranceActive == 6) return
      this.correct = true
      this.$store.dispatch('common/updateOrderNo', {orderNo:this.orderNo,mainOrderNo: this.mainOrderNo})
      await this.quotationDetail()
      this.$store.dispatch(`place/updatedInsuranceActive`,InsuranceActive ? InsuranceActive : 1)
      this.$router.push(`/place-quotation/step1`)
    },
    async quotationDetail() {
      const detail = await this.$store.dispatch('quotation/GetPlaceQuotationDetail', {orderno: this.orderNo,mainOrderNo: this.mainOrderNo})
      const quotationData = {
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
      console.log(quotationData)
      this.$store.dispatch(`place/updatedQuotationData`,quotationData)
    },
    packHome(updateUnderwrite = false) {
      this.$router.push(`/quotation-ist?tag=${updateUnderwrite == true ? 1 : ''}` )
      this.$store.dispatch('place/clearAll')
      this.$store.dispatch('place/updatedUUID', '')
      this.$store.dispatch('common/updateOrderNo',{orderNo: '',mainOrderNo: ''})
    },
    async finishQuotation(key) {
      Popup.create({
        hasHtml: true,
        maskClose: false,
        confirm: true,
        ok: '確定',
        cancel: '取消',
        htmlText: `<p>${key? '完成報價' : '送出核保' }後將無法改動報價內容，確定完成報價？</p>`,
      }).then(async () => {
        if(key) {
          await this.$store.dispatch('quotation/FinishQuotation', {orderNo: this.orderNo})
        } else {
          await this.$store.dispatch('underwrite/BeginUnderwriting',{orderno: this.orderNo})
        }
        this.packHome()
        this.$store.dispatch('common/updatedCalculateModel', false)
        this.$store.dispatch(`place/updatedInsuranceActive`,0)
      })
    },
    async updateUnderwrite(type) {
      await this.$store.dispatch('underwrite/UpdateUnderwriteProcess', {orderno: this.orderNo, processType: type})
      this.packHome(true)
        this.$store.dispatch('common/updatedCalculateModel', false)
        this.$store.dispatch(`place/updatedInsuranceActive`,0)
    },
    async questionnaireCoefficient() {
      let data = {questionnaire: this.quotationData.questionnaire}
        const coefficient = await this.$store.dispatch('questionnaire/GetPlaceQuestionnaireCoefficient', this.placeQuestionnaireMapping(data).questionnaire)
        this.underwriteCoefficient = Number(coefficient.data.content.questionnaireCoefficient) > 0 
              ? `+${Number(coefficient.data.content.questionnaireCoefficient)*100}%`
              : (Number(coefficient.data.content.questionnaireCoefficient) < 0 ? `${Number(coefficient.data.content.questionnaireCoefficient)*100}%` : `0%`)
    }
  },
  async mounted() {
    await this.quotationDetail()
    const county = await this.$store.dispatch('resource/CountyMinimumSettings')
    this.countyAmount = county.data.content
    if(this.InsuranceActive == 7) {
      const underwriteStatus = await this.$store.dispatch('underwrite/GetUnderwriteStatusParameter', this.orderNo)
      this.underwriteStatus = underwriteStatus.data.content
    }
    if(this.quotationData.questionnaire) {
      this.AssignQuestionnaire('place')
      await this.questionnaireCoefficient()
    }
  },
  destroyed() {
    if(this.correct) return
    this.$store.dispatch('place/clearAll')
    this.$store.dispatch('common/updateOrderNo', {orderNo: '',mainOrderNo:''})
    this.$store.dispatch('common/updatedCalculateModel', false)
    this.$store.dispatch('place/updatedInsuranceActive', 0)
  }
}
</script>

<style scoped lang="postcss">
  .button-group {
    @apply flex flex-row justify-center items-center w-full mt-8
  }
  @media screen and (max-width: 600px) {
   .button-group {
      @apply flex flex-col mt-3
    }
  }
</style>