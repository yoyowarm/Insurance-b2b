<template>
	<div>
		<FormTitle title="t28安養事業責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <FormTitle title="每一意外事故身體傷亡" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-6">
      <InputGroup title="新台幣" borderBtn>
        <span slot="input">50萬元</span>
      </InputGroup>
    </div>
    <FormTitle title="保險期間內之最高賠償金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-5 mt-2">
      <InputGroup title="新台幣" borderBtn>
        <span slot="input">50萬元</span>
      </InputGroup>
    </div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
export default {
	components: {
    InputGroup,
    FormTitle,
  },
}
</script>

<style scoped lang="scss">
	
</style>