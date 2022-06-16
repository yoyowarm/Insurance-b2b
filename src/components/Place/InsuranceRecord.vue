<template>
  <div class="w-full">
    <div class="column-5">
      <InputGroup class="item" title="去年投保紀錄" dash>
        <SwitchInput
          slot="input"
          id="IsRenewal"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="去年平均保費" disable dash>
        <Input slot="input" placeholder="輸入保單號碼" disable/>
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="去年理賠金額" disable>
        <Input slot="input" placeholder="輸入保單號碼" disable/>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="item" title="前年投保紀錄" dash>
        <SwitchInput
          slot="input"
          id="IsRenewal"
        />
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="前年平均保費" disable dash>
        <Input slot="input" placeholder="輸入保單號碼" disable/>
      </InputGroup>
      <InputGroup class="w-full mb-2.5" title="前年理賠金額" disable>
        <Input slot="input" placeholder="輸入保單號碼" disable/>
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
  }
}
</script>

<style scoped lang="scss">
  
</style>