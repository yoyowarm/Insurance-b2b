<template>
  <div class="w-full my-4">
    <div class="w-full flex flex-row mt-4" :class="{'dashed-border mb-6': index === questionList.length-1}" v-for="(item,index) in questionList" :key="item">
      <div class="flex flex-row justify-between">
        <RadioInput :disabled="disable" text="是" :id="`${questionListID[index]}${index}`" :value="data.sheet2.part2[questionListID[index]] === true" @updateValue="updatePart2Value(true, questionListID[index])"/>
        <RadioInput :disabled="disable" class="mx-2" text="否" :id="`${questionListID[index]}${index}2`" :value="data.sheet2.part2[questionListID[index]] === false" @updateValue="updatePart2Value(false, questionListID[index])"/>
     </div>
      <div class="text-lg">{{item}}</div>
    </div>
    <FormTitle class="text-lg" title="(三)交通控管"/>
    <div class="w-full flex flex-row mt-4 dashed-border mb-6">
      <div class="flex flex-row justify-between">
        <RadioInput :disabled="disable" text="是" id="eeee" :value="data.sheet2.part3.hasSegmentWithInsurancePlaceAndLane === true" @updateValue="updatePart3Value(true, 'hasSegmentWithInsurancePlaceAndLane')"/>
        <RadioInput :disabled="disable" class="mx-2" text="否" id="por" :value="data.sheet2.part3.hasSegmentWithInsurancePlaceAndLane === false" @updateValue="updatePart3Value(false, 'hasSegmentWithInsurancePlaceAndLane')"/>
     </div>
      <div class="text-lg">保險處所與車道有無有效區隔(含車道與人員動線安排)</div>
    </div>
    <FormTitle class="text-lg" title="(四)安全防護"/>
      <div class="w-full flex flex-row mt-4 dashed-border mb-6">
        <div class=" flex flex-row justify-between">
          <RadioInput :disabled="disable" text="是" id="eeeee" :value="data.sheet2.part4.potentialOtherSafePlan === true" @updateValue="updatePart4Value(true, 'potentialOtherSafePlan')"/>
          <RadioInput :disabled="disable" class="mx-2" text="否" id="porr" :value="data.sheet2.part4.potentialOtherSafePlan === false" @updateValue="updatePart4Value(false, 'potentialOtherSafePlan')"/>
      </div>
        <div class="text-lg">請說明潛在風險的防護與消防措施，包含並不限於上述風險項目</div>
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
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      questionList: [
        '是否使用明火（瓦斯槍、火把）、爆炸性物質（如爆竹、煙火）或高溫物質（如高溫加熱固體/液體/氣體疏散指示）',
        '是否使用有機溶劑（如油漆類或其它高揮發性溶劑）',
        '是否有粉塵環境(如：粉狀物質)',
        '是否有化學反應物質（如化學品混合/調製）',
        '是否有動態設備（如擺動設施或上下裝置）或高速迴轉設施（如風扇或運轉機械．發電機）',
        '是否有產生壓力裝置（如氣體充填設施(充氣墊/氣球)）',
        '是否有懸掛物品（如飾品/電線/樹木）',
        '是否有輻射設備（如雷射裝置）',
        '是否有毒性食物（餐廳或小吃攤造成人員中毒）或有毒動、植物（造成人員觸摸中毒）',
        '是否有揮發性溶劑或粉塵（造成人員吸入性中毒或窒息）',
        '是否有酒精性飲料',
        '是否可能發生空氣或粉塵汙染環境（如產生惡臭或粉塵）',
        '是否可能汙染土壤或溝渠/河流/海洋環境（如未處理即排放）',
        '是否可能發生垃圾及廢棄物等環境汙染',
        '是否可能發生超過法定標準的噪音汙染(如：高分貝音量表演、設備或動物)'
      ],
      questionListID:[
          'hasUseOpenFire',//是否使用開火
          'hasOrganicSolvents',//是否有有機溶劑
          'hasDustEnviroment',//是否有粉塵環境
          'hasChemicalReaction',//是否有化學反應
          'hasDynamicDevice',//是否有動力設備
          'hasPressureDevice',//是否有壓力設備
          'hasSuspensionItem',//是否有懸掛物
          'hasRadiationDevice',//是否有放射設備
          'hasPoisonFood',//是否有毒品食物
          'hasVolatileSolventOrDust',//是否有溶劑或粉塵
          'hasLiquor',//是否有酒類
          'hasAirOrDustPollution',//是否有空氣或粉塵汙染
          'hasPoluutionSoil',//是否有污染土壤
          'hasTrashEnviromentPollution',//是否有垃圾污染環境
          'hasNoisePollution',//是否有噪音污染
      ]
    }
  },
  methods: {
    updatePart2Value(e,type) {
      this.$emit('update:data',{
        ...this.data,
        sheet2: {
          ...this.data.sheet2,
          part2: {
            ...this.data.sheet2.part2,
            [type]: e === this.data.sheet2.part2[type] ? null : e
          }
        }
      })
    },
    updatePart3Value(e,type) {
      this.$emit('update:data',{
        ...this.data,
        sheet2: {
          ...this.data.sheet2,
          part3: {
            ...this.data.sheet2.part3,
            [type]: e === this.data.sheet2.part3[type] ? null : e
          }
        }
      })
    },
    updatePart4Value(e,type) {
      this.$emit('update:data',{
        ...this.data,
        sheet2: {
          ...this.data.sheet2,
          part4: {
            ...this.data.sheet2.part4,
            [type]: e === this.data.sheet2.part4[type] ? null : e
          }
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