<template>
  <div>
    <FormTitle title="飯店、旅館、汽車旅館、招待所" class="my-3 text-lg"/>
    <div class="w-full my-4">
      <div class="w-full flex flex-row mt-4">
        <div class=" flex flex-row justify-between">
          <RadioInput text="是" id="selfOperated" :value="data.part3.selfOperated === true" @updateValue="updateValue(true, 'selfOperated')"/>
          <RadioInput class="mx-2" text="否" id="selfOperated2" :value="data.part3.selfOperated === false" @updateValue="updateValue(false, 'selfOperated')"/>
      </div>
        <div class="text-lg">內部設施是否全數自行經營</div>
    </div>
  </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="填寫非自行經營之項目" class="col-span-3" :disable="data.part3.selfOperated === true">
        <Input
          slot="input"
          :value="data.part3.notSelfOperated"
          @updateValue="(e) =>updateValue(e,'notSelfOperated')"
          placeholder="輸入項目"
          :disable="data.part3.selfOperated === true"
        />
      </InputGroup>
    </div>
    <div class="w-full flex flex-row mt-4" v-for="(item,index) in questionList" :key="item">
      <div class="flex flex-row justify-between">
        <RadioInput text="是" :id="`${questionListID[index]}${index}`" :value="data.part3[questionListID[index]] === true" @updateValue="updateValue(true, questionListID[index])"/>
        <RadioInput class="mx-2" text="否" :id="`${questionListID[index]}${index}2`" :value="data.part3[questionListID[index]] === false" @updateValue="updateValue(false, questionListID[index])"/>
    </div>
      <div class="text-lg">{{item}}</div>
    </div>
    <!-- <div class="flex flex-col my-3">
      <FormTitle lgTitle title="如有下列設施，請勾選" class="my-3 text-lg"/>
      <Checkbox
        v-for="(list,index) in facilityList" :key="`${list}${index}`"
        class="text-lg mb-2"
        :id="list"
        :text="list"
        :checked="data.part3.facility.includes(list)"
        :value="data.part3.facility.includes(list)"
        slot="input"
        @updateValue="(e) =>updateFacility(e,list)"
      />
    </div> -->
    <FormTitle lgTitle title="商場、百貨公司、超級市場" class="my-3 text-lg"/>
    <div class="w-full flex flex-row mt-4">
      <div class="flex flex-row justify-between">
        <RadioInput text="是" id="hasPusher" :value="data.part3.hasPusher === true" @updateValue="updateValue(true, 'hasPusher')"/>
        <RadioInput class="mx-2" text="否" id="hasPusher2" :value="data.part3.hasPusher === false" @updateValue="updateValue(false, 'hasPusher')"/>
      </div>
      <div class="text-lg">使用堆高機</div>
    </div>
    <FormTitle lgTitle title="戲院、電影院、歌廳、舞廳、夜總會、理容院、按摩場所、MTV、KTV、酒店" class="my-3 text-lg"/>
    <div class="w-full flex flex-row mt-4">
        <div class=" flex flex-row justify-between">
          <RadioInput text="是" id="hasFireOrDust" :value="data.part3.hasFireOrDust === true" @updateValue="updateValue(true, 'hasFireOrDust')"/>
          <RadioInput class="mx-2" text="否" id="hasFireOrDust2" :value="data.part3.hasFireOrDust === false" @updateValue="updateValue(false, 'hasFireOrDust')"/>
      </div>
      <div class="text-lg">是否有特殊表演項目，涉及用火或粉塵表演</div>
    </div>
    <div class="w-full flex flex-row mt-4">
        <div class=" flex flex-row justify-between">
          <RadioInput text="是" id="isProfessional" :value="data.part3.isProfessional === true" @updateValue="updateValue(true, 'isProfessional')"/>
          <RadioInput class="mx-2" text="否" id="isProfessional2" :value="data.part3.isProfessional === false" @updateValue="updateValue(false, 'isProfessional')"/>
      </div>
      <div class="text-lg">表演者為專業或業餘</div>
    </div>
    <div class="w-full flex flex-row mt-4">
        <div class="flex flex-row justify-between">
          <RadioInput text="是" id="hasDangerousItem" :value="data.part3.hasDangerousItem === true" @updateValue="updateValue(true, 'hasDangerousItem')"/>
          <RadioInput class="mx-2" text="否" id="hasDangerousItem2" :value="data.part3.hasDangerousItem === false" @updateValue="updateValue(false, 'hasDangerousItem')"/>
      </div>
      <div class="text-lg">使用、存放煙火爆竹或化學品等危險物品</div>
    </div>
    <div class="w-full flex flex-row mt-4 dashed-border">
        <div class="flex flex-row justify-between">
          <RadioInput text="是" id="hasBoiler" :value="data.part3.hasBoiler === true" @updateValue="updateValue(true, 'hasBoiler')"/>
          <RadioInput class="mx-2" text="否" id="hasBoiler2" :value="data.part3.hasBoiler === false" @updateValue="updateValue(false, 'hasBoiler')"/>
      </div>
      <div class="text-lg">營業處所是否使用鍋爐?</div>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle.vue'
