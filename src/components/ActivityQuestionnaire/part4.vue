<template>
  <div class="w-full my-4">
    <div class="column-4">
      <InputGroup title="是否有出口規劃">
        <SwitchInput
          slot="input"
          id="centralControl1"
        />
      </InputGroup>
      <InputGroup title="是否有疏散標示">
        <SwitchInput
          slot="input"
          id="highVoltage1"
        />
      </InputGroup>
      <InputGroup title="是否有人員管制計畫">
        <SwitchInput
          slot="input"
          id="bareWires1"
        />
      </InputGroup>
    </div>
    <div class="column-4 mt-4">
      <InputGroup title="是否有疏散計畫(包含疏散路線、疏散指示、安全距離及避難場所)">
        <SwitchInput
          slot="input"
          id="wireInTube"
        />
      </InputGroup>
    </div>
    <div class="column-5 mt-4 dashed-border">
      <InputGroup v-for="(list,index) in facilityList" :key="`${list}${index}`" :title="index=== 0 ? '如有下列設施，請勾選' : ''" min border0 >
        <Checkbox
          class="text-md"
          :id="list"
          :text="list"
          slot="input"
          :checked="data.part6.facility.includes(list)"
          :value="data.part6.facility.includes(list)"
          @updateValue="(e) =>updateFacility(e,list)"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch/index.vue'
import Checkbox from '@/components/Checkbox'
export default {
  components: {
    InputGroup,
    SwitchInput,
    Checkbox
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      facilityList: [
        '緊急照明',
        '緊急廣播',
        '安全門',
        '安全逃生通道',
        '排煙通道',
        '緊急電源'
      ]
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