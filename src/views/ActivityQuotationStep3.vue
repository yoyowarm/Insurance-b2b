<template>
  <div>
    <CommonBoard class="w-full mb-7" title="被保險人資料">
      <InsuranceInfoFin :info="quotationData.insuraned" type="InsuranedData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="要保險人資料">
      <InsuranceInfoFin :info="quotationData.applicant" type="ApplicantData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="投保資料">
      <InsuranceContent :lists="activityInfo" :info="quotationData.activityInsureInfo"/>
    </CommonBoard>
    <InsuranceAmountListFin
      :lists.sync="quotationData.insuranceAmounts"
      :orderNo="orderNo"
      :infoList="quotationData.activityInsureInfo.activityInfo"
      :countyAmount="countyAmount"
      @getQuotationDetail="quotationDetail"
    />
    <div class="flex flex-row justify-center items-center w-full mt-8">
      <Button v-if="viewModel" @click.native="openDialog = true" class="my-8 w-40 md:w-64 ">確認核保</Button>
      <Button
        v-if="quotationData.insuranceAmounts && quotationData.insuranceAmounts.find(item => item.selected && !item.insuranceAmount)"
        @click.native="finishQuotation()"
        class="my-8 w-40 md:w-64 "
        :disabled="quotationData.insuranceAmounts.some(item => item.selected)"
        style="background: #DB9F2C">
        開始核保
      </Button>
      <Button
        v-else
        :disabled="quotationData.insuranceAmounts.some(item => item.selected) || quotationData.insuranceAmounts.filter(item => !item.selected).length == quotationData.insuranceAmounts.length || quotationData.insuranceAmounts.filter(item => item.selected && item.insuranceAmount == '- -').length > 0" @click.native="finishQuotation('FinishQuotation')" class="my-8 w-40 md:w-64 ">完成報價</Button>
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
// import { Popup } from '@/utils/mixins/popup'
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
      countyAmount: []
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
      const detail = await this.$store.dispatch('quotation/GetActivityQuotationDetail', this.orderNo)
      this.quotationData = {
        ...detail.data.content,
        insuranceAmounts: detail.data.content.insuranceAmounts.map((item,index) => {
          return {
            ...item,
            selected: index == 0 ? true: false,
            fixed: false,
            insuranceTotalAmount: item.insuranceTotalAmount/10000,
            mergeSingleAmount: item.mergeSingleAmount/10000,
            perAccidentBodyAmount: item.perAccidentBodyAmount/10000,
            perAccidentFinanceAmount: item.perAccidentFinanceAmount/10000,
            perBodyAmount: item.perBodyAmount/10000,
          }
        })
      }
    },
    async finishQuotation(key) {
      const data = {
        orderNo: this.orderNo,
        insuranceProjectId: this.quotationData.insuranceAmounts.find(item => item.selected).id,
      }
      if(key) {
        await this.$store.dispatch('quotation/FinishQuotation', {data})
      } else {
        await this.$store.dispatch('quotation/BeginUnderwriting',{data} )
      }
      this.$router.push('/')
      this.$store.dispatch('activity/clearAll')
      this.$store.dispatch('activity/updatedUUID', '')
      this.$store.dispatch('common/updateOrderNo', '')
      this.$store.dispatch('common/updatedCalculateModel', false)
    }
  },
  async mounted() {
    await this.quotationDetail()
    const county = await this.$store.dispatch('resource/CountyMinimumSettings')
    this.countyAmount = county.data.content
  },
}
</script>

<style scoped lang="postcss">
  
</style>