<template>
  <div class="w-full my-4 dashed-border">
      <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
        <div class="flex flex-row justify-between">
          <RadioInput text="是" :id="`${questionListID[index]}${index}`" :value="data.part4[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
          <RadioInput class="mx-2" text="否" :id="`${questionListID[index]}${index}2`" :value="data.part4[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
      </div>
        <div class="text-lg">{{item}}</div>
    </div>
  </div>
</template>

<script>
import RadioInput from '@/components/Radio'
export default {
  components: {
    RadioInput
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      questionList: [
        '是否設有中控中心以監控公用設備',
        '是否使用高壓電設施(600V以上)',
        '是否有裸露電線或導體',
        '供電系統是否裝有自動斷電設備',
        '所有電線是否裝在管內(含踏板)以避免短路'
      ],
      questionListID: [
        'hasCentralControl',
        'hasHighVoltage',
        'hasBareWires',
        'hasAutomaticPowerOff',
        'hasWireInTube'
      ]
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part4: {
          ...this.data.part4,
          [type]: e === this.data.part4[type] ? null : e
        }
      })
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
</style>