<template>
  <div class="w-full my-4">
    <div class="column-4">
      <InputGroup title="是否有活動動線規劃說明">
        <SwitchInput
          slot="input"
          id="hasActivityRoutePlan"
          :value="data.sheet1.part4.hasActivityRoutePlan"
          @updateValue="(e) => updateValue(e,'hasActivityRoutePlan')"
        />
      </InputGroup>
      <InputGroup title="是否有出口規劃">
        <SwitchInput
          slot="input"
          id="hasExit"
          :value="data.sheet1.part4.hasExit"
          @updateValue="(e) => updateValue(e,'hasExit')"
        />
      </InputGroup>
      <InputGroup title="是否有疏散標示">
        <SwitchInput
          slot="input"
          id="hasEvacuationSign"
          :value="data.sheet1.part4.hasEvacuationSign"
          @updateValue="(e) => updateValue(e,'hasEvacuationSign')"
        />
      </InputGroup>
      <InputGroup title="是否有人員管制計畫">
        <SwitchInput
          slot="input"
          id="hasPersonnelControl"
          :value="data.sheet1.part4.hasPersonnelControl"
          @updateValue="(e) => updateValue(e,'hasPersonnelControl')"
        />
      </InputGroup>
    </div>
    <div class="column-4 mt-4">
      <InputGroup title="是否有疏散計畫(包含疏散路線、疏散指示、安全距離及避難場所)">
        <SwitchInput
          slot="input"
          id="hasEvacuationPlan"
          :value="data.sheet1.part4.hasEvacuationPlan"
          @updateValue="(e) => updateValue(e,'hasEvacuationPlan')"
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
          :checked="data.sheet1.part4.facility.includes(list)"
          :value="data.sheet1.part4.facility.includes(list)"
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
        sheet1: {
          ...this.data.sheet1,
          part4: {
            ...this.data.sheet1.part4,
            [type]: e
          }
        }
      })
    },
    updateFacility(e,list) {
      let arr = []
      if(e && !this.data.sheet1.part4.facility.includes(list)) {
        arr.push(list)
      }
      if(!e && this.data.sheet1.part4.facility.includes(list)) {
        arr = [...this.data.sheet1.part4.facility]
        const index = arr.findIndex(item => item === list)
        arr.splice(index,1)
      }
      this.$emit('update:data',{
        ...this.data,
        sheet1: {
          ...this.data.sheet1,
            part4: {
              ...this.data.sheet1.part4,
              facility: e ? [...this.data.sheet1.part4.facility,...arr] : arr
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  
</style>