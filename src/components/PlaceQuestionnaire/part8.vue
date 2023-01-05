<template>
  <div class="w-full my-4 dashed-border">
      <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" :id="`${questionListID[index]}${index}111`" :value="data.part8[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" :id="`${questionListID[index]}${index}21`" :value="data.part8[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
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
        '是否設置醫療站並配置醫護人員',
        '是否有緊急應變計劃（包含應變人員編組和指定職責，如關鍵設備留守操作人員、警戒人員、醫療救護編組、消防編組等）',
        '是否有防護或緊急設備',
      ],
      questionListID: [
        'hasMedicalSiteAndPersons',
        'hasEmergencyManagementPlan',
        'hasProtectDevice',
      ]
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part8: {
          ...this.data.part8,
          [type]: e === this.data.part8[type] ? null : e
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