<template>
	<div>
		<FormTitle title="t7各級學校暨幼兒園責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="學員">
        <Input slot="input" placeholder="請輸入人數"/>
        <span class="absolute -right-8 bottom-3" slot="suffix">位</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="幼兒">
        <Input slot="input" placeholder="請輸入人數"/>
        <span class="absolute -right-8 bottom-3" slot="suffix">位</span>
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