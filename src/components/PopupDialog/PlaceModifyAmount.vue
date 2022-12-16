<template>
  <PopupDialog
    :open.sync="openDialog"
    headerText="修改保費-場所"
    @cancel="() => {openDialog = false}"
  >
    <div class="flex flex-row">
      <span class="mr-4 mb-4">報價單標號：{{orderNo}}</span>
      <span>被保險人：{{insuranedName}}</span>
    </div>
    <div class="column-2 mb-4">
      <InputGroup title="附加條款加費係數">
        <Input slot="input" class="w-full" decimalPoint :value="copyAdditionTermCoefficientParameter" @updateValue="e => {copyAdditionTermCoefficientParameter = e; copyPremium = ''}"/>
      </InputGroup>
      <InputGroup title="AGG>AOA*2係數">
        <Input slot="input" class="w-full" decimalPoint :value="copyAggAOACoefficient" @updateValue="e => {copyAggAOACoefficient = e; copyPremium = ''}"/>
      </InputGroup>
    </div>
    <div class="w-full mb-4" v-if="hasHexTypeBasicAmount">
      <InputGroup title="己類基本純保費" >
        <Input slot="input" class="w-full" decimalPoint :value="hexTypeBasicAmount" @updateValue="e => {hexTypeBasicAmount = e; copyPremium = ''}" unit="元"/>
      </InputGroup>
    </div>
    <div class="w-full mb-4">
      <InputGroup title="多處所係數">
        <Input slot="input" class="w-full" decimalPoint :value="copyMutiSizeParameter" @updateValue="e => {copyMutiSizeParameter = e; copyPremium = ''}"/>
      </InputGroup>
    </div>
    <div class="w-full mb-4">
      <InputGroup title="規模係數">
        <Input slot="input" class="w-full" decimalPoint :value="copySizeCofficient" @updateValue="e => {copySizeCofficient = e; copyPremium = ''}"/>
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
      <Button  class="w-40" :disabled="!copyPremium" @click.native="() => {$emit('updateParameter','place');openDialog = false}">確認核壓保費</Button>
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
    mutiSizeParameter: {
      type: [String,Number],
      default: 0
    },
    sizeCofficient: {
      type: [String,Number],
      default: 0
    },
    hasHexTypeBasicAmount: {
      type: Boolean,
      default: false
    },
    premium: {
      type: String,
      default: ''
    },
    insideCalculateAmount: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      copyAdditionTermCoefficientParameter: '',
      copyAggAOACoefficient: '',
      copyMutiSizeParameter: '',
      copySizeCofficient: '',
      hexTypeBasicAmount: '',
      copyPremium: '',
    }
  },
  watch: {
    open () {
      this.copyAdditionTermCoefficientParameter = this.additionTermCoefficientParameter
      this.copyAggAOACoefficient = this.aggAOACoefficient
      this.copyMutiSizeParameter = this.mutiSizeParameter
      this.copySizeCofficient = this.sizeCofficient !== 0 ? this.sizeCofficient : ''
      this.hexTypeBasicAmount = ''
    },
    additionTermCoefficientParameter (val) {
      this.copyAdditionTermCoefficientParameter = val
    },
    aggAOACoefficient (val) {
      this.copyAggAOACoefficient = val
    },
    mutiSizeParameter (val) {
      this.copyMutiSizeParameter = val
    },
    sizeCofficient (val) {
      this.copySizeCofficient = val !== 0 ? val : ''
    },
    premium (val) {
      if(val && val.toString().length > 0) {
        this.copyPremium = val.toString().replace('NT$', '')
      }
    },
    insideCalculateAmount (val) {
      if(Object.keys(val).length > 0) {
        this.copyAdditionTermCoefficientParameter = val.parameter.additionTermCoefficientParameter
        this.copyAggAOACoefficient = val.parameter.aggAOACoefficient
        this.copyMutiSizeParameter = val.parameter.mutiSizeParameter
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
        mutiSizeParameter: this.copyMutiSizeParameter,
        sizeCofficient: this.copySizeCofficient,
        hexTypeBasicAmount: this.hexTypeBasicAmount,
        premium: this.copyPremium,
        type: 'inside',
      })
    }
  },
  mounted() {
    this.copyAdditionTermCoefficientParameter = this.additionTermCoefficientParameter
    this.copyAggAOACoefficient = this.aggAOACoefficient
    this.copyMutiSizeParameter = this.mutiSizeParameter
    this.copySizeCofficient = this.sizeCofficient !==0 ? this.sizeCofficient : ''
    this.hexTypeBasicAmount = ''
  }
}
</script>

<style lang="scss" scoped>
  
</style>