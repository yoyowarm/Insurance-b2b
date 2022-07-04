<template>
  <div class="">
    <template v-for="(category,index) in categoryData">
      <div
        v-if="searchText.length === 0 || ( searchText.length > 0 && category.lists.filter(item => item.Text.includes(searchText)).length > 0)"
        class="border-b-2 border-dashed mb-6"
        :key="category.category">
        <FormTitle :title="category.category" classList="text-xl text-gray-700" class="mb-6">
          <font-awesome-icon class="text-xl text-gray-700 mr-1" icon="briefcase" slot="left"/>
        </FormTitle>
          <div class="column-6 mb-8" :class="{'packUp': category.lists.length > 18}">
            <template v-for="list in (category.lists.length > 18 && !switchList[index] && searchText.length === 0) ? category.lists.slice(0, 18) : category.lists">
              <RadioInput
                v-if="searchText.length === 0 ||( searchText.length > 0 && list.Text.includes(searchText))"
                :key="list.Value"
                :class="{'col-span-2': list.Text.length >= 9}"
                :id="`${list.Value}`"
                :text="list.Text"
                :value="selected.Text === list.Text"
                @updateValue="(e) => updateIndustry(e, list)"
              />
            </template>
            <template v-if="searchText.length === 0 ||( searchText.length > 0 && category.lists.filter(item => item.Text.includes(searchText)).length > 18)">
              <span class="more" v-if="category.lists.length > 18 && !switchList[index]" @click="() => switchBtn(index)" >更多<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-down']" /></span>
              <span class="more" v-if="category.lists.length > 18 && switchList[index]" @click="() => switchBtn(index)" >收起<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-up']" /></span>
            </template>
          </div>
      </div>
    </template>
    <div class="column-6">
      <div class="col-span-2 flex flex-row">
        <RadioInput
          id="other"
          text="其他"
          :value="selected.Text === '其他'"
          @updateValue="(e) => updateIndustry(e, {Text: '其他',Value: 'id',})"
        />
        <InputGroup class="ml-3 w-64" noMt :disable="selected.Text !== '其他'">
          <Input
            slot="input"
            placeholder="輸入行業名稱"
            :value="industryText"
            :disable="selected.Text !== '其他'"
            @updateValue="(e) =>$store.dispatch(`${type}/updatedIndustryText`, e)"
          />
        </InputGroup>
      </div>
    </div>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
import RadioInput from '@/components/Radio'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
export default {
  components: {
    FormTitle,
    RadioInput,
    InputGroup,
    Input
  },
  props: {
    categoryData: {
      type: Array,
      default: () => {}
    },
    searchText: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    selected: {
      type: Object,
      default: () => ({
      Text: '選擇行業',
      Value: '',
    })
    },
    industryText: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      switchList: []
    }
  },
  methods: {
    switchBtn(index) {
      this.$set(this.switchList,index,!this.switchList[index])
    },
    updateIndustry(e, list) {
      if(e) {
        this.$store.dispatch(`${this.type}/updatedIndustry`,list)
      }
    }
  },
  mounted() {
    this.categoryData.map((item,index) => {
      this.$set(this.switchList,index,false)
    })
  }
}
</script>

<style scoped lang="scss">
.packUp {
  @apply relative;
  .more {
    width: 90px;
    height: 40px;
    margin: 0px auto;
    left: 0px;
    right: 0px;
    @apply absolute text-main cursor-pointer bg-white z-10 text-center -bottom-13 flex justify-center items-center ;
  }
}
</style>