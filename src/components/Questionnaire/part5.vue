<template>
  <div class="w-full my-4">
    <div class="column-4">
      <InputGroup title="使用道路者，對附近交通之衝擊是否經交通主管機關認許">
        <SwitchInput slot="input"/>
      </InputGroup>
    </div>
    <div class="column-4 mt-4">
      <InputGroup title="未使用道路者，對附近交通之衝擊、停車事宜、行人及活動結束後之散場動線是否經交通主管機關認許">
        <SwitchInput slot="input"/>
      </InputGroup>
    </div>
    <div class="column-4 mt-4 dashed-border">
      <InputGroup title="保險處所與車道有無有效區隔(含車道與人員動線安排)">
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