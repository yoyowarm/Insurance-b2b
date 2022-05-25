<template>
	<div>
		<FormTitle title="t55營業中斷損失責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <FormTitle title="每一意外事故保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="新台幣">
        <Input slot="input" placeholder="請輸入金額"/>
        <span class="absolute -right-20 bottom-3" slot="suffix">萬元為限</span>
      </InputGroup>
    </div>
    <FormTitle title="保險期間累計保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="新台幣">
        <Input slot="input" placeholder="請輸入金額"/>
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
}
</script>

<style scoped lang="scss">
	
</style>