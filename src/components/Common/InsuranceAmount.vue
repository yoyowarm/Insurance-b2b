<template>
  <div class="w-full">
    <div class="column-5 dashed-border">
      <InputGroup title="金額" class="col-span-2" :disableWhite="disable">
        <Select
          slot="input"
          :options="amountList"
          :selected="data.amountType.Value.toString()"
          @emitItem="e=>updatedValue('amountType',e)"
          :disableWhite="disable"
          defaultText="請選擇金額"/>
      </InputGroup>
      <div v-if="amountMinimum.countyName && data.amountType.Value == 0" class="mt-10 col-span-2">當有多個處所且跨縣市時，將採用最高縣市保額，目前採用 <span class="text-main">{{amountMinimum.countyName}}</span> 保額</div>
    </div>
    <div class="column-5 pt-5">
      <InputGroup v-if="data.amountType.Value != 1" title="每一個人體傷責任金額" :disableWhite="data.amountType.Value != 2 || disable">
        <Input
          slot="input"
          inputmode="tel"
          :value="data.perBodyAmount.toString() == '0' ? '' : data.perBodyAmount"
          @updateValue="(e) =>{ updatedValue('perBodyAmount',e)}"
          placeholder="請輸入金額"
          :disableWhite="data.amountType.Value != 2 || disable"
          numberOnly
          numberFormat
          unit="萬元"/>
      </InputGroup>
      <InputGroup v-if="data.amountType.Value != 1" title="每一意外事故體傷責任金額" :disableWhite="data.amountType.Value != 2 || disable">
        <Input
          slot="input"
          inputmode="tel"
          :value="data.perAccidentBodyAmount.toString() == '0' ? '' : data.perAccidentBodyAmount"
          @updateValue="(e) => updatedValue('perAccidentBodyAmount',e)"
          placeholder="請輸入金額"
          :disableWhite="data.amountType.Value != 2 || disable"
          numberOnly
          numberFormat
          unit="萬元"/>
      </InputGroup>
      <InputGroup v-if="data.amountType.Value != 1" title="每一意外事故財物損失責任金額" :disableWhite="data.amountType.Value != 2 || disable">
        <Input
          slot="input"
          inputmode="tel"
          :value="data.perAccidentFinanceAmount.toString() == '0' ? '' : data.perAccidentFinanceAmount"
          @updateValue="(e) => updatedValue('perAccidentFinanceAmount',e)"
          placeholder="請輸入金額"
          :disableWhite="data.amountType.Value != 2 || disable"
          numberOnly
          numberFormat
          unit="萬元"/>
      </InputGroup>
      <InputGroup v-if="data.amountType.Value != 1" title="本保險契約之最高賠償金額" :disableWhite="data.amountType.Value != 2 || disable">
        <Input
          slot="input"
          inputmode="tel"
          :value="data.insuranceTotalAmount.toString() == '0' ? '' : data.insuranceTotalAmount"
          @updateValue="(e) => updatedValue('insuranceTotalAmount',e)"
          placeholder="請輸入金額"
          :disableWhite="data.amountType.Value != 2 || disable"
          numberOnly
          numberFormat
          unit="萬元"/>
      </InputGroup>
      <InputGroup v-if="data.amountType.Value == 1" title="單一限額" :disableWhite="disable">
        <Input
          slot="input"
          inputmode="tel"
          :value="numFormat(data.mergeSingleAmount)"
          @updateValue="(e) => updatedValue('mergeSingleAmount',e)"
          placeholder="請輸入金額"
          :disableWhite="disable"
          numberOnly
          numberFormat
          unit="萬元"/>
      </InputGroup>
    </div>
    <div class="column-5 pt-5">
      <InputGroup title="自負額" :disableWhite="disable">
        <Select
          slot="input"
          :options="selfPayList"
          :selected="data.selfInflictedAmount.Value"
          defaultText="請選擇金額"
          :disableWhite="disable"
          @emitItem="(e) => updatedValue('selfInflictedAmount',e)"/>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
