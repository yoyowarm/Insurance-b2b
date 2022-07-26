<template>
	<div class="flex flex-row">
		<div class="column-6 w-full">
			<div class="col-span-3 flex flex-row">
				<InputGroup class="mr-3" title="活動開始日期" disable>
					<Select
						slot="input"
						defaultText="選擇民國年"
						:options="yearOptions"
						:selected="`${copyPeriod.startDate.year}`"
            disable
						@emitItem="(e) => emitSelectItem('startDate','year', e.Value)"
					/>
				</InputGroup>
				<InputGroup class="mr-3" disable>
					<Select
						slot="input"
						defaultText="選擇月份"
						:options="monthOptions"
						:selected="`${copyPeriod.startDate.month}`"
            disable
						@emitItem="(e) => emitSelectItem('startDate','month', e.Value)"
					/>
				</InputGroup>
				<InputGroup class="mr-3" disable>
					<Select
						slot="input"
						defaultText="選擇日期"
						:options="dayOptions"
						:selected="`${copyPeriod.startDate.day}`"
            disable
						@emitItem="(e) => emitSelectItem('startDate','day', e.Value)"
					/>
				</InputGroup>
				<InputGroup class="mr-4" disable>
					<Select
						slot="input"
						defaultText="選擇小時"
						:options="hourOptions"
						:selected="`${copyPeriod.startDate.hour}`"
            disable
						@emitItem="(e) => emitSelectItem('startDate','hour', e.Value)"
					/>
				</InputGroup>
			</div>
			<div class="col-span-3 flex flex-row">
				<InputGroup class="mr-3" title="活動結束日期" disable>
					<Select
						slot="input"
						defaultText="選擇民國年"
						:options="yearOptions"
						:selected="`${copyPeriod.endDate.year}`"
            disable
						@emitItem="(e) => emitSelectItem('endDate','year', e.Value)"
					/>
				</InputGroup>
				<InputGroup class="mr-3" disable>
					<Select
						slot="input"
						defaultText="選擇月份"
						:options="monthOptions"
						:selected="`${copyPeriod.endDate.month}`"
            disable
						@emitItem="(e) => emitSelectItem('endDate','month', e.Value)"
					/>
				</InputGroup>
				<InputGroup class="mr-3" disable>
					<Select
						slot="input"
						defaultText="選擇日期"
						:options="dayOptions"
						:selected="`${copyPeriod.endDate.day}`"
            disable
						@emitItem="(e) => emitSelectItem('endDate','day', e.Value)"
					/>
				</InputGroup>
				<InputGroup class="mr-4" disable>
					<Select
						slot="input"
						defaultText="選擇小時"
						:options="hourOptions"
						:selected="`${copyPeriod.endDate.hour}`"
            disable
						@emitItem="(e) => emitSelectItem('endDate','hour', e.Value)"
					/>
				</InputGroup>
			</div>
		</div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Select from '@/components/Select'
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
			for (let i = 0; i <= 23; i++) {
				arr.push({
					Text: i + '時',
					Value: i+1
				})
			}
			return arr 
		},
	},
	methods: {
		emitSelectItem(type,key, value) {
			if(type === 'endDate' && this.copyPeriod[type][key] > Number(value)) {
				console.log(this.copyPeriod.startDate[key])
				this.copyPeriod.endDate[key] = Number(this.copyPeriod.startDate[key]) + 1
				console.log(this.copyPeriod.endDate[key])
				this.$emit('update:period', this.copyPeriod)
			} else {
				this.copyPeriod[type][key] = value
				this.$emit('update:period', this.copyPeriod)
			}
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