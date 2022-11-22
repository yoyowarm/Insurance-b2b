<template>
  <div class="w-full my-4 dashed-border">
    <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
      <div class=" flex flex-row justify-between">
        <RadioInput :disabled="disable" text="是" :id="`${questionListID[index]}${index}p`" :value="data.sheet1.part2[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
        <RadioInput :disabled="disable" class="mx-2" text="否" :id="`${questionListID[index]}${index}2p`" :value="data.sheet1.part2[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
    </div>
      <div class=" text-lg">{{item}}</div>
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
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      questionList: [
        '是否有使用明火(瓦斯槍、火把)、爆炸性物質(如：爆竹、煙火)或高溫物質(高溫加熱固體/液體/氣體)',
        '是否有揮發性溶劑或粉塵(造成人員吸入性中毒或窒息)',
        '是否有機械式或充氣式遊樂設備',
        '是否使用高壓電設施(600V以上)',
        '是否有裸露電線或導體',
        '供電系統是否裝有自動斷電設備',
        '所有電線是否裝在管內(含踏板)以避免短路'
      ],
      questionListID: [
        'hasUseOpenFire',
        'hasVolatileSolventOrDust',
        'hasMechineOrGasFilledDevice',
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
        sheet1: {
          ...this.data.sheet1,
          part2: {
            ...this.data.sheet1.part2,
            [type]: e === this.data.sheet1.part2[type] ? null : e
          }
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