<template>
  <div class="w-full">
    <template v-for="(item,index) in lists">
      <FormTitle :title="`處所${index+1}`" :key="`title${index}`" class="mb-2 relative">
        <div slot="left" class="absolute left-12">
          <Checkbox
          :id="`title${index}`"
          text="同要保人通訊地址"
          :value="sameAs[index]"
          @updateValue="(e) =>copyAddress(e,index)"
          />
        </div>
      </FormTitle>
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
import Checkbox from '@/components/Checkbox'
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
    Insuraned: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      sameAs: []
    }
  },
  components: {
    FormTitle,
    InputGroup,
    Input,
    Select,
    Checkbox
  },
  methods: {
    updateInfo(type, item,index) {
      const newLists = [...this.lists]
      newLists[index][type] = item
      this.$emit('update:lists', newLists)
    },
    copyAddress(e,index) {
      const newLists = [...this.lists]
      const Insuraned = JSON.parse(JSON.stringify(this.Insuraned))
      this.sameAs[index] = e
      if(newLists[index].city.Value !== Insuraned.City.Value) return
      newLists[index].area = Insuraned.Area 
      newLists[index].subAddress = Insuraned.subAddress
      this.$emit('update:lists', newLists)
    },
  }
}
</script>

<style scoped lang="scss">
</style>