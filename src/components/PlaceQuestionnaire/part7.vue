<template>
  <div>
    <FormTitle lgTitle title="1.營業處所相關之消防和安全措施" class="my-3"/>
    <div class="flex flex-col sm:flex-row my-1">
      <Checkbox
        id="消防栓"
        class="text-md"
        text="消防栓"
        :checked="data.part7.hasFireHydrant"
        :value="data.part7.hasFireHydrant"
        @updateValue="(e) =>updateValue(e,'hasFireHydrant')"
      />
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-32 w-40" :disable="!data.part7.hasFireHydrant">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.hasFireHydrant"
            :value="data.part7.hydrantIndoorAmount"
            @updateValue="(e) => updateValue(e,'hydrantIndoorAmount')"
            numberOnly
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="!data.part7.hasFireHydrant">
          <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.hasFireHydrant"
            :value="data.part7.hydrantOutdoorAmount"
            @updateValue="(e) => updateValue(e,'hydrantOutdoorAmount')"
            numberOnly
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1">
      <Checkbox
        id="滅火器：泡沫型"
        class="text-md"
        text="滅火器：泡沫型"
        :checked="data.part7.fireExtinguisher"
        :value="data.part7.fireExtinguisher"
        @updateValue="(e) =>updateValue(e,'fireExtinguisher')"
      />
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-16 w-40" :disable="!data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.fireExtinguisher"
            :value="data.part7.foam.indoor"
            @updateValue="(e) => updateValue(e,'foam.indoor')"
            numberOnly
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="!data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.fireExtinguisher"
            :value="data.part7.foam.outdoor"
            @updateValue="(e) => updateValue(e,'foam.outdoor')"
            numberOnly
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1">
      <span class="h-full sm:pl-24 mt-4">二氧化碳</span>
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="!data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.fireExtinguisher"
            :value="data.part7.carbonDioxide.indoor"
            @updateValue="(e) => updateValue(e,'carbonDioxide.indoor')"
            numberOnly
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="!data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.fireExtinguisher"
            :value="data.part7.carbonDioxide.outdoor"
            @updateValue="(e) => updateValue(e,'carbonDioxide.outdoor')"
            numberOnly
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1">
      <span class="h-full sm:pl-24 mt-4">ABC乾粉</span>
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="!data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.fireExtinguisher"
            :value="data.part7.abc.indoor"
            @updateValue="(e) => updateValue(e,'abc.indoor')"
            numberOnly
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="!data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.fireExtinguisher"
            :value="data.part7.abc.outdoor"
            @updateValue="(e) => updateValue(e,'abc.outdoor')"
            numberOnly
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1">
      <span class="h-full w-40 sm:pl-24 mt-4">海龍(halon)</span>
      <div class="flex">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="!data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            :disable="!data.part7.fireExtinguisher"
            :value="data.part7.halon.indoor"
            @updateValue="(e) => updateValue(e,'halon.indoor')"
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
        :checked="data.part7.hasOtherExtinguishing"
        :value="data.part7.hasOtherExtinguishing"
        @updateValue="(e) =>updateValue(e,'hasOtherExtinguishing')"
      />
      <InputGroup noMt class="ml-0 sm:ml-4 w-full sm:w-9/12">
        <Input
          slot="input"
          placeholder="輸入內容"
          :value="data.part7.otherExtinguishingRemark"
          @updateValue="(e) => updateValue(e,'otherExtinguishingRemark')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4">
      <div class="w90 text-lg">是否有自動灑水系統</div>
        <div class="w10 flex flex-row justify-between">
          <RadioInput text="是" id="sprinkler" :value="data.part7.sprinkler === true" @updateValue="updateValue(true, 'sprinkler')"/>
          <RadioInput text="否" id="sprinkle2" :value="data.part7.sprinkler === false" @updateValue="updateValue(false, 'sprinkler')"/>
      </div>
    </div>
    <div class="w-full flex flex-row mt-4">
      <div class="w90 text-lg">是否有氣體滅火系統</div>
        <div class="w10 flex flex-row justify-between">
          <RadioInput text="是" id="hasGasExtinguishing" :value="data.part7.hasGasExtinguishing === true" @updateValue="updateValue(true, 'hasGasExtinguishing')"/>
          <RadioInput text="否" id="hasGasExtinguishin2" :value="data.part7.hasGasExtinguishing === false" @updateValue="updateValue(false, 'hasGasExtinguishing')"/>
      </div>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="氣體滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.hasGasExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.hasGasExtinguishing"
          :value="data.part7.gasExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'gasExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4">
      <div class="w90 text-lg">是否有泡沫滅火系統</div>
        <div class="w10 flex flex-row justify-between">
          <RadioInput text="是" id="hasFoamExtinguishing" :value="data.part7.hasFoamExtinguishing === true" @updateValue="updateValue(true, 'hasFoamExtinguishing')"/>
          <RadioInput text="否" id="hasFoamExtinguishing2" :value="data.part7.hasFoamExtinguishing === false" @updateValue="updateValue(false, 'hasFoamExtinguishing')"/>
      </div>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="泡沫滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.hasFoamExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.hasFoamExtinguishing"
          :value="data.part7.foamExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'foamExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4">
      <div class="w90 text-lg">是否有水霧滅火系統</div>
        <div class="w10 flex flex-row justify-between">
          <RadioInput text="是" id="hasWaterMistExtinguishing" :value="data.part7.hasWaterMistExtinguishing === true" @updateValue="updateValue(true, 'hasWaterMistExtinguishing')"/>
          <RadioInput text="否" id="hasWaterMistExtinguishing2" :value="data.part7.hasWaterMistExtinguishing === false" @updateValue="updateValue(false, 'hasWaterMistExtinguishing')"/>
      </div>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="水霧滅火系統安裝於何處" class="col-span-3" :disable="!data.part7.hasWaterMistExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="!data.part7.hasWaterMistExtinguishing"
          :value="data.part7.waterMistExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'waterMistExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4" :class="{'dashed-border': index == questionList.length-1}" v-for="(item,index) in questionList" :key="item">
        <div class="w90 text-lg">{{item}}</div>
        <div class="w10 flex flex-row justify-between">
          <RadioInput text="是" :id="`${questionListID[index]}${index}`" :value="data.part7[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
          <RadioInput text="否" :id="`${questionListID[index]}${index}2`" :value="data.part7[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle.vue'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/InputGroup/Input'
import RadioInput from '@/components/Radio'
export default {
  components: {
    FormTitle,
    InputGroup,
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
        '2.營業處所有關之消防及安全措施是否有編組並定期實施消防設備性能測試與訓練？',
        '3.是否有禁煙管制',
        '4.是否有監視或預警系統',
        '5.受信總機是否正常使用並有專人看守',
        '6.是否隨時有清潔人員',
        '7.走道或逃生路線是否堆放雜物'
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
      const arr = [
        'hasPusher',
        'hasGasExtinguishing',
        'hasFoamExtinguishing',
        'hasWaterMistExtinguishing',
        'HasEquipmentTestAndTrain',
        'hasNoSmokingControl',
        'hasAlertSystem',
        'hasSwitchboardNormalState',
        'hasCleaner',
        'hasClutterAtAisle'
      ]
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
          [type]: arr.includes(type) && e === this.data.part7[type] ? null : e
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