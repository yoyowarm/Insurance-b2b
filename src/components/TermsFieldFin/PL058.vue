<template>
	<div>
		<FormTitle title="t58液化石油氣及容器附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <FormTitle title="年度購提液化石油氣總數量" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-6">
      <InputGroup noMt borderBtn>
        <span slot="input">{{data.PL058.value1}}公斤</span>
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
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        PL058: {
          ...this.data.PL058,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>