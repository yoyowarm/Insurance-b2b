<template>
  <div>
    <div class="column-6">
      <!-- <InputGroup class=" w-full mb-2.5" title="是否續保" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="是"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          是
        </div>
      </InputGroup>
      <InputGroup class=" w-full mb-2.5" title="保單編號" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="123456789"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          123456789
        </div>
      </InputGroup> -->
      <div class="flex flex-row col-span-2">
        <InputGroup class="w-full pr-1" title="保險開始時間" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="111年"/>
          <div v-else slot="input">
            {{info.insuranceBegin.split('T')[0].split('-')[0]}}年
          </div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="04月"/>
          <div v-else slot="input">
            {{info.insuranceBegin.split('T')[0].split('-')[1]}}月
          </div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="15日"/>
          <div v-else slot="input">
            {{info.insuranceBegin.split('T')[0].split('-')[2]}}日
          </div>
        </InputGroup>
        <InputGroup class="w-full" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="12時"/>
          <div v-else slot="input">
            {{info.insuranceBegin.split('T')[1].split(':')[0]}}時
          </div>
        </InputGroup>
      </div>
      <div class="flex flex-row col-span-2">
        <InputGroup class="w-full pr-1" title="保險開始時間" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="111年"/>
          <div v-else slot="input">
            {{info.insuranceEnd.split('T')[0].split('-')[0]}}年
          </div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="04月"/>
          <div v-else slot="input">
            {{info.insuranceEnd.split('T')[0].split('-')[1]}}月
          </div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="15日"/>
          <div v-else slot="input">
            {{info.insuranceEnd.split('T')[0].split('-')[2]}}日
          </div>
        </InputGroup>
        <InputGroup class="w-full" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="12時"/>
          <div v-else slot="input">
            {{info.insuranceEnd.split('T')[1].split(':')[0]}}時
          </div>
        </InputGroup>
      </div>
    </div>
    <div class="column-6 pb-3 mb-4">
      <InputGroup class="w-full col-span-6" title="投保行業" v-if="copyInfo.CorporateRequired || true" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="心理輔導與家庭諮詢機構"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.insureType}}
        </div>
      </InputGroup>
    </div>
    <div class="column-6 pb-3 mb-4">
      <InputGroup class="w-full " title="去年投保紀錄" :wrap="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="無"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          無
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="去年平均保費" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="- -"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          - -
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="去年平均理賠金額" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="- -"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          - -
        </div>
      </InputGroup>
      <InputGroup class="w-full " title="前年投保紀錄" :wrap="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="無"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          無
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="前年平均保費" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="- -"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          - -
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="前年平均理賠金額" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="- -"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          - -
        </div>
      </InputGroup>
    </div>
    <template v-for="(item, index) in info.placeInfo">
      <FormTitle :key="`title${index}`" :title="`處所資料-處所${index+1}`" classList="text-xl" />
      <div :key="`row${index}`" class="column-6 pb-3 mb-4">
        <InputGroup class="w-full" :title="`處所${index+1}-持有狀態`" :noMt="marginTop(560)" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="自有"/>
          <div v-else slot="input" class="w-full pr-24 relative">
            {{item.holdState == 0 ? '承租' : '自有'}}
          </div>
      </InputGroup>
      <InputGroup class="w-full" :title="`處所${index+1}-坪數`" :noMt="marginTop(560)" borderBtn :editModel="editModel">
          <Input v-if="editModel" slot="input" class="w-full relative text-main" value="500"/>
          <div v-else slot="input" class="w-full relative">
            {{item.squareFeet}}
          </div>
      </InputGroup>
      <InputGroup class="w-full" :title="`處所${index+1}-經營業務處所`" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="台北市"/>
        <div v-else slot="input" class="w-full relative">
          {{item.city}}
        </div>
      </InputGroup>
      </div>
    </template>
    <TermConditionsFin :terms.sync="termsData" :termsLists="info.additionTerms"/>
    <div class="column-6 pb-3 mb-4">
      <InputGroup class="w-full col-span-6" title="備註" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容"/>
        <div v-else slot="input" class="w-full relative">
          備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容
        </div>
      </InputGroup>
    </div>
    <div class="column-6 pb-3 mb-4">
      <InputGroup class="w-full col-span-6" title="上傳附件" borderBtn>
        <div slot="input" class="w-full relative">
          <p class="text-blue-500 px-4 pr-5 text-lg truncate relative">test.text</p>
        </div>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
import Input from '@/components/InputGroup/Input'
import Select from '@/components/Select/index.vue'
import TermConditionsFin from '@/components/Common/TermConditionsFin'
import { TermsLists } from '@/utils/mockData'
import { mapState } from 'vuex'

export default {
  components: {
    InputGroup,
    FormTitle,
    TermConditionsFin,
    Input,
    Select
  },
  props: {
    marginTop: {
      type: Function,
      default: () => {}
    },
    info: {
      type: Object,
      default: () => ({})
    },
    nationalities: {
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
    type: {
      type: String,
      default: () => ''
    },
  },
  data () {
    return {
      copyInfo: {
        ...this.info
      },
      TermsSelect: {
        lists: TermsLists()
      }
    }
  },
  watch: {
    info (val) {
      this.copyInfo = {
        ...val
      }
    }
  },
  computed: {
    ...mapState({
      terms: state => state.place.terms,
      editModel: state => state.common.editModel
    }),
    termsData: {
      get() {
        return this.terms
      },
      set(value) {
        this.$store.dispatch('place/updatedTerms', value)
      }
    },
  },
  methods: {
    emitSelectItem(key, item) {
      const select = {
        placeholder: item.Text,
        id: item.Value
      }
      this.updateInfo(key, select)
    },
    updateInfo (key, value) {
      this.$emit('update:info', Object.assign(this.copyInfo, { [key]: value }))
    }
  }
}
</script>

<style scoped lang="scss">
  .customer-attr {
    @apply  flex items-center text-red-500 ml-3 absolute whitespace-no-wrap left-13
  }
  .address {
    @apply col-span-3;
  }
  @media (min-width: 771px) and (max-width: 1126px) {
    .customer-attr { 
      width: calc(100vw - 350px);
      span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%
      }
    }
  }
   @media (max-width: 771px) {
     .customer-attr { 
      width: calc(100vw - 150px);
      span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%
      }
     }
   }
  @media only screen and (min-width: 1180px) and (max-width: 1614px) {
    .address {
      @apply col-span-2;
    }
  }
</style>