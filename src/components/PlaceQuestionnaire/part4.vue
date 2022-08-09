<template>
  <div class="w-full my-4">
    <div class="column-4">
      <InputGroup lgTitle title="是否設有中控中心以監控公用設備">
        <SwitchInput
          slot="input"
          id="hasCentralControl"
          :value="data.part4.hasCentralControl"
          @updateValue="(e) =>updateValue(e,'hasCentralControl')"
        />
      </InputGroup>
      <InputGroup lgTitle title="是否使用高壓電設施(600V以上)">
        <SwitchInput
          slot="input"
          id="hasHighVoltage"
          :value="data.part4.hasHighVoltage"
          @updateValue="(e) =>updateValue(e,'hasHighVoltage')"
        />
      </InputGroup>
      <InputGroup lgTitle title="是否有裸露電線或導體">
        <SwitchInput
          slot="input"
          id="hasBareWires"
          :value="data.part4.hasBareWires"
          @updateValue="(e) =>updateValue(e,'hasBareWires')"
        />
      </InputGroup>
      <InputGroup lgTitle title="供電系統是否裝有自動斷電設備">
        <SwitchInput
          slot="input"
          id="hasAutomaticPowerOff"
          :value="data.part4.hasAutomaticPowerOff"
          @updateValue="(e) =>updateValue(e,'hasAutomaticPowerOff')"
        />
      </InputGroup>
    </div>
    <div class="column-4 mt-4 dashed-border">
      <InputGroup lgTitle title="所有電線是否裝在管內(含踏板)以避免短路">
        <SwitchInput
          slot="input"
          id="hasWireInTube"
          :value="data.part4.hasWireInTube"
          @updateValue="(e) =>updateValue(e,'hasWireInTube')"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch/index.vue'
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
        part4: {
          ...this.data.part4,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>