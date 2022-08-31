<template>
	<div class="mb-3">
		<FormTitle title="PL053傷害醫療及身故慰問金費用附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>
    <div class="column-6">
      <div>
        <FormTitle title="每一個人傷害醫療慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
        <div class="w-full">
          <InputGroup title="新台幣" borderBtn>
            <span slot="input">{{numFormat(findTarget('value1').itemValue)}}元</span>
          </InputGroup>
        </div>
      </div>	
      <div>
        <FormTitle title="每一個人身故慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
        <div class="w-full">
          <InputGroup title="新台幣" borderBtn>
            <span slot="input">{{numFormat(findTarget('value2').itemValue)}}元</span>
          </InputGroup>
        </div>
      </div>
      <div>
        <FormTitle title="每一意外事故慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
        <div class="w-full">
          <InputGroup title="新台幣" borderBtn>
            <span slot="input">{{numFormat(findTarget('value3').itemValue)}}元</span>
          </InputGroup>
        </div>
      </div>
      <div>
        <FormTitle title="保險期間內慰問金費用最高賠償金額" classList="text-lg text-gray-700 mt-3"/>
        <div class="w-full">
          <InputGroup title="新台幣" borderBtn>
            <span slot="input">{{numFormat(findTarget('value4').itemValue)}}元</span>
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
        PL053: {
          ...this.data.PL053,
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