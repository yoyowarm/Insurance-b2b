<template>
	<div>
		<FormTitle title="t5廣告招牌附加條款A (含天災)" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="保險金額:每一意外事故">
        <Input slot="input" placeholder="請輸入金額"/>
        <span class="absolute -right-12 bottom-3" slot="suffix">萬元</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="處所數量">
        <Input slot="input" placeholder="請輸入數量"/>
        <span class="absolute -right-8 bottom-3" slot="suffix">處</span>
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