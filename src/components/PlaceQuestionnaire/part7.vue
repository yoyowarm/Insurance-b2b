<template>
  <div>
    <FormTitle title="1.營業處所相關之消防和安全措施" class="my-3"/>
    <div class="column-6 my-1">
      <Checkbox
        id="消防栓"
        class="text-md"
        text="消防栓"
        :checked="data.part7.hasFireHydrant"
        :value="data.part7.hasFireHydrant"
        @updateValue="(e) =>updateValue(e,'hasFireHydrant')"
      />
      <InputGroup noMt class="ml-0 sm:ml-8" :disable="!data.part7.hasFireHydrant">
        <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.hasFireHydrant"
          :value="data.part7.hydrantIndoorAmount"
          @updateValue="(e) => updateValue(e,'hydrantIndoorAmount')"
          numberOnly
        />
      </InputGroup>
      <InputGroup noMt class="ml-0 sm:ml-8" :disable="!data.part7.hasFireHydrant">
        <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
        <Input
          slot="input"
          placeholder="輸入數量"
          :disable="!data.part7.hasFireHydrant"
          :value="data.part7.hydrantOutdoorAmount"
          @updateValue="(e) => updateValue(e,'hydrantOutdoorAmount')"
          numberOnly
        />
      </InputGroup>
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
      <InputGroup noMt class="ml-0 sm:ml-8" :disable="!data.part7.fireExtinguisher">
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
      <InputGroup noMt class="ml-0 sm:ml-8" :disable="!data.part7.fireExtinguisher">
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
    <div class="flex flex-row my-3">
      <Checkbox
        id="其他，請詳述之"
        class="text-md"
        text="其他，請詳述之"
        :checked="data.part7.hasOtherExtinguishing"
        :value="data.part7.hasOtherExtinguishing"
        @updateValue="(e) =>updateValue(e,'hasOtherExtinguishing')"
      />
      <InputGroup noMt class="ml-4 w70">
        <Input
          slot="input"
          placeholder="輸入內容"
          :value="data.part7.otherExtinguishingRemark"
          @updateValue="(e) => updateValue(e,'otherExtinguishingRemark')"
        />
      </InputGroup>
    </div>
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
          :value="data.part7.hasGasExtinguishing"
          @updateValue="(e) => updateValue(e,'hasGasExtinguishing')"
        />
      </InputGroup>
      <InputGroup title="氣體滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.hasGasExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.hasGasExtinguishing"
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
          :value="data.part7.hasFoamExtinguishing"
          @updateValue="(e) => updateValue(e,'hasFoamExtinguishing')"
        />
      </InputGroup>
      <InputGroup title="泡沫滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.hasFoamExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.hasFoamExtinguishing"
          :value="data.part7.foamExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'foamExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有水霧滅火系統" dash>
        <SwitchInput
          slot="input"
          id="waterMistExtinguishing"
          :value="data.part7.hasWaterMistExtinguishing"
          @updateValue="(e) => updateValue(e,'hasWaterMistExtinguishing')"
        />
      </InputGroup>
      <InputGroup title="水霧滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.hasWaterMistExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.hasWaterMistExtinguishing"
          :value="data.part7.waterMistExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'waterMistExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-col sm:flex-row mt-4" v-for="(item,index) in questionList" :key="item" :class="{'dashed-border': index == questionList.length -1}">
      <div class="w90">{{item}}</div>
      <div class="w10 flex flex-row justify-between">
        <RadioInput text="是" :id="`${questionListID[index]}${index}`" :value="data.part7[questionListID[index]] === true" @updateValue="(e) => updateValue(e, questionListID[index])"/>
        <RadioInput text="否" :id="`${questionListID[index]}${index}`" :value="data.part7[questionListID[index]] === false" @updateValue="(e) => updateValue(e, questionListID[index])"/>
     </div>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle.vue'
import SwitchInput from '@/components/Switch'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/InputGroup/Input'
import RadioInput from '@/components/Radio'
export default {
  components: {
    FormTitle,
    InputGroup,
    SwitchInput,
    Checkbox,
    Input,
    RadioInput
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      questionList: [
        '2.營業處所有關之消防及安全措施是否有編組並定期實施消防設備性能測試與訓練',
        '3.是否有禁菸管制',
        '4.是否有監視或預警系統',
        '5.受信總機是否正常使用並有專人開手',
        '6.是否隨時有清潔人員',
        '7.走道或逃生路線是否推放雜物'
      ],
      questionListID: [
        'HasEquipmentTestAndTrain',
        'hasNoSmokingControl',
        'hasAlertSystem',
        'hasSwitchboardNormalState',
        'hasCleaner',
        'hasClutterAtAisle'
      ]
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
  .w70 {
    width: 70%;
  }
  .w90{
    width: 90%;
  }
  .w10{
    width: 10%;
  }
</style>