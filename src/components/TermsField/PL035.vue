<template>
	<div>
		<FormTitle title="小型營繕工程附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="flex flex-row mt-4 ">
      <p>※小型營繕工程係指在施工處所內從事每一工程合約價款不高於新台幣五十萬元之工程</p>
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