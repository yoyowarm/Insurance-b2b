<template>
	<div>
		<FormTitle title="接駁運送責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2 whitespace-no-wrap" slot="right">*必填</span>
    </FormTitle>	
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="起訖地" :disable="disable">
        <Input
          slot="input"
          placeholder="請輸入起訖地"
          :disable="disable"
          :value="data.PL041.value1"
          @updateValue="(e) =>updateValue(e,'value1')"
        />
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="車牌號碼" :disable="disable">
        <Input
          slot="input"
          placeholder="請輸入車牌號碼"
          :disable="disable"
          :value="data.PL041.value2"
          @updateValue="(e) =>updateValue(e,'value2')"
        />
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
        PL041: {
          ...this.data.PL041,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>