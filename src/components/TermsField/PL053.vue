<template>
	<div>
		<FormTitle title="傷害醫療及身故慰問金費用附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2 whitespace-no-wrap" slot="right">*必填</span>
    </FormTitle>	
    <FormTitle title="每一個人傷害醫療慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="新台幣">
        <Input
          slot="input"
          placeholder="請輸入金額"
          inputmode="tel" 
          :value="data.PL053.value1.toString()"
          @updateValue="(e) =>updateValue(e,'value1')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
    <FormTitle title="每一個人身故慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="新台幣">
        <Input
          slot="input"
          placeholder="請輸入金額"
          inputmode="tel" 
          :value="data.PL053.value2.toString()"
          @updateValue="(e) =>updateValue(e,'value2')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
    <FormTitle title="每一意外事故慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="新台幣">
        <Input
          slot="input"
          placeholder="請輸入金額"
          inputmode="tel" 
          :value="data.PL053.value3.toString()"
          @updateValue="(e) =>updateValue(e,'value3')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
    <FormTitle title="保險期間內慰問金費用最高賠償金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="新台幣">
        <Input
          slot="input"
          placeholder="請輸入金額"
          inputmode="tel" 
          :value="data.PL053.value4.toString()"
          @updateValue="(e) =>updateValue(e,'value4')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
import Input from '@/components/InputGroup/Input.vue'
export default {
	components: {
    InputGroup,
    FormTitle,
    Input
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        PL053: {
          ...this.data.PL053,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>