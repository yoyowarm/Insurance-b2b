<template>
	<div>
		<FormTitle title="t3各級學校暨幼兒園責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-5 mt-4 dashed-border">
      <InputGroup class="col-span-2" title="簽訂檢查維護合約">
        <SwitchInput
          slot="input"
          id="簽訂檢查維護合約"
        />
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="電梯種類和數量">
        <Input slot="input" placeholder="請輸入數量"/>
        <span class="absolute -right-16 bottom-3" slot="suffix">電扶梯</span>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="col-span-2" noMt>
        <Input slot="input" placeholder="請輸入數量"/>
        <span class="absolute -right-17 bottom-3" slot="suffix">客/貨梯</span>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="col-span-2" noMt>
        <Input slot="input" placeholder="請輸入數量"/>
        <span class="absolute -right-24 bottom-3" slot="suffix">汽車升降梯</span>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="col-span-2" noMt>
        <Input slot="input" placeholder="請輸入數量"/>
        <span class="absolute -right-19 bottom-3" slot="suffix">其他種類</span>
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