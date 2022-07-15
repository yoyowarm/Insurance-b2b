<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup title="外牆建築材質">
        <Input slot="input" :value="data.part2.wallMaterial" @updateValue="(e) => updateValue(e,'wallMaterial')" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup title="樓地板建築材質">
        <Input slot="input" :value="data.part2.floorMaterial" @updateValue="(e) => updateValue(e,'floorMaterial')" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup title="屋頂建築材質">
        <Input slot="input" :value="data.part2.roofMaterial" @updateValue="(e) => updateValue(e,'roofMaterial')" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup title="距鄰近建築物">
        <Input slot="input" :value="data.part2.distance" @updateValue="(e) => updateValue(e,'distance')" placeholder="輸入距離"/>
      </InputGroup>
    </div>
    <div class="column-5 my-3">
      <InputGroup title="建築性質" border0 min>
        <RadioInput
          slot="input"
          text="獨棟"
          id="part2-buildingType-1"
          :value="data.part2.buildingNature.Text === '獨棟'"
          @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '獨棟',Value: '1'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="公寓"
          id="part2-buildingType-2"
          :value="data.part2.buildingNature.Text === '公寓'"
          @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '公寓',Value: '2'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="辦公大樓"
          id="part2-buildingType-3"
          :value="data.part2.buildingNature.Text === '辦公大樓'"
          @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '辦公大樓',Value: '3'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="綜合大樓"
          id="part2-buildingType-4"
          :value="data.part2.buildingNature.Text === '綜合大樓'"
          @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '綜合大樓',Value: '4'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="其他"
          id="part2-buildingType-5"
          :value="data.part2.buildingNature.Text === '其他'"
          @updateValue="(e) => updateRadio(e,'buildingNature', {Text: '其他',Value: '5'})"
        />
      </InputGroup>
    </div>
     <div class="column-5 my-3">
      <InputGroup title="鄰近建築物性質" border0 min>
        <RadioInput
          slot="input"
          text="獨棟"
          id="part2-nearBuildingType-1"
          :value="data.part2.nearbyBuildingNature.Text === '獨棟'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '獨棟',Value: '1'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="公寓"
          id="part2-nearBuildingType-2"
          :value="data.part2.nearbyBuildingNature.Text === '公寓'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '公寓',Value: '2'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="辦公大樓"
          id="part2-nearBuildingType-3"
          :value="data.part2.nearbyBuildingNature.Text === '辦公大樓'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '辦公大樓',Value: '3'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="綜合大樓"
          id="part2-nearBuildingType-4"
          :value="data.part2.nearbyBuildingNature.Text === '綜合大樓'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '綜合大樓',Value: '4'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="其他"
          id="part2-nearBuildingType-5"
          :value="data.part2.nearbyBuildingNature.Text === '其他'"
          @updateValue="(e) => updateRadio(e,'nearbyBuildingNature', {Text: '其他',Value: '5'})"
        />
      </InputGroup>
    </div>
    <div class="column-5 my-3">
      <InputGroup title="公共安全檢查(經當地主管建築機關查核)" border0 min>
        <RadioInput
          slot="input"
          text="免公安檢查"
          id="part2-publicSafety-1"
          :value="data.part2.securityCheck.Text === '免公安檢查'"
          @updateValue="(e) => updateRadio(e,'securityCheck', {Text: '免公安檢查',Value: '1'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="合格"
          id="part2-publicSafety-2"
          :value="data.part2.securityCheck.Text === '合格'"
          @updateValue="(e) => updateRadio(e,'securityCheck', {Text: '合格',Value: '2'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="提具體改善計畫書"
          id="part2-publicSafety-3"
          :value="data.part2.securityCheck.Text === '提具體改善計畫書'"
          @updateValue="(e) => updateRadio(e,'securityCheck', {Text: '提具體改善計畫書',Value: '3'})"
        />
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput
          slot="input"
          text="不合格"
          id="part2-publicSafety-4"
          :value="data.part2.securityCheck.Text === '不合格'"
          @updateValue="(e) => updateRadio(e,'securityCheck', {Text: '不合格',Value: '4'})"
        />
      </InputGroup>
    </div>
    <div class="column-5 mt-3">
      <InputGroup title="營業性質之數量">
        <Input
          slot="input"
          :value="data.part2.room.value"
          @updateValue="(e) => updateValue(e,'room.value')"
          placeholder="輸入數量"
          numberOnly
          />
        <Checkbox
          id="selected"
          class="text-md absolute -left-10 bottom-4"
          slot="input-left"
          :checked="data.part2.room.selected"
          :value="data.part2.room.selected"
          @updateValue="(e) =>updateValue(e,'room.selected')"
        />
        <span slot="input-right" class="absolute -right-38 bottom-4">如係屬飯店、旅館者</span>
      </InputGroup>
    </div>
    <div class="column-5 mb-3">
      <InputGroup noMt>
        <Input
          slot="input"
          :value="data.part2.seat.value"
          @updateValue="(e) => updateValue(e,'seat.value')"
          placeholder="輸入數量"
          numberOnly
        />
        <Checkbox
          id="selected1"
          class="text-md absolute -left-10 bottom-4"
          slot="input-left"
          :checked="data.part2.seat.selected"
          :value="data.part2.seat.selected"
          @updateValue="(e) =>updateValue(e,'seat.selected')"
        />
        <span slot="input-right" class="absolute -right-42 bottom-4">如係屬戲院、音樂廳者</span>
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="地上樓層數">
        <Input slot="input" :value="data.part2.floors" numberOnly @updateValue="(e) => updateValue(e,'floors')" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup title="地下樓層數" dash>
        <Input slot="input" :value="data.part2.underground" numberOnly @updateValue="(e) => updateValue(e,'underground')" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup title="使用樓層數">
        <Input slot="input" :value="data.part2.floor" numberOnly @updateValue="(e) => updateValue(e,'floor')" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup title="樓梯是否有止滑條">
        <SwitchInput
          slot="input"
          id="antiSlip"
          :value="data.part2.antiSlip"
          @updateValue="(e) =>updateValue(e,'antiSlip')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有游泳池" dash>
        <SwitchInput
          slot="input"
          id="swimPool"
          :value="data.part2.pool"
          @updateValue="(e) =>updateValue(e,'pool')"
        />
      </InputGroup>
      <InputGroup title="救生員人數" :disable="!data.part2.pool">
        <Input
          slot="input"
          :value="data.part2.lifeguard"
          numberOnly
          @updateValue="(e) => updateValue(e,'lifeguard')"
          placeholder="輸入人數"
          :disable="!data.part2.pool"
        />
      </InputGroup>
      <InputGroup title="地板為何種材質">
        <Input slot="input" :value="data.part2.material"  @updateValue="(e) => updateValue(e,'material')" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup title="是否鋪設地談">
        <SwitchInput
          slot="input"
          id="carpet"
          :value="data.part2.carpet"
          @updateValue="(e) =>updateValue(e,'carpet')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3 dashed-border">
      <InputGroup title="營業處所是否有機械性停車設備" dash>
        <SwitchInput
          slot="input"
          id="swimPoolw"
        />
      </InputGroup>
      <InputGroup title="停車設備種類">
        <Select slot="input"/>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import RadioInput from '@/components/Radio'
import Checkbox from '@/components/Checkbox'
import SwitchInput from '@/components/Switch'
import Select from '@/components/Select'
export default {
  components: {
    InputGroup,
    Input,
    RadioInput,
    Checkbox,
    SwitchInput,
    Select
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      if(type.includes('.')) {
        let arr = type.split('.')
        const obj = Object.assign({}, {[arr[1]]: e})
        const obj2 = {...this.data.part2[arr[0]], ...obj}
        const part2 = {...this.data.part2, [arr[0]]: obj2}
        this.$emit('update:data',{...this.data, part2})
      } else {
        this.$emit('update:data',{
          ...this.data,
          part2: {
            ...this.data.part2,
            [type]: e
          }
        })
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
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>