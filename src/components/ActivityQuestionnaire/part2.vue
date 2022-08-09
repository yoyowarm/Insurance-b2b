<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="是否有使用明火(瓦斯槍、火把)、爆炸性物質(如：爆竹、煙火)或高溫物質(高溫加熱固體/液體/氣體)">
        <SwitchInput
          slot="input"
          id="hasUseOpenFire"
          :value="data.sheet1.part2.hasUseOpenFire"
          @updateValue="(e) => updateValue(e,'hasUseOpenFire')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="是否有揮發性溶劑或粉塵(造成人員吸入性中毒或窒息)">
        <SwitchInput
          slot="input"
          id="hasVolatileSolventOrDust"
          :value="data.sheet1.part2.hasVolatileSolventOrDust"
          @updateValue="(e) => updateValue(e,'hasVolatileSolventOrDust')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="是否有機械式或充氣式遊樂設備">
        <SwitchInput
          slot="input"
          id="hasMechineOrGasFilledDevice"
          :value="data.sheet1.part2.hasMechineOrGasFilledDevice"
          @updateValue="(e) => updateValue(e,'hasMechineOrGasFilledDevice')"
        />
      </InputGroup>
      <InputGroup lgTitle title="是否使用高壓電設施(600V以上)">
        <SwitchInput
          slot="input"
          id="hasHighVoltage"
          :value="data.sheet1.part2.hasHighVoltage"
          @updateValue="(e) => updateValue(e,'hasHighVoltage')"
        />
      </InputGroup>
      <InputGroup lgTitle title="是否有裸露電線或導體">
        <SwitchInput
          slot="input"
          id="hasBareWires"
          :value="data.sheet1.part2.hasBareWires"
          @updateValue="(e) => updateValue(e,'hasBareWires')"
        />
      </InputGroup>
      <InputGroup lgTitle title="供電系統是否裝有自動斷電設備">
        <SwitchInput
          slot="input"
          id="hasAutomaticPowerOff"
          :value="data.sheet1.part2.hasAutomaticPowerOff"
          @updateValue="(e) => updateValue(e,'hasAutomaticPowerOff')"
        />
      </InputGroup>
    </div>
     <div class="column-4 my-3 dashed-border">
      <InputGroup lgTitle title="所有電線是否裝在管內(含踏板)以避免短路">
        <SwitchInput
          slot="input"
          id="hasWireInTube"
          :value="data.sheet1.part2.hasWireInTube"
          @updateValue="(e) => updateValue(e,'hasWireInTube')"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch'
export default {
  components: {
    InputGroup,
    SwitchInput
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        sheet1: {
          ...this.data.sheet1,
          part2: {
            ...this.data.sheet1.part2,
            [type]: e
          }
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>