<template>
  <div>
    <CommonBoard class="w-full mt-12" title="投保行業">
      <InputGroup slot="right" class="industry-input-group w-52 ml-28" bgColor="white" noMt>
        <Input slot="input" class="max-w-full" :value="searchText" @updateValue="(e) => searchText = e" placeholder="輸入行業關鍵字" slotIcon>
          <font-awesome-icon class="text-main absolute top-3 right-3" :icon="['fas','magnifying-glass']" />
        </Input>
      </InputGroup>
      <InsuranceIndustry type="activity" :categoryData="industryList" :selected="industry" :industryText="industryText" :searchText="searchText"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="活動資料">
      <ActivityInfo
        :infoList="activityInfoList"
        @addItem="$store.dispatch('activity/addActivityInfo')"
        @removeItem="(index) => $store.dispatch('activity/deleteActivityInfo',index)"
      />
    </CommonBoard>
    <CommonBoard class="w-full" title="活動保期">
      <Period :period.sync="periodData"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="保險金額/自負額(新台幣元)">
      <InsuranceAmount/>
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
      <TermsList
        v-if="TermsSelect.lists.length > 0"
        :Terms.sync="termsData"
        :termsLists="TermsSelect.lists"
      />
    </CommonBoard>
    <TermConditions :terms.sync="termsData" :termsLists="TermsSelect.lists"/>
    <CommonBoard class="w-full mt-5" title="備註">
      <TextBox/>
      <p class="text-sm mt-2">上傳附件 <span class="text-red-500">僅支援 word / excel / pdf / txt 檔案格式</span></p>
      <div class="column-6">
        <InputGroup noMt>
          <FileUpload slot="input" :index="1" id="file1"/>
        </InputGroup>
        <InputGroup noMt>
          <FileUpload slot="input" :index="2" id="file2"/>
        </InputGroup>
        <InputGroup noMt>
          <FileUpload slot="input" :index="3" id="file3"/>
        </InputGroup>
      </div>
    </CommonBoard>
    <div class="flex flex-col justify-center items-center w-full mt-8">
      <PaymentItem keyName="總保費試算共計" :value="`NT$ --`" unit totalStyle/>
      <div class="flex flex-row">
        <Button @click.native="nextStep" class="my-8 w-40 md:w-32 mr-10" outline>試算</Button>
        <Button @click.native="nextStep" class="my-8 w-40 md:w-32 mr-10" outline>更正</Button>
        <Button @click.native="openQuestionnaire = true" class="my-8 w-40 md:w-32 " outline>填寫問卷表</Button>
      </div>
      <Button @click.native="nextStep" class="my-8 mt-0 w-56 md:w-64 ">下一步</Button>
    </div>
    <Questionnaire type="activity" :open.sync="openQuestionnaire" :questionnaire="questionnaire"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'
import Input from '@/components/InputGroup/Input'
import PaymentItem from '@/components/PaymentItem'
import InsuranceIndustry from '@/components/Common/InsuranceIndustry'
import TextBox from '@/components/InputGroup/Textbox'
import ActivityInfo from '@/components/Activity/ActivityInfo'
import InsuranceAmount from '@/components/Common/InsuranceAmount'
import Period from '@/components/Activity/Period'
import TermsList from '@/components/Common/TermsList'
import TermConditions from '@/components/Common/TermConditions'
import Questionnaire from '@/components/PopupDialog/Questionnaire.vue'
import FileUpload from '@/components/InputGroup/FileUpload.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { IndustryList, TermsLists } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    CommonBoard,
    InputGroup,
    Button,
    Input,
    PaymentItem,
    InsuranceIndustry,
    TextBox,
    ActivityInfo,
    InsuranceAmount,
    Period,
    TermsList,
    TermConditions,
    Questionnaire,
    FileUpload,
    LoadingScreen
  },
  data () {
    return {
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
      activityInfoList: state => state.activity.activityInfo,
      period: state => state.activity.period,
      terms: state => state.place.terms,
      'loading': state => state.app.loading,
      industry: state => state.activity.industry,
      industryText: state => state.activity.industryText,
      questionnaire: state => state.activity.questionnaire,
    }),
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
  },
  watch:{
    'periodData.startDate': {
      handler(val) {
         if (Object.values(val).every(item => item !== '')) {
            const d1 = new Date(`${Number(val.year) + 1911}/${val.month}/${val.day}`)
            const d2 = new Date(d1)
            d2.setDate(d2.getDate()+7)
            console.log(d2.getFullYear()-1911,d2.getMonth()+1,d2.getDate(),d2.getHours())
            this.periodData = Object.assign(this.period, { endDate: { year: d2.getFullYear()-1911,month: d2.getMonth() + 1, day: d2.getDate(), hour: val.hour} })
          }
      },
      deep: true
    },
  },
  methods: {
    nextStep() {
      this.$router.push({ name: 'activity-quotation-step2' })
    }
  }
}
</script>

<style scoped lang="scss">
  .industry-input-group {
    position: absolute!important;
  }
  
</style>