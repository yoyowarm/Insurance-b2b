<template>
  <div class="column-5">
    <InputGroup title="經手人代號">
      <Input  slot="input" placeholder="輸入代號" :value="data.issuerNumber" @updateValue="(e) => updateValue(e,'issuerNumber')"/>
    </InputGroup>
    <InputGroup title="業務來源">
      <Select
        slot="input"
        :options="brokerList"
        defaultText="請選擇業務來源"
        :selected="data.businessSourceCode.Value"
        @emitItem="(item) => updateValue(item, 'businessSourceCode')"
      />
    </InputGroup>
    <InputGroup title="統計代號">
      <Input slot="input" placeholder="輸入統計代號" :value="data.statisticsCode" @updateValue="(e) => updateValue(e,'statisticsCode')"/>
    </InputGroup>
    <InputGroup title="登入證字號(登錄ID)">
      <Input slot="input" placeholder="輸入號碼" :value="data.loginIdNumber" @updateValue="(e) => updateValue(e,'loginIdNumber')"/>
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
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e, key) {
      this.$emit('update:data', {
        ...this.data,
        [key]: e
      })
    }
  },
}
</script>
<style scoped lang="scss">
</style>