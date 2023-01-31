<template>
  <div class="w-full">
    <InputGroup slot="right" lgTitle  class="activity-name mb-4" :bgColor="!disable ? 'white' : ''" :disable="disable">
    <span slot="title" class="text-lg font-bold text-gray-800">活動名稱</span>
      <Input slot="input" class="w-full" :disable="disable" :value="activityName" @updateValue="(e) => $emit('updatedActivityName',e)" placeholder="輸入活動名稱"/>
    </InputGroup>
    <span slot="icon" class="average ">參加活動每日平均人數：{{Math.round(average.person.toFixed(2))}}人  <span v-if="windowWidth <= 600"><br>總計活動天數：{{average.day}}天</span><span v-if="windowWidth > 600">總計活動天數：{{average.day}}天</span></span>
    <template v-for="(info,index) in infoList">
      <FormTitle :key="`title${index}`" :title="`場次${index+1}`" classList="text-xl text-gray-700 my-3">
        <div v-if="index !== 0" slot="left" class="flex items-end mr-3" @click="$emit('removeItem',index)">
          <font-awesome-icon icon="times-circle" class="text-2xl text-main" />
        </div>
        <div v-if="index !== 0" slot="left" class="absolute left-32">
          <Checkbox
          :id="`title${index}`"
          text="同上"
          :value="sameAs[index]"
          @updateValue="(e) =>copyAddress(e,index)"
          />
        </div>
      </FormTitle>
      <div :key="index" class="column-5 relative">
        <InputGroup title="每日人數" :disable="disable">
          <Input
            slot="input"
            placeholder="輸入人數"
            inputmode="tel"
            :value="info.number"
            :disable="disable"
            @updateValue="(e) =>updateValue(e,'number',index)"
            numberOnly
            numberFormat
            :maxLength="7"
          />
        </InputGroup>
        <InputGroup title="活動處所地址" dash :disable="disable">
          <Select
            slot="input"
            defaultText="選擇縣市"
            :options="countyList"
            :selected="info.city.Value"
            :disable="disable"
            @emitItem="e=>updateValue(e,'city',index)"
          />
        </InputGroup>
        <InputGroup dash :disable="disable">
          <Select
            slot="input"
            defaultText="選擇區域"
            :options="areaList.filter(u => u.cityId == info.city.Value)"
            :selected="info.area.Value"
            :disable="disable"
            @emitItem="(e) => updateValue(e,'area', index)"
          />
        </InputGroup>
        <InputGroup class="col-span-2" :disable="disable">
          <Input
            slot="input"
            placeholder="輸入後續地址"
            class="w-full"
            :value="info.address"
            :disable="disable"
            @updateValue="(e) =>updateValue(e,'address',index)"
          />
        </InputGroup>
      </div>
      <div :key="`column${index}`" class="column-5 dashed-border mt-4  w-full">
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3 w-32" title="活動開始日期" :disable="disable">
            <Select
              slot="input"
              defaultText="選擇民國年"
              :options="yearOptions"
              :selected="`${info.startDate.year}`"
              :disable="disable"
              @emitItem="(e) => {emitSelectItem('startDate','year', e.Value,index);updateDay(index)}"
              :ref="`startDate-year-${index}`"
            />
          </InputGroup>
          <InputGroup :disable="disable" class="w-32">
            <Select
              slot="input"
              defaultText="選擇月份"
              :options="monthOptions"
              :selected="`${info.startDate.month}`"
              :disable="disable"
              @emitItem="(e) => {emitSelectItem('startDate','month', e.Value,index);updateDay(index)}"
              :ref="`startDate-month-${index}`"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3 w-32" :noMt="windowWidth <= 600" :disable="disable">
            <Select
              slot="input"
              defaultText="選擇日期"
              :options="startDayOptions(index)"
              :selected="`${info.startDate.day}`"
              :disable="disable"
              @emitItem="(e) => {emitSelectItem('startDate','day', e.Value,index);updateDay(index)}"
              :ref="`startDate-day-${index}`"
            />
          </InputGroup>
          <InputGroup :disable="disable" :noMt="windowWidth <= 600" class="w-32">
            <Select
              slot="input"
              defaultText="選擇小時"
              :options="hourOptions"
              :selected="`${info.startDate.hour}`"
              :disable="disable"
              @emitItem="(e) => {emitSelectItem('startDate','hour', e.Value,index);updateDay(index)}"
              :ref="`startDate-hour-${index}`"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3 w-32" title="活動結束日期" :disable="disable">
            <Select
              slot="input"
              defaultText="選擇民國年"
              :options="yearOptions.filter(item => item.Value >= info.startDate.year)"
              :selected="`${info.endDate.year}`"
              :disable="disable"
              @emitItem="(e) => {emitSelectItem('endDate','year', e.Value,index);updateDay(index)}"
              :ref="`endDate-year-${index}`"
            />
          </InputGroup>
          <InputGroup :disable="disable" class="w-32">
            <Select
              slot="input"
              defaultText="選擇月份"
              :options="(info.endDate.year > info.startDate.year) ? monthOptions : monthOptions.filter(item => item.Value >= info.startDate.month)"
              :selected="`${info.endDate.month}`"
              :disable="disable"
              @emitItem="(e) => {emitSelectItem('endDate','month', e.Value,index);updateDay(index)}"
              :ref="`endDate-month-${index}`"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3 w-32" :noMt="windowWidth <= 600" :disable="disable">
            <Select
              slot="input"
              defaultText="選擇日期"
              :options="endDayOptions(index)"
              :selected="`${info.endDate.day}`"
              :disable="disable"
              @emitItem="(e) => {emitSelectItem('endDate','day', e.Value,index);updateDay(index)}"
              :ref="`endDate-day-${index}`"
            />
          </InputGroup>
          <InputGroup :disable="disable" :noMt="windowWidth <= 600" class="w-32">
            <Select
              slot="input"
              defaultText="選擇小時"
              :options="(info.endDate.year > info.startDate.year) || info.endDate.day != info.startDate.day ? hourOptions : hourOptions.filter(item => item.Value >= info.startDate.hour)"
              :selected="`${info.endDate.hour}`"
              :disable="disable"
              @emitItem="(e) => {emitSelectItem('endDate','hour', e.Value,index);updateDay(index)}"
              :ref="`endDate-hour-${index}`"
            />
          </InputGroup>
        </div>
        <InputGroup title="活動計日" disable>
          <Input
            slot="input"
            placeholder="輸入天數"
            unit="天"
            :value="info.day"
            disable
            @updateValue="(e) =>updateValue(e,'day',index)"
            numberOnly
          />
        </InputGroup>
		</div>
    </template>
    <div class="flex justify-center mt-6">
      <Button :disabled="disable" @click.native="$emit('addItem')" outline>新增活動場次</Button>
    </div>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
