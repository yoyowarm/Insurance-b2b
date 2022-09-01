<template>
  <div class="w-full my-4 dashed-border">
      <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
        <div class="w90 text-lg">{{item}}</div>
        <div class="w10 flex flex-row justify-between">
          <RadioInput text="是" :id="`${questionListID[index]}${index}`" :value="data.sheet1.part6[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
          <RadioInput text="否" :id="`${questionListID[index]}${index}2`" :value="data.sheet1.part6[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
      </div>
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
        '是否設置醫療站並配置醫護人員',
        '是否有應變計劃（包含應變人員編組和指定職責，如關鍵設備留守操作人員、警戒人員、醫療救護編組、消防編組等）',
        '是否有防護或緊急救護設備',
        '是否有災害防護計畫',
      ],
      questionListID: [
        'hasMedicalSiteAndPersons',
        'hasEmergencyManagementPlan',
        'hasProtectDevice',
        'hasDisasterProtectPlan',
      ]
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        sheet1: {
          ...this.data.sheet1,
          part6: {
            ...this.data.sheet1.part6,
            [type]: e === this.data.sheet1.part4[type] ? null : e
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