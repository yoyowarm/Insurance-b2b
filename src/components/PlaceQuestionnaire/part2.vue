<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="1.外牆建築材質" :disable="disable">
        <Input slot="input" :maxLength="7" :disable="disable" :value="data.part2.wallMaterial" @updateValue="(e) => updateValue(e,'wallMaterial')" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup lgTitle title="樓地板建築材質" :disable="disable">
        <Input slot="input" :maxLength="7" :disable="disable" :value="data.part2.floorMaterial" @updateValue="(e) => updateValue(e,'floorMaterial')" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup lgTitle title="屋頂建築材質" :disable="disable">
        <Input slot="input" :maxLength="7" :disable="disable" :value="data.part2.roofMaterial" @updateValue="(e) => updateValue(e,'roofMaterial')" placeholder="輸入材質名稱"/>
      </InputGroup>
    </div>
    <div class="flex flex-col my-3 tab">
      <FormTitle class="text-lg" title="2.營業處所建築性質"/>
      <RadioInput
        slot="input"
        text="獨幢"
        class="mb-2"
        id="part2-buildingType-1"
        :disabled="disable"
        :value="data.part2.buildingNature.Text === '獨幢'"
        @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '獨幢',Value: '獨幢'})"
      />
      <RadioInput
        slot="input"
        text="公寓"
        class="mb-2"
        id="part2-buildingType-2"
        :disabled="disable"
        :value="data.part2.buildingNature.Text === '公寓'"
        @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '公寓',Value: '公寓'})"
      />
      <RadioInput
        slot="input"
        text="辦公大樓"
        class="mb-2"
        id="part2-buildingType-3"
        :disabled="disable"
        :value="data.part2.buildingNature.Text === '辦公大樓'"
        @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '辦公大樓',Value: '辦公大樓'})"
      />
      <RadioInput
        slot="input"
        text="綜合大樓"
        class="mb-2"
        id="part2-buildingType-4"
        :disabled="disable"
        :value="data.part2.buildingNature.Text === '綜合大樓'"
        @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '綜合大樓',Value: '綜合大樓'})"
      />
      <RadioInput
        slot="input"
        text="其他"
        id="part2-buildingType-5"
        :disabled="disable"
        :value="data.part2.buildingNature.Text === '其他'"
        @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '其他',Value: '其他'})"
      />
    </div>
    <div class="column-5 my-3 pl-6">
      <InputGroup lgTitle title="距鄰近建築物" mid :disable="disable">
        <Input slot="input" inputmode="tel" hasZero  unit="公尺" :disable="disable" :value="data.part2.distanceOfBuilding" @updateValue="(e) => updateValue(e,'distanceOfBuilding')" placeholder="輸入距離" numberOnly/>
      </InputGroup>
    </div>
     <div class="flex flex-col my-3 tab">
      <FormTitle class="text-lg pl-6" title="鄰近建物性質"/>
      <RadioInput
        slot="input"
        class="mb-2"
        text="獨幢"
        id="part2-nearBuildingType-1"
        :disabled="disable"
        :value="data.part2.nearbyBuildingNature.Text === '獨幢'"
        @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '獨幢',Value: '獨幢'})"
      />
      <RadioInput
          slot="input"
          class="mb-2"
          text="公寓"
          id="part2-nearBuildingType-2"
          :disabled="disable"
          :value="data.part2.nearbyBuildingNature.Text === '公寓'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '公寓',Value: '公寓'})"
        />
      <RadioInput
          slot="input"
          class="mb-2"
          text="辦公大樓"
          id="part2-nearBuildingType-3"
          :disabled="disable"
          :value="data.part2.nearbyBuildingNature.Text === '辦公大樓'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '辦公大樓',Value: '辦公大樓'})"
        />
        <RadioInput
          slot="input"
          class="mb-2"
          text="綜合大樓"
          id="part2-nearBuildingType-4"
          :disabled="disable"
          :value="data.part2.nearbyBuildingNature.Text === '綜合大樓'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '綜合大樓',Value: '綜合大樓'})"
        />
        <RadioInput
          slot="input"
          text="其他"
          id="part2-nearBuildingType-5"
          :disabled="disable"
          :value="data.part2.nearbyBuildingNature.Text === '其他'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '其他',Value: '其他'})"
        />
    </div>
    <div class="flex flex-col my-3 tab">
      <FormTitle class="text-lg" title="3.建築物公共安全檢查經當地主管建築機關查核"/>
      <RadioInput
          slot="input"
          class="mb-2"
          text="免公安檢查"
          id="part2-publicSafety-1"
          :disabled="disable"
          :value="data.part2.securityCheck.Text === '免公安檢查'"
          @updateValue="(e) => updateRadio(e,'securityCheck', {Text: '免公安檢查',Value: '免公安檢查'})"
        />
       <RadioInput
          slot="input"
          class="mb-2"
          text="合格"
          id="part2-publicSafety-2"
          :disabled="disable"
          :value="data.part2.securityCheck.Text === '合格'"
          @updateValue="(e) => updateRadio(e,'securityCheck', {Text: '合格',Value: '合格'})"
        />
      <RadioInput
          slot="input"
          class="mb-2"
          text="提具體改善計畫書"
          id="part2-publicSafety-3"
          :disabled="disable"
          :value="data.part2.securityCheck.Text === '提具體改善計畫書'"
          @updateValue="(e) => updateRadio(e,'securityCheck', {Text: '提具體改善計畫書',Value: '3'})"
        />
      <RadioInput
          slot="input"
          text="不合格"
          id="part2-publicSafety-4"
          :disabled="disable"
          :value="data.part2.securityCheck.Text === '不合格'"
          @updateValue="(e) => updateRadio(e,'securityCheck', {Text: '不合格',Value: '不合格'})"
        />
    </div>
    <FormTitle class="text-lg" title="4.被保險人之經營業務性質"/>
    <div class="column-5 mt-0 ml-8 pl-6" :class="{'mb-6':windowWidth< 600}">
      <InputGroup lgTitle noMt mid class="mb-8 sm:mb-0" :border0="disable || !data.part2.room.selected">
        <Input
          slot="input"
          class="w-full"
          inputmode="tel" 
          :value="data.part2.room.value"
          :disable="disable || !data.part2.room.selected"
          @updateValue="(e) => updateValue(e,'room.value')"
          placeholder="房間數目"
          numberOnly
          hasZero
          />
        <Checkbox
          id="selected"
          class="text-md absolute -left-10 bottom-4"
          slot="input-left"
          :checked="data.part2.room.selected"
          :value="data.part2.room.selected"
          :disabled="disable"
          @updateValue="(e) =>updateValue(e,'room.selected')"
        />
        <span slot="input-right" class="absolute sm:-right-80 -bottom-8 sm:bottom-4 text-lg" :class="{'-bottom-14':windowWidth< 600}">如係屬飯店、旅館者，請說明其房間數目</span>
      </InputGroup>
    </div>
    <div class="column-5 mb-3 ml-8 pl-6" :class="{'mb-6':windowWidth< 600}">
      <InputGroup noMt mid class="mb-8 sm:mb-0" :border0="disable || !data.part2.seat.selected" >
        <Input
          slot="input"
          class="w-full"
          inputmode="tel" 
          :value="data.part2.seat.value"
          :disable="disable || !data.part2.seat.selected"
          @updateValue="(e) => updateValue(e,'seat.value')"
          placeholder="座位數目"
          numberOnly
          hasZero
        />
        <Checkbox
          id="selected1"
          class="text-md absolute -left-10 bottom-4"
          slot="input-left"
          :checked="data.part2.seat.selected"
          :value="data.part2.seat.selected"
          :disabled="disable"
          @updateValue="(e) =>updateValue(e,'seat.selected')"
        />
        <span slot="input-right" class="absolute sm:-right-78 -bottom-8 sm:bottom-4 text-lg" :class="{'-bottom-14':windowWidth< 600}">屬戲院、音樂廳者，請說明其座位數目</span>
      </InputGroup>
    </div>
    <FormTitle class="text-lg" title="5.營業處所總樓層數"/>
    <div class="column-4 my-3 mt-0 pl-6">
      <InputGroup lgTitle mid title="地上樓層數" :disable="disable">
        <Input slot="input" inputmode="tel"  :disable="disable" hasZero :value="data.part2.floors" numberOnly @updateValue="(e) => updateValue(e,'floors')" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup lgTitle mid title="地下樓層數" dash :disable="disable">
        <Input slot="input" inputmode="tel"  :disable="disable" hasZero :value="data.part2.underground" numberOnly @updateValue="(e) => updateValue(e,'underground')" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup lgTitle mid title="使用到樓層" :disable="disable">
        <Input slot="input" inputmode="tel"  :disable="disable" hasZero :value="data.part2.useFloors" numberOnly @updateValue="(e) => updateValue(e,'useFloors')" placeholder="輸入層數"/>
      </InputGroup>
    </div>
    
  <div class="w-full my-4 mb-0">
      <div class="w-full flex flex-row mt-4">
        <span class="mr-2 text-lg">6.</span>
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasSwimmingPool" :value="data.part2.hasSwimmingPool === true" @updateValue="updateValue(true, 'hasSwimmingPool')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasSwimmingPool2" :value="data.part2.hasSwimmingPool === false" @updateValue="updateValue(false, 'hasSwimmingPool')"/>
      </div>
      <div class="text-lg">營業處所是否有游泳池</div>
    </div>
  </div>
    <div class="column-4 my-3 mt-0 pl-6">
      <InputGroup lgTitle mid title="救生員人數" :disable="disable || !data.part2.hasSwimmingPool">
        <Input
          slot="input"
          inputmode="tel" 
          :value="data.part2.lifeguardAmount"
          numberOnly
          @updateValue="(e) => updateValue(e,'lifeguardAmount')"
          placeholder="輸入人數"
          :disable="disable || !data.part2.hasSwimmingPool"
          hasZero
        />
      </InputGroup>
    </div>
    <div class="w-full my-4 mb-0">
      <div class="w-full flex flex-row mt-4">
        <span class="mr-2 text-lg">7.</span>
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasMechineParkingDevice" :value="data.part2.hasMechineParkingDevice === true" @updateValue="updateValue(true, 'hasMechineParkingDevice')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasMechineParkingDevice2" :value="data.part2.hasMechineParkingDevice === false" @updateValue="updateValue(false, 'hasMechineParkingDevice')"/>
      </div>
        <div class="text-lg">營業處所是否有機械性停車設備</div>
    </div>
  </div>
    <div class="column-4 my-3 mt-0 pl-6">
      <InputGroup lgTitle mid title="停車設備種類" :disable="disable || !data.part2.hasMechineParkingDevice">
        <Select
          slot="input"
          :options="parkingList"
          defaultText="選擇種類"
          :selected="data.part2.mechineParkingDeviceCategory"
          :disable="disable || !data.part2.hasMechineParkingDevice"
          @emitItem="e=>updateValue(e.Value,'mechineParkingDeviceCategory')"
        />
      </InputGroup>
    </div>
    <FormTitle class="text-lg" title="8.地板為何種材質"/>
    <div class="column-4 my-4 mt-0 pl-6">
      <InputGroup lgTitle mid noMt :disable="disable">
        <Input slot="input" :disable="disable" :value="data.part2.material"  @updateValue="(e) => updateValue(e,'material')" placeholder="輸入材質名稱"/>
      </InputGroup>
    </div>
    <div class="w-full my-4 pl-6">
      <div class="w-full flex flex-row mt-4">
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasCarpet" :value="data.part2.hasCarpet === true" @updateValue="updateValue(true, 'hasCarpet')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasCarpet2" :value="data.part2.hasCarpet === false" @updateValue="updateValue(false, 'hasCarpet')"/>
      </div>
        <div class="text-lg">是否鋪設地毯</div>
    </div>
  </div>
  
    <div class="w-full my-4 dashed-border">
      <div class="w-full flex flex-row mt-4">
        <span class="mr-2 text-lg">9.</span>
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="hasAntiSlip" :value="data.part2.hasAntiSlip === true" @updateValue="updateValue(true, 'hasAntiSlip')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="hasAntiSlip2" :value="data.part2.hasAntiSlip === false" @updateValue="updateValue(false, 'hasAntiSlip')"/>
      </div>
        <div class="text-lg">樓梯是否有止滑條</div>
    </div>
  </div>
  <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import RadioInput from '@/components/Radio'
