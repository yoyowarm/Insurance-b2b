<template>
   <div class="popup" ref="modal" :class="{'open':open }">
    <div class="dialog">
      <div class="header">
        <span>{{headerText}}</span>
        <div class="icon" @click="$emit('update:open',false)">
          <font-awesome-icon icon="times-circle" />
        </div>
        <InputGroup bgColor="#fff" class="md:ml-4 h-8 w-full md:w-auto md:-mt-7" noMt>
          <Select :options="formList" slot="input" defaultText="選擇表單區塊"  @emitItem="e=> emitSelectItem(e)" />
        </InputGroup>
      </div>
      <div class="body">
        <CommonBoard class="w-full mb-7" ref="1" title="被保險人資料">
          <InsuranceInfoFin :info.sync="InsuranedData" type="InsuranedData"/>
        </CommonBoard>
        <CommonBoard class="w-full mb-7" ref="2" title="要保險人資料">
          <InsuranceInfoFin :info.sync="ApplicantData" type="ApplicantData"/>
        </CommonBoard>
        <CommonBoard class="w-full mb-7" ref="3" title="投保資料">
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
import Select from '@/components/Select'
import InputGroup from '@/components/InputGroup'
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
    InsuranceAmountList,
    Select,
    InputGroup
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
      value: false,
      formList: [
        { Value: '1', Text: '被保險人資料'},
        { Value: '2', Text: '要保險人資料'},
        { Value: '3', Text: '投保資料'}
      ]
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
    emitSelectItem(e) {
      console.log(this.$refs,e)
      if(this.$refs[e.Value]) {
        this.$refs[e.Value].$el.scrollIntoView({behavior: "smooth"})
      }
    }
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
      height: 60px;
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
      .header {
        height: 100px;
        @apply flex-col pl-0 px-4 justify-center;
        >span {
          @apply -mt-5
        }
      }
    }
  }
</style>