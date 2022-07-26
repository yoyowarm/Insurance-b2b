<template>
  <div class="w-full">
    <template v-for="(info,index) in infoList">
      <FormTitle :key="`title${index}`" :title="`場次${index+1}`" classList="text-xl text-gray-700 my-3">
        <div v-if="index !== 0" slot="left" class="flex items-end mr-3" @click="$emit('removeItem',index)">
          <font-awesome-icon icon="times-circle" class="text-2xl text-main" />
        </div>
        <span slot="right" class="text-md text-gray-700 ml-3">參加活動每日平均人數：--人  總計活動天數：--天</span>
      </FormTitle>
      <div :key="index" class="column-5 relative">
        <InputGroup title="每日人數" :disable="disable">
          <Input
            slot="input"
            placeholder="輸入人數"
            :value="info.number"
            :disable="disable"
            @updateValue="(e) =>updateValue(e,'number',index)"
            numberOnly
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
            :value="info.address"
            :disable="disable"
            @updateValue="(e) =>updateValue(e,'address',index)"
          />
        </InputGroup>
      </div>
      <div :key="`column${index}`" class="column-5 dashed-border mt-4  w-full">
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3" title="活動開始日期" :disable="disable">
            <Select
              slot="input"
              defaultText="選擇民國年"
              :options="yearOptions"
              :selected="`${info.startDate.year}`"
              :disable="disable"
              @emitItem="(e) => emitSelectItem('startDate','year', e.Value,index)"
            />
          </InputGroup>
          <InputGroup :disable="disable">
            <Select
              slot="input"
              defaultText="選擇月份"
              :options="monthOptions"
              :selected="`${info.startDate.month}`"
              :disable="disable"
              @emitItem="(e) => emitSelectItem('startDate','month', e.Value,index)"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3" :disable="disable">
            <Select
              slot="input"
              defaultText="選擇日期"
              :options="dayOptions"
              :selected="`${info.startDate.day}`"
              :disable="disable"
              @emitItem="(e) => emitSelectItem('startDate','day', e.Value,index)"
            />
          </InputGroup>
          <InputGroup :disable="disable">
            <Select
              slot="input"
              defaultText="選擇小時"
              :options="hourOptions"
              :selected="`${info.startDate.hour}`"
              :disable="disable"
              @emitItem="(e) => emitSelectItem('startDate','hour', e.Value,index)"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3" title="活動結束日期" :disable="disable">
            <Select
              slot="input"
              defaultText="選擇民國年"
              :options="yearOptions"
              :selected="`${info.endDate.year}`"
              :disable="disable"
              @emitItem="(e) => emitSelectItem('endDate','year', e.Value,index)"
            />
          </InputGroup>
          <InputGroup :disable="disable">
            <Select
              slot="input"
              defaultText="選擇月份"
              :options="monthOptions"
              :selected="`${info.endDate.month}`"
              :disable="disable"
              @emitItem="(e) => emitSelectItem('endDate','month', e.Value,index)"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3" :disable="disable">
            <Select
              slot="input"
              defaultText="選擇日期"
              :options="dayOptions"
              :selected="`${info.endDate.day}`"
              :disable="disable"
              @emitItem="(e) => emitSelectItem('endDate','day', e.Value,index)"
            />
          </InputGroup>
          <InputGroup :disable="disable">
            <Select
              slot="input"
              defaultText="選擇小時"
              :options="hourOptions"
              :selected="`${info.endDate.hour}`"
              :disable="disable"
              @emitItem="(e) => emitSelectItem('endDate','hour', e.Value,index)"
            />
          </InputGroup>
        </div>
        <InputGroup title="活動計日" :disable="disable">
          <Input
            slot="input"
            placeholder="輸入天數"
            unit="天"
            :value="info.day"
            :disable="disable"
            @updateValue="(e) =>updateValue(e,'day',index)"
            numberOnly
          />
        </InputGroup>
		</div>
    </template>
    <div class="flex justify-center mt-6">
      <Button @click.native="$emit('addItem')" outline>新增活動場次</Button>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
import FormTitle from '@/components/FormTitle'
import Button from '@/components/Button/index.vue'
export default {
  components: {
    InputGroup,
    Input,
    Select,
    FormTitle,
    Button
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
    updateValue(e,type,index) {
      const copyInfoList = [...this.infoList]
      copyInfoList[index][type] = e
      this.$emit('update:infoList', copyInfoList)
    },
    emitSelectItem(type,key, value, index) {
      const copyInfoList = [...this.infoList]
			if(type === 'endDate' && copyInfoList[index][type][key] > Number(value)) {
				console.log(this.infoList[index].startDate[key])
				copyInfoList[index].endDate[key] = Number(copyInfoList[index].startDate[key]) + 1
				this.$emit('update:infoList', copyInfoList)
			} else {
				copyInfoList[index][type][key] = value
				this.$emit('update:infoList', copyInfoList)
			}
		}
  }
}
</script>

<style scoped lang="scss">
  
</style>