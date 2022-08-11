<template>
  <div>
    <FormTitle lgTitle title="營業處所相關之消防和安全措施" class="my-3"/>
    <div class="flex flex-col sm:flex-row my-1">
      <Checkbox
        id="消防栓"
        class="text-md"
        text="消防栓"
        :checked="data.sheet1.part5.hasFireHydrant"
        :value="data.sheet1.part5.hasFireHydrant"
        @updateValue="(e) =>updateValue(e,'hasFireHydrant')"
      />
    </div>
    <div class="flex flex-col sm:flex-row my-1">
      <Checkbox
        id="滅火器：泡沫型"
        class="text-md"
        text="滅火器：泡沫型"
        :checked="data.sheet1.part5.fireExtinguisher"
        :value="data.sheet1.part5.fireExtinguisher"
        @updateValue="(e) =>updateValue(e,'fireExtinguisher')"
      />
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-16 w-40" :disable="!data.sheet1.part5.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.sheet1.part5.fireExtinguisher"
            :value="data.sheet1.part5.foam.indoor"
            @updateValue="(e) => emitSelectItem('foam','indoor',e)"
            numberOnly
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="!data.sheet1.part5.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.sheet1.part5.fireExtinguisher"
            :value="data.sheet1.part5.foam.outdoor"
            @updateValue="(e) => emitSelectItem('foam','outdoor',e)"
            numberOnly
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1">
      <span class="h-full sm:pl-24 mt-4">二氧化碳</span>
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="!data.sheet1.part5.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.sheet1.part5.fireExtinguisher"
            :value="data.sheet1.part5.carbonDioxide.indoor"
            @updateValue="(e) => emitSelectItem('carbonDioxide','indoor',e)"
            numberOnly
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="!data.sheet1.part5.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.sheet1.part5.fireExtinguisher"
            :value="data.sheet1.part5.carbonDioxide.outdoor"
            @updateValue="(e) => emitSelectItem('carbonDioxide','outdoor',e)"
            numberOnly
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1">
      <span class="h-full sm:pl-24 mt-4">ABC乾粉</span>
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="!data.sheet1.part5.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.sheet1.part5.fireExtinguisher"
            :value="data.sheet1.part5.abc.indoor"
            @updateValue="(e) => emitSelectItem('abc','indoor',e)"
            numberOnly
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="!data.sheet1.part5.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.sheet1.part5.fireExtinguisher"
            :value="data.sheet1.part5.abc.outdoor"
            @updateValue="(e) => emitSelectItem('abc','outdoor',e)"
            numberOnly
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1">
      <span class="h-full w-40 sm:pl-24 mt-4">海龍(halon)</span>
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="!data.sheet1.part5.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.sheet1.part5.fireExtinguisher"
            :value="data.sheet1.part5.halon.indoor"
            @updateValue="(e) => emitSelectItem('halon','indoor',e)"
            numberOnly
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="ml-12 sm:ml-24 text-red-500 text-sm">註：海龍(halon)滅火設備不適用在開放性或空氣流通處</div>
    <div class="flex flex-col sm:flex-row my-3">
      <Checkbox
        id="其他，請詳述之"
        class="text-md"
        text="其他，請詳述之"
        :checked="data.sheet1.part5.hasOtherExtinguishing"
        :value="data.sheet1.part5.hasOtherExtinguishing"
        @updateValue="(e) =>updateValue(e,'hasOtherExtinguishing')"
      />
      <InputGroup noMt class="ml-4 w-full sm:w-9/12" :disable="!data.sheet1.part5.hasOtherExtinguishing">
        <Input
          slot="input"
          placeholder="輸入內容"
          :disable="!data.sheet1.part5.hasOtherExtinguishing"
          :value="data.sheet1.part5.otherExtinguishingRemark"
          @updateValue="(e) => updateValue(e,'otherExtinguishingRemark')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle autoHeight title="活動處所消防安全措施是否有編組並實施消防設備性能測試與訓練">
        <SwitchInput
          slot="input"
          id="sprinkler"
          :value="data.sheet1.part5.hasDeviceTestAndTraining"
          @updateValue="(e) => updateValue(e,'hasDeviceTestAndTraining')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="是否已架設消防設備">
        <SwitchInput
          slot="input"
          id="gasExtinguishing"
          :value="data.sheet1.part5.hasErectFireDevice"
          @updateValue="(e) => updateValue(e,'hasErectFireDevice')"
        />
      </InputGroup>
      <InputGroup lgTitle title="是否有禁菸管制">
        <SwitchInput
          slot="input"
          id="hasNoSmokingControl"
          :value="data.sheet1.part5.hasNoSmokingControl"
          @updateValue="(e) => updateValue(e,'hasNoSmokingControl')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3 dashed-border">
      <InputGroup lgTitle title="是否有監視或預警系統" dash>
        <SwitchInput
          slot="input"
          id="hasAlertSystem"
          :value="data.sheet1.part5.hasAlertSystem"
          @updateValue="(e) => updateValue(e,'hasAlertSystem')"
        />
      </InputGroup>
      <InputGroup lgTitle title="是否有監視或預警系統" class="col-span-3" :disable="!data.sheet1.part5.hasAlertSystem">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.sheet1.part5.hasAlertSystem"
          :value="data.sheet1.part5.otherSafeMeasure"
          @updateValue="(e) => updateValue(e,'otherSafeMeasure')"
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
      this.$emit('update:data',{
        ...this.data,
        sheet1: {
          ...this.data.sheet1,
          part5: {
            ...this.data.sheet1.part5,
            [type]: e
          }
        }
      })
    },
    emitSelectItem(key,childKey, value) {
      const obj = {
        ...this.data,
        sheet1: {
          ...this.data.sheet1,
          part5: {
            ...this.data.sheet1.part5,
            [key]: {
              ...this.data.sheet1.part5[key],
              [childKey]: value
            }
          }
          
        }
      }
      this.$emit('update:data',obj)
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>