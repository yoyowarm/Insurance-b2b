<template>
	<div>
		<FormTitle title="營業中斷損失責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2" slot="right">*必填</span>
    </FormTitle>	
    <FormTitle title="每一意外事故保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="新台幣">
        <Input
          slot="input"
          placeholder="請輸入金額"
          :value="data.PL055.value1.toString()"
          @updateValue="(e) =>updateValue(e,'value1')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-20 bottom-3" slot="suffix">萬元為限</span>
      </InputGroup>
    </div>
    <FormTitle title="保險期間累計保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="新台幣">
        <Input
          slot="input"
          placeholder="請輸入金額"
          :value="data.PL055.value2.toString()"
          @updateValue="(e) =>updateValue(e,'value2')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-20 bottom-3" slot="suffix">萬元為限</span>
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
        PL055: {
          ...this.data.PL055,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>