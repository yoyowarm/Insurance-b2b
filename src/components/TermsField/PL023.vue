<template>
	<div>
		<FormTitle title="慰問金費用附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <span class="text-main ml-2 whitespace-no-wrap" slot="right">*必填</span>
    </FormTitle>
    <div class="column-2">
      <div class="flex flex-col">
        <FormTitle title="住院慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
        <div class="flex flex-row mt-2">
          <InputGroup class="col-span-2" title="每一個人" :disable="disable">
            <Input
              slot="input"
              placeholder="請輸入金額"
              inputmode="tel" 
              :disable="disable"
              :value="data.PL023.value1.toString()"
              @updateValue="(e) =>updateValue(e,'value1')"
              numberOnly
              numberFormat
            />
            <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
          </InputGroup>
        </div>
        <div class="flex flex-row mt-2">
          <InputGroup class="col-span-2" title="每一意外事故" :disable="disable">
            <Input
              slot="input"
              placeholder="請輸入金額"
              inputmode="tel" 
              :disable="disable"
              :value="data.PL023.value2.toString()"
              @updateValue="(e) =>updateValue(e,'value2')"
              numberOnly
              numberFormat
            />
            <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
          </InputGroup>
        </div>
        <div class="flex flex-row mt-2">
          <InputGroup class="col-span-2" title="保險期間內最高賠償金額" :disable="disable">
            <Input
              slot="input"
              placeholder="請輸入金額"
              inputmode="tel" 
              :disable="disable"
              :value="data.PL023.value3.toString()"
              @updateValue="(e) =>updateValue(e,'value3')"
              numberOnly
              numberFormat
            />
            <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
          </InputGroup>
        </div>
      </div>
      <div class="flex flex-col">
        <FormTitle title="奠儀慰問金費用保險金額" classList="text-lg text-gray-700 mt-3"/>
        <div class="flex flex-row mt-2">
          <InputGroup class="col-span-2" title="每一個人" :disable="disable">
            <Input
              slot="input"
              placeholder="請輸入金額"
              inputmode="tel" 
              :disable="disable"
              :value="data.PL023.value4.toString()"
              @updateValue="(e) =>updateValue(e,'value4')"
              numberOnly
              numberFormat
            />
            <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
          </InputGroup>
        </div>
        <div class="flex flex-row mt-2">
          <InputGroup class="col-span-2" title="每一意外事故" :disable="disable">
            <Input
              slot="input"
              placeholder="請輸入金額"
              inputmode="tel" 
              :disable="disable"
              :value="data.PL023.value5.toString()"
              @updateValue="(e) =>updateValue(e,'value5')"
              numberOnly
              numberFormat
            />
            <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
          </InputGroup>
        </div>
        <div class="flex flex-row mt-2">
          <InputGroup class="col-span-2" title="保險期間內最高賠償金額" :disable="disable">
            <Input
              slot="input"
              placeholder="請輸入金額"
              inputmode="tel" 
              :disable="disable"
              :value="data.PL023.value6.toString()"
              @updateValue="(e) =>updateValue(e,'value6')"
              numberOnly
              numberFormat
            />
            <span class="absolute -right-8 bottom-3" slot="suffix">元</span>
          </InputGroup>
        </div>
      </div>
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
        PL023: {
          ...this.data.PL023,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>