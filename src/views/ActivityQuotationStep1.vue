<template>
  <div>
    <CommonBoard class="w-full mt-16 sm:mt-8" title="投保行業">
      <template slot="right">
        <Button class="text-base absolute right-5 top-16 sm:top-24" @click.native="clearAll" outline>清除全部資料</Button>
      </template>
      <InputGroup slot="right" class="industry-input-group w-52 ml-28" bgColor="white" noMt>
        <Input slot="input" class="max-w-full" :value="searchText" @updateValue="(e) => searchText = e" placeholder="輸入行業關鍵字" slotIcon>
          <font-awesome-icon class="text-main absolute top-3 right-3" :icon="['fas','magnifying-glass']" />
        </Input>
      </InputGroup>
      <InsuranceIndustry type="activity" :industryList="industryList" :industryType="industryType" :selected="industry" :industryText="industryText" :searchText="searchText" :disable="calculateModel"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="活動資料">
      <span slot="icon" class="text-base mt-1 absolute text-gray-700 ml-28">參加活動每日平均人數：{{average.person}}人  總計活動天數：{{average.day}}天</span>
      <ActivityInfo
        :infoList.sync="activityInfoList"
        @addItem="$store.dispatch('activity/addActivityInfo')"
        @removeItem="(index) => $store.dispatch('activity/deleteActivityInfo',index)"
        :countyList="countyList"
        :areaList="areaList"
        :disable="calculateModel"
      />
    </CommonBoard>
    <CommonBoard class="w-full" title="保險期間">
      <Period :period="periodData" :disable="calculateModel"/>
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
      <div class="flex flex-row justify-center items-center relative">
        <div class="cursor-pointer absolute top-2 ml-72" @click="openFormula = true" v-if="insuranceAmountListData.amount && insuranceAmountListData.amount!== '請洽核保'">
          <font-awesome-icon class="text-xl text-main ml-1" icon="info-circle" />
        </div>
        <PaymentItem keyName="總保費試算共計" :value="insuranceAmountListData.amount? numFormat(insuranceAmountListData.amount) : 'NT$ - -'" :unit="insuranceAmountListData.amount!== '請洽核保'" totalStyle/>
      </div>
      <div class="flex flex-col sm:flex-row">
        <Button @click.native="calculateAmount" class="my-2 sm:my-6 w-56 md:w-32 sm:mr-4" outline>試算</Button>
        <Button @click.native="correctAmount" class="my-2 sm:my-6 w-56 md:w-32 sm:mr-4" outline>更正</Button>
        <Button @click.native="() => { if(!calculateModel) {openQuestionnaire = true}}" class="my-2 sm:my-6 w-56 md:w-42" outline>填寫問卷表({{insuranceAmountListData.parameter.underwriteCoefficient}})</Button>
      </div>
      <Button @click.native="nextStep" class="my-8 mt-0 w-48 md:w-64 ">下一步</Button>
    </div>
    <Questionnaire type="activity" :open.sync="openQuestionnaire" :questionnaire="questionnaire"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
    <PopupDialog
      :open.sync="openFormula"
    >
      <ul v-if="insuranceAmountListData.parameter.amount">
        <li>處所基本費率:{{insuranceAmountListData.parameter.basicFee}}</li>
        <li>高保額係數:{{insuranceAmountListData.parameter.finalHC}}</li>
        <li>規模係數:{{insuranceAmountListData.parameter.sizeParameter}}</li>
        <li>自負額係數:{{insuranceAmountListData.parameter.selfInflictedParameter}}</li>
        <li>短期費率:{{insuranceAmountListData.parameter.shortPeriodParameter}}</li>
        <li>附加費用率:{{insuranceAmountListData.parameter.additionalCostParameter}}</li>
        <li>期間係數:{{insuranceAmountListData.parameter.periodParameter}}</li>
        <li>附加險條款費用係數:{{insuranceAmountListData.parameter.additionTermCoefficientParameter}}</li>
        <li v-if="insuranceAmountListData.parameter.underwriteCoefficient">核保加減費系數:{{insuranceAmountListData.parameter.underwriteCoefficient}}</li>
        <li>AGG > AOA *2係數:{{insuranceAmountListData.parameter.aggAOACoefficient}}</li>
        <li>總保費:{{insuranceAmountListData.parameter.amount}}</li>
      </ul>
      <p v-if="insuranceAmountListData.parameter.amount">{{`(處所基本費率(${insuranceAmountListData.parameter.basicFee})*高保額係數(${insuranceAmountListData.parameter.finalHC})*規模係數(${insuranceAmountListData.parameter.sizeParameter})*期間係數(${insuranceAmountListData.parameter.periodParameter})*(1+自負額係數(${insuranceAmountListData.parameter.selfInflictedParameter})*(1+核保加減費系數(${insuranceAmountListData.parameter.underwriteCoefficient}))*(1+附加險條款費用係數(${insuranceAmountListData.parameter.additionTermCoefficientParameter}))*(1+AGG > AOA *2係數(${insuranceAmountListData.parameter.aggAOACoefficient}))/(1-附加費用率(${insuranceAmountListData.parameter.additionalCostParameter}))=總保費(${insuranceAmountListData.parameter.amount})`}}</p>
      <div v-else>尚未試算保費</div>
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
import routeChange from '@/utils/mixins/routeChange'
import editCopyQuotation from '@/utils/mixins/editCopyQuotation'
import editCopyQuestionnaire from '@/utils/mixins/editCopyQuestionnaire'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { IndustryList, TermsLists } from '@/utils/mockData'
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import { Popup } from '@/utils/popups'
import { numFormat } from '@/utils/regex'
export default {
  mixins: [mixinVerify,editCopyQuotation,routeChange,editCopyQuestionnaire],
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
      numFormat,
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
      openFormula: false,
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
      InsuranceActive: state => state.activity.InsuranceActive,
      orderNo: state => state.common.orderNo,
      mainOrderNo: state => state.common.mainOrderNo,
      quotationData: state => state.activity.quotationData,
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
        this.$store.dispatch('activity/updatedRemark',value)
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
    average() {
      const average = {
        person: '--',
        day: '--'
      }
      const map1 = new Map()
      this.activityInfoList.map(item => {
        if( map1.get(`${item.startDate.year}/${item.startDate.month}/${item.startDate.day}`) && !item.number) return
        if( map1.set(`${item.endDate.year}/${item.endDate.month}/${item.endDate.day}`) && !item.number) return
        map1.set(`${item.startDate.year}/${item.startDate.month}/${item.startDate.day}`, item.number)
        map1.set(`${item.endDate.year}/${item.endDate.month}/${item.endDate.day}`, item.number)
      })
      console.log(map1)
      return average
    }
  },
  watch:{
    periodData: {
      handler(val) {
        let millisecond = 0
        val.startDate.year%4 == 0 ? millisecond = 366*24*60*60*1000 : millisecond = 365*24*60*60*1000
        const startTime = new Date(`${Number(val.startDate.year)+1911}-${val.startDate.month}-${val.startDate.day} ${val.startDate.hour}:00`).getTime()
        const endTime = new Date(`${Number(val.endDate.year)+1911}-${val.endDate.month}-${val.endDate.day} ${val.endDate.hour}:00`).getTime()
        if(endTime - startTime > millisecond) {
          Popup.create({
            hasHtml: true,
            htmlText: '活動保期超過一年，請重新選擇',
          })
          this.periodData = {
            ...this.periodData,
            endDate: {
              year: '',
              month: '',
              day: '',
              hour: '',
            }
          }
        }
      },
      deep: true
    },
    industry: async function(val) {
      const data = await this.$store.dispatch('resource/AdditionTermsType', val.dangerSeq)
      this.additionTermsList = data.data.content.additionTermsDetails
      this.termsInit()
    },
    openQuestionnaire: async function(val) {
      if(!val && this.questionnaireFinished) {
        let data = {questionnaire: null,}
        const coefficient = await this.$store.dispatch('questionnaire/GetActivityQuestionnaireCoefficient', this.questionnaireMapping(data).questionnaire)
        if (coefficient.data.content.questionnaireCoefficient !== this.insuranceAmountListData.parameter.underwriteCoefficient) {
          this.correctAmount()//如果核保加減費系數不同更正保費
        }
        this.insuranceAmountListData = {
          ...this.insuranceAmountListData,
          parameter: {
            ...this.insuranceAmountListData.parameter,
            underwriteCoefficient: coefficient.data.content.questionnaireCoefficient > 0 
            ? `+${Number(coefficient.data.content.questionnaireCoefficient)*100}%`
            : (coefficient.data.content.questionnaireCoefficient < 0 ? `${Number(coefficient.data.content.questionnaireCoefficient)*100}%` : `0%`)
          }
        }
        
      }
    }
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
      if(this.InsuranceActive !== 0 || this.orderNo || this.mainOrderNo) {//報價明細更正、複製時塞資料
        this.step1InitAssignValue('activity')
        this.AssignQuestionnaire('activity')
      }
    },
    termsInit() {
      const terms = {}
        this.additionTermsList.map(item => {
          // eslint-disable-next-line no-prototype-builtins
          if(!this.termsData.hasOwnProperty(item.additionTermName)) {
            if(['758A','911','PL013'].includes(item.additionTermId)) {
              item.disable = true
              terms[item.additionTermName] = {
                selected: true,
              }
            } else {
              terms[item.additionTermName] = {
                selected: false
              }
            }
          } else {
            if(['758A','911','PL013'].includes(item.additionTermId)) {
              item.disable = true
            }
            terms[item.additionTermName] = {
              selected: this.termsData[item.additionTermName].selected
            }
          }
        })
      this.termsData = terms
    },
    correctAmount() {
      this.insuranceAmountListData = {
        ...this.insuranceAmountListData,
        amount: '',
      }
      this.$store.dispatch('common/updatedCalculateModel',false)
    },
    async calculateAmount() {
      this.verifyRequired('activity', true)
      if(this.requestFile.length === 0 &&
        this.verifyResult.length === 0) {
        const data = {
          placeActivitySeq: this.industry.Value,
          activityType: this.industryList.find(item => item.dangerSeq == this.industry.Value).typeName,
          insuranceBeginDate: `${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day}`,
          insuranceBeginHour: this.period.startDate.hour,
          insuranceEndDate: `${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day}`,
          insuranceEndHour: this.period.endDate.hour,
          additionTerms: [...this.additionTermsList.filter(item => {
            return this.termsData[item.additionTermName] && this.termsData[item.additionTermName].selected
          }).map(item => {
            if(this.additionTerms[item.additionTermId]) {
              if (item.additionTermId === 'PL005') {//建築物承租人火災附加條款
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: key =='value1' ? Number(this.additionTerms[item.additionTermId][key])*10000 : this.additionTerms[item.additionTermId][key]
                    }
                  })]
                }
              } else if (['PL040','PL049'].includes(item.additionTermId)) {
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: Number(this.additionTerms[item.additionTermId][key])*10000
                    }
                  })]
                }
              } else {
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: this.additionTerms[item.additionTermId][key]
                    }
                  })]
                }
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
              activityBeginDate: `${Number(item.startDate.year) + 1911}-${item.startDate.month}-${item.startDate.day}`,
              activityBeginHour: item.startDate.hour,
              activityEndDate: `${Number(item.endDate.year) + 1911}-${item.endDate.month}-${item.endDate.day}`,
              activityEndHour: item.endDate.hour,
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
        if(this.questionnaireFinished || this.quotationData.questionnaire) {
          this.questionnaireMapping(data)
        }
        this.$store.dispatch('common/updatedCalculateModel',true)
        const res = await this.$store.dispatch('quotation/GetActivityInsuranceProjectAmount',{data})
        this.insuranceAmountListData = {
          ...this.insuranceAmountListData,
          amount: res.data.content.amount ? `NT$${res.data.content.amount}` : '請洽核保',
          parameter: res.data.content.parameter
            ? {...res.data.content.parameter,underwriteCoefficient: res.data.content.parameter.underwriteCoefficient > 0 
              ? `+${Number(res.data.content.parameter.underwriteCoefficient)*100}%`
              : (res.data.content.parameter.underwriteCoefficient < 0 ? `${Number(res.data.content.parameter.underwriteCoefficient)*100}%` : `0%`)}
            : this.insuranceAmountListData.parameter,
        }
        if(res.data.content.quotationReason.length > 0) {
          Popup.create({
            headerText: '請洽核保原因',
            hasHtml: true,
            htmlText: res.data.content.quotationReason.join('<br>'),
          })
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

      if(this.requestFile.length === 0 && this.verifyResult.length === 0) {
          await this.quotationMapping()
          if(this.InsuranceActive !== 0 || this.orderNo || this.mainOrderNo) {
            const data = {
              ...this.quotationData,
              activityInsureInfo: {
                additionTerms: [],
                fileAttachments: [],
                insuranceBeginDate: '',
                insuranceEndDate: '',
                insuranceRecord: {
                  lastYear:{status:false},
                  previousYear:{status:false},
                },
                insureType: '',
                otherIndustryName: '',
                activityInfo: [],
                remark: '',
                renewal: {isRenewal: false},
                insuranceAmounts: [],
              }
            }
            this.$store.dispatch('activity/updatedQuotationData',data)
          }
          this.$router.push({ name: 'activity-quotation-step2' })
      }
    },
    async clearAll() {
      this.$store.dispatch('activity/clearAll')
      await Promise.all(this.attachmentList.map(item => {
        return this.$store.dispatch('common/DeleteFile', {policyAttachmentId: item.policyAttachmentId, fileAttachmentId: item.id})
      }))
      this.$store.dispatch('activity/updatedUUID', '')
      this.$store.dispatch('common/updateOrderNo' ,{orderNo:'',mainOrderNo:''})
      location.reload()
    },
    updatePeriod() {
      const arr = []
      this.activityInfoList.map(item => {
        const i = JSON.parse(JSON.stringify(item))
        arr.push({...i,timeSpace: new Date(`${Number(item.startDate.year)+1911}-${item.startDate.month}-${item.startDate.day} ${item.startDate.hour}:00`).getTime()})
        arr.push({...i,timeSpace: new Date(`${Number(item.endDate.year)+1911}-${item.endDate.month}-${item.endDate.day} ${item.endDate.hour}:00`).getTime()})
      })
      arr.sort((a,b) => a.timeSpace - b.timeSpace)
      this.periodData = {
        startDate: {
          year: arr[0].startDate.year,
          month: arr[0].startDate.month,
          day: arr[0].startDate.day,
          hour: arr[0].startDate.hour
        },
        endDate: {
          year: arr[arr.length - 1].endDate.year,
          month: arr[arr.length - 1].endDate.month,
          day: arr[arr.length - 1].endDate.day,
          hour: arr[arr.length - 1].endDate.hour
        }
      }
    },
    quotationMapping() {
      const data = {
        policyAttachmentId: this.uuid,
        questionnaire: null,
        insurancePeriod: {
          startDate: `${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day}`,
          startHour: this.period.startDate.hour,
          endDate: `${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day}`,
          endHour: this.period.endDate.hour,
        },
        additionTerms: [...this.additionTermsList.filter(item => {
          return this.termsData[item.additionTermName] && this.termsData[item.additionTermName].selected
        }).map(item => {
          if (item.additionTermId === 'PL005') {//建築物承租人火災附加條款
            return {
              additionTermId: item.additionTermId,
              additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                return {
                  itemId: key,
                  itemValue: key =='value1' ? Number(this.additionTerms[item.additionTermId][key])*10000 : this.additionTerms[item.additionTermId][key]
                }
              })]
            }
          } else if(['PL040','PL049'].includes(item.additionTermId)) {
            return {
              additionTermId: item.additionTermId,
              additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                return {
                  itemId: key,
                  itemValue: Number(this.additionTerms[item.additionTermId][key])*10000
                }
              })]
            }
          } else if(this.additionTerms[item.additionTermId]) {
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
              activityBeginDate: `${Number(item.startDate.year) + 1911}-${item.startDate.month}-${item.startDate.day}`,
              activityBeginHour: item.startDate.hour,
              activityEndDate: `${Number(item.endDate.year) + 1911}-${item.endDate.month}-${item.endDate.day}`,
              activityEndHour: item.endDate.hour,
            }
          })]
      }
      if(this.questionnaireFinished) {
        this.questionnaireMapping(data)
      }
      this.$store.dispatch('activity/updateActivityQuotation', data)
      console.log(data)
    },
    questionnaireMapping(data) {
      data.questionnaire = JSON.parse(JSON.stringify(this.questionnaire))
      if(Object.keys(data.questionnaire.sheet1.part1.beginDateTime).every(key => data.questionnaire.sheet1.part1.beginDateTime[key] !== '')) {
        data.questionnaire.sheet1.part1.beginDateTime = `${Number(data.questionnaire.sheet1.part1.beginDateTime.year)+1911}-${data.questionnaire.sheet1.part1.beginDateTime.month}-${data.questionnaire.sheet1.part1.beginDateTime.day} ${data.questionnaire.sheet1.part1.beginDateTime.hours}:${data.questionnaire.sheet1.part1.beginDateTime.minutes}`
      } else {
        data.questionnaire.sheet1.part1.beginDateTime = null
      }
      return data
    }
  },
  async mounted() {
    await this.pageInit()
    this.updatePeriod()
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