<template>
	<div class="mb-3">
		<FormTitle :title="data.additionTermName" classList="text-lg text-gray-700">
      <font-awesome-icon class="text-lg text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-6 ">
      <InputGroup title="停車場收費" borderBtn>
        <div slot="input" class="w-full pr-24 relative">
          {{findTarget('value1').itemValue ? '有': '無'}}
        </div>
      </InputGroup>
      <InputGroup title="代客停車" borderBtn>
        <div slot="input" class="w-full pr-24 relative">
          {{findTarget('value2').itemValue ? '有': '無'}}
        </div>
      </InputGroup>
      <InputGroup title="車位種類和數量" borderBtn>
        <span slot="input">{{numFormat(findTarget('value3').itemValue)}}位，平面式車位</span>
      </InputGroup>
      <InputGroup title="車位種類和數量" borderBtn>
        <span slot="input">{{numFormat(findTarget('value4').itemValue)}}位，室內機械式車位</span>
      </InputGroup>
      <InputGroup title="車位種類和數量" borderBtn>
        <span slot="input">{{numFormat(findTarget('value5').itemValue)}}位，機械塔車位</span>
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
        PL002: {
          ...this.data.PL002,
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