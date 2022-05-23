<template>
  <div class="w-full">
    <template v-for="(info,index) in infoList">
      <FormTitle :key="index" :title="`處所${index+1}`" classList="text-xl text-gray-700 my-3" />
      <div :key="index" class="column-5 dashed-border relative">
        <InputGroup title="持有狀態">
          <SwitchInput
            checkedText="自有"
            uncheckedText="承租"
            slot="input"
            id="IsHold"
          />
        </InputGroup>
        <InputGroup title="處所坪數">
          <Input slot="input" placeholder="輸入坪數"/>
        </InputGroup>
        <InputGroup title="經營業務處所">
          <Select slot="input" defaultText="選擇縣市"/>
        </InputGroup>
        <div v-if="index !== 0" class="flex items-end pb-4" @click="$emit('removeItem',index)">
          <font-awesome-icon icon="times-circle" class="text-2xl text-main" />
        </div>
      </div>
    </template>
    <div class="flex justify-center mt-6">
      <Button @click.native="$emit('addItem')" outline>新增處所資料</Button>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import SwitchInput from '@/components/Switch'
import Select from '@/components/Select'
import FormTitle from '@/components/FormTitle'
import Button from '@/components/Button/index.vue'
export default {
  components: {
    InputGroup,
    Input,
    SwitchInput,
    Select,
    FormTitle,
    Button
  },
  props: {
    infoList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>