import { numFormat } from '@/utils/regex'
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
    disable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    createOder: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      numFormat,
      selfPayList: [
        {Value: 0, Text: '0元'},
        {Value: 2500, Text: '2,500元'},
        {Value: 5000, Text: '5,000元'},
        {Value: 10000, Text: '10,000元'},
        {Value: 50000, Text: '50,000元'},
        {Value: 100000, Text: '100,000元'},
        {Value: 200000, Text: '200,000元'},
      ],
      amountList: [
        {Value: 1, Text: '合併單一限額'},
        {Value: 2, Text: '自行輸入保額'},
        {Value: 4, Text: '200萬/1000萬/200萬/2400萬'},
        {Value: 5, Text: '200萬/2000萬/200萬/3600萬'},
        {Value: 6, Text: '300萬/1500萬/200萬/3400萬'},
        {Value: 7, Text: '300萬/1500萬/200萬/4800萬'},
        {Value: 8, Text: '300萬/1500萬/300萬/3600萬'},
        {Value: 9, Text: '300萬/2000萬/300萬/2400萬'},
        {Value: 10, Text: '300萬/3000萬/300萬/4800萬'},
        {Value: 11, Text: '600萬/3000萬/300萬/6600萬'},
      ]
    }
  },
  watch: {
    infoList: {
      handler(val, oldVal) {
        if (!oldVal || val.length !== oldVal.length || val.map((item,index) => {item.city.Text !== oldVal[index].city.Text})) {
          this.assignAmount()
        }
        this.assignAmount()
      },
      immediate: true
    },
    'data.amountType': {
      handler(val, oldVal) {
        if (!oldVal || val.Value != oldVal.Value) {
          if(Number(val.Value) > 2) {
            this.assignAmount()
          }
          if(val.Value == '2' && oldVal && oldVal.Value !== '2') {
            this.assignAmount()
            this.$emit('update:createOder',false)
          } else if(val.Value == '1' && oldVal && oldVal.Value !== '1') {
            this.updatedValue('mergeSingleAmount','')
          } else {
            this.assignAmount()
            this.$emit('update:createOder',false)
          }
        }
      },
      immediate: true
    },
  },
  computed: {
    amountMinimum() {
      const arr = []
      let data = {
          countyName: '',
          perBodyAmount: '',
          perAccidentBodyAmount: '',
          perAccidentFinanceAmount: '',
          insuranceTotalAmount: '',
          selfInflictedAmount: ''
        }
      this.infoList.map(item => {
        let target
        if(item.city.Text == '嘉義市') {
          target = this.countyAmount.find(i => i.countyName.includes('嘉義'))
        } else {
          target = this.countyAmount.find(i => i.countyName.includes(item.city.Text))
        }
        if (target) {
          arr.push(target)
        }
      })
      
      if(arr.length > 1) {
        arr.sort((a, b) => a.perBodyAmount - b.perBodyAmount)
        data.perBodyAmount = arr[arr.length -1] ? arr[arr.length -1].perBodyAmount : ''

        arr.sort((a, b) =>  a.perAccidentBodyAmount - b.perAccidentBodyAmount)
        data.perAccidentBodyAmount = arr[arr.length -1] ? arr[arr.length -1].perAccidentBodyAmount : ''

        arr.sort((a, b) =>  a.perAccidentFinanceAmount - b.perAccidentFinanceAmount)
        data.perAccidentFinanceAmount = arr[arr.length -1] ? arr[arr.length -1].perAccidentFinanceAmount : ''

        arr.sort((a, b) =>  a.insuranceTotalAmount - b.insuranceTotalAmount)
        data.insuranceTotalAmount = arr[arr.length -1] ? arr[arr.length -1].insuranceTotalAmount : ''
        data.selfInflictedAmount = this.data.selfInflictedAmount
        data.countyName = arr[arr.length -1] ? arr[arr.length -1].countyName : ''
      } else if(arr.length == 1){
        data = {
          countyName: arr[0].countyName,
          perBodyAmount: arr[0].perBodyAmount,
          perAccidentBodyAmount: arr[0].perAccidentBodyAmount,
          perAccidentFinanceAmount: arr[0].perAccidentFinanceAmount,
          insuranceTotalAmount: arr[0].insuranceTotalAmount,
          selfInflictedAmount: this.data.selfInflictedAmount
        }
      }
      return data
    }
  },
  methods: {
    updatedValue(key, e) {
      if(key == 'perBodyAmount') {
        this.$emit('update:data', {
          ...this.data,
          perBodyAmount: e? Number(e.toString().replace(/,/g, '')) : 0,
          perAccidentBodyAmount: e ? Number(e.toString().replace(/,/g, '')) * 5 : 0,
          perAccidentFinanceAmount: e? Number(e.toString().replace(/,/g, '')) : 0,
          insuranceTotalAmount: e ? Number(e.toString().replace(/,/g, '')) * 12 : 0,
          selfInflictedAmount: this.data.selfInflictedAmount
        })
        return
      } else {
        this.$emit('update:data', {
          ...this.data,
          [key]: e
        })
      }
    },
    assignAmount(value,reset) {
      if(reset) {
        this.$emit('update:data', {
          ...this.data,
          perBodyAmount: '',
          perAccidentBodyAmount: '',
          perAccidentFinanceAmount: '',
          insuranceTotalAmount: '',
          selfInflictedAmount: this.data.selfInflictedAmount
        })
      } else {
        if(this.amountMinimum.countyName.length == 0 && this.type == 'place' && this.data.amountType.Value == 0) return
        if(this.data.amountType.Value == 0) {
          this.$emit('update:data', {
            ...this.data,
            perBodyAmount: this.amountMinimum.perBodyAmount,
            perAccidentBodyAmount: this.amountMinimum.perAccidentBodyAmount,
            perAccidentFinanceAmount: this.amountMinimum.perAccidentFinanceAmount,
            insuranceTotalAmount: this.amountMinimum.insuranceTotalAmount,
            selfInflictedAmount: this.data.selfInflictedAmount
          })
        }
        if(Number(this.data.amountType.Value) > 2) {
          this.$emit('update:data', {
            ...this.data,
            perBodyAmount: this.data.amountType.Text.split('/').map(i => i.replace('萬', ''))[0],
            perAccidentBodyAmount: this.data.amountType.Text.split('/').map(i => i.replace('萬', ''))[1],
            perAccidentFinanceAmount: this.data.amountType.Text.split('/').map(i => i.replace('萬', ''))[2],
            insuranceTotalAmount: this.data.amountType.Text.split('/').map(i => i.replace('萬', ''))[3],
            selfInflictedAmount: this.data.selfInflictedAmount
          })
        }
      }
      
    }
  },
  mounted() {
    if (this.type == 'place') {
      this.amountList = [{Value: 0, Text: '依各縣市規定'},
        {Value: 1, Text: '合併單一限額'},
        {Value: 2, Text: '自行輸入保額'},]
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>