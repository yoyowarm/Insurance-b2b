<template>
  <div class="w-full">
    <template v-for="(info,index) in infoList">
      <FormTitle :key="index" :title="`場次${index+1}`" classList="text-xl text-gray-700 my-3">
        <div v-if="index !== 0" slot="left" class="flex items-end mr-3" @click="$emit('removeItem',index)">
          <font-awesome-icon icon="times-circle" class="text-2xl text-main" />
        </div>
        <span slot="right" class="text-md text-gray-700 ml-3">參加活動每日平均人數：--人  總計活動天數：--天</span>
      </FormTitle>
      <div :key="index" class="column-5 relative">
        <InputGroup title="每日人數">
          <Input slot="input" placeholder="輸入人數"/>
        </InputGroup>
        <InputGroup title="活動處所地址" dash>
          <Select slot="input" defaultText="選擇縣市"/>
        </InputGroup>
        <InputGroup dash>
          <Select slot="input" defaultText="選擇區域"/>
        </InputGroup>
        <InputGroup class="col-span-2">
          <Input slot="input" placeholder="輸入後續地址"/>
        </InputGroup>
      </div>
      <div :key="`column${index}`" class="column-5 dashed-border mt-4  w-full">
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3" title="活動開始日期">
            <Select
              slot="input"
              defaultText="選擇民國年"
              :options="yearOptions"
              :selected="`${info.startDate.year}`"
              @emitItem="(e) => emitSelectItem('startDate','year', e.Value)"
            />
          </InputGroup>
          <InputGroup>
            <Select
              slot="input"
              defaultText="選擇月份"
              :options="monthOptions"
              :selected="`${info.startDate.month}`"
              @emitItem="(e) => emitSelectItem('startDate','month', e.Value)"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3">
            <Select
              slot="input"
              defaultText="選擇日期"
              :options="dayOptions"
              :selected="`${info.startDate.day}`"
              @emitItem="(e) => emitSelectItem('startDate','day', e.Value)"
            />
          </InputGroup>
          <InputGroup>
            <Select
              slot="input"
              defaultText="選擇小時"
              :options="hourOptions"
              :selected="`${info.startDate.hour}`"
              @emitItem="(e) => emitSelectItem('startDate','hour', e.Value)"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3" title="活動結束日期">
            <Select
              slot="input"
              defaultText="選擇民國年"
              :options="yearOptions"
              :selected="`${info.startDate.year}`"
              @emitItem="(e) => emitSelectItem('startDate','year', e.Value)"
            />
          </InputGroup>
          <InputGroup>
            <Select
              slot="input"
              defaultText="選擇月份"
              :options="monthOptions"
              :selected="`${info.startDate.month}`"
              @emitItem="(e) => emitSelectItem('startDate','month', e.Value)"
            />
          </InputGroup>
        </div>
        <div class="col-span-1 flex flex-row">
          <InputGroup class="mr-3">
            <Select
              slot="input"
              defaultText="選擇日期"
              :options="dayOptions"
              :selected="`${info.startDate.day}`"
              @emitItem="(e) => emitSelectItem('startDate','day', e.Value)"
            />
          </InputGroup>
          <InputGroup>
            <Select
              slot="input"
              defaultText="選擇小時"
              :options="hourOptions"
              :selected="`${info.startDate.hour}`"
              @emitItem="(e) => emitSelectItem('startDate','hour', e.Value)"
            />
          </InputGroup>
        </div>
        <InputGroup title="活動計日">
          <Input slot="input" placeholder="輸入天數" unit="天"/>
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
}
</script>

<style scoped lang="scss">
  
</style>