import FormTitle from '@/components/FormTitle'
import Button from '@/components/Button/index.vue'
import Checkbox from '@/components/Checkbox'
import { Popup } from '@/utils/popups'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  components: {
    InputGroup,
    Input,
    Select,
    FormTitle,
    Button,
    WindowResizeListener,
    Checkbox
  },
  props: {
    infoList: {
      type: Array,
      default: () => []
    },
    countyList: {
      type: Array,
      default: () => []
    },
    areaList: {
      type: Array,
      default: () => []
    },
    disable: {
      type: Boolean,
      default: false
    },
    average: {
      type: Object,
      default: () => ({})
    },
    activityName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      copyInfoList: [],
      sameAs: []
    }
  },
  watch: {
    infoList: {
      handler(val) {
        this.sameAs = []
        this.copyInfoList = val
        this.copyInfoList.map((_,index) => {
          this.assignDate(index)
          this.sameAs.push(false)
        })

      },
      deep: true
    }
  },
  computed: {
		yearOptions () {
			const arr = []
		for (let i = (new Date().getFullYear()-1911); i <= 140; i++) {
				arr.push({
					Text: i + '年',
					Value: i
				})
			}
			return arr 
		},
		monthOptions () {
			const arr = []
		for (let i = 1; i <= 12; i++) {
				arr.push({
					Text: i + '月',
					Value: i
				})
			}
			return arr 
		},
		dayOptions () {
			const arr = []
			for (let i = 1; i <= 31; i++) {
				arr.push({
					Text: i + '日',
					Value: i
				})
			}
			return arr 
		},
		hourOptions () {
			const arr = []
			for (let i = 0; i <= 24; i++) {
				arr.push({
					Text: i + '時',
					Value: i
				})
			}
			return arr 
		},
	},
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    startDay(index) {
      if(!this.copyInfoList[index]) return
      return this.copyInfoList[index].startDate.year && this.copyInfoList[index].startDate.month && this.copyInfoList[index].startDate.month !== '選擇月份'
        ? new Date(Number(this.copyInfoList[index].startDate.year) + 1911, this.copyInfoList[index].startDate.month, 0).getDate()
        : (this.copyInfoList[index].startDate.month !== '選擇月份'
          ? new Date(new Date().getFullYear(), this.copyInfoList[index].startDate.month, 0).getDate()
          : 31)
    },
    endDay(index) {
      if(!this.copyInfoList[index]) return
      return this.copyInfoList[index].endDate.year && this.copyInfoList[index].endDate.month && this.copyInfoList[index].endDate.month !== '選擇月份'
        ? new Date(Number(this.copyInfoList[index].endDate.year) + 1911, this.copyInfoList[index].endDate.month, 0).getDate()
        : (this.copyInfoList[index].endDate.month !== '選擇月份'
          ? new Date(new Date().getFullYear(), this.copyInfoList[index].endDate.month, 0).getDate()
          : 31)
    },
    startDayOptions (index) {
			const arr = []
			for (let i = 1; i <= this.startDay(index); i++) {
				arr.push({
					Text: i + '日',
					Value: i
				})
			}
			return arr 
		},
    endDayOptions (index) {
			const arr = []
			for (let i = 1; i <= this.endDay(index); i++) {
				arr.push({
					Text: i + '日',
					Value: i
				})
			}
			return arr 
		},
    updateValue(e,type,index) {
      const copyInfoList = [...this.infoList]
      copyInfoList[index][type] = e
      this.$emit('update:infoList', copyInfoList)
    },
    copyAddress(e,index) {
      const copyInfoList = [...this.infoList]
      this.sameAs[index] = e
      if(e) {
        copyInfoList[index].address = copyInfoList[index-1].address
        copyInfoList[index].area = copyInfoList[index-1].area
        copyInfoList[index].city = copyInfoList[index-1].city
        this.$emit('update:infoList', copyInfoList)
      }
    },
    emitSelectItem(type,key, value, index) {
      
      const copyInfoList = [...this.infoList]
			copyInfoList[index][type][key] = value
      const hour = copyInfoList[index].startDate.hour.toString() == '24' ? '11:59' : `${copyInfoList[index].startDate.hour}:00`
      const tomorrow = new Date(`${Number(copyInfoList[index].startDate.year)+1911}/${copyInfoList[index].startDate.month}/${copyInfoList[index].startDate.day} ${hour}`).getTime()
      const CHKey = {
        year: '選擇民國年',
        month: '選擇月份',
        day: '選擇日期',
        hour: '選擇小時'
      }
      if(new Date(`${Number(copyInfoList[index][type].year)+1911}`,`${copyInfoList[index][type].month}`,0).getDate() < Number(copyInfoList[index][type].day)) {
        Popup.create({
          hasHtml: true,
          htmlText: '無此日期',
        })
        copyInfoList[index][type][key] = CHKey[key]
        if(this.$refs[`${type}-${key}-${index}`]) {
          this.$refs[`${type}-${key}-${index}`][0].$el.lastChild.value = CHKey[key]
        }
      } else if(new Date(new Date().setHours(new Date().getHours()+2)).getTime() > new Date(`${Number(copyInfoList[index][type].year)+1911}/${copyInfoList[index][type].month}/${copyInfoList[index][type].day} ${copyInfoList[index][type].hour}:00`).getTime()) {
        Popup.create({
          hasHtml: true,
          htmlText: '活動起始時間不得小於現在時間 +2 小時',
        })
        copyInfoList[index][type][key] = CHKey[key]
        if(this.$refs[`${type}-${key}-${index}`]) {
          this.$refs[`${type}-${key}-${index}`][0].$el.lastChild.value = CHKey[key]
        }
      } else {
        if(type == 'startDate') {
           if(key == 'hour') {
              copyInfoList[index].endDate.hour = 24
            } else {
              copyInfoList[index].endDate.year = new Date(tomorrow).getFullYear()-1911
              copyInfoList[index].endDate.month = new Date(tomorrow).getMonth()+1
              copyInfoList[index].endDate.day = copyInfoList[index].startDate.day
            }
        }
      }
      if(type == 'startDate' || type == 'endDate') {
        this.$emit('updatedActivityTime')
      }
			this.$emit('update:infoList', copyInfoList)
		},
    updateDay(index) {
      const startTime = new Date(`${Number(this.copyInfoList[index].startDate.year)+1911}-${this.copyInfoList[index].startDate.month}-${this.copyInfoList[index].startDate.day} 00:00`).getTime()
      const endTime = new Date(`${Number(this.copyInfoList[index].endDate.year)+1911}-${this.copyInfoList[index].endDate.month}-${this.copyInfoList[index].endDate.day} 00:00`).getTime()
      const day = Math.round((endTime - startTime) / (24 * 3600 * 1000)) + 1
      this.updateValue(isNaN(day) ? '1' : day.toString(),'day',index)
    },
    assignDate(index) {
      const today = new Date().getTime()
      const tomorrow = new Date().setDate(new Date().getDate() + 1)
      
      if(!this.copyInfoList[index].startDate.year) {
        this.copyInfoList[index].startDate.year = new Date(new Date().setHours(new Date().getHours()+3)).getHours() < 3 ? new Date(tomorrow).getFullYear() - 1911 :  new Date(today).getFullYear() - 1911
        this.copyInfoList[index].endDate.year = new Date(new Date().setHours(new Date().getHours()+3)).getHours() < 3 ? new Date(tomorrow).getFullYear() - 1911 :  new Date(today).getFullYear() - 1911
      }
      if(!this.copyInfoList[index].startDate.month) {
        this.copyInfoList[index].startDate.month = new Date(new Date().setHours(new Date().getHours()+3)).getHours() < 3 ? new Date(tomorrow).getMonth() + 1 :  new Date(today).getMonth() + 1
        this.copyInfoList[index].endDate.month = new Date(new Date().setHours(new Date().getHours()+3)).getHours() < 3 ? new Date(tomorrow).getMonth() + 1 :  new Date(today).getMonth() + 1
      }
      if(!this.copyInfoList[index].startDate.day) {
        console.log(new Date(new Date().setHours(new Date().getHours()+3)).getHours())
        this.copyInfoList[index].startDate.day = new Date(new Date().setHours(new Date().getHours()+3)).getHours() < 3 ? new Date(tomorrow).getDate() : new Date(today).getDate()
        this.copyInfoList[index].endDate.day = new Date(new Date().setHours(new Date().getHours()+3)).getHours() < 3 ? new Date(tomorrow).getDate() : new Date(today).getDate()
      }
      if(!this.copyInfoList[index].startDate.hour) {
        this.copyInfoList[index].startDate.hour = new Date(new Date().setHours(new Date().getHours()+3)).getHours()
        this.copyInfoList[index].endDate.hour = 24
      }
      this.updateDay(index)
      this.$emit('update:infoList', this.copyInfoList)
    }
  },
  mounted() {
    this.copyInfoList = [...this.infoList]
    this.copyInfoList.map((i,index) => {
      this.assignDate(index)
      this.updateDay(index)
      this.sameAs.push(false)
    })
  }
}
</script>

<style scoped lang="scss">
    .average { 
    @apply text-base mt-1  text-gray-700  font-semibold
  }
  // .activity-name {
  //   width: calc(100% - 350px);
  //   @apply industry-input-group ml-24 mb-3
  // }
  // @media screen and (min-width: 601px) and (max-width: 770px) {
  //   .activity-name {
  //     width: calc(100% - 130px);
  //   }
  // }
  // @media screen and (max-width: 600px) {
  //   .activity-name {
  //     width: calc(100% - 130px);
  //   }
  // }
</style>