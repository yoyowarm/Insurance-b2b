<template>
  <div class="w-full my-4  dashed-border">
    <div class="w-full flex flex-row mt-4" >
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasLossHistoryBeforeFiveYear11" :value="data.part9.hasLossHistoryBeforeFiveYear === true" @updateValue="updateValue(true, 'hasLossHistoryBeforeFiveYear')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasLossHistoryBeforeFiveYear21" :value="data.part9.hasLossHistoryBeforeFiveYear === false" @updateValue="updateValue(false, 'hasLossHistoryBeforeFiveYear')"/>
      </div>
        <div class=" text-lg">被保險人過去五年是否有損失紀錄(不論有否投保)</div>
    </div>
    <div class="column-4">
      <InputGroup class="col-span-3" lgTitle title="填寫損失金額、次數、原因" :disable="disable || !data.part9.hasLossHistoryBeforeFiveYear">
        <Input
          slot="input"
          :value="data.part9.lostAmountFrequencyReason"
          @updateValue="(e) =>updateValue(e,'lostAmountFrequencyReason')"
          :disable="disable || !data.part9.hasLossHistoryBeforeFiveYear"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
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
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue(e,type) {
      if(!e && type == 'hasLossHistoryBeforeFiveYear') {
        this.$emit('update:data', {
          ...this.data,
          part9: {
            ...this.data.part9,
            [type]: e === this.data.part9[type],
            lostAmountFrequencyReason: ''
          }
        })
      } else {
        this.$emit('update:data',{
          ...this.data,
          part9: {
            ...this.data.part9,
            [type]: type === 'hasLossHistoryBeforeFiveYear' && e === this.data.part9[type] ? null : e
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