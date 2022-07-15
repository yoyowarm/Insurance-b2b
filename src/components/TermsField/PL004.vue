<template>
	<div>
		<FormTitle title="游泳池責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="flex flex-row mt-4 ">
      <p>※需領有執照之教練於現場執行</p>
    </div>
	</div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
export default {
	components: {
    FormTitle,
  },
}
</script>

<style scoped lang="scss">
	
</style>