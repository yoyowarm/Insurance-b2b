<template>
  <div class="w-full">
    <div class="column-5 dashed-border">
      <InputGroup title="金額" class="col-span-2">
        <Select slot="input" :selected="data.amount.Value" defaultText="依各縣市規定"/>
      </InputGroup>
    </div>
    <div class="column-5 pt-5">
      <InputGroup title="每一個人體傷責任金額">
        <Input slot="input" :value="data.value1"  @updateValue="(e) => updatedValue('value1',e)" placeholder="請輸入金額" unit="萬元"/>
      </InputGroup>
      <InputGroup title="每一意外事故體傷責任金額">
        <Input slot="input" :value="data.value2" @updateValue="(e) => updatedValue('value2',e)" placeholder="請輸入金額" unit="萬元"/>
      </InputGroup>
      <InputGroup title="每一意外事故財物損失責任金額">
        <Input slot="input" :value="data.value3" @updateValue="(e) => updatedValue('value3',e)" placeholder="請輸入金額" unit="萬元"/>
      </InputGroup>
      <InputGroup title="本保險契約之最高賠償金額	">
        <Input slot="input" :value="data.value4" @updateValue="(e) => updatedValue('value4',e)" placeholder="請輸入金額" unit="萬元"/>
      </InputGroup>
      <InputGroup title="自負額">
        <Select slot="input" :options="amountList" :selected="data.selfInflicted.Value" defaultText="請選擇金額"/>
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
    }
  },
  data() {
    return {
      amountList: [
        {Value: 1, Text: '2,500元'},
        {Value: 2, Text: '5,000元'},
        {Value: 3, Text: '10,000元'},
        {Value: 4, Text: '50,000元'},
        {Value: 5, Text: '100,000元'},
        {Value: 6, Text: '200,000元'},
      ]
    }
  },
  methods: {
    updatedValue(key, e) {
      this.$emit('update:data', {
        ...this.data,
        [key]: e
      })
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>