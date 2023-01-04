<template>
	<div>
		<FormTitle title="液化石油氣及容器附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2 whitespace-no-wrap" slot="right">*必填</span>
    </FormTitle>	
    <FormTitle title="年度購提液化石油氣總數量" classList="text-lg text-gray-700 mt-3"/>
     <div class="column-5 mt-2">
      <InputGroup class="col-span-2" noMt>
        <Input
          slot="input"
          placeholder="請輸入數量"
          :value="data.PL058.value1.toString()"
          @updateValue="(e) =>updateValue(e,'value1')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-12 bottom-3" slot="suffix">公斤</span>
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
        PL058: {
          ...this.data.PL058,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>