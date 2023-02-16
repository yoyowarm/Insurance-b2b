<template>
	<div class="flex">
		<div class="column-6 w-full">
			<div class="col-span-3 flex flex-row">
				<InputGroup class="mr-3 w-32" title="保險開始日期" :disable="disable">
					<Select
						slot="input"
						defaultText="選擇民國年"
						:options="yearOptions"
						:selected="`${copyPeriod.startDate.year}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('startDate','year', e.Value)"
            ref="startDate-year"
					/>
				</InputGroup>
				<InputGroup class="mr-3 w-32" :disable="disable">
					<Select
						slot="input"
						defaultText="選擇月份"
						:options="monthOptions"
						:selected="`${copyPeriod.startDate.month}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('startDate','month', e.Value)"
            ref="startDate-month"
					/>
				</InputGroup>
				<InputGroup class="mr-3 w-32" :disable="disable" v-if="windowWidth > 600">
					<Select
						slot="input"
						defaultText="選擇日期"
						:options="startDayOptions"
						:selected="`${copyPeriod.startDate.day}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('startDate','day', e.Value)"
            ref="startDate-day"
					/>
				</InputGroup>
				<InputGroup class="mr-4 w-32" :disable="disable" v-if="windowWidth > 600">
					<Select
						slot="input"
						defaultText="選擇小時"
						:options="hourOptions"
						:selected="`${copyPeriod.startDate.hour}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('startDate','hour', e.Value)"
            ref="startDate-hour"
					/>
				</InputGroup>
			</div>
      <div class="col-span-3 flex flex-row" v-if="windowWidth <= 600">
        <InputGroup class="mr-3 w-32" noMt :disable="disable" >
					<Select
						slot="input"
						defaultText="選擇日期"
						:options="startDayOptions"
						:selected="`${copyPeriod.startDate.day}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('startDate','day', e.Value)"
            ref="startDate-day"
					/>
				</InputGroup>
				<InputGroup class="mr-4 w-32"  noMt :disable="disable">
					<Select
						slot="input"
						defaultText="選擇小時"
						:options="hourOptions"
						:selected="`${copyPeriod.startDate.hour}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('startDate','hour', e.Value)"
            ref="startDate-hour"
					/>
				</InputGroup>
      </div>
			<div class="col-span-3 flex flex-row">
				<InputGroup class="mr-3 w-32" title="保險結束日期" :disable="disable">
					<Select
						slot="input"
						defaultText="選擇民國年"
						:options="yearOptions"
						:selected="`${copyPeriod.endDate.year}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('endDate','year', e.Value)"
            ref="endDate-year"
					/>
				</InputGroup>
				<InputGroup class="mr-3 w-32" :disable="disable">
					<Select
						slot="input"
						defaultText="選擇月份"
						:options="monthOptions"
						:selected="`${copyPeriod.endDate.month}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('endDate','month', e.Value)"
            ref="endDate-month"
					/>
				</InputGroup>
				<InputGroup class="mr-3 w-32" :disable="disable" v-if="windowWidth > 600">
					<Select
						slot="input"
						defaultText="選擇日期"
						:options="endDayOptions"
						:selected="`${copyPeriod.endDate.day}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('endDate','day', e.Value)"
            ref="endDate-day"
					/>
				</InputGroup>
				<InputGroup class="mr-4 w-32" :disable="disable" v-if="windowWidth > 600">
					<Select
						slot="input"
						defaultText="選擇小時"
						:options="hourOptions"
						:selected="`${copyPeriod.endDate.hour}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('endDate','hour', e.Value)"
            ref="endDate-hour"
					/>
				</InputGroup>
			</div>
      <div class="col-span-3 flex flex-row" v-if="windowWidth <= 600">
        <InputGroup class="mr-3 w-32" noMt :disable="disable" >
					<Select
						slot="input"
						defaultText="選擇日期"
						:options="endDayOptions"
						:selected="`${copyPeriod.endDate.day}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('endDate','day', e.Value)"
            ref="endDate-day"
					/>
				</InputGroup>
				<InputGroup class="mr-4 w-32" noMt :disable="disable">
					<Select
						slot="input"
						defaultText="選擇小時"
						:options="hourOptions"
						:selected="`${copyPeriod.endDate.hour}`"
            :disable="disable"
						@emitItem="(e) => emitSelectItem('endDate','hour', e.Value)"
            ref="endDate-hour"
					/>
				</InputGroup>
      </div>
      <WindowResizeListener @resize="handleResize"/>
		</div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Select from '@/components/Select'
import { Popup } from '@/utils/popups'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
	components: {
		InputGroup,
		Select,
    WindowResizeListener
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
      windowWidth: window.innerWidth,
			copyPeriod: {
				...this.period
			},
      time1: null,
      year: '年',
      month: '月',
      day: '日',
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
		for (let i = 110; i <= 140; i++) {
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
		emitSelectItem(type,key, value) {
      const CHKey = {
        year: '選擇民國年',
        month: '選擇月份',
        day: '選擇日期',
        hour: '選擇小時'
      }
			this.copyPeriod[type][key] = value
      if(new Date().getTime() > new Date(`${Number(this.copyPeriod[type].year)+1911}/${this.copyPeriod[type].month}/${this.copyPeriod[type].day} ${this.copyPeriod[type].hour}:00`).getTime()) {
        Popup.create({
          hasHtml: true,
          htmlText: '保險期間不能小於當前時間',
        })
        this.copyPeriod[type][key] = ''
        if(this.$refs[`${type}-${key}`]) {
          this.$refs[`${type}-${key}`].$el.lastChild.value = CHKey[key]
        }
      }
      if(new Date(`${Number(this.copyPeriod.startDate.year)+1911}/${this.copyPeriod.startDate.month}/${this.copyPeriod.startDate.day} ${this.copyPeriod.startDate.hour}:00`).getTime() > new Date(`${Number(this.copyPeriod.endDate.year)+1911}/${this.copyPeriod.endDate.month}/${this.copyPeriod.endDate.day} ${this.copyPeriod.endDate.hour}:00`).getTime()) {
        Popup.create({
          hasHtml: true,
          htmlText: '保險結束時間不能小於保險起始時間',
        })
        this.copyPeriod[type][key] = ''
        if(this.$refs[`${type}-${key}`]) {
          this.$refs[`${type}-${key}`].$el.lastChild.value = CHKey[key]
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