<template>
	<div class="mb-3">
		<FormTitle title="PL004游泳池責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-6">
      <InputGroup class="col-span-6"  title="內容" borderBtn>
        <div slot="input" class="w-full pr-24 relative">
          <p>※需領有執照之教練於現場執行</p>
        </div>
      </InputGroup>
    </div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
export default {
	components: {
    FormTitle,
    InputGroup
  },
}
</script>

<style scoped lang="scss">
	
</style>