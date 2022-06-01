<template>
	<div>
		<FormTitle title="t2停車場責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-5 mt-4 dashed-border">
      <InputGroup class="col-span-2" title="停車場收費">
        <SwitchInput
          slot="input"
          id="停車場收費"
        />
      </InputGroup>
      <InputGroup class="col-span-2" title="代客停車">
        <SwitchInput
          slot="input"
          id="代客停車"
        />
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="車位種類和數量">
        <Input slot="input" placeholder="請輸入數量"/>
        <span class="absolute -right-22 bottom-3" slot="suffix">平面式車位</span>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="col-span-2" noMt>
        <Input slot="input" placeholder="請輸入數量"/>
        <span class="absolute -right-30 bottom-3" slot="suffix">室內機械式車位</span>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="col-span-2" noMt>
        <Input slot="input" placeholder="請輸入數量"/>
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
}
</script>

<style scoped lang="scss">
	
</style>