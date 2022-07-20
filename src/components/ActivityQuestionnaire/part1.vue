<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup class="col-span-2" title="活動名稱">
        <Input slot="input" placeholder="輸入活動名稱"/>
      </InputGroup>
      <InputGroup title="參加活動人數">
        <Input slot="input" numberOnly placeholder="輸入人數" />
      </InputGroup>
      <InputGroup title="活動處所規定容留人數">
        <Input slot="input" numberOnly placeholder="輸入人數" />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <div class="col-span-2">
        <div class="column-3 w-full">
          <InputGroup title="活動開始日期">
            <Select
              slot="input"
              :options="yearOptions"
              defaultText="選擇年"/>
          </InputGroup>
          <InputGroup >
            <Select
              slot="input"
              :options="monthOptions"
              defaultText="選擇月"/>
          </InputGroup>
          <InputGroup >
            <Select
              slot="input"
              :options="dayOptions"
              defaultText="選擇日"/>
          </InputGroup>
        </div>
      </div>
      <div class="column-3">
        <InputGroup title="活動開始時間">
          <Select
            slot="input"
            :options="hoursOptions"
            defaultText="- - 點"
          />
        </InputGroup>
        <InputGroup >
          <Select
            slot="input"
            defaultText="- - 分"
            :options="minutesOptions"
          />
        </InputGroup>
        <InputGroup >
          <Select
            slot="input"
            defaultText="AM"
            :options="AmPmOptions"
          />
        </InputGroup>
      </div>
      <InputGroup title="活動天數">
        <Input slot="input" placeholder="輸入天數"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="每日平均出入人數">
        <Input slot="input" :value="data.part1.dailyAveragePersons" @updateValue="(e) => updateValue(e,'dailyAveragePersons')" placeholder="輸入人數"/>
      </InputGroup>
      <InputGroup title="單日最高出入人數">
        <Input slot="input" :value="data.part1.singleDayHighestPersons" @updateValue="(e) => updateValue(e,'singleDayHighestPersons')" placeholder="輸入人數"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="活動型態" class="col-span-3" inputLeftClass="ml-20">
        <Checkbox
          slot="input-left"
          class="absolute -left-20 bottom-4"
          id="室內"
          text="室內"
        />
        <Input
          slot="input"
          placeholder="輸入內容"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup noMt class="col-span-3" inputLeftClass="ml-20">
        <Checkbox
          slot="input-left"
          class="absolute -left-20 bottom-4"
          id="室外"
          text="室外"
        />
        <Input
          slot="input"
          placeholder="輸入內容"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="活動處所及鄰近使用性質說明" class="col-span-4">
        <Input
          slot="input"
          placeholder="輸入內容"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否為水域活動" dash>
        <SwitchInput
          slot="input"
          id="222d"
        />
      </InputGroup>
      <InputGroup title="說明救生人員配置" class="col-span-3">
        <Input
          slot="input"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3  dashed-border">
      <InputGroup title="是否有舞台搭建" dash>
        <SwitchInput
          slot="input"
          id="3ed"
        />
      </InputGroup>
      <InputGroup title="是否有水池(如:游泳池、噴泉)" dash>
        <SwitchInput
          slot="input"
          id="3e3d"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import Select from '@/components/Select/index.vue'
import SwitchInput from '@/components/Switch'
import Checkbox from '@/components/Checkbox'
export default {
  components: {
    InputGroup,
    Input,
    Select,
    SwitchInput,
    Checkbox
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