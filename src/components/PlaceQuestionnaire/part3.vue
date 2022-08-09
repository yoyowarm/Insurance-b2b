<template>
  <div>
    <FormTitle lgTitle title="飯店、旅館、汽車旅館、招待所" class="my-3"/>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="內部設施是否全數自行經營" dash>
        <SwitchInput
          slot="input"
          id="selfOperated"
          :value="data.part3.selfOperated"
          @updateValue="(e) =>updateValue(e,'selfOperated')"
        />
      </InputGroup>
      <InputGroup lgTitle title="填寫非自行經營之項目" class="col-span-3" :disable="!data.part3.selfOperated">
        <Input
          slot="input"
          :value="data.part3.notSelfOperated"
          @updateValue="(e) =>updateValue(e,'notSelfOperated')"
          placeholder="輸入項目"
          :disable="!data.part3.selfOperated"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="是否有陽台" dash>
        <SwitchInput
          slot="input"
          id="hasBalcony"
          :value="data.part3.hasBalcony"
          @updateValue="(e) =>updateValue(e,'hasBalcony')"
        />
      </InputGroup>
      <InputGroup lgTitle title="人員可否進入陽台" >
        <SwitchInput
          slot="input"
          id="canAccessBalcony"
          :value="data.part3.canAccessBalcony"
          @updateValue="(e) =>updateValue(e,'canAccessBalcony')"
        />
      </InputGroup>
      <InputGroup lgTitle title="是否有地毯、窗簾，是否為防火材質" >
        <SwitchInput
          slot="input"
          id="hasFireproofMaterial"
          :value="data.part3.hasFireproofMaterial"
          @updateValue="(e) =>updateValue(e,'hasFireproofMaterial')"
        />
      </InputGroup>
      <InputGroup lgTitle title="是否有客房隔間，客房隔間是否為防火材質" >
        <SwitchInput
          slot="input"
          id="hasCompartmentFireproofMaterial"
          :value="data.part3.hasCompartmentFireproofMaterial"
          @updateValue="(e) =>updateValue(e,'hasCompartmentFireproofMaterial')"
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
    <FormTitle lgTitle title="商場、百貨公司、超級市場" class="my-3"/>
    <div class="column-5 my-3">
      <InputGroup lgTitle title="是否使用堆高機">
        <SwitchInput
          slot="input"
          id="hasPusher"
          :value="data.part3.hasPusher"
          @updateValue="(e) =>updateValue(e,'hasPusher')"
        />
      </InputGroup>
    </div>
    <FormTitle lgTitle title="戲院、電影院、歌廳、舞廳、夜總會、理容院、按摩場所、MTV、KTV、酒店" class="my-3"/>
    <div class="column-4 my-3">
      <InputGroup lgTitle title="是否有特殊表演項目，涉及用火或粉塵表演">
        <SwitchInput
          slot="input"
          id="hasFireOrDust"
          :value="data.part3.hasFireOrDust"
          @updateValue="(e) =>updateValue(e,'hasFireOrDust')"
        />
      </InputGroup>
      <InputGroup lgTitle title="表演者是否為專業人士" >
        <SwitchInput
          slot="input"
          id="isProfessional"
          :value="data.part3.isProfessional"
          @updateValue="(e) =>updateValue(e,'isProfessional')"
        />
      </InputGroup>
    </div>
    <FormTitle lgTitle title="營業處所" class="my-3"/>
    <div class="column-4 my-3 dashed-border">
      <InputGroup lgTitle title="使用、存放煙火爆竹或化學品等危險物品">
        <SwitchInput
          slot="input"
          id="hasDangerousItem"
          :value="data.part3.hasDangerousItem"
          @updateValue="(e) =>updateValue(e,'hasDangerousItem')"
        />
      </InputGroup>
      <InputGroup lgTitle title="使用鍋爐" >
        <SwitchInput
          slot="input"
          id="hasBoiler"
          :value="data.part3.hasBoiler"
          @updateValue="(e) =>updateValue(e,'hasBoiler')"
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