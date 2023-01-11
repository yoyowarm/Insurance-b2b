<template>
	<div class="mb-3">
		<FormTitle :title="data.additionTermName" classList="text-lg text-gray-700">
      <font-awesome-icon class="text-lg text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>
    <div class="column-6">
      <InputGroup class="col-span-6"  title="內容" borderBtn>
        <div slot="input" class="w-full pr-24 relative">
          <p>※小型營繕工程係指在施工處所內從事每一工程合約價款不高於新台幣五十萬元之工程</p>
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
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>

<style scoped lang="scss">
	
</style>