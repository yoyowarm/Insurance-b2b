<template>
   <div class="popup" ref="modal" :class="{'open':open }">
    <div class="dialog">
      <div class="header">{{headerText}}
        <div class="icon" @click="$emit('update:open',false)">
          <font-awesome-icon icon="times-circle" />
        </div>
      </div>
      <div class="body">
        <CommonBoard class="w-full mb-7" title="被保險人資料">
          <InsuranceInfoFin :info.sync="InsuranedData" type="InsuranedData"/>
        </CommonBoard>
        <CommonBoard class="w-full mb-7" title="要保險人資料">
          <InsuranceInfoFin :info.sync="ApplicantData" type="ApplicantData"/>
        </CommonBoard>
        <CommonBoard class="w-full mb-7" title="投保資料">
          <InsuranceContent :lists="placeInfo"/>
        </CommonBoard>
        <InsuranceAmountList :lists="placeInfo" viewModel/>
      </div>
      <div v-if="confirm" class="flex w-full justify-around py-4">
        <Button @click.native="$emit('update:open',false)">{{cancel}}</Button>
        <Button @click.native="$emit('ok')">{{ok}}</Button>
      </div>
    </div>
    <div class="mask-bg download" @click="() => { if(maskClose){$emit('update:open',false)} }"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import Button from '@/components/Button'
import InsuranceInfoFin from '@/components/Common/InsuranceInfoFin'
import InsuranceContent from '@/components/Place/InsuranceContent'
import InsuranceAmountList from '@/components/Common/InsuranceAmountList.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Button,
    CommonBoard,
    InsuranceInfoFin,
    InsuranceContent,
    InsuranceAmountList
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: ''
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: false
    },
    ok: {
      type: String,
      default: 'ok'
    },
    cancel: {
      type: String,
      default: 'cancel'
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
   data () {
    return {
      value: false
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
  },
  methods: {
    show () {
      this.value = true
    },
  }
}
</script>

<style scoped lang="scss">
  .popup {
    @apply hidden relative;
    &.open {
      @apply block;
    }
  }
  .dialog {
    position: fixed;
    top: 6%;
    left: 0;
    right:0;
    margin: 0 auto;
    max-width: 90vw;
    width: 100%;
    z-index: 100;
    @apply bg-white rounded-2xl;
    .header {
      height: 50px;
      @apply flex items-center pl-6 relative bg-main w-full rounded-t-2xl text-white text-lg;
    }
    .icon {
      @apply absolute inset-y-0 my-auto right-0 mr-3 text-3xl cursor-pointer;
    }
    .body {
      overflow: scroll;
      max-height: 80vh;
      @apply  p-6
    }
  }
  .mask-bg {
    @apply inset-0 bg-black opacity-75 w-screen h-screen z-20 overflow-hidden fixed
  }

  @media (max-width: 770px) {
    .dialog {
      width: 90%;
      @apply bg-white rounded-2xl;

    }
  }
</style>