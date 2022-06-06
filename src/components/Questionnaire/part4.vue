<template>
  <div class="w-full my-4">
    <div class="column-4">
      <InputGroup title="是否設有中控中心以監控公用設備">
        <SwitchInput slot="input"/>
      </InputGroup>
      <InputGroup title="是否使用高壓電設施(600V以上)">
        <SwitchInput slot="input"/>
      </InputGroup>
      <InputGroup title="是否有裸露電線或導體">
        <SwitchInput slot="input"/>
      </InputGroup>
      <InputGroup title="供電系統是否裝有自動斷電設備">
        <SwitchInput slot="input"/>
      </InputGroup>
    </div>
    <div class="column-4 mt-4 dashed-border">
      <InputGroup title="所有電線是否裝在管內(含踏板)以避免短路">
        <SwitchInput slot="input"/>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch/index.vue'
export default {
  components: {
    InputGroup,
    SwitchInput
  }
}
</script>

<style scoped lang="scss">
  
</style>