<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup title="外牆建築材質">
        <Input slot="input" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup title="樓地板建築材質">
        <Input slot="input" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup title="屋頂建築材質">
        <Input slot="input" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup title="距鄰近建築物">
        <Input slot="input" placeholder="輸入距離"/>
      </InputGroup>
    </div>
    <div class="column-5 my-3">
      <InputGroup title="建築性質" border0 min>
        <RadioInput slot="input" text="獨棟" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="公寓" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="辦公大樓" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="綜合大樓" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="其他" :value="false"/>
      </InputGroup>
    </div>
     <div class="column-5 my-3">
      <InputGroup title="鄰近建築物性質" border0 min>
        <RadioInput slot="input" text="獨棟" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="公寓" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="辦公大樓" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="綜合大樓" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="其他" :value="false"/>
      </InputGroup>
    </div>
    <div class="column-5 my-3">
      <InputGroup title="公共安全檢查(經當地主管建築機關查核)" border0 min>
        <RadioInput slot="input" text="免公安檢查" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="合格" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="提具體改善計畫書" :value="false"/>
      </InputGroup>
      <InputGroup border0 min>
        <RadioInput slot="input" text="不合格" :value="false"/>
      </InputGroup>
    </div>
    <div class="column-5 mt-3">
      <InputGroup title="營業性質之數量">
        <Input slot="input" placeholder="輸入數量"/>
        <Checkbox
          id="selected"
          class="text-md absolute -left-10 bottom-4"
          slot="input-left"
        />
        <span slot="input-right" class="absolute -right-31 bottom-4">營業性質之數量</span>
      </InputGroup>
    </div>
    <div class="column-5 mb-3">
      <InputGroup noMt>
        <Input slot="input" placeholder="輸入數量"/>
        <Checkbox
          id="selected1"
          class="text-md absolute -left-10 bottom-4"
          slot="input-left"
        />
        <span slot="input-right" class="absolute -right-42 bottom-4">如係屬戲院、音樂廳者</span>
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="地上樓層數">
        <Input slot="input" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup title="地下樓層數" dash>
        <Input slot="input" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup title="使用樓層數">
        <Input slot="input" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup title="樓梯是否有止滑條">
        <SwitchInput slot="input"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3 dashed-border">
      <InputGroup title="是否有游泳池" dash>
        <SwitchInput slot="input"/>
      </InputGroup>
      <InputGroup title="救生員人數" disable>
        <Input slot="input" placeholder="輸入層數"/>
      </InputGroup>
      <InputGroup title="地板為何種材質">
        <Input slot="input" placeholder="輸入材質名稱"/>
      </InputGroup>
      <InputGroup title="是否鋪設地談">
        <SwitchInput slot="input"/>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import RadioInput from '@/components/Radio'
import Checkbox from '@/components/Checkbox'
import SwitchInput from '@/components/Switch'
export default {
  components: {
    InputGroup,
    Input,
    RadioInput,
    Checkbox,
    SwitchInput
  }
}
</script>

<style scoped lang="scss">
  
</style>