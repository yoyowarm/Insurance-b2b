<template>
  <div>
    <div class="w-full my-4">
      <div class="w-full flex flex-row mt-4">
        <div class="flex flex-row justify-between">
          <RadioInput text="是" id="hasLossHistoryBeforeFiveYear" :value="data.sheet1.part7.hasLossHistoryBeforeFiveYear === true" @updateValue="updateValue(true, 'hasLossHistoryBeforeFiveYear')"/>
          <RadioInput class="mx-2" text="否" id="hasLossHistoryBeforeFiveYear2" :value="data.sheet1.part7.hasLossHistoryBeforeFiveYear === false" @updateValue="updateValue(false, 'hasLossHistoryBeforeFiveYear')"/>
      </div>
        <div class=" text-lg">被保險人過去五年是否有損失紀錄</div>
    </div>
  </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="請說明損失金額、次數及原因" class="col-span-3" :disable="!data.sheet1.part7.hasLossHistoryBeforeFiveYear">
        <Input
          slot="input"
          placeholder="輸入說明損失金額、次數及原因"
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
import Input from '@/components/InputGroup/Input'
import RadioInput from '@/components/Radio'
export default {
  components: {
    InputGroup,
    Input,
    RadioInput
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      if(!e && type == 'hasLossHistoryBeforeFiveYear') {
        this.$emit('update:data', {
          ...this.data,
          sheet1: {
            ...this.data.sheet1,
            part7: {
              ...this.data.sheet1.part7,
              [type]: e === this.data.sheet1.part7.hasLossHistoryBeforeFiveYear ? null : e,
              lostAmountFrequencyReason: ''
            }
          }
        })
      } else {
        this.$emit('update:data',{
          ...this.data,
          sheet1: {
            ...this.data.sheet1,
            part7: {
              ...this.data.sheet1.part7,
              [type]: type === 'hasLossHistoryBeforeFiveYear' && e === this.data.sheet1.part7.hasLossHistoryBeforeFiveYear ? null : e
            }
          }
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .w90{
    width: 90%;
  }
  .w10{
    width: 10%;
  }
  @media screen and (max-width: 768px) {
    .w90{
      width: 80%;
    }
    .w10{
      width: 20%;
    }
  }
</style>