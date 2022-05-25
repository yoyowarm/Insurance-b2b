<template>
	<div>
		<FormTitle title="t23慰問金費用附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>
    <FormTitle title="住院慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="每一個人">
        <Input slot="input" placeholder="請輸入金額"/>
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="每一意外事故">
        <Input slot="input" placeholder="請輸入金額"/>
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="保險期間內最高賠償金額">
        <Input slot="input" placeholder="請輸入金額"/>
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
     <FormTitle title="奠儀慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="每一個人">
        <Input slot="input" placeholder="請輸入金額"/>
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="每一意外事故">
        <Input slot="input" placeholder="請輸入金額"/>
        <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-2">
      <InputGroup class="col-span-2" title="保險期間內最高賠償金額">
        <Input slot="input" placeholder="請輸入金額"/>
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
}
</script>

<style scoped lang="scss">
	
</style>