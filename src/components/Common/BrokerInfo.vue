<template>
  <div class="column-5">
    <InputGroup title="經手人代號" :disable="disable">
      <Input
        slot="input"
        :disable="disable"
        placeholder="輸入代號"
        :value="data.issuerNumber"
        @updateValue="(e) => updateValue(e,'issuerNumber')"
        @blurInput="checkUser"/>
    </InputGroup>
    <InputGroup title="業務來源" :disable="disable">
      <Select
        slot="input"
        :disable="disable"
        :options="brokerList"
        defaultText="請選擇業務來源"
        :selected="data.businessSourceCode.Value"
        @emitItem="(item) => updateValue(item, 'businessSourceCode')"
      />
    </InputGroup>
    <InputGroup title="統計代號" :disable="disable">
      <Input slot="input" :disable="disable" placeholder="輸入統計代號" :value="data.statisticsCode" @updateValue="(e) => updateValue(e,'statisticsCode')"/>
    </InputGroup>
    <InputGroup title="登入證字號(登錄ID)" :disable="disable">
      <Input slot="input" :disable="disable" placeholder="輸入號碼" :value="data.loginIdNumber" @updateValue="(e) => updateValue(e,'loginIdNumber')"/>
    </InputGroup>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Select from '@/components/Select'
import Input from '@/components/InputGroup/Input.vue'
import { Popup } from '@/utils/popups'
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
    },
    disable: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    updateValue(e, key) {
      this.$emit('update:data', {
        ...this.data,
        [key]: e
      })
    },
    async checkUser() {
      const checkUser = await this.$store.dispatch('resource/CheckTaianUserExist', {
        employeeId: this.data.issuerNumber
      })
      if(!checkUser.data.content) {
        Popup.create({
          headerText: '經手人代號錯誤',
          htmlText: '請確認經手人代號是否正確',
          hasHtml: true
        })
        this.updateValue('','issuerNumber')
      } else {
        this.$emit('getBusinessSource')
      }
    }
  },
}
</script>
<style scoped lang="scss">
</style>