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
          <div class="column-6 mb-4 gap-important" :class="{'packUp': categoryFilter(category,index).length > 12}">
            <template v-for="(list,index) in (categoryFilter(category,index).length > 12 && !switchList[index] && searchText.length === 0) ? categoryFilter(category,index).slice(0, 12) : categoryFilter(category,index)">
              <RadioInput
                v-if="(searchText.length === 0 ||( searchText.length > 0 && list.displayItemName.includes(searchText)))"
                :key="list.dangerSeq"
                :class="{ 'font-semibold text-main': index < 4}"
                :id="`list${list.dangerSeq}`"
                :text="list.displayItemName"
                :value="selected.itemName === list.itemName"
                @updateValue="(e) => updateIndustry(e, list)"
                :disabled="calculateModel"
              />
              <InputGroup v-if="list.dangerSeq == 106 || list.dangerSeq == 354" class=" sm:w-64" :title="type == 'place'?'需填寫可判斷之行業種類，須填寫詢問表': '需填寫可判斷之活動行業種類，須填寫詢問表'" :disable="!selected.Text.includes('其他')" :key="`Industry${list.dangerSeq}`" :lgTitle="windowWidth > 600" :wrap="windowWidth < 967">
                <Input
                  slot="input"
                  :placeholder="type == 'place'?'輸入行業名稱': '輸入活動行業名稱'"
                  :value="industryText"
                  :disable="!selected.Text.includes('其他') || calculateModel"
                  @updateValue="(e) =>updatedIndustryText(e)"
                />
              </InputGroup>
            </template>
            <template v-if="searchText.length === 0 ||( searchText.length > 0 && categoryFilter(category,index).filter(item => item.displayItemName.includes(searchText)).length > 12)">
              <span class="more" v-if="categoryFilter(category,index).length > 12 && !switchList[index]" @click="() => switchBtn(index)" >更多<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-down']" /></span>
              <span class="more" v-if="categoryFilter(category,index).length > 12 && switchList[index]" @click="() => switchBtn(index)" >收起<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-up']" /></span>
            </template>
          </div>
      </div>
    </template>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
import RadioInput from '@/components/Radio'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import WindowResizeListener from '@/components/WindowResizeListener'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    RadioInput,
    InputGroup,
    Input,
    WindowResizeListener
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
    questionnaire: {
      type: Object,
      default: () => ({})
    },
    isRenewal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      switchList: []
    }
  },
  computed: {
    ...mapState({
      calculateModel: state => state.common.calculateModel,
    }),
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
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
        if(this.type == 'place') {
           this.$store.dispatch('place/updatedQuestionnaire', {...this.questionnaire,part1:{...this.questionnaire.part1, businessType: list.displayItemName}})
        }
        this.$emit('initTerm')
      }
    },
    updatedIndustryText(e) {
      this.$store.dispatch(`${this.type}/updatedIndustryText`, e)
      if(this.type == 'place') {
        this.$store.dispatch('place/updatedQuestionnaire', {...this.questionnaire,part1:{...this.questionnaire.part1, businessType: e}})
      }
    },
    categoryFilter(category) {
      if(this.isRenewal) {
         return this.industryList.filter(item => item.typeName === category  && item.isEnable).sort((a) => { return a.itemName == this.selected.itemName ? -1 : 1})
      } else {
        return this.industryList.filter(item => item.typeName === category  && item.isEnable)
      }
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
    @apply absolute z-0 text-main cursor-pointer bg-white z-10 text-center -bottom-13 flex justify-center items-center ;
  }
}
.gap-important {
  grid-gap: 0.75rem!important;
  gap: 0.75rem!important
}
</style>