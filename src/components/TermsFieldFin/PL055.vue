<template>
	<div>
		<FormTitle title="t55營業中斷損失責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>
    <div class="column-6">
      <div>
        <FormTitle title="每一意外事故保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
        <div class="w-full">
          <InputGroup title="新台幣" borderBtn>
            <span slot="input">50萬元為限</span>
          </InputGroup>
        </div>
      </div>
      <div>
        <FormTitle title="保險期間累計保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
        <div class="w-full">
          <InputGroup title="新台幣" borderBtn>
            <span slot="input">50萬元為限</span>
          </InputGroup>
        </div>
      </div>
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