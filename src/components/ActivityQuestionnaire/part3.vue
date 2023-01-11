<template>
  <div class="w-full my-4 dashed-border">
    <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
      <span class="mr-2 text-lg">{{index+1}}.</span>
      <div class="flex flex-row justify-between">
        <RadioInput :disabled="disable" text="是" :id="`${questionListID[index]}${index}`" :value="data.sheet1.part3[questionListID[index]] === '是'" @updateValue="updateValue('是', questionListID[index])"/>
        <RadioInput :disabled="disable" class="mx-2" text="否" :id="`${questionListID[index]}${index}2`" :value="data.sheet1.part3[questionListID[index]] === '否'" @updateValue="updateValue('否', questionListID[index])"/>
        <RadioInput :disabled="disable" v-if="questionListID[index] == 'afterActivityHasAccessByTransportation'" class="mx-2" text="不適用" :id="`${questionListID[index]}${index}3`" :value="data.sheet1.part3.afterActivityHasAccessByTransportation === '不適用'" @updateValue="updateValue('不適用', 'afterActivityHasAccessByTransportation')"/>
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
        '使用道路者，對附近交通之衝擊是否經交通主管機關認許',
        '如未使用道路者，對附近交通之衝擊(如停車事宜、行人及活動結束後之散場動線)經交通主管機關認許',
      ],
      questionListID: [
        'useRoadHasAccessByTransportation',
        'afterActivityHasAccessByTransportation',
      ]
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        sheet1: {
          ...this.data.sheet1,
          part3: {
            ...this.data.sheet1.part3,
            [type]: e === this.data.sheet1.part3[type] ? null : e
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