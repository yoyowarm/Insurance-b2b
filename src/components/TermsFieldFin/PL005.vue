<template>
	<div>
		<FormTitle title="t5廣告招牌附加條款A (含天災)" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-6">
      <InputGroup title="保險金額:每一意外事故" borderBtn>
        <span slot="input">50萬元</span>
      </InputGroup>
      <InputGroup title="處所數量" borderBtn>
        <span slot="input">50處</span>
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