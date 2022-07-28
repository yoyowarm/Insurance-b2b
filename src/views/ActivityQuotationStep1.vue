<template>
  <div>
    <CommonBoard class="w-full mt-12" title="投保行業">
      <template slot="right">
        <Button class="text-base" @click.native="clearAll" outline>清除全部資料</Button>
      </template>
      <InputGroup slot="right" class="industry-input-group w-52 ml-28" bgColor="white" noMt>
        <Input slot="input" class="max-w-full" :value="searchText" @updateValue="(e) => searchText = e" placeholder="輸入行業關鍵字" slotIcon>
          <font-awesome-icon class="text-main absolute top-3 right-3" :icon="['fas','magnifying-glass']" />
        </Input>
      </InputGroup>
      <InsuranceIndustry type="activity" :industryList="industryList" :industryType="industryType" :selected="industry" :industryText="industryText" :searchText="searchText" :disable="calculateModel"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="活動資料">
      <ActivityInfo
        :infoList.sync="activityInfoList"
        @addItem="$store.dispatch('activity/addActivityInfo')"
        @removeItem="(index) => $store.dispatch('activity/deleteActivityInfo',index)"
        :countyList="countyList"
        :areaList="areaList"
        :disable="calculateModel"
      />
    </CommonBoard>
    <CommonBoard class="w-full" title="活動保期">
      <Period :period="periodData"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="保險金額/自負額(新台幣元)">
      <InsuranceAmount
        :data.sync="insuranceAmountListData"
        :countyAmount="countyAmount"
        :infoList="activityInfo"
        :disable="calculateModel"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="建議條款" v-if="additionTermsList.filter(item => item.isSuggest).length > 0">
      <TermsList
        :terms.sync="termsData"
        :termsLists="additionTermsList.filter(item => item.isSuggest)"
        :disable="calculateModel"
      />
    </CommonBoard>
    <TermConditions type="activity" :terms.sync="termsData" :termsLists="additionTermsList.filter(item => item.isSuggest)" v-if="additionTermsList.filter(item => item.isSuggest).length > 0" :disable="calculateModel"/>
    <CommonBoard class="w-full mt-5" title="附加條款" v-if="additionTermsList.filter(item => !item.isSuggest).length > 0">
      <TermsList
        :terms.sync="termsData"
        :termsLists="additionTermsList.filter(item => !item.isSuggest)"
        :disable="calculateModel"
      />
    </CommonBoard>
    <TermConditions type="activity" :terms.sync="termsData" :termsLists="additionTermsList.filter(item => !item.isSuggest)" v-if="additionTermsList.filter(item => !item.isSuggest).length > 0" :disable="calculateModel"/>
    <CommonBoard class="w-full mt-5" title="備註">
      <TextBox :value.sync="remarkData"/>
      <p class="text-sm mt-2">上傳附件 <span class="text-red-500">僅支援 word / excel / pdf / txt 檔案格式</span></p>
      <div class="column-6">
        <InputGroup noMt :disable="calculateModel" v-for="(item,index) in 3" :key="item">
          <FileUpload slot="input" :index="item" :id="`activityFile${item}`" :uuid="uuid" :attachment="attachmentList[index]" @updatedFile="getAttachmentList" :disable="calculateModel"/>
        </InputGroup>
      </div>
    </CommonBoard>
    <div class="flex flex-col justify-center items-center w-full mt-8">
      <InputGroup noMt border0>
        <div slot="right" class="cursor-pointer absolute top-7" @click="openFormula = true" v-if="insuranceAmountListData.amount && insuranceAmountListData.amount!== '請洽核保'">
          <font-awesome-icon class="text-xl text-main ml-1" icon="info-circle" />
        </div>
        <PaymentItem slot="input" keyName="總保費試算共計" :value="insuranceAmountListData.amount? insuranceAmountListData.amount : 'NT$ - -'" :unit="insuranceAmountListData.amount!== '請洽核保'" totalStyle/>
      </InputGroup>
      <div class="flex flex-row">
        <Button @click.native="calculateAmount" class="my-8 w-40 md:w-32 mr-10" outline>試算</Button>
        <Button @click.native="() => $store.dispatch('common/updatedCalculateModel',false)" class="my-8 w-40 md:w-32 mr-10" outline>更正</Button>
        <Button @click.native="openQuestionnaire = true" class="my-8 w-40 md:w-32 " outline>填寫問卷表</Button>
      </div>
      <Button @click.native="nextStep" class="my-8 mt-0 w-56 md:w-64 ">下一步</Button>
    </div>
    <Questionnaire type="activity" :open.sync="openQuestionnaire" :questionnaire="questionnaire"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
    <PopupDialog
      :open.sync="openFormula"
    >
      <ul>
        <li>處所基本費率:{{insuranceAmountListData.parameter.basicFee}}</li>
        <li>高保額係數:{{insuranceAmountListData.parameter.finalHC}}</li>
        <li>規模係數:{{insuranceAmountListData.parameter.sizeParameter}}</li>
        <li>自負額係數:{{insuranceAmountListData.parameter.selfInflictedParameter}}</li>
        <li>短期費率:{{insuranceAmountListData.parameter.shortPeriodParameter}}</li>
        <li>附加費用率:{{insuranceAmountListData.parameter.additionalCostParameter}}</li>
        <li>期間係數:{{insuranceAmountListData.parameter.periodParameter}}</li>
        <li>附加險條款費用係數:{{insuranceAmountListData.parameter.additionTermCoefficientParameter}}</li>
        <li>AGG > AOA *2係數:{{insuranceAmountListData.parameter.aggAOACoefficient}}</li>
        <li>總保費:{{insuranceAmountListData.parameter.amount}}</li>
      </ul>
      <p>{{`(處所基本費率(${insuranceAmountListData.parameter.basicFee})*高保額係數(${insuranceAmountListData.parameter.finalHC})*規模係數(${insuranceAmountListData.parameter.sizeParameter})*期間係數(${insuranceAmountListData.parameter.periodParameter})*(1+自負額係數(${insuranceAmountListData.parameter.selfInflictedParameter}))*(1+附加險條款費用係數(${insuranceAmountListData.parameter.additionTermCoefficientParameter}))*(1+AGG > AOA *2係數(${insuranceAmountListData.parameter.aggAOACoefficient}))/(1-附加費用率(${insuranceAmountListData.parameter.additionalCostParameter}))=總保費(${insuranceAmountListData.parameter.amount})`}}</p>
    </PopupDialog>
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
import Questionnaire from '@/components/PopupDialog/ActivityQuestionnaire.vue'
import FileUpload from '@/components/InputGroup/FileUpload.vue'
import mixinVerify from '@/utils/mixins/verifyStep1'
// import routeChange from '@/utils/mixins/routeChange'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { IndustryList, TermsLists } from '@/utils/mockData'
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
export default {
  mixins: [mixinVerify],
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
    LoadingScreen,
    PopupDialog
  },
  data () {
    return {
      industryList: IndustryList(),
      searchText: '',
      TermsSelect: {
        lists: TermsLists()
      },
      industryType:[],
      countyList: [],
      areaList: [],
      countyAmount: [],
      additionTermsList: [],
      attachmentList: [],
      openQuestionnaire: false,
      openFormula: false
    }
  },
  computed: {
    ...mapState({
      activityInfo: state => state.activity.activityInfo,
      period: state => state.activity.period,
      terms: state => state.activity.terms,
      'loading': state => state.app.loading,
      industry: state => state.activity.industry,
      remark: state => state.activity.remark,
      industryText: state => state.activity.industryText,
      questionnaire: state => state.activity.questionnaire,
      calculateModel: state => state.common.calculateModel,
      uuid: state => state.activity.uuid,
      additionTerms: state => state.activity.additionTerms,
      questionnaireFinished: state => state.activity.questionnaireFinished,
      insuranceAmountList: state => state.activity.insuranceAmountList,
    }),
    activityInfoList: {
      get () {
        return this.activityInfo
      },
      set(val) {
        this.$store.dispatch('activity/updatedActivityInfo', val)
      }
    },
    periodData: {
      get() {
        return this.period
      },
      set(value) {
        this.$store.dispatch('activity/updatedPeriod', value)
      }
    },
    termsData: {
      get() {
        return this.terms
      },
      set(value) {
        this.$store.dispatch('activity/updatedTerms', value)
      }
    },
    remarkData: {
      get() {
        return this.remark.text
      },
      set(value) {
        this.$store.dispatch('activity/updatedRemark',{...this.remark, text: value.target.value})
      }
    },
    insuranceAmountListData: {
      get() {
        return this.insuranceAmountList[0]
      },
      set(value) {
        this.$store.dispatch('activity/updatedInsuranceAmountList', [value])
        this.updatePeriod()
      }
    },
  },
  watch:{
    // 'period.startDate': function(val) {
    //   for (const [key, value] of Object.entries(val)) {
    //     if (val[key] !== '' && key === 'year') {
    //       this.period.endDate[key] = Number(value) + 1
    //     }
    //   }
    //   if (Object.values(val).every(item => item !== '')) {
    //     const d1 = new Date(`${Number(val.year) + 1911}/${val.month}/${val.day}`)
    //     const d2 = new Date(d1)
    //     d2.setFullYear(d2.getFullYear() + 1)
    //     d2.setDate(d2.getDate())
    //     this.period.endDate.month = d2.getMonth() + 1
    //     this.period.endDate.day = d2.getDate()
    //     this.periodData = Object.assign(this.period, { endDate: { year: Number(this.period.startDate.year)+1,month: d2.getMonth() + 1, day: d2.getDate(), hour: val.hour} })
    //   }
    // },
    industry: async function(val) {
      const data = await this.$store.dispatch('resource/AdditionTermsType', val.dangerSeq)
      this.additionTermsList = data.data.content.additionTermsDetails
      this.termsInit()
    },
  },
  methods: {
    async pageInit() {
      const activity = await this.$store.dispatch('resource/ActivitiesSetting')
      const districts = await this.$store.dispatch('resource/Districts')
      const county = await this.$store.dispatch('resource/CountyMinimumSettings')
      await this.getAttachmentList()
      activity.data.content.map(item => {
        if(!this.industryType.includes(item.typeName)) {
          this.industryType.push(item.typeName)
        }
      })
      this.industryList = activity.data.content
      districts.data.content.map(item => {
        this.countyList.push({
          ...item,
          Value: item.cityId,
          Text: item.cityName
        })
        item.countyDistricts.map(subItem => {
          this.areaList.push({
            ...subItem,
            cityCode: item.cityCode,
            cityId: item.cityId,
            Value: subItem.areaId,
            Text: subItem.areaName
          })
        })
      })
      this.countyAmount = county.data.content
      if(this.industry.Value) {
        const data = await this.$store.dispatch('resource/AdditionTermsType', this.industry.Value)
        this.additionTermsList = data.data.content.additionTermsDetails
        this.termsInit()
      }
    },
    termsInit() {
      const terms = {}
        this.additionTermsList.map(item => {
          // eslint-disable-next-line no-prototype-builtins
          if(!this.termsData.hasOwnProperty(item.additionTermName)) {
            terms[item.additionTermName] = {
              selected: false
            }
          } else {
            terms[item.additionTermName] = {
              selected: this.termsData[item.additionTermName].selected
            }
          }
        })
      this.termsData = terms
    },
    async calculateAmount() {
      this.verifyRequired('activity')
      if(this.requestFile.length === 0 &&
        this.verifyResult.length === 0) {
        const data = {
          placeActivitySeq: this.industry.Value,
          activityType: this.industryList.find(item => item.dangerSeq == this.industry.Value).typeName,
          insuranceBeginTime: `${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day} ${this.period.startDate.hour}:00:00`,
          insuranceEndTime: `${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day} ${this.period.endDate.hour}:00:00`,
          additionTerms: [...this.additionTermsList.filter(item => {
            return this.termsData[item.additionTermName] && this.termsData[item.additionTermName].selected
          }).map(item => {
            if(this.additionTerms[item.additionTermId]) {
              return {
                additionTermId: item.additionTermId,
                additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                  return {
                    itemId: key,
                    itemValue: this.additionTerms[item.additionTermId][key]
                  }
                })]
              }
            } else {
              return {
                additionTermId: item.additionTermId,
              }
            }
            
          })],
          activityInfo:[...this.activityInfo.map(item => {
            return {
              dailyPeople: item.number,
              cityId: item.city.Value,
              city: item.city.Text,
              areaId: item.area.Value,
              area: item.area.Text,
              countyCode: this.countyList.find(i => i.Value == item.city.Value).cityCode,
              subAddress: item.address,
              activityDays: item.day,
              activityBegin: `${Number(item.startDate.year) + 1911}-${item.startDate.month}-${item.startDate.day} ${item.startDate.hour}:00:00`,
              activityEnd: `${Number(item.endDate.year) + 1911}-${item.endDate.month}-${item.endDate.day} ${item.endDate.hour}:00:00`,
            }
          })],
          amountType: this.insuranceAmountList[0].amountType.Value,
          perBodyAmount: this.insuranceAmountList[0].perBodyAmount * 10000,
          perAccidentBodyAmount: this.insuranceAmountList[0].perAccidentBodyAmount * 10000,
          perAccidentFinanceAmount: this.insuranceAmountList[0].perAccidentFinanceAmount * 10000,
          insuranceTotalAmount: this.insuranceAmountList[0].insuranceTotalAmount * 10000,
          mergeSingleAmount: this.insuranceAmountList[0].mergeSingleAmount * 10000,
          selfInflictedAmount: this.insuranceAmountList[0].selfInflictedAmount.Value,
          remark: this.remark.text,
        }
        this.$store.dispatch('common/updatedCalculateModel',true)
        const res = await this.$store.dispatch('quotation/GetActivityInsuranceProjectAmount',{data})
        this.insuranceAmountListData = {
          ...this.insuranceAmountListData,
          amount: res.data.content.amount ? `NT$${res.data.content.amount}` : '請洽核保',
          parameter: res.data.content.parameter,
        }
      }
      this.updatePeriod()
    },
    async getAttachmentList() {
      const AttachmentDetails = await this.$store.dispatch('common/AttachmentDetails', {policyAttachmentId: this.uuid})
      this.attachmentList = AttachmentDetails.data.content
    },
    async nextStep() {
      this.verifyResult = []
      this.verifyRequired('activity')

      if(this.requestFile.length === 0 &&
        this.verifyResult.length === 0) {
          await this.quotationMapping()
      this.$router.push({ name: 'activity-quotation-step2' })
      }
    },
    async clearAll() {
      this.$store.dispatch('activity/clearAll')
      await Promise.all(this.attachmentList.map(item => {
        return this.$store.dispatch('common/DeleteFile', {policyAttachmentId: item.policyAttachmentId, fileAttachmentId: item.id})
      }))
      this.$store.dispatch('activity/updatedUUID', '')
      location.reload()
    },
    updatePeriod() {
      const arr = []
      this.activityInfoList.map(item => {
        arr.push(new Date(`${Number(item.startDate.year)+1911}-${item.startDate.month}-${item.startDate.day} ${item.startDate.hour}:00`).getTime())
        arr.push(new Date(`${Number(item.endDate.year)+1911}-${item.endDate.month}-${item.endDate.day} ${item.endDate.hour}:00`).getTime())
      })
      arr.sort((a,b) => a - b)
      this.periodData = {
        startDate: {
          year: new Date(arr[0]).getFullYear()-1911,
          month: new Date(arr[0]).getMonth() + 1,
          day: new Date(arr[0]).getDate(),
          hour: new Date(arr[0]).getHours()
        },
        endDate: {
          year: new Date(arr[arr.length - 1]).getFullYear()-1911,
          month: new Date(arr[arr.length - 1]).getMonth() + 1,
          day: new Date(arr[arr.length - 1]).getDate(),
          hour: new Date(arr[arr.length - 1]).getHours()
        }
      }
    },
    quotationMapping() {
      const data = {
        policyAttachmentId: this.uuid,
        insurancePeriod: {
          startDate: `${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day} ${this.period.startDate.hour}:00:00`,
          endDate: `${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day} ${this.period.endDate.hour}:00:00`,
        },
        additionTerms: [...this.additionTermsList.filter(item => {
          return this.termsData[item.additionTermName] && this.termsData[item.additionTermName].selected
        }).map(item => {
          if(this.additionTerms[item.additionTermId]) {
            return {
              additionTermId: item.additionTermId,
              additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                return {
                  itemId: key,
                  itemValue: this.additionTerms[item.additionTermId][key]
                }
              })]
            }
          } else {
            return {
              additionTermId: item.additionTermId,
            }
          }
          
        })],
        insureIndustrySeq: this.industry.Value,
        insureIndustryOtherText: this.industry.Text,
        remark: this.remark.text,
        insuranceAmounts:[...this.insuranceAmountList.map(item => {
          delete item.amount
          return {
            ...item,
            amountType: item.amountType.Value,
            selfInflictedAmount: item.selfInflictedAmount.Value,
            perBodyAmount: item.perBodyAmount * 10000,
            perAccidentBodyAmount: item.perAccidentBodyAmount * 10000,
            perAccidentFinanceAmount: item.perAccidentFinanceAmount * 10000,
            insuranceTotalAmount: item.insuranceTotalAmount * 10000,
            mergeSingleAmount: item.mergeSingleAmount * 10000,
          }
        })],
        activityInfo: [...this.activityInfo.map(item => {
            return {
              dailyPeople: item.number,
              cityId: item.city.Value,
              city: item.city.Text,
              areaId: item.area.Value,
              area: item.area.Text,
              countyCode: this.countyList.find(i => i.Value == item.city.Value).cityCode,
              subAddress: item.address,
              activityDays: item.day,
              activityBegin: `${Number(item.startDate.year) + 1911}-${item.startDate.month}-${item.startDate.day} ${item.startDate.hour}:00:00`,
              activityEnd: `${Number(item.endDate.year) + 1911}-${item.endDate.month}-${item.endDate.day} ${item.endDate.hour}:00:00`,
            }
          })]
      }
      if(this.questionnaireFinished) {
        // data.questionnaire = {
        //   ...this.questionnaire,
        //   part1: {
        //     ...this.questionnaire.part1,
        //     businessType: this.questionnaire.part1.businessType.Value,
        //     createTime: '',
        //     // createTime: `${this.questionnaire.part1.createTime.year}-${this.questionnaire.part1.createTime.month}-${this.questionnaire.part1.createTime.day}`,
        //     businessEndDate: '00:00',
        //     businessStartDate: '00:00',
        //   },
        //   part2: {
        //     ...this.questionnaire.part2,
        //     buildingNature: this.questionnaire.part2.buildingNature.Value,
        //     nearbyBuildingNature: this.questionnaire.part2.nearbyBuildingNature.Value,
        //     securityCheck: this.questionnaire.part2.securityCheck.Value,
        //   }
        // }
      }
      this.$store.dispatch('activity/updateActivityQuotation', data)
      console.log(data)
    }
  },
  async mounted() {
    await this.pageInit()
    if(!this.uuid){
      this.$store.dispatch('activity/updatedUUID', uuidv4())
    }
  },
  beforeDestroy() {
    this.$store.dispatch('common/updatedCalculateModel',false)
  }
}
</script>

<style scoped lang="scss">
  .industry-input-group {
    position: absolute!important;
  }
  
</style>