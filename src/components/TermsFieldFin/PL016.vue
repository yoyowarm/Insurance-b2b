<template>
	<div>
		<FormTitle title="t16獨立承攬人責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-6">
      <InputGroup title="承攬工程合約金額少於" borderBtn>
        <span slot="input">{{data.PL016.value1}}萬元者為限</span>
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
        PL016: {
          ...this.data.PL016,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>