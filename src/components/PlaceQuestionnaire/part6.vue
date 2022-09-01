<template>
  <div class="w-full my-4">
    <div class="w-full my-4 dashed-border">
      <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
        <div class="w90 text-lg">{{item}}</div>
        <div class="w10 flex flex-row justify-between">
          <RadioInput text="是" :id="`${questionListID[index]}${index}`" :value="data.part6[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
          <RadioInput text="否" :id="`${questionListID[index]}${index}2`" :value="data.part6[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
      </div>
    </div>
  </div>
    <div class="flex flex-col mt-4 dashed-border">
      <InputGroup v-for="(list,index) in facilityList" :key="`${list}${index}`" :title="index=== 0 ? '如有下列設施，請勾選' : ''" :noMt="index !== 0" min border0 >
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
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Checkbox from '@/components/Checkbox'
import WindowResizeListener from '@/components/WindowResizeListener'
import RadioInput from '@/components/Radio'
export default {
  components: {
    InputGroup,
    Checkbox,
    WindowResizeListener,
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
        '是否有人員管制計畫',
        '是否有疏散標示',
      ],
      questionListID: [
        'hasExit',
        'hasEvacuationPlan',
        'hasPersonnelControl',
        'hasEvacuationSign',
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
    updateFacility(e,list) {
      let arr = []
      if(e && !this.data.part6.facility.includes(list)) {
        arr.push(list)
      }
      if(!e && this.data.part6.facility.includes(list)) {
        arr = [...this.data.part6.facility]
        const index = arr.findIndex(item => item === list)
        arr.splice(index,1)
      }
      this.$emit('update:data',{
        ...this.data,
        part6: {
          ...this.data.part6,
          facility: e ? [...this.data.part6.facility,...arr] : arr
        }
      })
    }
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