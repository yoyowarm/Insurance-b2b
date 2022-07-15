<template>
  <div class="column-5">
    <InputGroup title="經手人代號">
      <Input  slot="input" placeholder="輸入代號"/>
    </InputGroup>
    <InputGroup title="業務來源">
      <Select slot="input" :options="brokerList" defaultText="請選擇業務來源"/>
    </InputGroup>
    <InputGroup title="統計代號">
      <Input slot="input" placeholder="輸入統計代號"/>
    </InputGroup>
    <InputGroup title="登入證字號(登錄ID)">
      <Input slot="input" placeholder="輸入號碼"/>
    </InputGroup>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Select from '@/components/Select'
import Input from '@/components/InputGroup/Input.vue'
export default {
  components: {
    InputGroup,
    Input,
    Select
  },
  props: {
    brokerList: {
      type: Array,
      default: () => []
    },
    countyList: {
      type: Array,
      default: () => []
    }
  },
}
</script>
<style scoped lang="scss">
</style>