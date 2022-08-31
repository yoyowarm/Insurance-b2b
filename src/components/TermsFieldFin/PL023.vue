<template>
	<div class="mb-3">
		<FormTitle title="PL023慰問金費用附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>
    <FormTitle title="住院慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
    <div class="column-6">
      <InputGroup title="每一個人" borderBtn>
        <span slot="input">{{numFormat(findTarget('value1').itemValue)}}元</span>
      </InputGroup>
      <InputGroup title="每一意外事故" borderBtn>
        <span slot="input">{{numFormat(findTarget('value2').itemValue)}}元</span>
      </InputGroup>
      <InputGroup title="保險期間內最高賠償金額" borderBtn>
        <span slot="input">{{numFormat(findTarget('value3').itemValue)}}元</span>
      </InputGroup>
    </div>
     <FormTitle title="奠儀慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-6">
      <InputGroup title="每一個人" borderBtn>
        <span slot="input">{{numFormat(findTarget('value4').itemValue)}}元</span>
      </InputGroup>
      <InputGroup title="每一意外事故" borderBtn>
        <span slot="input">{{numFormat(findTarget('value5').itemValue)}}元</span>
      </InputGroup>
      <InputGroup title="保險期間內最高賠償金額" borderBtn>
        <span slot="input">{{numFormat(findTarget('value6').itemValue)}}元</span>
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
        PL023: {
          ...this.data.PL023,
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