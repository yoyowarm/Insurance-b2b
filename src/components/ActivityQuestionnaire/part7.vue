<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup title="是否有氣體滅火系統" dash>
        <SwitchInput
          slot="input"
          id="gasExtinguishing"
          :value="data.part7.gasExtinguishing"
          @updateValue="(e) => updateValue(e,'gasExtinguishing')"
        />
      </InputGroup>
      <InputGroup title="氣體滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.gasExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.gasExtinguishing"
          :value="data.part7.gasExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'gasExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="ml-2 mt-2 text-red-500 text-sm">*不論有無投保</div>
    <div class="column-4 my-3 border-solid border-b-2 pb-10">
      <InputGroup title="其他(未載於上述者請自行填寫)" class="col-span-4" :disable="!data.part7.gasExtinguishing">
        <Input
          slot="input"
          placeholder="輸入內容"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch'
import Input from '@/components/InputGroup/Input'
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
      if(type.includes('.')) {
        let arr = type.split('.')
        const obj = Object.assign({}, {[arr[1]]: e})
        const obj2 = {...this.data.part7[arr[0]], ...obj}
        const part7 = {...this.data.part7, [arr[0]]: obj2}
        this.$emit('update:data',{...this.data, part7})
      } else {
        this.$emit('update:data',{
        ...this.data,
        part7: {
          ...this.data.part7,
          [type]: e
        }
      })
      }
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>