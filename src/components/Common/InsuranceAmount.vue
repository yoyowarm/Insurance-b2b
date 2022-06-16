<template>
  <div class="w-full">
    <div class="column-5 dashed-border">
      <InputGroup title="金額" class="col-span-2">
        <Select slot="input" defaultText="依各縣市規定"/>
      </InputGroup>
    </div>
    <div class="column-5 pt-5">
      <InputGroup title="每一個人體傷責任金額">
        <Input slot="input" placeholder="請輸入金額" unit="萬元"/>
      </InputGroup>
      <InputGroup title="每一意外事故體傷責任金額" disable>
        <Input slot="input" placeholder="請輸入金額" disable unit="萬元"/>
      </InputGroup>
      <InputGroup title="每一意外事故財物損失責任金額" disable>
        <Input slot="input" placeholder="請輸入金額" disable unit="萬元"/>
      </InputGroup>
      <InputGroup title="本保險契約之最高賠償金額	" disable>
        <Input slot="input" placeholder="請輸入金額" disable unit="萬元"/>
      </InputGroup>
      <InputGroup title="自負額">
        <Select slot="input" defaultText="請選擇金額"/>
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
  }
}
</script>

<style scoped lang="scss">
  
</style>