<template>
  <div class="w-full my-4">
    <div class="column-4 dashed-border">
      <InputGroup title="被保險人過去五年是否有損失紀錄">
        <SwitchInput slot="input"/>
      </InputGroup>
      <InputGroup class="col-span-3" title="填寫損失金額、次數、原因">
        <Input slot="input"/>
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
  }
}
</script>

<style scoped lang="scss">
  
</style>