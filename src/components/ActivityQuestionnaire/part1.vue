<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup class="col-span-2" lgTitle title="1.活動名稱" :disable="disable || InsuranceActive== 1 || InsuranceActive > 2">
        <Input
          slot="input"
          placeholder="輸入活動名稱"
          :value="data.sheet1.part1.name"
          :disable="disable || InsuranceActive== 1 || InsuranceActive > 2"
          @updateValue="(e) => updateValue(e,'name')"
        />
      </InputGroup>
      <InputGroup lgTitle title="2.參加活動人數" :disable="disable">
        <Input
          slot="input"
          numberOnly
          placeholder="輸入人數"
          inputmode="tel" 
          :maxLength="7"
          :disable="disable"
          :value="data.sheet1.part1.joinPersonAmount"
          numberFormat
          hasZero
          @updateValue="(e) => updateValue(e,'joinPersonAmount')"
        />
      </InputGroup>
      <InputGroup lgTitle title="3.活動處所規定容留人數" :disable="disable">
        <Input
          slot="input"
          numberOnly
          placeholder="輸入人數"
          inputmode="tel" 
          :maxLength="7"
          :disable="disable"
          numberFormat
          hasZero
          :value="data.sheet1.part1.ruleCapacity"
          @updateValue="(e) => updateValue(e,'ruleCapacity')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <div class="col-span-2">
        <div class="column-3 w-full">
          <InputGroup lgTitle title="4.活動開始日期" :disable="disable">
            <Select
              slot="input"
              :options="yearOptions"
              :disable="disable"
              :selected="`${data.sheet1.part1.beginDateTime.year}`"
              @emitItem="(e) => emitSelectItem('beginDateTime','year', e.Value)"
              defaultText="選擇年"/>
          </InputGroup>
          <InputGroup :disable="disable">
            <Select
              slot="input"
              :options="monthOptions"
              :disable="disable"
              :selected="`${data.sheet1.part1.beginDateTime.month}`"
              @emitItem="(e) => emitSelectItem('beginDateTime','month', e.Value)"
              defaultText="選擇月"/>
          </InputGroup>
          <InputGroup :disable="disable">
            <Select
              slot="input"
              :options="dayOptions"
              :disable="disable"
              :selected="`${data.sheet1.part1.beginDateTime.day}`"
              @emitItem="(e) => emitSelectItem('beginDateTime','day', e.Value)"
              defaultText="選擇日"/>
          </InputGroup>
        </div>
      </div>
      <div class="column-3">
        <InputGroup class="col-span-2" lgTitle title="活動開始時間" :disable="disable">
          <Select
            slot="input"
            :options="hoursOptions"
            :disable="disable"
            :selected="data.sheet1.part1.beginDateTime.hours"
            @emitItem="(e) => emitSelectItem('beginDateTime','hours', e.Value)"
            defaultText="- - 點"
          />
        </InputGroup>
      </div>
      <InputGroup lgTitle title="活動天數" :disable="disable">
        <Input
          slot="input"
          placeholder="輸入天數"
          inputmode="tel" 
          :maxLength="7"
          :disable="disable"
          numberFormat
          hasZero
          :value="data.sheet1.part1.activityDays"
          @updateValue="(e) => updateValue(e,'activityDays')"
        />
      </InputGroup>
    </div>
    <div class="flex my-3">
      <InputGroup lgTitle title="5.活動型態" class="col-span-3" inputLeftClass="ml-20" :disable="disable">
        <Checkbox
          slot="input-left"
          class="absolute -left-20 bottom-4 text-lg"
          id="室內"
          text="室內"
          :disable="disable"
          :checked="data.sheet1.part1.hasActivityIndoor"
          :value="data.sheet1.part1.hasActivityIndoor"
          @updateValue="(e) =>updateValue(e,'hasActivityIndoor')"
        />
        <Input
          slot="input"
          placeholder="輸入內容"
          class="w-auto sm:w-80"
          :disable="disable"
          :value="data.sheet1.part1.indoorActivityContent"
          @updateValue="(e) => updateValue(e,'indoorActivityContent')"
        />
      </InputGroup>
    </div>
    <div class="flex my-3">
      <InputGroup noMt class="col-span-3" inputLeftClass="ml-20" :disable="disable">
        <Checkbox
          slot="input-left"
          class="absolute -left-20 bottom-4 text-lg"
          id="室外"
          text="室外"
          :disable="disable"
          :checked="data.sheet1.part1.hasActivityOutdoor"
          :value="data.sheet1.part1.hasActivityOutdoor"
          @updateValue="(e) =>updateValue(e,'hasActivityOutdoor')"
        />
        <Input
          slot="input"
          placeholder="輸入內容"
          class="w-auto sm:w-80"
          :disable="disable"
          :value="data.sheet1.part1.outdoorActivityContent"
          @updateValue="(e) => updateValue(e,'outdoorActivityContent')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="6.活動處所及鄰近使用性質說明" class="col-span-4" :disable="disable">
        <Input
          slot="input"
          placeholder="輸入內容"
          :disable="disable"
          :value="data.sheet1.part1.activityTypeRemark"
          @updateValue="(e) => updateValue(e,'activityTypeRemark')"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4 mb-6">
      <span class="mr-2 text-lg">7.</span>
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasStage" :value="data.sheet1.part1.hasStage === true" @updateValue="updateValue(true, 'hasStage')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasStage2" :value="data.sheet1.part1.hasStage === false" @updateValue="updateValue(false, 'hasStage')"/>
      </div>
        <div class=" text-lg">是否有舞台搭建</div>
    </div>
    <div class="w-full flex flex-row mt-4 mb-6">
      <span class="mr-2 text-lg">8.</span>
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasWaterPool" :value="data.sheet1.part1.hasWaterPool === true" @updateValue="updateValue(true, 'hasWaterPool')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasWaterPool2" :value="data.sheet1.part1.hasWaterPool === false" @updateValue="updateValue(false, 'hasWaterPool')"/>
      </div>
        <div class=" text-lg">是否有水池(如:游泳池、噴泉)</div>
    </div>
    <div class="w-full flex flex-row mt-4 mb-0">
      <span class="mr-2 text-lg">9.</span>
        <div class="flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="isWaterArea" :value="data.sheet1.part1.isWaterArea === true" @updateValue="updateValue(true, 'isWaterArea')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="isWaterArea2" :value="data.sheet1.part1.isWaterArea === false" @updateValue="updateValue(false, 'isWaterArea')"/>
      </div>
        <div class=" text-lg">是否為水域活動</div>
    </div>
    <div class="column-4 mb-3 dashed-border pl-6">
      <InputGroup lgTitle title="說明救生人員配置" class="col-span-3" :disable="disable || !data.sheet1.part1.isWaterArea">
        <Input
          slot="input"
          :disable="disable || !data.sheet1.part1.isWaterArea"
          :value="data.sheet1.part1.lifeguardDeploy"
          @updateValue="(e) => updateValue(e,'lifeguardDeploy')"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import Select from '@/components/Select/index.vue'
