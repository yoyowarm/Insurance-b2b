<template>
	<div>
		<FormTitle title="停車場責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-5 mt-4 dashed-border">
      <InputGroup class="col-span-2" title="停車場收費">
        <SwitchInput
          slot="input"
          id="停車場收費"
          :value="data.PL002.value1"
          @updateValue="(e) =>updateValue(e,'value1')"
        />
      </InputGroup>
      <InputGroup class="col-span-2" title="代客停車">
        <SwitchInput
          slot="input"
          id="代客停車"
          :value="data.PL002.value2"
          @updateValue="(e) =>updateValue(e,'value2')"
        />
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="車位種類和數量">
        <Input
          slot="input"
          placeholder="請輸入數量"
          :value="data.PL002.value3.toString()"
          @updateValue="(e) =>updateValue(e,'value3')"
          numberOnly
          numberFormat
          unit="位"/>
        <span class="absolute -right-22 bottom-3" slot="suffix">平面式車位</span>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="col-span-2" noMt>
        <Input
          slot="input"
          placeholder="請輸入數量"
          :value="data.PL002.value4.toString()"
          @updateValue="(e) =>updateValue(e,'value4')"
          numberOnly
          numberFormat
          unit="位"/>
        <span class="absolute -right-30 bottom-3" slot="suffix">室內機械式車位</span>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="col-span-2" noMt>
        <Input
          slot="input"
          placeholder="請輸入數量"
          :value="data.PL002.value5.toString()"
          @updateValue="(e) =>updateValue(e,'value5')"
          numberOnly
          numberFormat
          unit="位"/>
        <span class="absolute -right-22 bottom-3" slot="suffix">機械塔車位</span>
      </InputGroup>
    </div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
import SwitchInput from '@/components/Switch'
import Input from '@/components/InputGroup/Input.vue'
export default {
	components: {
    InputGroup,
    FormTitle,
    SwitchInput,
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
        PL002: {
          ...this.data.PL002,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>