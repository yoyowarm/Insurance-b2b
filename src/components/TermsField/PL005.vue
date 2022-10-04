<template>
	<div>
		<FormTitle title="建築物承租人火災附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="保險金額:每一意外事故">
        <Input
          slot="input"
          placeholder="請輸入金額"
          :value="data.PL005.value1.toString()"
          @updateValue="(e) =>updateValue(e,'value1')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-12 bottom-3" slot="suffix">萬元</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="處所數量" :disable="type == 'place'">
        <Input
          slot="input"
          placeholder="請輸入數量"
          :value="data.PL005.value2.toString()"
          @updateValue="(e) =>updateValue(e,'value2')"
          numberOnly
          numberFormat
          :disable="type == 'place'"
        />
        <span class="absolute -right-42 bottom-3" slot="suffix">處 <span class="ml-2 text-sm text-red-500">指承租處所的數量</span></span>
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