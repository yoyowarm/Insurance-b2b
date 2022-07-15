<template>
  <div class="w-full my-4  dashed-border">
    <div class="w-full flex flex-row mt-4" :class="{'dashed-border mb-6': index === questionList.length-1}" v-for="(item,index) in questionList" :key="item">
      <div class="w90">{{item}}</div>
      <div class="w10 flex flex-row justify-between">
        <RadioInput text="是" :id="`${item}${index}1`"/>
        <RadioInput text="否" :id="`${item}${index}2`"/>
     </div>
    </div>
    <FormTitle title="(三)交通控管"/>
    <div class="w-full flex flex-row mt-4 dashed-border mb-6">
      <div class="w90">保險處所與車道有無有效區隔(含車道與人員動線安排)</div>
      <div class="w10 flex flex-row justify-between">
        <RadioInput text="是" id="ffvrr"/>
        <RadioInput text="否" id="por"/>
     </div>
    </div>
    <FormTitle title="(四)安全防護"/>
    <div class="column-4 my-4">
      <InputGroup class="col-span-4" title="請說明潛在風險的防護與消防措施，包含並不限於上述風險項目">
        <Input
          slot="input"
          placeholder="輸入內容"
        />
      </InputGroup>
    </div>
    
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import FormTitle from '@/components/FormTitle'
import RadioInput from '@/components/Radio'
export default {
  components: {
    InputGroup,
    Input,
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
        '是否有使用明火(瓦斯槍、火把)、爆炸性物質(如：爆竹、煙火)或高溫物質(高溫加熱固體/液體/氣體疏散指示)',
        '是否使用有機溶劑(如：油漆類或其他高揮發性溶劑)',
        '是否有粉塵環境(如：粉狀物質)',
        '是否有化學反應物質(如：化學品混和/調製)',
        '是否有動態設備(如：擺動設施或上下裝置)或高速迴轉設施(如：風扇或運轉機械，發電機)',
        '是否有產生壓力裝置(如：氣體充填設施-充氣墊/氣球)',
        '是否有懸掛物品(如：飾品/樹木/電線)',
        '是否有輻射設備(如：雷射裝置)',
        '是否有毒性食物(餐廳或小吃攤造成人員中毒)或有毒動、植物(造成人員觸摸中毒)',
        '是否有揮發性溶劑或粉塵(造成人員吸入性中毒或窒息)',
        '是否有酒精性飲料',
        '是否可能發生空氣或粉塵汙染環境(如：產生惡臭或粉塵)',
        '是否可能汙染土壤或溝渠/河流/海洋環境(如：未處理即排放)',
        '是否可能發生垃圾及廢棄物等環境汙染',
        '是否可能發生超過法定標準的噪音汙染(如：高分貝音量表演、設備或動物)'
      ]
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part9: {
          ...this.data.part9,
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