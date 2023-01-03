<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="經營業務種類"  :disable="disable || !QuestionnaireManagement">
        <Input slot="input"  :disable="disable || !QuestionnaireManagement" :value="data.part1.businessType" @updateValue="(e) => updateValue(e,'businessType')"  placeholder="輸入種類"/>
      </InputGroup>
      <div class="col-span-2">
        <div class="column-3 w-full">
          <InputGroup lgTitle title="創立日期"  :disable="disable">
            <Select
              slot="input"
              :selected="data.part1.createTime.year"
              :options="yearOptions"
               :disable="disable"
              @emitItem="(e) => emitSelectItem('createTime','year', e.Value)"
              defaultText="選擇年"/>
          </InputGroup>
          <InputGroup :noMt="marginTop(560)"  :disable="disable">
            <Select
              slot="input"
              :selected="data.part1.createTime.month"
              :options="monthOptions"
               :disable="disable"
              @emitItem="(e) => emitSelectItem('createTime','month', e.Value)"
              defaultText="選擇月"/>
          </InputGroup>
          <InputGroup :noMt="marginTop(560)"  :disable="disable">
            <Select
              slot="input"
              :selected="data.part1.createTime.day"
              :options="dayOptions"
               :disable="disable"
              @emitItem="(e) => emitSelectItem('createTime','day', e.Value)"
              defaultText="選擇日"/>
          </InputGroup>
        </div>
      </div>
      <InputGroup lgTitle title="員工人數"  :disable="disable">
        <Input slot="input"  :disable="disable" :maxLength="7" numberOnly placeholder="輸入人數" @updateValue="(e) => updateValue(e,'staffAmount')" :value="data.part1.staffAmount"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <div class="column-2">
        <InputGroup lgTitle title="營業開始時間"  :disable="disable">
          <Select
            slot="input"
            :selected="data.part1.businessStartDate.hours"
            :options="hoursOptions"
            defaultText="- - 點"
             :disable="disable"
            @emitItem="(e) => emitSelectItem('businessStartDate','hours', e.Value)"/>
          />
        </InputGroup>
        <InputGroup :noMt="marginTop(560)"  :disable="disable">
          <Select
            slot="input"
            :selected="data.part1.businessStartDate.minutes"
            defaultText="- - 分"
             :disable="disable"
            :options="minutesOptions"
            @emitItem="(e) => emitSelectItem('businessStartDate','minutes', e.Value)"/>
          />
        </InputGroup>
      </div>
      <div class="column-2">
        <InputGroup lgTitle title="營業結束時間" :disable="disable">
          <Select
            slot="input"
            :selected="data.part1.businessEndDate.hours"
            defaultText="- - 點"
            :disable="disable"
            :options="hoursOptions"
            @emitItem="(e) => emitSelectItem('businessEndDate','hours', e.Value)"/>
          />
        </InputGroup>
        <InputGroup :noMt="marginTop(560)" :disable="disable">
          <Select
            slot="input"
            :selected="data.part1.businessEndDate.minutes"
            defaultText="- - 分"
            :disable="disable"
            :options="minutesOptions"
            @emitItem="(e) => emitSelectItem('businessEndDate','minutes', e.Value)"/>
          />
        </InputGroup>
      </div>
      <InputGroup lgTitle title="基地面積" :disable="disable">
        <Input slot="input" :maxLength="7" :disable="disable" :value="data.part1.area" @updateValue="(e) => updateValue(e,'area')"  placeholder="輸入面積"/>
      </InputGroup>
      <InputGroup lgTitle title="總面積" :disable="disable">
        <Input slot="input" :maxLength="7" :disable="disable" :value="data.part1.totalArea" @updateValue="(e) => updateValue(e,'totalArea')" placeholder="輸入面積"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3 dashed-border">
      <InputGroup lgTitle title="平均出入人數(人/天)" :disable="disable">
        <Input slot="input" :maxLength="7" :disable="disable" :value="data.part1.dailyAveragePersons" @updateValue="(e) => updateValue(e,'dailyAveragePersons')" placeholder="輸入人數" numberOnly/>
      </InputGroup>
      <InputGroup lgTitle title="最高出入人數(人/天)" :disable="disable">
        <Input slot="input" :maxLength="7" :disable="disable" :value="data.part1.singleDayHighestPersons" @updateValue="(e) => updateValue(e,'singleDayHighestPersons')" placeholder="輸入人數" numberOnly/>
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
    },
    marginTop: {
      type: Function,
      default: () => {}
    },
    disable: {
      type: Boolean,
      default: false
    },
    QuestionnaireManagement: {
      type: Boolean,
      default: false
    }
  },
  computed: {
     yearOptions () {
        const arr = []
      for (let i = 20; i <= new Date().getFullYear() -1911; i++) {
         arr.push({
           Text: `民國${i}年`,
           Value: i
         })
       }
       return arr 
     },
     monthOptions () {
       const arr = []
       const month = this.data.part1.createTime.year == new Date().getFullYear() - 1911
        ? new Date().getMonth() + 1
        : 12
      for (let i = 1; i <= month; i++) {
         arr.push({
           Text: `${i}月`,
           Value: i
         })
       }
       return arr 
     },
      dayOptions () {
        const arr = []
        if(this.data.part1.createTime.year && this.data.part1.createTime.month){
          const days = this.data.part1.createTime.year == new Date().getFullYear() - 1911 && this.data.part1.createTime.month == new Date().getMonth() + 1
            ? new Date().getDate()
            : new Date(Number(this.data.part1.createTime.year)+1911, this.data.part1.createTime.month, 0).getDate()
          for (let i = 1; i <= days; i++) {
            arr.push({
              Text: `${i}日`,
              Value: i
            })
          }
        } else {
          for (let i = 1; i <= 31; i++) {
            arr.push({
              Text: `${i}日`,
              Value: i
            })
          }
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