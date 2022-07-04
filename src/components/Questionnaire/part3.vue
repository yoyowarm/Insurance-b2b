<template>
  <div>
    <FormTitle title="飯店、旅館、汽車旅館、招待所" class="my-3"/>
    <div class="column-4 my-3">
      <InputGroup title="內部設施是否全數自行經營" dash>
        <SwitchInput
          slot="input"
          id="selfOperated"
          :value="data.part3.selfOperated"
          @updateValue="(e) =>updateValue(e,'selfOperated')"
        />
      </InputGroup>
      <InputGroup title="填寫非自行經營之項目" class="col-span-3" :disable="!data.part3.selfOperated">
        <Input
          slot="input"
          :value="data.part3.NotSelfOperated"
          @updateValue="(e) =>updateValue(e,'NotSelfOperated')"
          placeholder="輸入項目"
          :disable="!data.part3.selfOperated"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有陽台" dash>
        <SwitchInput
          slot="input"
          id="balcony"
          :value="data.part3.balcony"
          @updateValue="(e) =>updateValue(e,'balcony')"
        />
      </InputGroup>
      <InputGroup title="人員可否進入陽台" >
        <SwitchInput
          slot="input"
          id="accessBalcony"
          :value="data.part3.accessBalcony"
          @updateValue="(e) =>updateValue(e,'accessBalcony')"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有地毯、窗簾" dash>
        <SwitchInput
          slot="input"
          id="carpetsCurtains"
          :value="data.part3.carpetsCurtains"
          @updateValue="(e) =>updateValue(e,'carpetsCurtains')"
        />
      </InputGroup>
      <InputGroup title="地毯、窗簾是否為防火材質" >
        <SwitchInput
          slot="input"
          id="fireproofMaterial"
          :value="data.part3.fireproofMaterial"
          @updateValue="(e) =>updateValue(e,'fireproofMaterial')"
        />
      </InputGroup>
      <InputGroup title="是否有客房隔間" dash>
        <SwitchInput
          slot="input"
          id="compartment"
          :value="data.part3.compartment"
          @updateValue="(e) =>updateValue(e,'compartment')"
        />
      </InputGroup>
      <InputGroup title="客房隔間是否為防火材質" >
        <SwitchInput
          slot="input"
          id="compartmentFireproofMaterial"
          :value="data.part3.compartmentFireproofMaterial"
          @updateValue="(e) =>updateValue(e,'compartmentFireproofMaterial')"
        />
      </InputGroup>
    </div>
    <div class="column-5 my-3">
      <InputGroup v-for="(list,index) in facilityList" :key="`${list}${index}`" :title="index=== 0 ? '如有下列設施，請勾選' : ''" border0 >
        <Checkbox
          class="text-md"
          :id="list"
          :text="list"
          :checked="data.part3.facility.includes(list)"
          :value="data.part3.facility.includes(list)"
          slot="input"
          @updateValue="(e) =>updateFacility(e,list)"
        />
      </InputGroup>
    </div>
    <FormTitle title="商場、百貨公司、超級市場" class="my-3"/>
    <div class="column-5 my-3">
      <InputGroup title="是否使用推高機">
        <SwitchInput
          slot="input"
          id="pusher"
          :value="data.part3.pusher"
          @updateValue="(e) =>updateValue(e,'pusher')"
        />
      </InputGroup>
    </div>
    <FormTitle title="戲院、電影院、歌廳、舞廳、夜總會、理容院、按摩場所、MTV、KTV、酒店" class="my-3"/>
    <div class="column-4 my-3">
      <InputGroup title="是否有特殊表演項目" dash>
        <SwitchInput
          slot="input"
          id="performance"
          :value="data.part3.performance"
          @updateValue="(e) =>updateValue(e,'performance')"
        />
      </InputGroup>
      <InputGroup title="涉及用火或粉塵表演" dash>
        <SwitchInput
          slot="input"
          id="fireOrDust"
          :value="data.part3.fireOrDust"
          @updateValue="(e) =>updateValue(e,'fireOrDust')"
        />
      </InputGroup>
      <InputGroup title="表演者是否為專業人士" >
        <SwitchInput
          slot="input"
          id="professional"
          :value="data.part3.professional"
          @updateValue="(e) =>updateValue(e,'professional')"
        />
      </InputGroup>
    </div>
    <FormTitle title="營業處所" class="my-3"/>
    <div class="column-4 my-3 dashed-border">
      <InputGroup title="使用、存放煙火爆竹或化學品等危險物品">
        <SwitchInput
          slot="input"
          id="dangerousItem"
          :value="data.part3.dangerousItem"
          @updateValue="(e) =>updateValue(e,'dangerousItem')"
        />
      </InputGroup>
      <InputGroup title="使用鍋爐" >
        <SwitchInput
          slot="input"
          id="boiler"
          :value="data.part3.boiler"
          @updateValue="(e) =>updateValue(e,'boiler')"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle.vue'
import SwitchInput from '@/components/Switch'
import Input from '@/components/InputGroup/Input'
import Checkbox from '@/components/Checkbox'
export default {
  components: {
    InputGroup,
    FormTitle,
    SwitchInput,
    Input,
    Checkbox
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
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
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part3: {
          ...this.data.part3,
          [type]: e
        }
      })
    },
    updateFacility(e,list) {
      let arr = []
      if(e && !this.data.part3.facility.includes(list)) {
        arr.push(list)
      }
      if(!e && this.data.part3.facility.includes(list)) {
        arr = [...this.data.part3.facility]
        const index = arr.findIndex(item => item === list)
        arr.splice(index,1)
      }
      this.$emit('update:data',{
        ...this.data,
        part3: {
          ...this.data.part3,
          facility: e ? [...this.data.part3.facility,...arr] : arr
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>