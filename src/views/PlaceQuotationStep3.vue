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
    <InsuranceAmountList :lists="placeInfo"/>
    <div class="flex flex-row justify-center items-center w-full mt-8">
      <DynamicLink type="router" path="/activity-quotation/step2" v-if="!viewModel">
        <Button class="my-8 mr-6 w-40 md:w-64 " outline>上一步</Button>
      </DynamicLink>
      <Button @click.native="nextStep" class="my-8 w-40 md:w-64 ">完成報價</Button>
    </div>
    <ViewModelSticker @openDialog="(e) => historyDialog = e"/>
    <QuoteHistory :open.sync="historyDialog"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import DynamicLink from '@/components/DynamicLink'
import Button from '@/components/Button'
import InsuranceInfoFin from '@/components/Common/InsuranceInfoFin'
import InsuranceAmountList from '@/components/Common/InsuranceAmountList.vue'
import InsuranceContent from '@/components/Place/InsuranceContent'
import ViewModelSticker from '@/components/viewModelSticker'
import QuoteHistory from '@/components/PopupDialog/QuoteHistory'
import routeChange from '@/utils/mixins/routeChange'
import { mapState } from 'vuex'
export default {
  mixins: [routeChange],
  components: {
    CommonBoard,
    DynamicLink,
    Button,
    InsuranceInfoFin,
    InsuranceAmountList,
    InsuranceContent,
    ViewModelSticker,
    QuoteHistory
  },
  data() {
    return {
      historyDialog: false,
    }
  },
  computed: {
    ...mapState({
      'Insuraned': state => state.place.Insuraned,
      'Relation': state => state.place.Relation,
      'Applicant': state => state.place.Applicant,
      'sameAsInsured': state => state.place.sameAsInsured,
      placeInfo: state => state.place.placeInfo,
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