<template>
  <div class="w-full my-4 dashed-border">
      <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
        <span class="mr-2 text-lg">{{index+1}}.</span>
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" :id="`${questionListID[index]}${index}222`" :value="data.part5[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" :id="`${questionListID[index]}${index}22`" :value="data.part5[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
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
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      questionList: [
        '使用道路者，對附近交通之衝擊是否經交通主管機關認許',
        '未使用道路者，對附近交通之衝擊、停車事宜、行人及活動結束後之散場動線是否經交通主管機關認許',
        '保險處所與車道有無有效區隔(含車道與人員動線安排)',
      ],
      questionListID: [
        'useRoadHasAccessByTransportation',
        'afterActivityHasAccessByTransportation',
        'hasSegmentWithInsurancePlaceAndLane',
      ]
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part5: {
          ...this.data.part5,
          [type]: e === this.data.part5[type] ? null : e
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