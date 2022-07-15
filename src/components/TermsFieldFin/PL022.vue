<template>
	<div>
		<FormTitle title="裝卸搬運責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-6">
      <InputGroup title="每一意外事故財損責任之保險金額" borderBtn>
        <span slot="input">{{data.PL022.value1}}萬元</span>
      </InputGroup>
      <InputGroup title="保險期間內之最高賠償金額" borderBtn>
        <span slot="input">{{data.PL022.value2}}萬元</span>
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
        PL022: {
          ...this.data.PL022,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>