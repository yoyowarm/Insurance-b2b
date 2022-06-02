<template>
	<div>
		<FormTitle title="t7各級學校暨幼兒園責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-6">
      <InputGroup title="學員" borderBtn>
        <span slot="input">50位</span>
      </InputGroup>
      <InputGroup title="幼兒" borderBtn>
        <span slot="input">50位</span>
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