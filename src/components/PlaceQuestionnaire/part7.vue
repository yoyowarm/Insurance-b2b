<template>
  <div>
    <FormTitle title="1.營業處所相關之消防和安全措施" class="my-3 text-lg"/>
    <div class="flex flex-col md:flex-row my-1 pl-6">
      <Checkbox
        id="消防栓1"
        class="text-lg"
        text="消防栓"
        :checked="data.part7.hasFireHydrant"
        :value="data.part7.hasFireHydrant"
        :disabled="disable"
        @updateValue="(e) =>updateValue(e,'hasFireHydrant')"
      />
      <div class="flex" :class="{'flex-col': windowWidth < 600}">
        <InputGroup noMt class="ml-12 sm:ml-32 w-40" :disable="disable || !data.part7.hasFireHydrant">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.hasFireHydrant"
            :value="data.part7.hydrantIndoorAmount"
            @updateValue="(e) => updateValue(e,'hydrantIndoorAmount')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="disable || !data.part7.hasFireHydrant">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.hasFireHydrant"
            :value="data.part7.hydrantOutdoorAmount"
            @updateValue="(e) => updateValue(e,'hydrantOutdoorAmount')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1 pl-6">
      <Checkbox
        id="滅火器：泡沫型1"
        class="text-lg"
        text="滅火器：泡沫型"
        :checked="data.part7.fireExtinguisher"
        :value="data.part7.fireExtinguisher"
        :disabled="disable"
        @updateValue="(e) =>updateValue(e,'fireExtinguisher')"
      />
      <div class="flex" :class="{'flex-col': windowWidth < 600}">
        <InputGroup noMt class="ml-12 sm:ml-16 w-40" :disable="disable || !data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.fireExtinguisher"
            :value="data.part7.foam.indoor"
            @updateValue="(e) => updateValue(e,'foam.indoor')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="disable || !data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.fireExtinguisher"
            :value="data.part7.foam.outdoor"
            @updateValue="(e) => updateValue(e,'foam.outdoor')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1 pl-6">
      <span class="h-full sm:pl-24 mt-4 text-lg">二氧化碳</span>
      <div class="flex" :class="{'flex-col': windowWidth < 600}">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="disable || !data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.fireExtinguisher"
            :value="data.part7.carbonDioxide.indoor"
            @updateValue="(e) => updateValue(e,'carbonDioxide.indoor')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="disable || !data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.fireExtinguisher"
            :value="data.part7.carbonDioxide.outdoor"
            @updateValue="(e) => updateValue(e,'carbonDioxide.outdoor')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1 pl-6">
      <span class="h-full sm:pl-24 mt-4 text-lg">ABC乾粉</span>
      <div class="flex" :class="{'flex-col': windowWidth < 600}">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="disable || !data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.fireExtinguisher"
            :value="data.part7.abc.indoor"
            @updateValue="(e) => updateValue(e,'abc.indoor')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
        <InputGroup noMt class="ml-12 w-40" :disable="disable || !data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室外</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.fireExtinguisher"
            :value="data.part7.abc.outdoor"
            @updateValue="(e) => updateValue(e,'abc.outdoor')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row my-1 pl-6">
      <span class="h-full w-40 sm:pl-24 mt-4 text-lg">海龍(halon)</span>
      <div class="flex" :class="{'flex-col': windowWidth < 600}">
        <InputGroup noMt class="ml-12 sm:ml-14 w-40" :disable="disable || !data.part7.fireExtinguisher">
          <span slot="input-left" class="absolute -left-10 bottom-4 text-lg">室內</span>
          <Input
            slot="input"
            placeholder="輸入數量"
            inputmode="tel" 
            :disable="disable || !data.part7.fireExtinguisher"
            :value="data.part7.halon.indoor"
            @updateValue="(e) => updateValue(e,'halon.indoor')"
            numberOnly
            hasZero
            unit="支"
          />
        </InputGroup>
      </div>
    </div>
    <div class="ml-12 sm:ml-24 text-red-500 text-sm">註：海龍(halon)滅火設備不適用在開放性或空氣流通處</div>
    <div class="flex flex-col sm:flex-row my-3 pl-6">
      <Checkbox
        id="其他，請詳述之1"
        class="text-lg"
        text="其他，請詳述之"
        :checked="data.part7.hasOtherExtinguishing"
        :value="data.part7.hasOtherExtinguishing"
        :disabled="disable"
        @updateValue="(e) =>updateValue(e,'hasOtherExtinguishing')"
      />
      <InputGroup noMt class="ml-0 sm:ml-4 w-full sm:w-9/12" :disable="disable || !data.part7.hasOtherExtinguishing">
        <Input
          slot="input"
          placeholder="輸入內容"
          :value="data.part7.otherExtinguishingRemark"
          :disable="disable || !data.part7.hasOtherExtinguishing"
          @updateValue="(e) => updateValue(e,'otherExtinguishingRemark')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4 pl-6">
        <div class="flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasSprinkler" :value="data.part7.hasSprinkler === true" @updateValue="updateValue(true, 'hasSprinkler')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="sprinkle2" :value="data.part7.hasSprinkler === false" @updateValue="updateValue(false, 'hasSprinkler')"/>
      </div>
      <div class=" text-lg">是否有自動灑水系統</div>
    </div>
    <div class="w-full flex flex-row mt-4 pl-6">
        <div class="flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasGasExtinguishing" :value="data.part7.hasGasExtinguishing === true" @updateValue="updateValue(true, 'hasGasExtinguishing')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasGasExtinguishin2" :value="data.part7.hasGasExtinguishing === false" @updateValue="updateValue(false, 'hasGasExtinguishing')"/>
      </div>
      <div class=" text-lg">是否有氣體滅火系統</div>
    </div>
    <div class="column-4 my-3 pl-6">
      <InputGroup lgTitle title="氣體滅火系統安裝於何處" class="col-span-3" :disable="disable || !data.part7.hasGasExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="disable || !data.part7.hasGasExtinguishing"
          :value="data.part7.gasExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'gasExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4 pl-6">
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasFoamExtinguishing" :value="data.part7.hasFoamExtinguishing === true" @updateValue="updateValue(true, 'hasFoamExtinguishing')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasFoamExtinguishing2" :value="data.part7.hasFoamExtinguishing === false" @updateValue="updateValue(false, 'hasFoamExtinguishing')"/>
      </div>
      <div class="text-lg">是否有泡沫滅火系統</div>
    </div>
    <div class="column-4 my-3 pl-6">
      <InputGroup lgTitle title="泡沫滅火系統安裝於何處" class="col-span-3" :disable="disable || !data.part7.hasFoamExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="disable || !data.part7.hasFoamExtinguishing"
          :value="data.part7.foamExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'foamExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4 pl-6">
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasWaterMistExtinguishing" :value="data.part7.hasWaterMistExtinguishing === true" @updateValue="updateValue(true, 'hasWaterMistExtinguishing')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasWaterMistExtinguishing2" :value="data.part7.hasWaterMistExtinguishing === false" @updateValue="updateValue(false, 'hasWaterMistExtinguishing')"/>
      </div>
      <div class="text-lg">是否有水霧滅火系統</div>
    </div>
    <div class="column-4 my-3 pl-6">
      <InputGroup lgTitle title="水霧滅火系統安裝於何處" class="col-span-3" :disable="disable || !data.part7.hasWaterMistExtinguishing">
        <Input
          slot="input"
          placeholder="輸入安裝地點"
          :disable="disable || !data.part7.hasWaterMistExtinguishing"
          :value="data.part7.waterMistExtinguishingInstall"
          @updateValue="(e) => updateValue(e,'waterMistExtinguishingInstall')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4" :class="{'dashed-border': index == questionList.length-1}" v-for="(item,index) in questionList" :key="item">
      <span class="mr-2 text-lg">{{index+2}}.</span>
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" :id="`${questionListID[index]}${index}`" :value="data.part7[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" :id="`${questionListID[index]}${index}2`" :value="data.part7[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
      </div>
        <div class=" text-lg">{{item}}</div>
    </div>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle.vue'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/InputGroup/Input'
import RadioInput from '@/components/Radio'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  components: {
    FormTitle,
    InputGroup,
    Checkbox,
    Input,
    RadioInput,
    WindowResizeListener
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      questionList: [
        '營業處所有關之消防及安全措施是否有編組並定期實施消防設備性能測試與訓練？',
        '是否有禁煙管制',
        '是否有監視或預警系統',
        '受信總機是否正常使用並有專人看守',
        '是否隨時有清潔人員',
        '走道或逃生路線是否堆放雜物'
      ],
      questionListID: [
        'hasEquipmentTestAndTrain',
        'hasNoSmokingControl',
        'hasAlertSystem',
        'hasSwitchboardNormalState',
        'hasCleaner',
        'hasClutterAtAisle'
      ]
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    updateValue(e,type) {
      const arr = [
        'hasPusher',
        'hasGasExtinguishing',
        'hasFoamExtinguishing',
        'hasWaterMistExtinguishing',
        'hasEquipmentTestAndTrain',
        'hasNoSmokingControl',
        'hasAlertSystem',
        'hasSwitchboardNormalState',
        'hasCleaner',
        'hasClutterAtAisle',
        'hasSprinkler'
      ]
      if(type.includes('.')) {
        let arr = type.split('.')
        const obj = Object.assign({}, {[arr[1]]: e})
        const obj2 = {...this.data.part7[arr[0]], ...obj}
        const part7 = {...this.data.part7, [arr[0]]: obj2}
        this.$emit('update:data',{...this.data, part7})
      } else {
        if(!e && type == 'hasFireHydrant') {
          this.$emit('update:data', {...this.data, part7: {...this.data.part7, hasFireHydrant: e, hydrantIndoorAmount: '', hydrantOutdoorAmount: ''}})
        } else if (!e && type == 'fireExtinguisher') {
          this.$emit('update:data', {...this.data, part7: {...this.data.part7,
            fireExtinguisher: e,
            abc: {indoor: '', outdoor: ''},
            carbonDioxide: {indoor: '', outdoor: ''},
            foam: {indoor: '', outdoor: ''},
            halon: {indoor: '', outdoor: ''},
        }})
        } else if(!e && type == 'hasOtherExtinguishing') {
          this.$emit('update:data', {...this.data, part7: {...this.data.part7, hasOtherExtinguishing: e, otherExtinguishingRemark: ''}})
        } else if (!e && type == 'hasGasExtinguishing') {
          this.$emit('update:data', {...this.data, part7: {...this.data.part7, hasGasExtinguishing: e === this.data.part7[type] ? null : e, gasExtinguishingInstall: ''}})
        } else if (!e && type == 'hasFoamExtinguishing') {
          this.$emit('update:data', {...this.data, part7: {...this.data.part7, hasFoamExtinguishing: e === this.data.part7[type] ? null : e, foamExtinguishingInstall: ''}})
        } else if (!e && type == 'hasWaterMistExtinguishing') {
          this.$emit('update:data', {...this.data, part7: {...this.data.part7, hasWaterMistExtinguishing: e === this.data.part7[type] ? null : e, waterMistExtinguishingInstall: ''}})
        }else {
          this.$emit('update:data',{
          ...this.data,
          part7: {
            ...this.data.part7,
            [type]: arr.includes(type) && e === this.data.part7[type] ? null : e
          }
        })
        }
      }
    },
  },
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