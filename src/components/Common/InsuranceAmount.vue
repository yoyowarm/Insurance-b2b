<template>
  <div class="w-full">
    <div class="column-5 dashed-border">
      <InputGroup title="金額" class="col-span-2">
        <Select
          slot="input"
          :options="amountList"
          :selected="data.amountType.Value.toString()"
          @emitItem="e=>updatedValue('amountType',e)"
          defaultText="請選擇金額"/>
      </InputGroup>
    </div>
    <div class="column-5 pt-5">
      <InputGroup v-if="data.amountType.Value != 1" title="每一個人體傷責任金額" :disable="data.amountType.Value == 0">
        <Input
          slot="input"
          :value="data.perBodyAmount.toString()"
          @updateValue="(e) => updatedValue('perBodyAmount',e)"
          placeholder="請輸入金額"
          :disable="data.amountType.Value == 0"
          unit="萬元"/>
      </InputGroup>
      <InputGroup v-if="data.amountType.Value != 1" title="每一意外事故體傷責任金額" :disable="data.amountType.Value == 0">
        <Input
          slot="input"
          :value="data.perAccidentBodyAmount.toString()"
          @updateValue="(e) => updatedValue('perAccidentBodyAmount',e)"
          placeholder="請輸入金額"
          :disable="data.amountType.Value == 0"
          unit="萬元"/>
      </InputGroup>
      <InputGroup v-if="data.amountType.Value != 1" title="每一意外事故財物損失責任金額" :disable="data.amountType.Value == 0">
        <Input
          slot="input"
          :value="data.perAccidentFinanceAmount.toString()"
          @updateValue="(e) => updatedValue('perAccidentFinanceAmount',e)"
          placeholder="請輸入金額"
          :disable="data.amountType.Value == 0"
          unit="萬元"/>
      </InputGroup>
      <InputGroup v-if="data.amountType.Value != 1" title="本保險契約之最高賠償金額" :disable="data.amountType.Value == 0">
        <Input
          slot="input"
          :value="data.insuranceTotalAmount.toString()"
          @updateValue="(e) => updatedValue('insuranceTotalAmount',e)"
          placeholder="請輸入金額"
          :disable="data.amountType.Value == 0"
          unit="萬元"/>
      </InputGroup>
      <InputGroup v-if="data.amountType.Value == 1" title="單一限額">
        <Input
          slot="input"
          :value="data.mergeSingleAmount"
          @updateValue="(e) => updatedValue('mergeSingleAmount',e)"
          placeholder="請輸入金額"
          unit="萬元"/>
      </InputGroup>
      <InputGroup title="自負額">
        <Select
          slot="input"
          :options="selfPayList"
          :selected="data.selfInflictedAmount.Value"
          defaultText="請選擇金額"
          @updateValue="(e) => updatedValue('selfInflictedAmount',e)"/>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
export default {
  components: {
    InputGroup,
    Input,
    Select
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    countyAmount: {
      type: Array,
      default: () => []
    },
    infoList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      selfPayList: [
        {Value: 1, Text: '2,500元'},
        {Value: 2, Text: '5,000元'},
        {Value: 3, Text: '10,000元'},
        {Value: 4, Text: '50,000元'},
        {Value: 5, Text: '100,000元'},
        {Value: 6, Text: '200,000元'},
      ],
      amountList: [
        {Value: 0, Text: '依各縣市規定'},
        {Value: 1, Text: '合併單一限額'},
        {Value: 2, Text: '自行輸入保額'},
        // {Value: 4, Text: '200萬/1000萬/200萬/2400萬'},
        // {Value: 5, Text: '200萬/2000萬/200萬/3600萬'},
        // {Value: 6, Text: '300萬/1500萬/200萬/3400萬'},
        // {Value: 7, Text: '300萬/1500萬/200萬/4800萬'},
        // {Value: 8, Text: '300萬/1500萬/300萬/3600萬'},
        // {Value: 9, Text: '300萬/2000萬/300萬/2400萬'},
        // {Value: 10, Text: '300萬/3000萬/300萬/4800萬'},
        // {Value: 11, Text: '600萬/3000萬/300萬/6600萬'},
      ]
    }
  },
  watch: {
    infoList: {
      handler(val, oldVal) {
        if (!oldVal || val.length !== oldVal.length || val.map((item,index) => {item.city.Text !== oldVal[index].city.Text})) {
          this.assignAmount()
        }
      },
      immediate: true
    },
    'data.amountType': {
      handler(val, odlVal) {
        if (!odlVal || val.Value !== odlVal.Value) {
          this.assignAmount()
        }
      },
      immediate: true
    },
    'data.perBodyAmount': {
      handler(val, odlVal) {
        if (!odlVal || val.toString() !== odlVal.toString()) {
          this.assignAmount()
        }
      },
      immediate: true
    }
  },
  computed: {
    amountMinimum() {
      const arr = []
      this.infoList.map(item => {
        const target = this.countyAmount.find(i => i.countyName.includes(item.city.Text))
        if (target) {
          arr.push(target)
        }
      })
      arr.sort((a, b) => {
        return a.perBodyAmount - b.perBodyAmount
      })
      return arr.length > 0 ? arr[arr.length -1] : {perBodyAmount: 0, perAccidentBodyAmount: 0, perAccidentFinanceAmount: 0, insuranceTotalAmount: 0}
    }
  },
  methods: {
    updatedValue(key, e) {
      this.$emit('update:data', {
        ...this.data,
        [key]: e
      })
    },
    assignAmount() {
      if(this.data.amountType.Value == 0) {
        this.$emit('update:data', {
          ...this.data,
          perBodyAmount: this.amountMinimum.perBodyAmount,
          perAccidentBodyAmount: this.amountMinimum.perAccidentBodyAmount,
          perAccidentFinanceAmount: this.amountMinimum.perAccidentFinanceAmount,
          insuranceTotalAmount: this.amountMinimum.insuranceTotalAmount,
        })
      }
      if(this.data.amountType.Value == 2) {
        this.$emit('update:data', {
          ...this.data,
          perBodyAmount: this.data.perBodyAmount,
          perAccidentBodyAmount: this.data.perBodyAmount * 5,
          perAccidentFinanceAmount: this.data.perBodyAmount * 0.5,
          insuranceTotalAmount: this.data.perBodyAmount * 11,
        })
      }
    }
  },
}
</script>

<style scoped lang="scss">
  
</style>