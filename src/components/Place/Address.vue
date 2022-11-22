<template>
  <div class="w-full">
    <template v-for="(item,index) in lists">
      <FormTitle :title="`處所${index+1}`" :key="`title${index}`" class="mb-2"/>
      <div class="column-5 mb-6" :key="`body${index}`">
        <InputGroup dash noMt disable>
          <Select
            slot="input"
            :options="cityList"
            :selected="item.city.Value"
            disable
            @emitItem="(item) => updateInfo('city', item, index)"
            defaultText="選擇縣市"/>
        </InputGroup>
        <InputGroup dash noMt :disable="disable">
          <Select
            slot="input"
            :options="areaList.filter(u => u.cityId == item.city.Value)"
            :selected="item.area.Value"
            :disable="disable"
            @emitItem="(item) => updateInfo('area', item, index)"
            defaultText="選擇區域"/>
        </InputGroup>
        <InputGroup class="col-span-3" noMt :disable="disable">
          <Input
            slot="input"
            class="w-full"
            placeholder="輸入地址"
            :value="item.subAddress"
            :disable="disable"
            @updateValue="(e) => updateInfo('subAddress', e, index)"/>
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
    },
    cityList: {
      type: Array,
      default: () => []
    },
    areaList: {
      type: Array,
      default: () => []
    },
    disable: {
      type: Boolean,
      default: false
    },
  },
  components: {
    FormTitle,
    InputGroup,
    Input,
    Select
  },
  methods: {
    updateInfo(type, item,index) {
      const newLists = [...this.lists]
      newLists[index][type] = item
      this.$emit('update:lists', newLists)
    }
  }
}
</script>

<style scoped lang="scss">
</style>