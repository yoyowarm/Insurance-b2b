<template>
	<div>
		<FormTitle title="獨立承攬人責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2 whitespace-no-wrap" slot="right">*必填</span>
    </FormTitle>	
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="承攬工程合約金額少於" :disable="disable">
        <Input
          slot="input"
          placeholder="請輸入金額"
          inputmode="tel" 
          :disable="disable"
          :value="data.PL016.value1.toString()"
          @updateValue="(e) =>updateValue(e,'value1')"
          numberOnly
          numberFormat
        />
        <span class="absolute -right-24 bottom-3" slot="suffix">萬元者為限</span>
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
    disable: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        PL016: {
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>