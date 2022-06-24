<template>
  <div class="w-full">
    <div class="column-5">
      <InputGroup class="item" title="去年投保紀錄" dash>
        <SwitchInput
          slot="input"
          id="lastYearStatus"
          :value="data.lastYear.status"
          @updateValue="(e) => updateValue(e,'status', 'lastYear')"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="去年平均保費" :disable="!data.lastYear.status" dash>
        <Input
          slot="input"
          placeholder="輸入保單號碼"
          :value="data.lastYear.premium"
          :disable="!data.lastYear.status"
          @updateValue="(e) => updateValue(e,'premium', 'lastYear')"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="去年理賠金額" :disable="!data.lastYear.status">
        <Input
          slot="input"
          placeholder="輸入保單號碼"
          :value="data.lastYear.amount"
          :disable="!data.lastYear.status"
          @updateValue="(e) => updateValue(e,'amount', 'lastYear')"
        />
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="item" title="前年投保紀錄" dash>
        <SwitchInput
          slot="input"
          id="PreviousYearStatus"
          :value="data.previousYear.status"
          @updateValue="(e) => updateValue(e,'status', 'previousYear')"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="前年平均保費" :disable="!data.previousYear.status" dash>
        <Input
          slot="input"
          placeholder="輸入保單號碼"
          :value="data.previousYear.premium"
          :disable="!data.previousYear.status"
          @updateValue="(e) => updateValue(e,'premium', 'previousYear')"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="前年理賠金額" :disable="!data.previousYear.status">
        <Input
          slot="input"
          placeholder="輸入保單號碼"
          :value="data.previousYear.amount"
          :disable="!data.previousYear.status"
          @updateValue="(e) => updateValue(e,'amount', 'previousYear')"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import SwitchInput from '@/components/Switch'

export default {
  components: {
    InputGroup,
    Input,
    SwitchInput
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,key,type) {
      const copyData = Object.assign({}, this.data)
      copyData[type][key] = e
      this.$emit('update:data', copyData)
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>