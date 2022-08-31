<template>
	<div class="mb-3">
		<FormTitle title="PL055營業中斷損失責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>
    <div class="column-6">
      <div>
        <FormTitle title="每一意外事故保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
        <div class="w-full">
          <InputGroup title="新台幣" borderBtn>
            <span slot="input">{{numFormat(findTarget('value1').itemValue)}}萬元為限</span>
          </InputGroup>
        </div>
      </div>
      <div>
        <FormTitle title="保險期間累計保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
        <div class="w-full">
          <InputGroup title="新台幣" borderBtn>
            <span slot="input">{{numFormat(findTarget('value2').itemValue)}}萬元為限</span>
          </InputGroup>
        </div>
      </div>
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
        PL055: {
          ...this.data.PL055,
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