<template>
  <div>
    <CommonBoard class="w-full mb-7" title="被保險人資料">
      <InsuranceInfoFin :info.sync="InsuranedData" type="InsuranedData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="要保險人資料">
      <InsuranceInfoFin :info.sync="ApplicantData" type="ApplicantData"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="投保資料">
      <InsuranceContent :lists="activityInfo"/>
    </CommonBoard>
    <InsuranceAmountListFin :lists="activityInfo"/>
    <div class="flex flex-row justify-center items-center w-full mt-8">
      <Button @click.native="nextStep" class="my-8 w-40 md:w-64 ">完成報價</Button>
    </div>
    <ViewModelSticker v-if="viewModel" @openDialog="(e) => historyDialog = e"/>
    <QuoteHistory :open.sync="historyDialog"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import Button from '@/components/Button'
import InsuranceInfoFin from '@/components/Common/InsuranceInfoFin'
import InsuranceAmountListFin from '@/components/Common/InsuranceAmountListFin.vue'
import InsuranceContent from '@/components/Activity/InsuranceContent'
import ViewModelSticker from '@/components/viewModelSticker'
import QuoteHistory from '@/components/PopupDialog/QuoteHistory'
import routeChange from '@/utils/mixins/routeChange'
import LoadingScreen from '@/components/LoadingScreen.vue'
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
    LoadingScreen
  },
  data() {
    return {
      historyDialog: false,
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
      'loading': state => state.app.loading,
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
  }
}
</script>

<style scoped lang="postcss">
  
</style>