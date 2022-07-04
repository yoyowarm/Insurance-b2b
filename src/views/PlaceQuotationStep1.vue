<template>
  <div>
    <CommonBoard class="w-full" title="訂單續保">
      <template slot="right">
        <Button class="text-base" @click.native="clearAll" outline>清除全部資料</Button>
      </template>
      <div class="column-5">
        <InputGroup class="item" title="是否續保" dash>
          <SwitchInput
            slot="input"
            id="IsRenewal"
            :value="renewal.IsRenewal"
            @updateValue="(e) =>$store.dispatch('place/updatedRenewal', Object.assign(renewal, {IsRenewal: e}))"
          />
        </InputGroup>
        <InputGroup class="w-full mb-2.5" :disable="!renewal.IsRenewal">
        <div slot="input" class="w-full pr-24 relative">
          <Input placeholder="輸入保單號碼" :value="renewal.InsuranceNumber" @updateValue="(e) => $store.dispatch('place/updatedRenewal', Object.assign(renewal, {InsuranceNumber: e}))" :disable="!renewal.IsRenewal"/>
          <Button class="absolute right-0 -top-1 w-16 md:w-20 h-full" style="height: 50px" :disabled="!renewal.IsRenewal">查詢</Button>
        </div>
      </InputGroup>
      </div>
    </CommonBoard>
    <CommonBoard class="w-full mt-12" title="投保行業">
      <InputGroup slot="right" class="industry-input-group w-52 ml-28" bgColor="white" noMt>
        <Input slot="input" class="max-w-full" :value="searchText" @updateValue="(e) => searchText = e" placeholder="輸入行業關鍵字" slotIcon>
          <font-awesome-icon class="text-main absolute top-3 right-3" :icon="['fas','magnifying-glass']" />
        </Input>
      </InputGroup>
      <InsuranceIndustry type="place" :categoryData="industryList" :selected="industry" :industryText="industryText" :searchText="searchText"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="保險期間">
      <Period :period.sync="periodData"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="投保紀錄">
      <InsuranceRecord :data.sync="InsuranceRecordTable"/>
    </CommonBoard>
    <CommonBoard class="w-full" :title="`處所資料 數量:${placeInfoList.length}`">
      <PlaceInfo
        :infoList.sync="placeInfoList"
        @addItem="$store.dispatch('place/addPlaceInfo')"
        @removeItem="(index) => $store.dispatch('place/deletePlaceInfo',index)"
      />
    </CommonBoard>
    <CommonBoard class="w-full" title="保險金額/自負額(新台幣元)">
      <InsuranceAmount :data.sync="insuranceAmountListData"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="建議條款">
      <TermsList
        v-if="TermsSelect.lists.length > 0"
        :terms.sync="termsData"
        :termsLists="TermsSelect.lists"
      />
    </CommonBoard>
    <TermConditions :terms.sync="termsData" :termsLists="TermsSelect.lists"/>
    <CommonBoard class="w-full mt-5" title="附加條款">
      <!-- <TermsList
        v-if="TermsSelect.lists.length > 0"
        :Terms.sync="termsData"
        :termsLists="TermsSelect.lists"
      /> -->
    </CommonBoard>
    <TermConditions :terms.sync="termsData" :termsLists="TermsSelect.lists"/>
    <CommonBoard class="w-full mt-5" title="備註">
      <TextBox :value.sync="remarkData"/>
      <p class="text-sm mt-2">上傳附件 <span class="text-red-500">僅支援 word / excel / pdf / txt 檔案格式</span></p>
      <div class="column-6">
        <InputGroup noMt>
          <FileUpload slot="input" :index="1" id="fileUpload1"/>
        </InputGroup>
        <InputGroup noMt>
          <FileUpload slot="input" :index="2" id="fileUpload2"/>
        </InputGroup>
        <InputGroup noMt>
          <FileUpload slot="input" :index="3" id="fileUpload3"/>
        </InputGroup>
      </div>
    </CommonBoard>
    <div class="flex flex-col justify-center items-center w-full mt-8">
      <PaymentItem keyName="總保費試算共計" :value="`NT$ --`" unit totalStyle/>
      <div class="flex flex-col sm:flex-row">
        <Button @click.native="nextStep" class="my-2 sm:my-6 w-56 md:w-32 sm:mr-4" outline>試算</Button>
        <Button @click.native="nextStep" class="my-2 sm:my-6 w-56 md:w-32 sm:mr-4" outline>更正</Button>
        <Button @click.native="openQuestionnaire = true" class="my-2 sm:my-6 w-56 md:w-32 " outline>填寫問卷表</Button>
      </div>
      <Button @click.native="nextStep" class="my-8 mt-0 w-56 md:w-64 ">下一步</Button>
    </div>
    <Questionnaire type="place" :open.sync="openQuestionnaire" :questionnaire="questionnaire"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'
