<template>
	<div>
		<FormTitle title="t40受託物責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <FormTitle title="每一意外事故財損責任之保險金額" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-6">
      <InputGroup title="新台幣" borderBtn>
        <span slot="input">{{data.PL040.value1}}萬元</span>
      </InputGroup>
    </div>
    <FormTitle title="保險期間內之最高賠償金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-6">
      <InputGroup title="新台幣" borderBtn>
        <span slot="input">{{data.PL040.value2}}萬元</span>
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
        PL040: {
          ...this.data.PL040,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>