import Input from '@/components/InputGroup/Input'
// import Checkbox from '@/components/Checkbox'
import RadioInput from '@/components/Radio'
export default {
  components: {
    InputGroup,
    FormTitle,
    Input,
    // Checkbox,
    RadioInput
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    },
    marginTop: {
      type: Function,
      default: () => {}
    },
  },
  data() {
    return {
      facilityList: [
        '游泳池',
        '健身房',
        '沙灘',
        '兒童遊樂場',
        '餐廳',
      ],
      questionList: [
        '是否有陽台',
        '人員可否進入陽台',
        '是否有地毯、窗簾，是否為防火材質',
        '是否有客房隔間，客房隔間是否為防火材質',
        '是否有游泳池',
        '是否有健身房',
        '是否有沙灘',
        '是否有兒童遊樂場',
        '是否有餐廳'

      ],
      questionListID: [
        'hasBalcony',
        'canAccessBalcony',
        'hasFireproofMaterial',
        'hasCompartmentFireproofMaterial',
        'hasSwimmingPoll',
        'hasGym',
        'hasBeach',
        'hasPlayground',
        'hasRestaurant'
      ]
    }
  },
  methods: {
    updateValue(e,type) {
      const arr = [
        'hasBalcony',
        'canAccessBalcony',
        'hasFireproofMaterial',
        'hasCompartmentFireproofMaterial',
        'hasPusher',
        'hasFireOrDust',
        'isProfessional',
        'hasDangerousItem',
        'hasBoiler'
      ]
      if(e && type == 'selfOperated') {
        this.$emit('update:data',{
          ...this.data,
          part3: {
            ...this.data.part3,
            [type]: arr.includes(type) && e === this.data.part3[type] ? null : e,
            notSelfOperated: ''
          }
        })
      } else {
        this.$emit('update:data',{
          ...this.data,
          part3: {
            ...this.data.part3,
            [type]: arr.includes(type) && e === this.data.part3[type] ? null : e
          }
        })
      }
    },
    // updateFacility(e,list) {
    //   let arr = []
    //   if(e && !this.data.part3.facility.includes(list)) {
    //     arr.push(list)
    //   }
    //   if(!e && this.data.part3.facility.includes(list)) {
    //     arr = [...this.data.part3.facility]
    //     const index = arr.findIndex(item => item === list)
    //     arr.splice(index,1)
    //   }
    //   this.$emit('update:data',{
    //     ...this.data,
    //     part3: {
    //       ...this.data.part3,
    //       facility: e ? [...this.data.part3.facility,...arr] : arr
    //     }
    //   })
    // }
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