import Checkbox from '@/components/Checkbox'
import RadioInput from '@/components/Radio'
import { mapState } from 'vuex'
export default {
  components: {
    InputGroup,
    Input,
    Select,
    Checkbox,
    RadioInput
  },
  props:{
    data: {
      type: Object,
      default: () => ({
      })
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      'Insuraned': state => state.activity.Insuraned,
      InsuranceActive: state => state.activity.InsuranceActive,
    }),
     yearOptions () {
        const arr = []
      for (let i = (new Date().getFullYear()-1911); i <= 140; i++) {
         arr.push({
           Text: i,
           Value: i
         })
       }
       return arr 
     },
     monthOptions () {
       const arr = []
      for (let i = 1; i <= 12; i++) {
         arr.push({
           Text: `${i}月`,
           Value: i
         })
       }
       return arr 
     },
      dayOptions () {
        const arr = []
        for (let i = 1; i <= 31; i++) {
          arr.push({
            Text: `${i}日`,
            Value: i
          })
        }
        return arr 
      },
      hoursOptions () {
        const arr = []
        for (let i = 0; i <= 23; i++) {
          arr.push({
            Text: `${i}點`,
            Value: i
          })
        }
        return arr 
      },
      minutesOptions () {
        const arr = []
        for (let i = 0; i <= 59; i++) {
          arr.push({
            Text: `${i}分`,
            Value: i
          })
        }
        return arr 
      }
   },
  methods: {
    updateValue(e,type) {
      const arr = ['isWaterArea','hasStage','hasWaterPool']
      if(!e && type =='isWaterArea') {
        this.$emit('update:data', {
          ...this.data,
          sheet1: {
            ...this.data.sheet1,
            part1: {
              ...this.data.sheet1.part1,
              lifeguardDeploy: '',
              [type]: e === this.data.sheet1.part1[type] ? null : e
            }
          }
        })
      } else {
        this.$emit('update:data',{
          ...this.data,
          sheet1: {
            ...this.data.sheet1,
            part1: {
              ...this.data.sheet1.part1,
              [type]: arr.includes(type) && e === this.data.sheet1.part1[type] ? null : e
            }
          }
        })
        if(type == 'name') {
          this.$store.dispatch('activity/updatedInsuraned', {
            ...this.Insuraned,
            activityName: e
          })
        }
      }
    },
    emitSelectItem(key,childKey, value) {
      const obj = {
        ...this.data,
        sheet1: {
          ...this.data.sheet1,
          part1: {
            ...this.data.sheet1.part1,
            [key]: {
              ...this.data.sheet1.part1[key],
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
  .w90{
    width: 90%;
  }
  .w10{
    width: 10%;
  }
  @media screen and (max-width: 768px) {
    .w90{
      width: 80%;
    }
    .w10{
      width: 20%;
    }
  }
</style>