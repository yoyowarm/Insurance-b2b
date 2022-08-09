<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="是否有氣體滅火系統" dash>
        <SwitchInput
          slot="input"
          id="hasLossHistoryBeforeFiveYear"
          :value="data.sheet1.part7.hasLossHistoryBeforeFiveYear"
          @updateValue="(e) => updateValue(e,'hasLossHistoryBeforeFiveYear')"
        />
      </InputGroup>
      <InputGroup lgTitle title="氣體滅火系統安裝於何處" class="col-span-3" :disable="!data.sheet1.part7.hasLossHistoryBeforeFiveYear">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.sheet1.part7.hasLossHistoryBeforeFiveYear"
          :value="data.sheet1.part7.lostAmountFrequencyReason"
          @updateValue="(e) => updateValue(e,'lostAmountFrequencyReason')"
        />
      </InputGroup>
    </div>
    <div class="ml-2 mt-2 text-red-500 text-sm">*不論有無投保</div>
    <div class="column-4 my-3 border-solid border-b-2 pb-10">
      <InputGroup lgTitle title="其他(未載於上述者請自行填寫)" class="col-span-4">
        <Input
          slot="input"
          placeholder="輸入內容"
          :value="data.sheet1.part7.otherRemark"
          @updateValue="(e) => updateValue(e,'otherRemark')"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch'
import Input from '@/components/InputGroup/Input'
export default {
  components: {
    InputGroup,
    SwitchInput,
    Input
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        sheet1: {
          ...this.data.sheet1,
          part7: {
            ...this.data.sheet1.part7,
            [type]: e
          }
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>