<template>
	<div>
		<FormTitle title="t41接駁運送責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-6">
      <InputGroup title="起訖地" borderBtn>
        <span slot="input">{{data.PL041.value1}}</span>
      </InputGroup>
      <InputGroup title="車牌號碼" borderBtn>
        <span slot="input">{{data.PL041.value2}}</span>
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
        PL041: {
          ...this.data.PL041,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>