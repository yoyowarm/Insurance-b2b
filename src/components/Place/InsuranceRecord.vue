<template>
  <div class="w-full">
    <div class="column-5">
      <InputGroup class="item" title="去年投保紀錄" dash :disable="disable">
        <SwitchInput
          slot="input"
          id="lastYearStatus"
          :value="data.lastYear.status"
          @updateValue="(e) => updateValue(e,'status', 'lastYear')"
          :disabled="disable"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="去年平均保費" :disable="!data.lastYear.status || disable" dash>
        <Input
          slot="input"
          placeholder="輸入保單號碼"
          :value="data.lastYear.averagePremium"
          :disable="!data.lastYear.status || disable"
          @updateValue="(e) => updateValue(e,'averagePremium', 'lastYear')"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="去年理賠金額" :disable="!data.lastYear.status || disable">
        <Input
          slot="input"
          placeholder="輸入保單號碼"
          :value="data.lastYear.claimAmount"
          :disable="!data.lastYear.status || disable"
          @updateValue="(e) => updateValue(e,'claimAmount', 'lastYear')"
        />
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="item" title="前年投保紀錄" dash :disable="disable">
        <SwitchInput
          slot="input"
          id="PreviousYearStatus"
          :value="data.previousYear.status"
          :disabled="disable"
          @updateValue="(e) => updateValue(e,'status', 'previousYear')"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="前年平均保費" :disable="!data.previousYear.status || disable" dash>
        <Input
          slot="input"
          placeholder="輸入保單號碼"
          :value="data.previousYear.premium"
          :disable="!data.previousYear.status || disable"
          @updateValue="(e) => updateValue(e,'averagePremium', 'previousYear')"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="前年理賠金額" :disable="!data.previousYear.status || disable">
        <Input
          slot="input"
          placeholder="輸入保單號碼"
          :value="data.previousYear.claimAmount"
          :disable="!data.previousYear.status || disable"
          @updateValue="(e) => updateValue(e,'claimAmount', 'previousYear')"
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
    },
    disable: {
      type: Boolean,
      default: false
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