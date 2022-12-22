<template>
  <div class="column-2 w-full">
    <div class="flex flex-row">
      <div class="flex flex-col sm:flex-row">
        <InputGroup class="mr-3" noMt :disable="disable">
          <Select
            slot="input"
            defaultText="選擇民國年"
            :options="yearOptions"
            :selected="`${copyPeriod.startDate.year}`"
            @emitItem="(e) => emitSelectItem('startDate','year', e.Value)"
            :disable="disable"
            ref="startDate-year"/>
        </InputGroup>
        <InputGroup class="mr-3" noMt :disable="disable">
          <Select
            slot="input"
            defaultText="選擇月份"
            :options="monthOptions"
            :selected="`${copyPeriod.startDate.month}`"
            @emitItem="(e) => emitSelectItem('startDate','month', e.Value)"
            :disable="disable"
            ref="startDate-month"/>
        </InputGroup>
      </div>
      <div class="flex flex-col sm:flex-row">
        <InputGroup class="mr-3" noMt :disable="disable">
          <Select
            slot="input"
            defaultText="選擇日期"
            :options="startDayOptions"
            :selected="`${copyPeriod.startDate.day}`"
            @emitItem="(e) => emitSelectItem('startDate','day', e.Value)"
            :disable="disable"
            ref="startDate-day"/>
        </InputGroup>
        <InputGroup class="mr-4" noMt :disable="disable">
          <Select
            slot="input"
            defaultText="選擇小時"
            :options="hourOptions"
            :selected="`${copyPeriod.startDate.hour}`"
            @emitItem="(e) => emitSelectItem('startDate','hour', e.Value)"
            :disable="disable"
            ref="startDate-hour"/>
        </InputGroup>
      </div>
    </div>
    <div class=" flex flex-row justify-start items-center dateLine mt-2">
      <span>至</span>
      <Select
        slot="input"
        defaultText="民國年"
        :options="yearOptions"
        hiddenArrow
        :selected="`${copyPeriod.endDate.year}`"
        style="min-width: 50px;"
        @emitItem="(e) => emitSelectItem('endDate','year', e.Value)"
        :disable="disable"
        ref="endDate-year"/>
      <Select
        slot="input"
        defaultText="月份"
        :options="monthOptions"
        hiddenArrow
        style="min-width: 30px;"
        :selected="`${copyPeriod.endDate.month}`"
        @emitItem="(e) => emitSelectItem('endDate','month', e.Value)"
        :disable="disable"
        ref="endDate-month"/>
      <Select
        slot="input"
        defaultText="日期"
        :options="endDayOptions"
        hiddenArrow
        :selected="`${copyPeriod.endDate.day}`"
        style="min-width: 30px;"
        @emitItem="(e) => emitSelectItem('endDate','day', e.Value)"
        :disable="disable"
        ref="endDate-day"/>
      <Select
        slot="input"
        defaultText="時"
        :options="hourOptions"
        hiddenArrow
        :selected="`${copyPeriod.endDate.hour}`"
        style="min-width: 30px;"
        @emitItem="(e) => emitSelectItem('endDate','hour', e.Value)"
        :disable="disable"
        ref="endDate-hour"/>
      <span>止</span>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Select from '@/components/Select'
import { Popup } from '@/utils/popups'
export default {
	components: {
		InputGroup,
		Select
	},
	props: {
		period: {
			type: Object,
			default: () => ({})
		},
    disable: {
      type: Boolean,
      default: false
    }
	},
	data () {
     return {
			copyPeriod: {
				...this.period
			},
      time1: null,
      year: '年',
      month: '月',
      day: '日',
      hourOptions: [
        { Text: '00時', Value: 0},
        { Text: '12時', Value: 12},
        { Text: '24時', Value: 24}
      ],
     }
   },
	watch: {
		period: {
			handler (val) {
				this.copyPeriod = {
					...val
				}
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
    startDay() {
      return this.copyPeriod.startDate.year && this.copyPeriod.startDate.month
        ? new Date(Number(this.copyPeriod.startDate.year) + 1911, this.copyPeriod.startDate.month, 0).getDate()
        : (this.copyPeriod.startDate.month
          ? new Date(new Date().getFullYear(), this.copyPeriod.startDate.month, 0).getDate()
          : 31)
    },
    endDay() {
      return this.copyPeriod.endDate.year && this.copyPeriod.endDate.month
        ? new Date(Number(this.copyPeriod.endDate.year) + 1911, this.copyPeriod.endDate.month, 0).getDate()
        : (this.copyPeriod.endDate.month
          ? new Date(new Date().getFullYear(), this.copyPeriod.endDate.month, 0).getDate()
          : 31)
    },
    startDayOptions () {
			const arr = []
			for (let i = 1; i <= this.startDay; i++) {
				arr.push({
					Text: i + '日',
					Value: i
				})
			}
			return arr 
		},
		endDayOptions () {
			const arr = []
			for (let i = 1; i <= this.endDay; i++) {
				arr.push({
					Text: i + '日',
					Value: i
				})
			}
			return arr 
		},
	},
	methods: {
		emitSelectItem(type,key, value) {
      const CHKey = {
        year: '選擇民國年',
        month: '選擇月份',
        day: '選擇日期',
        hour: '選擇小時'
      }
      this.copyPeriod[type][key] = value
      const startTime = new Date(`${Number(this.copyPeriod[type].year) + 1911}-${this.copyPeriod[type].month}-${this.copyPeriod[type].day}T${this.copyPeriod[type].hour.toString() == '0' ? '00' : (this.copyPeriod[type].hour.toString() == '24' ? '23' : this.copyPeriod[type].hour.toString())}:${this.copyPeriod[type].hour.toString() == '24' ? '59' : '00'}:00`).getTime()
      if(new Date().getTime() > startTime) {
        Popup.create({
          hasHtml: true,
          htmlText: '保險期間不能小於當前時間',
        })
        this.copyPeriod[type][key] = CHKey[key]
        if(this.$refs[`${type}-${key}`]) {
          this.$refs[`${type}-${key}`].$el.lastChild.value = CHKey[key]
        }
      } else {
        if(type == 'startDate') {
          if(key == 'year') {
            this.copyPeriod.endDate[key] = Number(value) + 1
          } else {
            this.copyPeriod.endDate[key] = value
          }
        }
      }
      this.$emit('update:period', this.copyPeriod)
		}
   }
}
</script>

<style scoped lang="scss">
  .dateLine {
		width: 50%;
	}

	@media(max-width: 550px) {
		.dateLine {
			width: 100%;
		}
	}
</style>