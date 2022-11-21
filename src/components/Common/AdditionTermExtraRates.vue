<template>
  <div>
    <TableGroup
      class="w-full"
      :data="type ==2 ? placeRatesListTable :activityRatesListTable"
      :slotName="type ==2 ? placeSlotArray : activitySlotArray"
      scrollX>
      <template v-for="(item,index) in placeRatesListTable.rows">
        <div :slot="`甲類1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['甲類1'].rate) ? item['甲類1'].rate : Math.round(item['甲類1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('甲類1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div :slot="`乙類1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['乙類1'].rate) ? item['乙類1'].rate : Math.round(item['乙類1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('乙類1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div :slot="`丙類1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value=" isNaN(item['丙類1'].rate) ? item['丙類1'].rate : Math.round(item['丙類1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('丙類1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div :slot="`丁類1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['丁類1'].rate) ? item['丁類1'].rate : Math.round(item['丁類1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('丁類1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div :slot="`戊類1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['戊類1'].rate) ? item['戊類1'].rate : Math.round(item['戊類1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('戊類1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div :slot="`己類1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['己類1'].rate) ? item['己類1'].rate : Math.round(item['己類1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('己類1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div :slot="`其他(混合類別)1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['其他(混合類別)1'].rate) ? item['其他(混合類別)1'].rate : Math.round(item['其他(混合類別)1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('其他(混合類別)1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div v-if="type ==2" :slot="`operate-${index}`" :key="`operate${index}`" class="w-full flex justify-center">
            <Button class="w-full my-2 sm:my-0" @click.native="editSwitch(index)" :outline="!item.edit"><span v-if="!item.edit">編輯</span><span v-else>儲存</span></Button>
          </div>
      </template>
      <template v-for="(item,index) in activityRatesListTable.rows">
        <div :slot="`A1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['A1'].rate) ? item['A1'].rate : Math.round(item['A1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('A1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div :slot="`B1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['B1'].rate) ? item['B1'].rate : Math.round(item['B1'].rate * 100) / 100" @updateValue="(e) =>updatedRate('B1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div :slot="`C1-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
          <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="%數" :value="isNaN(item['C1'].rate) ? item['C1'].rate :Math.round(item['C1'].rate * 100) /100" @updateValue="(e) =>updatedRate('C1',index, e)" :disable="!item.edit" isNumber/>
            </InputGroup>
        </div>
        <div v-if="type ==3" :slot="`operate-${index}`" :key="`operate${index}`" class="w-full flex justify-center">
          <Button class="w-full my-2 sm:my-0" @click.native="editSwitch(index)" :outline="!item.edit"><span v-if="!item.edit">編輯</span><span v-else>儲存</span></Button>
        </div>
      </template>
    </TableGroup>
  </div>
</template>

<script>
import TableGroup from '@/components/TableGroup'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Button from '@/components/Button'
export default {
  props: {
    type: {
      type: Number,
      default: 2
    },
    ratesList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    TableGroup,
    InputGroup,
    Input,
    Button
  },
  watch: {
    ratesList(val) {
      if(this.type == 2) {
        this.placeRatesListTable.rows = val
      } else {
        this.activityRatesListTable.rows = val
      }
    }
  },
  data() {
    return {
      placeRatesListTable: {
        head: [
          {text: '條款名稱', value: 'additionTermName', size: '6-6'},
          {text: '甲類', value: '甲類1', size: '2-6'},
          {text: '乙類', value: '乙類1', size: '2-6'},
          {text: '丙類', value: '丙類1', size: '2-6'},
          {text: '丁類', value: '丁類1', size: '2-6'},
          {text: '戊類', value: '戊類1', size: '2-6'},
          {text: '己類', value: '己類1', size: '2-6'},
          {text: '其他(混合類別)', value: '其他(混合類別)1', size: '3-6'},
          {text: '操作', value: 'operate', size: '2-6'},
        ],
        rows: []
      },
      activityRatesListTable: {
        head: [
          {text: '條款名稱', value: 'additionTermName', size: '6-6'},
          {text: 'A類', value: 'A1', size: '2-6'},
          {text: 'B類', value: 'B1', size: '2-6'},
          {text: 'C類', value: 'C1', size: '2-6'},
          {text: '操作', value: 'operate', size: '2-6'},
        ],
        rows: []
      }
    } 
  },
  computed: {
    placeSlotArray () {
      const arr = []
      const slotArr = ['甲類1','乙類1','丙類1','丁類1','戊類1','己類1','其他(混合類別)1','operate']
      for (let i = 0; i < this.placeRatesListTable.rows.length; i++) {
        slotArr.map(item => {
          if(!arr.includes(`${item}-${i}`)) {
            arr.push(`${item}-${i}`)
          }
        })
      }
      return arr
    },
    activitySlotArray() {
      const arr = []
      const slotArr = ['A1','B1','C1','operate']
      for (let i = 0; i < this.activityRatesListTable.rows.length; i++) {
        slotArr.map(item => {
          if(!arr.includes(`${item}-${i}`)) {
            arr.push(`${item}-${i}`)
          }
        })
      }
      return arr
    }
  },
  methods: {
    async editSwitch(index) {
      const type = this.type == 2 ? 'placeRatesListTable' : 'activityRatesListTable'
      const value = !this[type].rows[index].edit
      this[type] = Object.assign(this[type], {
        ...this[type].heads,
        rows: this[type].rows.map((item, i) => {
          if(i === index) {
            return {
              ...item,
              edit: value
            }
          } else {
            return item
          }
        })
      })
      if(!value) {
        const arr =[]
        const data = JSON.parse(JSON.stringify(this[type].rows[index]))
        delete data.edit
        Object.keys(data).map(key => {
          if(key !== 'additionTermId' && key !== 'additionTermName' && key !== 'extraRateDetails') {
            arr.push({id: data[key].id, rate: (Number(data[key].rate)/100).toFixed(3)})
          }
        })
        const edit = await this.$store.dispatch('additionTermSetting/editAdditionTermExtraRates', arr)
        if(edit.data.code == 1) {
          this.$emit('updateRates')
        }
      }
    },
    updatedRate(key,index,e) {
      const type = this.type == 2 ? 'placeRatesListTable' : 'activityRatesListTable'
      Object.assign(this[type].rows, {...this[type].rows, [index]: {
        ...this[type].rows[index],
        [key]: {
          ...this[type].rows[index][key],
          rate: e
        }
      }})
    }
  },
  mounted() {
    if(this.type == 2) {
      this.placeRatesListTable.rows = this.ratesList
    } else {
      this.activityRatesListTable.rows = this.ratesList
    }
  }
  
}
</script>

<style lang="scss" scoped>
  
</style>