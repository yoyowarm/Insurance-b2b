<template>
	<div>
		<FormTitle title="建築物承租人火災附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2 whitespace-no-wrap" slot="right">*必填</span>
    </FormTitle>	
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="保險金額:每一意外事故" :disable="disable">
        <Input
          slot="input"
          placeholder="請輸入金額"
          :value="data.PL005.value1.toString()"
          :disable="disable"
          inputmode="tel"
          @updateValue="(e) =>updateValue(e,'value1')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-12 bottom-3" slot="suffix">萬元</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="處所數量" :disable="type == 'place' || disable" whitespaceRight popupRight>
        <Input
          slot="input"
          placeholder="請輸入數量"
          inputmode="tel"
          :value="data.PL005.value2.toString()"
          @updateValue="(e) =>updateValue(e,'value2')"
          numberOnly
          numberFormat
          :disable="type == 'place' || disable"
        />
        <span slot="right" class="ml-2 text-sm text-red-500"><font-awesome-icon class="mr-1" icon="exclamation-circle" />請輸入承租處所的數量</span>
        <span class="absolute right-2 bottom-3" slot="suffix">處</span>
      </InputGroup>
    </div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
import Input from '@/components/InputGroup/Input.vue'
export default {
	components: {
    InputGroup,
    FormTitle,
    Input
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        PL005: {
          ...this.data.PL005,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>