<template>
  <div>
    <div class="column-6">
      <InputGroup class=" w-full " title="是否續保" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="是"/>
        <div v-else slot="input" class="w-full relative">
          {{info.renewal&&info.renewal.isRenewal ? '是' : '否'}}
        </div>
      </InputGroup>
      <InputGroup class=" w-full " title="保單編號" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="123456789"/>
        <div v-else slot="input" class="w-full relative">
          {{info.renewal&&info.renewal.insuranceNumber}}
        </div>
      </InputGroup>
      <div class="flex flex-row col-span-2">
        <InputGroup class="w-full pr-1" title="保險開始時間" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="111年"/>
          <div v-else slot="input">
            {{info.insuranceBeginDate? info.insuranceBeginDate.split('T')[0].split('-')[0]: ''}}年
          </div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="04月"/>
          <div v-else slot="input">
            {{info.insuranceBeginDate?info.insuranceBeginDate.split('T')[0].split('-')[1] : ''}}月
          </div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="15日"/>
          <div v-else slot="input">
            {{info.insuranceBeginDate?info.insuranceBeginDate.split('T')[0].split('-')[2]: ''}}日
          </div>
        </InputGroup>
        <InputGroup class="w-full" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="12時"/>
          <div v-else slot="input">
            {{info.insuranceBeginHour}}時
          </div>
        </InputGroup>
      </div>
      <div class="flex flex-row col-span-2">
        <InputGroup class="w-full pr-1" title="保險開始時間" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="111年"/>
          <div v-else slot="input">
            {{info.insuranceEndDate? info.insuranceEndDate.split('T')[0].split('-')[0]: ''}}年
          </div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="04月"/>
          <div v-else slot="input">
            {{info.insuranceEndDate?info.insuranceEndDate.split('T')[0].split('-')[1]: ''}}月
          </div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="15日"/>
          <div v-else slot="input">
            {{info.insuranceEndDate?info.insuranceEndDate.split('T')[0].split('-')[2]:''}}日
          </div>
        </InputGroup>
        <InputGroup class="w-full" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="12時"/>
          <div v-else slot="input">
            {{info.insuranceEndHour}}時
          </div>
        </InputGroup>
      </div>
    </div>
    <div class="column-6 pb-3 my-4">
      <InputGroup class="w-full col-span-6" title="投保行業" v-if="copyInfo.CorporateRequired || true" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="心理輔導與家庭諮詢機構"/>
        <div v-else slot="input" class="w-full relative">
          {{info.displayInsureType.includes('其他')? `${info.displayInsureType}(${info.otherIndustryName})`: info.displayInsureType}}
        </div>
      </InputGroup>
    </div>
    <div class="column-6 pb-3 mb-4">
      <InputGroup class="w-full " title="去年投保紀錄" :wrap="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="無"/>
        <div v-else slot="input" class="w-full relative">
          {{info.insuranceRecord && info.insuranceRecord.lastYear.status ? '有' : '無'}}
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="去年平均保費" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="- -"/>
        <div v-else slot="input" class="w-full relative">
          {{info.insuranceRecord && info.insuranceRecord.lastYear.averagePremium ? info.insuranceRecord.lastYear.averagePremium : '- -'}}
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="去年平均理賠金額" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="- -"/>
        <div v-else slot="input" class="w-full relative">
          {{info.insuranceRecord && info.insuranceRecord.lastYear.claimAmount ? info.insuranceRecord.lastYear.claimAmount : '- -'}}
        </div>
      </InputGroup>
      <InputGroup class="w-full " title="前年投保紀錄" :wrap="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="無"/>
        <div v-else slot="input" class="w-full relative">
          {{info.insuranceRecord && info.insuranceRecord.previousYear.status ? '有' : '無'}}
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="前年平均保費" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="- -"/>
        <div v-else slot="input" class="w-full relative">
          {{info.insuranceRecord && info.insuranceRecord.previousYear.averagePremium ? info.insuranceRecord.previousYear.averagePremium : '- -'}}
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="前年平均理賠金額" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="- -"/>
        <div v-else slot="input" class="w-full relative">
          {{info.insuranceRecord && info.insuranceRecord.previousYear.claimAmount ? info.insuranceRecord.previousYear.claimAmount : '- -'}}
        </div>
      </InputGroup>
    </div>
    <template v-for="(item, index) in info.placeInfo">
      <FormTitle :key="`title${index}`" :title="`處所資料-處所${index+1}`" classList="text-xl" />
      <div :key="`row${index}`" class="column-6 pb-3 mb-4">
        <InputGroup class="w-full" :title="`持有狀態`" :noMt="marginTop(560)" borderBtn :editModel="editModel">
          <Select v-if="editModel" slot="input" defaultText="自有"/>
          <div v-else slot="input" class="w-full relative">
            {{item.holdState == 0 ? '承租' : '自有'}}
          </div>
      </InputGroup>
      <InputGroup class="w-full" :title="`坪數`" :noMt="marginTop(560)" borderBtn :editModel="editModel">
          <Input v-if="editModel" slot="input" class="w-full relative text-main" value="500"/>
          <div v-else slot="input" class="w-full relative">
            {{item.squareFeet}}
          </div>
      </InputGroup>
      <InputGroup class="w-full" :title="`經營業務處所`" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="台北市"/>
        <div v-else slot="input" class="w-full relative">
          {{item.city}}
        </div>
      </InputGroup>
      <InputGroup class="w-full col-span-3" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <div slot="input" class="w-full relative">
          {{item.subAddress}}
        </div>
      </InputGroup>
      </div>
    </template>
    <TermConditionsFin :terms.sync="termsData" :termsLists="info.additionTerms"/>
    <div class="column-6 pb-3 mb-4">
      <InputGroup class="w-full col-span-6" title="備註" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容"/>
        <div v-else slot="input" class="w-full relative">
          {{info.remark}}
        </div>
      </InputGroup>
    </div>
    <div class="column-6 pb-3 mb-4" v-if="info.placeInsureInfo">
      <InputGroup class="w-full col-span-6" title="上傳附件" borderBtn>
        <div slot="input" class="w-full relative" v-for="(item,index) in info.placeInsureInfo.fileAttachments" :key="index">
          <p class="text-blue-500 px-4 pr-5 text-lg truncate relative">{{item.fileName}}</p>
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