<template>
	<div>
		<FormTitle title="承租人借用人責任附加條款(保額外加)" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2 whitespace-no-wrap" slot="right">*必填</span>
    </FormTitle>	
    <FormTitle title="本附加條款之每一意外事故及保險期間累計保險金額最高以新台幣" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-5 ">
      <InputGroup class="col-span-2" noMt>
        <Input
          slot="input"
          placeholder="請輸入金額"
          :value="data.PL049.value1.toString()"
          @updateValue="(e) =>updateValue(e,'value1')"
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
        PL049: {
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>