<template>
	<div class="mb-3">
		<FormTitle :title="data.additionTermName" classList="text-lg text-gray-700">
      <font-awesome-icon class="text-lg text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <FormTitle title="本附加條款之每一意外事故及保險期間累計保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-6">
      <InputGroup class="col-span-2" noMt borderBtn>
        <span slot="input">{{numFormat(findTarget('value1').itemValue/10000)}}萬元</span>
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
        PL049: {
          ...this.data.PL049,
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