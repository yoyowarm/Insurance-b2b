<template>
  <div>
    <CommonBoard class="w-full mb-7" title="被保險人資料">
      <InsuranceInfoFin :info.sync="InsuranedData" type="InsuranedData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="要保險人資料">
      <InsuranceInfoFin :info.sync="ApplicantData" type="ApplicantData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="投保資料">
      <InsuranceContent :lists="placeInfo"/>
    </CommonBoard>
    <InsuranceAmountListFin :lists="insuranceAmountListData"/>
    <div class="flex flex-row justify-center items-center w-full mt-8">
      <Button v-if="viewModel" @click.native="openDialog = true" class="my-8 w-40 md:w-64 ">確認核保</Button>
      <Button v-else @click.native="nextStep" class="my-8 w-40 md:w-64 ">完成報價</Button>
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
import routeChange from '@/utils/mixins/routeChange'
import { mapState } from 'vuex'
export default {
  mixins: [routeChange],
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
  }
}
</script>

<style scoped lang="postcss">
  
</style>