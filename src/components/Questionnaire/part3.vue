<template>
  <div>
    <FormTitle title="飯店、旅館、汽車旅館、招待所" class="my-3"/>
    <div class="column-4 my-3">
      <InputGroup title="內部設施是否全數自行經營" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="填寫非自行經營之項目" class="col-span-3">
        <Input slot="input" placeholder="輸入項目"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有陽台" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="人員可否進入陽台" >
        <SwitchInput slot="input" />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有地毯、窗簾" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="地毯、窗簾是否為防火材質" >
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="是否有客房隔間" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="客房隔間是否為防火材質" >
        <SwitchInput slot="input" />
      </InputGroup>
    </div>
    <div class="column-5 my-3">
      <InputGroup title="如有下列設施，請勾選" border0>
        <Checkbox
          id="游泳池"
          class="text-md"
          text="游泳池"
          slot="input"
        />
      </InputGroup>
      <InputGroup border0>
        <Checkbox
          id="健身房"
          class="text-md"
          text="健身房"
          slot="input"
        />
      </InputGroup>
      <InputGroup border0>
        <Checkbox
          id="沙灘"
          class="text-md"
          text="沙灘"
          slot="input"
        />
      </InputGroup>
      <InputGroup border0>
        <Checkbox
          id="兒童遊樂場"
          class="text-md"
          text="兒童遊樂場"
          slot="input"
        />
      </InputGroup>
      <InputGroup border0>
        <Checkbox
          id="餐廳"
          class="text-md"
          text="餐廳"
          slot="input"
        />
      </InputGroup>
    </div>
    <FormTitle title="商場、百貨公司、超級市場" class="my-3"/>
    <div class="column-5 my-3">
      <InputGroup title="是否使用推高機">
        <SwitchInput slot="input" />
      </InputGroup>
    </div>
    <FormTitle title="戲院、電影院、歌廳、舞廳、夜總會、理容院、按摩場所、MTV、KTV、酒店" class="my-3"/>
    <div class="column-4 my-3">
      <InputGroup title="是否有特殊表演項目" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="涉及用火或粉塵表演" dash>
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="表演者是否為專業人士" >
        <SwitchInput slot="input" />
      </InputGroup>
    </div>
    <FormTitle title="營業處所" class="my-3"/>
    <div class="column-4 my-3 dashed-border">
      <InputGroup title="使用、存放煙火爆竹或化學品等危險物品">
        <SwitchInput slot="input" />
      </InputGroup>
      <InputGroup title="使用鍋爐" >
        <SwitchInput slot="input" />
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
  }
}
</script>

<style scoped lang="scss">
  
</style>