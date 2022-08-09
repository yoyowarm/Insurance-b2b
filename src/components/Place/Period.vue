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
          />
        </InputGroup>
        <InputGroup class="mr-3" noMt :disable="disable">
          <Select
            slot="input"
            defaultText="選擇月份"
            :options="monthOptions"
            :selected="`${copyPeriod.startDate.month}`"
            @emitItem="(e) => emitSelectItem('startDate','month', e.Value)"
            :disable="disable"
          />
        </InputGroup>
      </div>
      <div class="flex flex-col sm:flex-row">
        <InputGroup class="mr-3" noMt :disable="disable">
          <Select
            slot="input"
            defaultText="選擇日期"
            :options="dayOptions"
            :selected="`${copyPeriod.startDate.day}`"
            @emitItem="(e) => emitSelectItem('startDate','day', e.Value)"
            :disable="disable"
          />
        </InputGroup>
        <InputGroup class="mr-4" noMt :disable="disable">
          <Select
            slot="input"
            defaultText="選擇小時"
            :options="hourOptions"
            :selected="`${copyPeriod.startDate.hour}`"
            @emitItem="(e) => emitSelectItem('startDate','hour', e.Value)"
            :disable="disable"
          />
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
      />
      <Select
        slot="input"
        defaultText="月份"
        :options="monthOptions"
        hiddenArrow
        style="min-width: 30px;"
        :selected="`${copyPeriod.endDate.month}`"
        @emitItem="(e) => emitSelectItem('endDate','month', e.Value)"
        :disable="disable"
      />
      <Select
        slot="input"
        defaultText="日期"
        :options="dayOptions"
        hiddenArrow
        :selected="`${copyPeriod.endDate.day}`"
        style="min-width: 30px;"
        @emitItem="(e) => emitSelectItem('endDate','day', e.Value)"
        :disable="disable"
      />
      <Select
        slot="input"
        defaultText="時"
        :options="hourOptions"
        hiddenArrow
        :selected="`${copyPeriod.endDate.hour}`"
        style="min-width: 30px;"
        @emitItem="(e) => emitSelectItem('endDate','hour', e.Value)"
        :disable="disable"
      />
      <span>止</span>
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
      hourOptions: [
        { Text: '00時', Value: 0},
        { Text: '12時', Value: 12},
        { Text: '24時', Value: 24}
      ]
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
	},
	methods: {
		emitSelectItem(type,key, value) {
			this.copyPeriod[type][key] = value
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