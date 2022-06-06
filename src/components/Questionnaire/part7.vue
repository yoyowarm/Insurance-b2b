<template>
  <div>
    <FormTitle title="營業處所相關之消防和安全措施" class="my-3"/>
    <div class="flex flex-row my-3">
      <Checkbox
        id="selected"
        class="text-md"
        text="消防栓"
      />
    </div>
    <div class="column-6 my-1">
      <Checkbox
        id="selected"
        class="text-md"
        text="滅火器：泡沫型"
      />
      <InputGroup noMt class="ml-8">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input slot="input" placeholder="輸入數量"/>
      </InputGroup>
      <InputGroup noMt class="ml-8">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input slot="input" placeholder="輸入數量"/>
      </InputGroup>
    </div>
    <div class="column-6 my-1">
      <span class="h-full pl-24 mt-4">二氧化碳</span>
      <InputGroup noMt class="ml-8">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input slot="input" placeholder="輸入數量"/>
      </InputGroup>
      <InputGroup noMt class="ml-8">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input slot="input" placeholder="輸入數量"/>
      </InputGroup>
    </div>
    <div class="column-6 my-1">
      <span class="h-full pl-24 mt-4">ABC乾粉</span>
      <InputGroup noMt class="ml-8">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input slot="input" placeholder="輸入數量"/>
      </InputGroup>
      <InputGroup noMt class="ml-8">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input slot="input" placeholder="輸入數量"/>
      </InputGroup>
    </div>
    <div class="column-6 my-1">
      <span class="h-full pl-24 mt-4">海龍(halon)</span>
      <InputGroup noMt class="ml-8">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input slot="input" placeholder="輸入數量"/>
      </InputGroup>
      <InputGroup noMt class="ml-8">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input slot="input" placeholder="輸入數量"/>
      </InputGroup>
    </div>
    <div class="ml-24 text-red-500 text-sm">註：海龍(halon)滅火設備不適用在開放性或空氣流通處</div>
    <div class="column-4 my-3">
      <InputGroup title="是否有自動灑水系統">
        <SwitchInput slot="input" />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有氣體滅火系統" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="氣體滅火系統安裝於何處" class="col-span-3" disable>
        <SwitchInput slot="input" />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有泡沫滅火系統" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="泡沫滅火系統安裝於何處" class="col-span-3" disable>
        <SwitchInput slot="input" />
      </InputGroup>
    </div>
    <div class="column-4 my-3  dashed-border">
      <InputGroup title="是否有水霧滅火系統" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="水霧滅火系統安裝於何處" class="col-span-3" disable>
        <SwitchInput slot="input" />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle.vue'
import SwitchInput from '@/components/Switch'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/InputGroup/Input'
export default {
  components: {
    FormTitle,
    InputGroup,
    SwitchInput,
    Checkbox,
    Input
  }
}
</script>

<style scoped lang="scss">
  
</style>