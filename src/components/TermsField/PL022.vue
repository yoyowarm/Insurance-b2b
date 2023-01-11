<template>
	<div>
		<FormTitle title="裝卸搬運責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2 whitespace-no-wrap" slot="right">*必填</span>
    </FormTitle>	
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="每一意外事故財損責任之保險金額">
        <Input
          slot="input"
          placeholder="請輸入金額"
          inputmode="tel" 
          :value="data.PL022.value1.toString()"
          @updateValue="(e) =>updateValue(e,'value1')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-12 bottom-3" slot="suffix">萬元</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="保險期間內之最高賠償金額">
        <Input
          slot="input"
          placeholder="請輸入金額"
          inputmode="tel" 
          :value="data.PL022.value2.toString()"
          @updateValue="(e) =>updateValue(e,'value2')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-12 bottom-3" slot="suffix">萬元</span>
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
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        PL022: {
          ...this.data.PL022,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>