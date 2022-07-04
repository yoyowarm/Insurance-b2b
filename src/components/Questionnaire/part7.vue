<template>
  <div>
    <FormTitle title="營業處所相關之消防和安全措施" class="my-3"/>
    <div class="flex flex-row my-3">
      <Checkbox
        id="消防栓"
        class="text-md"
        text="消防栓"
        :checked="data.part7.fireHydrant"
        :value="data.part7.fireHydrant"
        @updateValue="(e) =>updateValue(e,'fireHydrant')"
      />
    </div>
    <div class="column-6 my-1">
      <Checkbox
        id="滅火器：泡沫型"
        class="text-md"
        text="滅火器：泡沫型"
        :checked="data.part7.fireExtinguisher"
        :value="data.part7.fireExtinguisher"
        @updateValue="(e) =>updateValue(e,'fireExtinguisher')"
      />
      <InputGroup noMt class="ml-8" :disable="!data.part7.fireExtinguisher">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.fireExtinguisher"
          :value="data.part7.foam.indoor"
          @updateValue="(e) => updateValue(e,'foam.indoor')"
          numberOnly
        />
      </InputGroup>
      <InputGroup noMt class="ml-8" :disable="!data.part7.fireExtinguisher">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.fireExtinguisher"
          :value="data.part7.foam.outdoor"
          @updateValue="(e) => updateValue(e,'foam.outdoor')"
          numberOnly
        />
      </InputGroup>
    </div>
    <div class="column-6 my-1">
      <span class="h-full pl-24 mt-4">二氧化碳</span>
      <InputGroup noMt class="ml-8" :disable="!data.part7.fireExtinguisher">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.fireExtinguisher"
          :value="data.part7.carbonDioxide.indoor"
          @updateValue="(e) => updateValue(e,'carbonDioxide.indoor')"
          numberOnly
        />
      </InputGroup>
      <InputGroup noMt class="ml-8" :disable="!data.part7.fireExtinguisher">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.fireExtinguisher"
          :value="data.part7.carbonDioxide.outdoor"
          @updateValue="(e) => updateValue(e,'carbonDioxide.outdoor')"
          numberOnly
        />
      </InputGroup>
    </div>
    <div class="column-6 my-1">
      <span class="h-full pl-24 mt-4">ABC乾粉</span>
      <InputGroup noMt class="ml-8" :disable="!data.part7.fireExtinguisher">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.fireExtinguisher"
          :value="data.part7.abc.indoor"
          @updateValue="(e) => updateValue(e,'abc.indoor')"
          numberOnly
        />
      </InputGroup>
      <InputGroup noMt class="ml-8" :disable="!data.part7.fireExtinguisher">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.fireExtinguisher"
          :value="data.part7.abc.outdoor"
          @updateValue="(e) => updateValue(e,'abc.outdoor')"
          numberOnly
        />
      </InputGroup>
    </div>
    <div class="column-6 my-1">
      <span class="h-full pl-24 mt-4">海龍(halon)</span>
      <InputGroup noMt class="ml-8" :disable="!data.part7.fireExtinguisher">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.fireExtinguisher"
          :value="data.part7.halon.indoor"
          @updateValue="(e) => updateValue(e,'halon.indoor')"
          numberOnly
        />
      </InputGroup>
      <InputGroup noMt class="ml-8" :disable="!data.part7.fireExtinguisher">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.fireExtinguisher"
          :value="data.part7.halon.outdoor"
          @updateValue="(e) => updateValue(e,'halon.outdoor')"
          numberOnly
        />
      </InputGroup>
    </div>
    <div class="ml-24 text-red-500 text-sm">註：海龍(halon)滅火設備不適用在開放性或空氣流通處</div>
    <div class="column-4 my-3">
      <InputGroup title="是否有自動灑水系統">
        <SwitchInput
          slot="input"
          id="sprinkler"
          :value="data.part7.sprinkler"
          @updateValue="(e) => updateValue(e,'sprinkler')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有氣體滅火系統" dash>
        <SwitchInput
          slot="input"
          id="gasExtinguishing"
          :value="data.part7.gasExtinguishing"
          @updateValue="(e) => updateValue(e,'gasExtinguishing')"
        />
      </InputGroup>
      <InputGroup title="氣體滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.gasExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.gasExtinguishing"
          :value="data.part7.gasExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'gasExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有泡沫滅火系統" dash>
        <SwitchInput
          slot="input"
          id="foamExtinguishing"
          :value="data.part7.foamExtinguishing"
          @updateValue="(e) => updateValue(e,'foamExtinguishing')"
        />
      </InputGroup>
      <InputGroup title="泡沫滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.foamExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.foamExtinguishing"
          :value="data.part7.foamExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'foamExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3  dashed-border">
      <InputGroup title="是否有水霧滅火系統" dash>
        <SwitchInput
          slot="input"
          id="waterMistExtinguishing"
          :value="data.part7.waterMistExtinguishing"
          @updateValue="(e) => updateValue(e,'waterMistExtinguishing')"
        />
      </InputGroup>
      <InputGroup title="水霧滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.waterMistExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.waterMistExtinguishing"
          :value="data.part7.waterMistExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'waterMistExtinguishingInstall')"
        />
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
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      if(type.includes('.')) {
        let arr = type.split('.')
        const obj = Object.assign({}, {[arr[1]]: e})
        const obj2 = {...this.data.part7[arr[0]], ...obj}
        const part7 = {...this.data.part7, [arr[0]]: obj2}
        this.$emit('update:data',{...this.data, part7})
      } else {
        this.$emit('update:data',{
        ...this.data,
        part7: {
          ...this.data.part7,
          [type]: e
        }
      })
      }
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>