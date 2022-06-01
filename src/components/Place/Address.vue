<template>
  <div class="w-full">
    <template v-for="(item,index) in lists">
      <FormTitle :title="`處所${index+1}`" :key="`title${index}`" class="mb-2"/>
      <div class="column-5 mb-6" :key="`body${index}`">
        <InputGroup dash noMt>
          <Select
            slot="input"
            defaultText="選擇縣市"/>
        </InputGroup>
        <InputGroup dash noMt>
          <Select
            slot="input"
            defaultText="選擇區域"/>
        </InputGroup>
        <InputGroup class="col-span-3" noMt>
          <Input
            slot="input"
            placeholder="輸入地址"
          />
        </InputGroup>
      </div>
    </template>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
export default {
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  components: {
    FormTitle,
    InputGroup,
    Input,
    Select
  }
}
</script>

<style scoped lang="scss">
</style>