import Input from '@/components/InputGroup/Input'
import SwitchInput from '@/components/Switch'
import PaymentItem from '@/components/PaymentItem'
import InsuranceIndustry from '@/components/Common/InsuranceIndustry'
import TextBox from '@/components/InputGroup/Textbox'
import PlaceInfo from '@/components/Place/PlaceInfo'
import InsuranceAmount from '@/components/Common/InsuranceAmount'
import Period from '@/components/Place/Period'
import TermsList from '@/components/Common/TermsList'
import TermConditions from '@/components/Common/TermConditions'
import Questionnaire from '@/components/PopupDialog/Questionnaire.vue'
import FileUpload from '@/components/InputGroup/FileUpload.vue'
import InsuranceRecord from '@/components/Place/InsuranceRecord.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { IndustryList, TermsLists } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    CommonBoard,
    InputGroup,
    Button,
    Input,
    SwitchInput,
    PaymentItem,
    InsuranceIndustry,
    TextBox,
    PlaceInfo,
    InsuranceAmount,
    Period,
    TermsList,
    TermConditions,
    Questionnaire,
    FileUpload,
    InsuranceRecord,
    LoadingScreen
  },
  data () {
    return {
      IsRenewal: false,
      industryList: IndustryList(),
      searchText: '',
      TermsSelect: {
        lists: TermsLists()
      },
      openQuestionnaire: false,
    }
  },
  computed: {
    ...mapState({
      placeInfo: state => state.place.placeInfo,
      period: state => state.place.period,
      terms: state => state.place.terms,
      renewal: state => state.place.renewal,
      'loading': state => state.app.loading,
      InsuranceRecord: state => state.place.InsuranceRecord,
      industry: state => state.place.industry,
      industryText: state => state.place.industryText,
      remark: state => state.place.remark,
      questionnaire: state => state.place.questionnaire,
      insuranceAmountList: state => state.place.insuranceAmountList,
    }),
    placeInfoList: {
      get () {
        return this.placeInfo
      },
      set(val) {
        this.$store.dispatch('place/updatedPlaceInfo', val)
      }
    },
    InsuranceRecordTable: {
      get () {
        return this.InsuranceRecord
      },
      set(val) {
        this.$store.dispatch('place/updatedInsuranceRecord', val)
      }
    },
    periodData: {
      get() {
        return this.period
      },
      set(value) {
        this.$store.dispatch('place/updatedPeriod', value)
      }
    },
    termsData: {
      get() {
        return this.terms
      },
      set(value) {
        this.$store.dispatch('place/updatedTerms', value)
      }
    },
    remarkData: {
      get() {
        return this.remark.text
      },
      set(value) {
        this.$store.dispatch('place/updatedRemark',{...this.remark, text: value.target.value})
      }
    },
    insuranceAmountListData: {
      get() {
        return this.insuranceAmountList[0]
      },
      set(value) {
        this.$store.dispatch('place/updatedInsuranceAmountList', [value])
      }
    },
  },
  watch:{
    'period.startDate': function(val) {
      for (const [key, value] of Object.entries(val)) {
        if (val[key] !== '' && key === 'year') {
          this.period.endDate[key] = Number(value) + 1
        }
      }
      if (Object.values(val).every(item => item !== '')) {
        const d1 = new Date(`${Number(val.year) + 1911}/${val.month}/${val.day}`)
        const d2 = new Date(d1)
        d2.setFullYear(d2.getFullYear() + 1)
        d2.setDate(d2.getDate())
        this.period.endDate.month = d2.getMonth() + 1
        this.period.endDate.day = d2.getDate()
        this.periodData = Object.assign(this.period, { endDate: { year: Number(this.period.startDate.year)+1,month: d2.getMonth() + 1, day: d2.getDate(), hour: val.hour} })
      }
    },
  },
  methods: {
    nextStep() {
      this.$router.push({ name: 'place-quotation-step2' })
    }
  }
}
</script>

<style scoped lang="scss">
  .industry-input-group {
    position: absolute!important;
  }
  
</style>