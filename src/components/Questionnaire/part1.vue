<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup title="經營業務種類">
        <Select slot="input" :selected="data.part1.businessType.Value" defaultText="選擇種類"/>
      </InputGroup>
      <div class="col-span-2">
        <div class="column-3 w-full">
          <InputGroup title="創立日期">
            <Select
              slot="input"
              :selected="data.part1.create.year"
              :options="yearOptions"
              @emitItem="(e) => emitSelectItem('create','year', e.Value)"
              defaultText="選擇年"/>
          </InputGroup>
          <InputGroup >
            <Select
              slot="input"
              :selected="data.part1.create.month"
              :options="monthOptions"
              @emitItem="(e) => emitSelectItem('create','month', e.Value)"
              defaultText="選擇月"/>
          </InputGroup>
          <InputGroup >
            <Select
              slot="input"
              :selected="data.part1.create.day"
              :options="dayOptions"
              @emitItem="(e) => emitSelectItem('create','day', e.Value)"
              defaultText="選擇日"/>
          </InputGroup>
        </div>
      </div>
      <InputGroup title="員工人數">
        <Input slot="input" numberOnly placeholder="輸入人數" @updateValue="(e) => updateValue(e,'staff')" :value="data.part1.staff"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <div class="column-3">
        <InputGroup title="營業開始時間">
          <Select
            slot="input"
            :selected="data.part1.startDate.hours"
            :options="hoursOptions"
            defaultText="- - 點"
            @emitItem="(e) => emitSelectItem('startDate','hours', e.Value)"/>
          />
        </InputGroup>
        <InputGroup >
          <Select
            slot="input"
            :selected="data.part1.startDate.minutes"
            defaultText="- - 分"
            :options="minutesOptions"
            @emitItem="(e) => emitSelectItem('startDate','minutes', e.Value)"/>
          />
        </InputGroup>
        <InputGroup >
          <Select
            slot="input"
            :selected="data.part1.startDate.AmPm"
            defaultText="AM"
            :options="AmPmOptions"
            @emitItem="(e) => emitSelectItem('startDate','AmPm', e.Value)"/>
          />
        </InputGroup>
      </div>
      <div class="column-3">
        <InputGroup title="營業結束時間">
          <Select
            slot="input"
            :selected="data.part1.endDate.hours"
            defaultText="- - 點"
            :options="hoursOptions"
            @emitItem="(e) => emitSelectItem('endDate','hours', e.Value)"/>
          />
        </InputGroup>
        <InputGroup >
          <Select
            slot="input"
            :selected="data.part1.endDate.minutes"
            defaultText="- - 分"
            :options="minutesOptions"
            @emitItem="(e) => emitSelectItem('endDate','minutes', e.Value)"/>
          />
        </InputGroup>
        <InputGroup >
          <Select
            slot="input"
            :selected="data.part1.endDate.AmPm"
            defaultText="AM"
            :options="AmPmOptions"
            @emitItem="(e) => emitSelectItem('endDate','AmPm', e.Value)"/>
          />
        </InputGroup>
      </div>
      <InputGroup title="基地面積">
        <Input slot="input" :value="data.part1.area" @updateValue="(e) => updateValue(e,'area')"  placeholder="輸入面積"/>
      </InputGroup>
      <InputGroup title="總面積">
        <Input slot="input" :value="data.part1.totalArea" @updateValue="(e) => updateValue(e,'totalArea')" placeholder="輸入面積"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3 dashed-border">
      <InputGroup title="每日平均出入人數">
        <Input slot="input" :value="data.part1.dailyAverage" @updateValue="(e) => updateValue(e,'dailyAverage')" placeholder="輸入人數"/>
      </InputGroup>
      <InputGroup title="單日最高出入人數">
        <Input slot="input" :value="data.part1.singleDayHighest" @updateValue="(e) => updateValue(e,'singleDayHighest')" placeholder="輸入人數"/>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import Select from '@/components/Select/index.vue'
export default {
  components: {
    InputGroup,
    Input,
    Select
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
     yearOptions () {
        const arr = []
      for (let i = 110; i <= 140; i++) {
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
           Text: i,
           Value: i
         })
       }
       return arr 
     },
      dayOptions () {
        const arr = []
        for (let i = 1; i <= 31; i++) {
          arr.push({
            Text: i,
            Value: i
          })
        }
        return arr 
      },
      hoursOptions () {
        const arr = []
        for (let i = 1; i <= 12; i++) {
          arr.push({
            Text: i,
            Value: i
          })
        }
        return arr 
      },
      minutesOptions () {
        const arr = []
        for (let i = 0; i <= 59; i++) {
          arr.push({
            Text: i,
            Value: i
          })
        }
        return arr 
      },
      AmPmOptions () {
        const arr = []
        arr.push({
          Text: 'AM',
          Value: 'AM'
        })
        arr.push({
          Text: 'PM',
          Value: 'PM'
        })
        return arr 
      }
   },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part1: {
          ...this.data.part1,
          [type]: e
        }
      })
    },
    emitSelectItem(key,childKey, value) {
      const obj = {
        ...this.data,
        part1: {
          ...this.data.part1,
          [key]: {
            ...this.data.part1[key],
            [childKey]: value
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