import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import WindowResizeListener from '@/components/WindowResizeListener'

export default {
  components: {
    FormTitle,
    InputGroup,
    Input,
    RadioInput,
    Checkbox,
    Select,
    WindowResizeListener
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
    }
  },
  watch: {
    'data.part2.hasMechineParkingDevice': {
      handler: function (val) {
        if (!val) {
          this.updateValue('選擇種類','mechineParkingDeviceCategory')
        }
      },
      immediate: true
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      parkingList: [
        {
          Value: '自有停車場',
          Text: '自有停車場'
        },
        {
          Value: '專屬停車場',
          Text: '專屬停車場'
        },
        {
          Value: '其他',
          Text: '其他'
        }
      ]
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    updateValue(e,type) {
      const arr = ['hasAntiSlip', 'hasSwimmingPool', 'hasCarpet', 'hasMechineParkingDevice']
      if(type.includes('.')) {
        let arr = type.split('.')
        const obj = Object.assign({}, {[arr[1]]: e})
        const obj2 = {...this.data.part2[arr[0]], ...obj}
        const part2 = {...this.data.part2, [arr[0]]: obj2}
        if(!e && type == 'seat.selected') {
          this.$emit('update:data', {...this.data, part2:{...this.data.part2, seat: {selected: e, value: ''}}})
        } else if (!e && type == 'room.selected') {
          this.$emit('update:data', {...this.data, part2:{...this.data.part2, room: {selected: e, value: ''}}})
        } else {
          this.$emit('update:data',{...this.data, part2})
        }
      } else {
        if(!e && type =='hasSwimmingPool') {
          this.$emit('update:data', {...this.data, part2:{...this.data.part2, lifeguardAmount: '', hasSwimmingPool: e}})
        } else {
          this.$emit('update:data',{
            ...this.data,
            part2: {
              ...this.data.part2,
              [type]: arr.includes(type) && e === this.data.part2[type] ? null : e
            }
          })
        }
      }
    },
    updateRadio(e,type,value) {
      if(e) {
        this.$emit('update:data',{
        ...this.data,
        part2: {
          ...this.data.part2,
          [type]: value
        }
      })
      } else {
        this.$emit('update:data',{
          ...this.data,
          part2: {
            ...this.data.part2,
            [type]: ''
          }
        })
      }
      
    },
  }
}
</script>

<style scoped lang="scss">
  .w90{
    width: 90%;
  }
  .w10{
    width: 10%;
  }
  @media screen and (max-width: 768px) {
    .w90{
      width: 80%;
    }
    .w10{
      width: 20%;
    }
  }
  .tab .radio {
    @apply pl-6
  }
</style>