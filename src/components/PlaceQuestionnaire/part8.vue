<template>
  <div class="w-full my-4">
    <div class="column-4">
      <InputGroup title="是否設置醫療站並配置醫護人員">
        <SwitchInput
          slot="input"
          id="part8value1"
          :value="data.part8.value1"
          @updateValue="(e) =>updateValue(e,'value1')"
        />
      </InputGroup>
      <InputGroup title="是否有防護或緊急設備">
        <SwitchInput
          slot="input"
          id="part8value2"
          :value="data.part8.value2"
          @updateValue="(e) =>updateValue(e,'value2')"
        />
      </InputGroup>
      <InputGroup title="是否有災害防護計畫">
        <SwitchInput
          slot="input"
          id="part8value3"
          :value="data.part8.value3"
          @updateValue="(e) =>updateValue(e,'value3')"
        />
      </InputGroup>
    </div>
    <div class="column-4 mt-4 dashed-border">
      <InputGroup title="是否有緊急應變計畫(包含應變人員編組和指定職責，如關鍵設備留守人員、警戒人員、醫療救護編組、消防編組等)">
        <SwitchInput
          slot="input"
          id="part8value4"
          :value="data.part8.value4"
          @updateValue="(e) =>updateValue(e,'value4')"
        />
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
        part8: {
          ...this.data.part8,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>