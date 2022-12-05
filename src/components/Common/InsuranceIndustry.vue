<template>
  <div class="">
    <template v-for="(category,index) in industryType">
      <div
        v-if="(searchText.length === 0 || (searchText.length > 0 && categoryFilter(category,index).filter(item => item.displayItemName.includes(searchText)).length > 0)) && categoryFilter(category,index).length > 0"
        class="border-b-2 border-dashed mb-6"
        :key="category">
        <FormTitle :title="category" classList="text-xl text-gray-700" class="mb-6">
          <font-awesome-icon class="text-xl text-gray-700 mr-1" icon="briefcase" slot="left"/>
        </FormTitle>
          <div class="column-6 mb-8" :class="{'packUp': categoryFilter(category,index).length > 18}">
            <template v-for="list in (categoryFilter(category,index).length > 18 && !switchList[index] && searchText.length === 0) ? categoryFilter(category,index).slice(0, 18) : categoryFilter(category,index)">
              <RadioInput
                v-if="(searchText.length === 0 ||( searchText.length > 0 && list.displayItemName.includes(searchText)))"
                :key="list.dangerSeq"
                :class="{'col-span-2': list.displayItemName.length >= 10}"
                :id="`list${list.dangerSeq}`"
                :text="list.displayItemName"
                :value="selected.Text === list.itemName"
                @updateValue="(e) => updateIndustry(e, list)"
                :disabled="calculateModel"
              />
              <InputGroup v-if="list.dangerSeq == 106" class="ml-3 sm:w-64" noMt :disable="!selected.Text.includes('其他')" :key="`Industry${list.dangerSeq}`">
                <Input
                  slot="input"
                  placeholder="輸入行業名稱"
                  :value="industryText"
                  :disable="!selected.Text.includes('其他') || calculateModel"
                  @updateValue="(e) =>$store.dispatch(`${type}/updatedIndustryText`, e)"
                />
              </InputGroup>
            </template>
            <template v-if="searchText.length === 0 ||( searchText.length > 0 && categoryFilter(category,index).filter(item => item.displayItemName.includes(searchText)).length > 18)">
              <span class="more" v-if="categoryFilter(category,index).length > 18 && !switchList[index]" @click="() => switchBtn(index)" >更多<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-down']" /></span>
              <span class="more" v-if="categoryFilter(category,index).length > 18 && switchList[index]" @click="() => switchBtn(index)" >收起<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-up']" /></span>
            </template>
          </div>
      </div>
    </template>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
import RadioInput from '@/components/Radio'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    RadioInput,
    InputGroup,
    Input
  },
  props: {
    industryList: {
      type: Array,
      default: () => {}
    },
    industryType: {
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
  computed: {
    ...mapState({
      calculateModel: state => state.common.calculateModel,
    }),
  },
  methods: {
    switchBtn(index) {
      this.$set(this.switchList,index,!this.switchList[index])
    },
    updateIndustry(e, list) {
      if(!list.Text) {
        list.Text = list.displayItemName
        list.Value = list.dangerSeq
      }
      if(e) {
        this.$store.dispatch(`${this.type}/updatedIndustry`,list)
      }
    },
    categoryFilter(category) {
      return this.industryList.filter(item => item.typeName === category  && item.isEnable)
    },
  },
  mounted() {
    this.industryType.map((item,index) => {
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