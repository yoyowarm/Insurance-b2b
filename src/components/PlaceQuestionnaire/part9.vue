<template>
  <div class="w-full my-4  dashed-border">
    <div class="column-4">
      <InputGroup lgTitle title="被保險人過去五年是否有損失紀錄">
        <SwitchInput
          slot="input"
          id="hasLossHistoryBeforeFiveYear"
          :value="data.part9.hasLossHistoryBeforeFiveYear"
          @updateValue="(e) =>updateValue(e,'hasLossHistoryBeforeFiveYear')"
        />
      </InputGroup>
      <InputGroup class="col-span-3" lgTitle title="填寫損失金額、次數、原因" :disable="!data.part9.hasLossHistoryBeforeFiveYear">
        <Input
          slot="input"
          :value="data.part9.lostAmountFrequencyReason"
          @updateValue="(e) =>updateValue(e,'lostAmountFrequencyReason')"
          :disable="!data.part9.hasLossHistoryBeforeFiveYear"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch/index.vue'
import Input from '@/components/InputGroup/Input.vue'
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
        part9: {
          ...this.data.part9,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>