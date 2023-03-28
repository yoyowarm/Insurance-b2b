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
        :info="quotationData.activityInsureInfo ? quotationData.activityInsureInfo : {}"
        :cityList="cityList"
        :areaList="areaList"
      />
    </CommonBoard>
    <InsuranceAmountListFin
      :lists.sync="quotationData.insuranceAmounts"
      :orderNo="orderNo"
      :infoList="quotationData.activityInsureInfo ? quotationData.activityInsureInfo.activityInfo : []"
      :countyAmount="countyAmount"
      :InsuranceActive="InsuranceActive"
      :parameter="parameter"
      :underwriteCoefficient="underwriteCoefficient"
      @getQuotationDetail="quotationDetail"
      type="activity"
    />
    <div class="button-group">
      <Button v-if="InsuranceActive !== 7"  @click.native="packHome(InsuranceActive == 9 ? false : true)" class="my-3 md:my-8 w-64 mr-0 md:mr-5">儲存報價單</Button>
      <Button v-if="(PolicyStatus == 0 || PolicyStatus == 1 || PolicyStatus == 2 || PolicyStatus == 6 || PolicyStatus == 7) && InsuranceActive !== 6 && InsuranceActive !== 7 && InsuranceActive !== 8" @click.native="copyQuotation(1)" class="my-3 md:my-8 w-64 md:mr-5">更正報價</Button>
      <Button v-if="viewModel" @click.native="openDialog = true" class="my-3 md:my-8 w-64 ">確認核保</Button>
      <Button
        v-if="(PolicyStatus == 1 || PolicyStatus == 0) && InsuranceActive !== 7 && InsuranceActive !== 6 && quotationData.insuranceAmounts && quotationData.insuranceAmounts.find(item => !item.selected && !item.insuranceAmount)"
        @click.native="finishQuotation()"
        :disabled="quotationData.insuranceAmounts.some(item => item.isSelected)"
        class="my-3 md:my-8 w-64 "
        style="background: #DB9F2C">
        送出核保
      </Button>
       <Button
       v-else-if="(PolicyStatus == 7 || PolicyStatus == 0) && quotationData.insuranceAmounts && quotationData.insuranceAmounts.length > 0 && quotationData.insuranceAmounts.find(item => !item.selected && item.insuranceAmount) && (InsuranceActive !== 6 && InsuranceActive !== 7)"
        :disabled="quotationData.insuranceAmounts.some(item => item.isSelected) || quotationData.insuranceAmounts.filter(item => item.selected && item.insuranceAmount == '- -').length > 0"
        @click.native="finishQuotation('FinishQuotation')"
        class="my-3 md:my-8 w-64 md:mr-5">確認報價</Button>
        <Button
          v-if="(PolicyStatus == 7 || PolicyStatus == 8  || PolicyStatus == 0) && InsuranceActive !== 7 && InsuranceActive !== 6 && quotationData.insuranceAmounts && quotationData.insuranceAmounts.length > 0 &&quotationData.insuranceAmounts.find(item => item.insuranceAmount)"
          @click.native="finishQuotation('up')"
          :disabled="quotationData.insuranceAmounts.some(item => item.isSelected)"
          class="my-3 md:my-8 w-64 "
          >
          向上核保
      </Button>
      <template v-if="InsuranceActive == 7">
        <Button  @click.native="copyQuotation(7)" class="my-3 md:my-8 w-64 md:mr-5">更正</Button>
        <Button v-if="(underwriteStatus.underwriteDirection == 1 && underwriteStatus.employeeUnderwriteLevel != 6) || (underwriteStatus.underwriteDirection == 0 && underwriteStatus.isLastActionEditUnderwrite && underwriteStatus.employeeUnderwriteLevel != 6)" class="my-3 md:my-8 w-64 md:mr-5" @click.native="updateUnderwrite(1)">向上核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 1 && underwriteStatus.employeeUnderwriteLevel >= underwriteStatus.underwriteTargetLevel" class="my-3 md:my-8 w-64 md:mr-5" @click.native="updateUnderwrite(2)">完成核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 1" class="my-3 md:my-8 w-64 md:mr-5" @click.native="openReason = true">不予核保</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 0  && !underwriteStatus.isLastActionEditUnderwrite" class="my-3 md:my-8 w-64 md:mr-5" @click.native="updateUnderwrite(4)">確認審核結果</Button>
      </template>
    </div>
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
    <img v-if="appSetting.showMessagePlatform" @click="openChat = true" class="chat-btn" src="../assets/images/chat_btn.svg" alt="">
    <QuotationCommentPopup
      :open.sync="openChat"
      :messageList="chatMessageList"
      :quotationPage="true"
      :mainOrderNo="mainOrderNo"
      @updatedMessage="() => { getChatComment(mainOrderNo) }"
    />
    <PopupDialog
      :open.sync="openReason">
      <div>
        <p>確定此報價單不予核保?</p>
        <textarea class="w-full mt-4 border-2 border-gray-400 rounded-lg p-3" rows=4 v-model="underwritingReasons" maxlength="2000" placeholder="不予核保原因說明，限制字數2000字以內（非必填）"></textarea>
        <div class="flex justify-around w-full">
          <Button class="w-1/4 mt-4" @click.native="openReason = false">取消</Button>
          <Button class="w-1/4 mt-4" @click.native="updateUnderwrite(3)">確定</Button>
        </div>
      </div>
    </PopupDialog>
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
import QuoteHistory from '@/components/PopupDialog/QuoteHistory'
import editCopyQuestionnaire from '@/utils/mixins/editCopyQuestionnaire'
import QuotationCommentPopup from '@/components/PopupDialog/QuotationComment.vue'
// import routeChange from '@/utils/mixins/routeChange'
import LoadingScreen from '@/components/LoadingScreen.vue'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
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
    QuoteHistory,
    LoadingScreen,
    PopupDialog,
    InputGroup,
    Input,
    QuotationCommentPopup
  },
  data() {
    return {
      historyDialog: false,
      openDialog: false,
      correct: false,
      openChat: false,
      openReason: false,
      // quotationData: {
      //   insuranceAmounts: [],
      //   activityInsureInfo: {
      //     activityInfo: []
      //   }
      // },
      countyAmount: [],
      cityList: [],
      areaList:[],
      underwriteStatus: {},
      underwriteCoefficient: '',
      underwritingReasons: '',
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
      parameter: state => state.activity.parameter,
      quotationData: state => state.activity.quotationData,
      questionnaire: state => state.activity.questionnaire,
      chatMessageList: state => state.common.chatMessageList,
      appSetting: state => state.app.appSetting,
      
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
      const quotationData = {
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
       this.$store.dispatch(`activity/updatedQuotationData`,quotationData)
    },
    packHome(updateUnderwrite = false) {
      if(updateUnderwrite) {
        this.$router.push('/quotation-list')
      } else {
        if(this.InsuranceActive == 9) {
          this.$router.push('/underwriting-list?tag=2')
        } else {
          this.$router.push('/underwriting-list')
        }
      }
      this.$store.dispatch('activity/clearAll')
      this.$store.dispatch('activity/updatedUUID', '')
      this.$store.dispatch('common/updateOrderNo',{orderNo: '',mainOrderNo: ''})
    },
    async copyQuotation(InsuranceActive) {
      if(this.InsuranceActive == 6) return
      this.correct = true
      this.$store.dispatch('common/updateOrderNo', {orderNo:this.orderNo,mainOrderNo: this.mainOrderNo})
      await this.quotationDetail()
      this.$store.dispatch(`activity/updatedInsuranceActive`,InsuranceActive ? InsuranceActive : 1)
      this.$router.push(`/activity-quotation/step1`)
    },
    async finishQuotation(key) {
      Popup.create({
        hasHtml: true,
        maskClose: false,
        confirm: true,
        ok: '確定',
        cancel: '取消',
        htmlText: `<p>${key && key !== 'up'? '完成報價' : (key == 'up' ? '向上核保':'送出核保') }後將無法改動報價內容，確定${key && key !== 'up'? '完成報價' : (key == 'up' ? '向上核保':'送出核保') }？</p>`,
      }).then(async () => {
        if(key && key !== 'up') {
          await this.$store.dispatch('quotation/FinishQuotation', {orderNo: this.orderNo})
        } else if (key == 'up' || !key) {
          await this.$store.dispatch('underwrite/BeginUnderwriting',{orderno: this.orderNo})
        }
        this.packHome(key && key == 'up'?false:true)
        this.$store.dispatch('common/updatedCalculateModel', false)
        this.$store.dispatch(`activity/updatedInsuranceActive`,0)
      })
    },
    async updateUnderwrite(type) {
      if (this.underwritingReasons && type === 3) {
        await this.$store.dispatch('common/addCountents', {
          mainOrderNo: this.mainOrderNo,
          newMessageContents: [
            { content: this.underwritingReasons }
          ]
        })
      }
      this.underwritingReasons = ''
      await this.$store.dispatch('underwrite/UpdateUnderwriteProcess', {orderno: this.orderNo, processType: type})
      this.packHome(false)
        this.$store.dispatch('common/updatedCalculateModel', false)
        this.$store.dispatch(`activity/updatedInsuranceActive`,0)
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
    },
    async questionnaireCoefficient() {
      let data = {}
      data.questionnaire = JSON.parse(JSON.stringify(this.questionnaire))
        const coefficient = await this.$store.dispatch('questionnaire/GetActivityQuestionnaireCoefficient', this.activityQuestionnaireMapping(data).questionnaire)
        this.underwriteCoefficient = Number(coefficient.data.content.questionnaireCoefficient) > 0 
              ? `+${Number(coefficient.data.content.questionnaireCoefficient)*100}%`
              : (Number(coefficient.data.content.questionnaireCoefficient) < 0 ? `${Number(coefficient.data.content.questionnaireCoefficient)*100}%` : `0%`)
    },
    async getChatComment(mainOrderNo) {
      const data = await this.$store.dispatch('common/getContents', mainOrderNo)
      this.$store.dispatch('common/updatedChatMessage', data.data.content.contents)
    },
  },
  async mounted() {
    await this.getChatComment(this.mainOrderNo)
    await this.quotationDetail()
    await this.pageInit()
    if(this.InsuranceActive == 7) {
      const underwriteStatus = await this.$store.dispatch('underwrite/GetUnderwriteStatusParameter', this.orderNo)
      this.underwriteStatus = underwriteStatus.data.content
    }
    if(this.quotationData.questionnaire) {
      this.AssignQuestionnaire('activity')
      await this.questionnaireCoefficient()
    }
  },
  destroyed() {
    if(this.correct) return
    this.$store.dispatch('activity/clearAll')
    this.$store.dispatch('common/updateOrderNo', {orderNo: '',mainOrderNo:''})
    this.$store.dispatch('common/updatedCalculateModel', false)
    this.$store.dispatch('activity/updatedInsuranceActive', 0)
    this.$store.dispatch('common/updatedChatMessage', [])
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
  .chat-btn {
    @apply fixed bottom-0 right-0 mr-4 mb-4 cursor-pointer w-16
  }
</style>