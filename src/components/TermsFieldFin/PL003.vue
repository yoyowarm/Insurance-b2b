<template>
	<div class="mb-3">
		<FormTitle title="PL003電梯意外責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-6">
      <InputGroup  title="簽訂檢查維護合約" borderBtn>
        <div slot="input" class="w-full pr-24 relative">
          {{findTarget('value1').itemValue ? '有': '無'}}
        </div>
      </InputGroup>
      <InputGroup  title="電梯種類和數量" borderBtn>
        <span slot="input">{{findTarget('value2').itemValue}}台，電扶梯</span>
      </InputGroup>
      <InputGroup title="電梯種類和數量" borderBtn>
        <span slot="input">{{findTarget('value3').itemValue}}台，客/貨梯</span>
      </InputGroup>
      <InputGroup title="電梯種類和數量" borderBtn>
        <span slot="input">{{findTarget('value4').itemValue}}台，汽車升降梯</span>
      </InputGroup>
      <InputGroup title="電梯種類和數量" borderBtn>
        <span slot="input">{{findTarget('value5').itemValue}}台，其他種類</span>
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
        PL003: {
          ...this.data.PL003,
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