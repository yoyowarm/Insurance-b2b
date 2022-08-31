<template>
	<div class="mb-3">
		<FormTitle title="PL043保管箱責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <FormTitle title="每一保管箱財損責任之保險金額" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-6">
      <InputGroup title="新台幣" borderBtn>
        <span slot="input">{{numFormat(findTarget('value1').itemValue)}}萬元</span>
      </InputGroup>
    </div>
    <FormTitle title="每一意外事故財損責任之保險金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-6">
      <InputGroup title="新台幣" borderBtn>
        <span slot="input">{{numFormat(findTarget('value2').itemValue)}}萬元</span>
      </InputGroup>
    </div>
    <FormTitle title="保險期間內之最高賠償金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-6">
      <InputGroup title="新台幣" borderBtn>
        <span slot="input">{{numFormat(findTarget('value3').itemValue)}}萬元</span>
      </InputGroup>
    </div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
import { numFormat } from '@/utils/regex'
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
    numFormat,
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        PL043: {
          ...this.data.PL043,
          [type]: e
        }
      })
    },
    findTarget(key) {
      return this.data.additionTermValue ? this.data.additionTermValue.find(item => item.itemId == key) : {itemId: '',itemValue: ''}
    }
  }
}
</script>

<style scoped lang="scss">
	
</style>