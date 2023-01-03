<template>
  <PopupDialog
    :open.sync="openDialog"
    headerText="修改保費-活動"
    @cancel="() => {openDialog = false}"
  >
    <div class="flex flex-row">
      <span class="mr-4 mb-4">報價單標號：{{orderNo}}</span>
      <span>被保險人：{{insuranedName}}</span>
    </div>
    <div class="column-2 mb-4">
      <InputGroup title="附加條款加費係數" :disable="fixAdditionTermCoefficient">
        <Input slot="input" class="w-full" decimalPoint5 :disable="fixAdditionTermCoefficient" :value="copyAdditionTermCoefficientParameter" @updateValue="e => {copyAdditionTermCoefficientParameter = e; copyPremium = ''}"/>
      </InputGroup>
      <InputGroup title="AGG>AOA*2係數">
        <Input slot="input" class="w-full" decimalPoint5 :value="copyAggAOACoefficient" @updateValue="e => {copyAggAOACoefficient = e; copyPremium = ''}"/>
      </InputGroup>
    </div>
    <div class="w-full mb-4">
      <InputGroup title="期間係數">
        <Input slot="input" class="w-full" decimalPoint :value="copyPeriodParameter" @updateValue="e => {copyPeriodParameter = e; copyPremium = ''}"/>
      </InputGroup>
    </div>
    <div class="w-full mb-4">
      <InputGroup title="規模係數">
        <Input slot="input" class="w-full" decimalPoint5 :value="copySizeCofficient" @updateValue="e => {copySizeCofficient = e; copyPremium = ''}"/>
      </InputGroup>
    </div>
    <div class="w-full mb-4 relative">
      <InputGroup title="保費" disable>
        <div slot="input" class="w-full pr-24 relative">
          <Input class="w-full" disable numberFormat :value="copyPremium"/>
        </div>
      </InputGroup>
      <Button class="absolute right-0 top-8 w-16 md:w-20 h-full" style="height: 50px" @click.native="calculateAmount">試算</Button>
    </div>
    <div class="w-full flex justify-center mt-8">
      <Button  class="w-40 mr-8" @click.native="() => {openDialog = false}" outline>取消</Button>
      <Button  class="w-40" :disabled="!copyPremium" @click.native="() => {$emit('updateParameter','activity');openDialog = false}">確認核壓保費</Button>
    </div>
  </PopupDialog>
</template>

<script>
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Button from '@/components/Button'
export default {
  components: {
    PopupDialog,
    InputGroup,
    Input,
    Button
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    insuranedName: {
      type: String,
      default: ''
    },
    orderNo: {
      type: String,
      default: ''
    },
    additionTermCoefficientParameter: {
      type: [String,Number],
      default: 0
    },
    aggAOACoefficient: {
      type: [String,Number],
      default: 0
    },
    periodParameter: {
      type: [String,Number],
      default: 0
    },
    sizeCofficient: {
      type: [String,Number],
      default: 0
    },
    premium: {
      type: String,
      default: ''
    },
    insideCalculateAmount: {
      type: Object,
      default: () => {}
    },
    fixAdditionTermCoefficient: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      copyAdditionTermCoefficientParameter: '',
      copyAggAOACoefficient: '',
      copyPeriodParameter: '',
      copySizeCofficient: '',
      copyPremium: '',
    }
  },
  watch: {
    open () {
      this.copyAdditionTermCoefficientParameter = this.additionTermCoefficientParameter
      this.copyAggAOACoefficient = this.aggAOACoefficient
      this.copyPeriodParameter = this.periodParameter
      this.copySizeCofficient = this.sizeCofficient !== 0 ? this.sizeCofficient : ''
    },
    additionTermCoefficientParameter (val) {
      this.copyAdditionTermCoefficientParameter = val
    },
    aggAOACoefficient (val) {
      this.copyAggAOACoefficient = val
    },
    periodParameter (val) {
      this.copyPeriodParameter = val
    },
    sizeCofficient (val) {
      this.copySizeCofficient = val !== 0 ? val : ''
    },
    premium (val) {
      if(val) {
        this.copyPremium = val !== 0 ? val.toString().replace('NT$', '') : ''
      }
    },
    insideCalculateAmount (val) {
      if(Object.keys(val).length > 0) {
        this.copyAdditionTermCoefficientParameter = val.parameter.additionTermCoefficientParameter
        this.copyAggAOACoefficient = val.parameter.aggAOACoefficient
        this.copyPeriodParameter = val.parameter.periodParameter
        this.copySizeCofficient = val.parameter.sizeParameter !==0 ? val.parameter.sizeParameter : ''
        this.copyPremium = val.amount !== 0 ? val.amount : ''
      }
    }
  },
  computed: {
    openDialog: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('update:open', val)
      }
    }
  },
  methods: {
    calculateAmount () {
      this.$emit('auditCalculateAmount', {
        additionTermCoefficientParameter: this.copyAdditionTermCoefficientParameter,
        aggAOACoefficient: this.copyAggAOACoefficient,
        periodParameter: this.copyPeriodParameter,
        sizeCofficient: this.copySizeCofficient,
        premium: this.copyPremium,
        type: 'inside',
      })
    }
  },
  mounted () {
    this.copyAdditionTermCoefficientParameter = this.additionTermCoefficientParameter
    this.copyAggAOACoefficient = this.aggAOACoefficient
    this.copyPeriodParameter = this.periodParameter
    this.copySizeCofficient = this.sizeCofficient !==0 ? this.sizeCofficient : ''
  }
}
</script>

<style lang="scss" scoped>
  
</style>