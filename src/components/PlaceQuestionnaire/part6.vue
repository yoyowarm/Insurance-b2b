<template>
  <div class="w-full my-4">
    <div class="w-full ">
      <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
        <span v-if="index <= 4" class="mr-2 text-lg">{{index+1}}.</span>
        <div class="flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" :id="`${questionListID[index]}${index}222`" :value="data.part6[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" :id="`${questionListID[index]}${index}22`" :value="data.part6[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
      </div>
        <div class=" text-lg">{{item}}</div>
    </div>
  </div>
  <div class="w-full my-4 mt-2 dashed-border">
    <div class=" text-lg">5. 是否有下列設備：</div>
    <div class="w-full flex flex-row pl-6" :class="{'mt-2':index == 0, 'mt-4': index !==0}" v-for="(item,index) in questionList2" :key="item">
        <div class="flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" :id="`${questionListID2[index]}${index}222`" :value="data.part6[questionListID2[index]] === true" @updateValue="updateValue(true, questionListID2[index])"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" :id="`${questionListID2[index]}${index}22`" :value="data.part6[questionListID2[index]] === false" @updateValue="updateValue(false, questionListID2[index])"/>
      </div>
        <div class=" text-lg">{{item}}</div>
    </div>
  </div>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import WindowResizeListener from '@/components/WindowResizeListener'
import RadioInput from '@/components/Radio'
export default {
  components: {
    WindowResizeListener,
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
      windowWidth: window.innerWidth,
      facilityList: [
        '緊急照明',
        '緊急廣播',
        '安全門',
        '安全逃生通道',
        '排煙通道',
        '緊急電源'
      ],
      questionList: [
        '是否有出口規劃',
        '是否有疏散計畫(包含疏散路線、疏散指示、安全距離及避難場所)',
        '是否有疏散標示',
        '是否有人員管制計畫',
      ],
      questionList2: [
        '是否有緊急照明',
        '是否有緊急廣播',
        '是否有安全門',
        '是否有安全逃生通道',
        '是否有排煙設備',
        '是否有緊急電源'
      ],
      questionListID2: [
        'hasUrgentLight',
        'hasUrgentBroadcast',
        'hasSafetyDoor',
        'hasEscapeTrunk',
        'hasSmokeExhaust',
        'hasUrgentPower'
      ],
      questionListID: [
        'hasExit',
        'hasEvacuationPlan',
        'hasEvacuationSign',
        'hasPersonnelControl',
      ]
    }
  },
  methods: {
    marginTop (width = 1180) {
      return this.windowWidth <= width
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    updateValue(e,type) {
      const arr = [
        'hasExit',
        'hasEvacuationPlan',
        'hasPersonnelControl',
        'hasEvacuationSign',
      ]
      this.$emit('update:data',{
        ...this.data,
        part6: {
          ...this.data.part6,
          [type]: arr.includes(type) && e === this.data.part6[type] ? null : e
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