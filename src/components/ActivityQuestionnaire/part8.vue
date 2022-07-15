<template>
  <div class="w-full my-4 dashed-border">
    <FormTitle title="(一)場地選定"/>
    <div class="w-full flex flex-col sm:flex-row mt-4" v-for="(item,index) in questionList" :key="item">
      <div class="w90">{{item}}</div>
      <div class="w10 flex flex-row justify-between">
        <RadioInput text="是" :id="`${item}${index}1`"/>
        <RadioInput text="否" :id="`${item}${index}2`"/>
     </div>
    </div>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
import RadioInput from '@/components/Radio'
export default {
  components: {
    FormTitle,
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
        '地面是否平整(如：不平均高低地面)',
        '地面是否濕滑(如：廁所濕滑或低摩擦係數地面)',
        '是否高價處所(如：臨時搭設舞台/表演台)',
        '臨時或永久設施是否依法規設計、施工、簽證並定期檢查',
        '設施是否故障(如：圍籬不足或失效)',
        '是否為通風不足空間(如：地下室、過小的區域)'
      ]
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part8: {
          ...this.data.part8,
          [type]: e
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
</style>