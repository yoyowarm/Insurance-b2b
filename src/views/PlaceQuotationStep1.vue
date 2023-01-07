<template>
  <div>
    <CommonBoard class="w-full" title="訂單續保">
      <template slot="right">
        <Button class="text-base" @click.native="clearAll" outline>清除全部資料</Button>
      </template>
      <div class="column-5">
        <InputGroup class="item" title="是否續保" dash :disabled="calculateModel">
          <SwitchInput
            slot="input"
            id="IsRenewal"
            :value="renewal.IsRenewal"
            :disabled="calculateModel"
            @updateValue="(e) =>$store.dispatch('place/updatedRenewal', Object.assign(renewal, {IsRenewal: e}))"
          />
        </InputGroup>
        <InputGroup class="w-ful" :disable="!renewal.IsRenewal || calculateModel">
        <div slot="input" class="w-full pr-24 relative">
          <Input placeholder="輸入保單號碼" :value="renewal.InsuranceNumber" @updateValue="(e) => $store.dispatch('place/updatedRenewal', Object.assign(renewal, {InsuranceNumber: e}))" :disable="!renewal.IsRenewal|| calculateModel"/>
          <Button v-if="InsuranceActive !== 7" class="absolute right-0 -top-1 w-16 md:w-20 h-full" style="height: 50px" @click.native="renewInfo" :disabled="!renewal.IsRenewal|| calculateModel"><span class="whitespace-no-wrap">查詢</span></Button>
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
      <InsuranceIndustry
        type="place"
        :industryList="industryList"
        :industryType="industryType"
        :selected="industry"
        :industryText="industryText"
        :searchText="searchText"
        :disable="calculateModel"
        :questionnaire="questionnaire"
        :isRenewal="renewal.IsRenewal"
        @initTerm="initTerm"
      />
    </CommonBoard>
    <CommonBoard class="w-full" title="保險期間">
      <Period :period.sync="periodData" :disable="calculateModel"/>
    </CommonBoard>
    <CommonBoard class="w-full" title="投保紀錄">
      <InsuranceRecord :data.sync="InsuranceRecordTable" :disable="calculateModel"/>
    </CommonBoard>
    <CommonBoard class="w-full" :title="`處所資料 數量:${placeInfoList.length}`">
      <PlaceInfo
        :infoList.sync="placeInfoList"
        @addItem="$store.dispatch('place/addPlaceInfo')"
        @removeItem="(index) => $store.dispatch('place/deletePlaceInfo',index)"
        :countyList="countyList"
        :disable="calculateModel || InsuranceActive == 7"
        :questionnaire="questionnaire"
      />
    </CommonBoard>
    <CommonBoard class="w-full" title="保險金額/自負額(新台幣元)">
      <InsuranceAmount
        :data.sync="insuranceAmountListData"
        :countyAmount="countyAmount"
        :infoList="placeInfo"
        :disable="calculateModel"
        :createOder.sync="createOder"
        type="place"
      />
    </CommonBoard>
    <CommonBoard class="w-full" title="建議條款" v-if="additionTermsList.filter(item => item.isSuggest && item.isEnable).length > 0">
      <TermsList
        :terms.sync="termsData"
        :termsLists="additionTermsList.filter(item => item.isSuggest && item.isEnable)"
        :disable="calculateModel"
      />
    </CommonBoard>
    <TermConditions type="place" :terms.sync="termsData" :termsLists="additionTermsList.filter(item => item.isSuggest && item.isEnable)" v-if="additionTermsList.filter(item => item.isSuggest && item.isEnable).length > 0" :disable="calculateModel"/>
    <CommonBoard class="w-full mt-5" title="附加條款" v-if="additionTermsList.filter(item => !item.isSuggest && item.isEnable).length > 0">
      <TermsList
        :terms.sync="termsData"
        :termsLists="additionTermsList.filter(item => !item.isSuggest && item.isEnable)"
        :disable="calculateModel"
        :more="true"
      />
    </CommonBoard>
    <TermConditions type="place" :terms.sync="termsData" :termsLists="additionTermsList.filter(item => !item.isSuggest && item.isEnable)" v-if="additionTermsList.filter(item => !item.isSuggest && item.isEnable).length > 0" :disable="calculateModel"/>
    <CommonBoard class="w-full mt-5" title="備註">
      <TextBox :value.sync="remarkData"/>
      <p class="text-sm mt-2">上傳附件 <span class="text-red-500">僅支援 word / excel / pdf / txt 檔案格式</span></p>
      <div class="column-6">
        <InputGroup noMt :disable="calculateModel" v-for="(item,index) in 3" :key="item">
          <FileUpload slot="input" :index="item" :id="`file${item}`" :attachment="attachmentList[index]" :uuid="uuid" @updatedFile="getAttachmentList" :disable="calculateModel"/>
        </InputGroup>
      </div>
    </CommonBoard>
    <div class="flex flex-col justify-center items-center  w-full mt-8">
        <div class="flex flex-row justify-center items-center relative">
          <div class="cursor-pointer absolute top-2 -right-6" @click="openFormula = true" v-if="underwriteLevel && insuranceAmountListData.amount && insuranceAmountListData.amount!== '請洽核保' && InsuranceActive == 7">
            <font-awesome-icon class="text-xl text-main ml-5" icon="info-circle" />
          </div>
          <PaymentItem keyName="總保費試算共計" :value="insuranceAmountListData.amount? numFormat(insuranceAmountListData.amount) : 'NT$ - -'" :unit="insuranceAmountListData.amount!== '請洽核保'" totalStyle/>
        </div>
      <div class="flex flex-col justify-center items-center  sm:flex-row">
        <Button @click.native="calculateAmount" class="my-2 sm:my-6 w-56 md:w-32 sm:mr-4" outline>試算</Button>
        <Button @click.native="correctAmount" class="my-2 sm:my-6 w-56 md:w-32 sm:mr-4" outline>更正</Button>
         <Button :disabled="calculateModel  && InsuranceActive !== 7" @click.native="() => { if(!calculateModel || InsuranceActive == 7) {openQuestionnaire = true}}" class="my-2 sm:my-6 w-56 md:w-56" outline>填寫詢問表({{insuranceAmountListData.parameter.underwriteCoefficient}})</Button>
      </div>
      <div class="flex flex-col justify-center items-center sm:flex-row">
        <Button @click.native="nextStep" class="my-4  w-56 md:w-42" :class="{'md:mr-5': underwriteStatus.underwriteDirection == 1}">下一步</Button>
        <Button v-if="underwriteStatus.underwriteDirection == 1" class="my-0 sm:my-4  w-56 md:w-42" @click.native="updateUnderwrite(3)">不予核保</Button>
      </div>
    </div>
    <Questionnaire type="place" :open.sync="openQuestionnaire" :audit="InsuranceActive == 7" :questionnaire="questionnaire" :multiplePlaceInfo="placeInfoList.length > 1" :orderNo="orderNo"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
    <PlaceModifyAmount
      :open.sync="openAudit"
      :insuranedName="quotationData.insuraned ? quotationData.insuraned.name : ''"
      :orderNo="orderNo"
      :additionTermCoefficientParameter="insuranceAmountListData.parameter.additionTermCoefficientParameter"
      :aggAOACoefficient="insuranceAmountListData.parameter.aggAOACoefficient"
      :mutiSizeParameter="insuranceAmountListData.parameter.mutiSizeParameter"
      :sizeCofficient="insuranceAmountListData.parameter.sizeParameter"
      :premium="insuranceAmountListData.amount"
      :insideCalculateAmount="parameter"
      :hasHexTypeBasicAmount="industry.typeName == '己類'"
      :fixAdditionTermCoefficient="Object.keys(terms).filter(key => terms[key].selected).every(key => ['758A','911','PL013','PL052'].includes(key.split(' ')[0]))"
      @auditCalculateAmount="placeAuditCalculateAmount"
      @updateParameter="updateParameter"
    />
    <PopupDialog
      :open.sync="openFormula"
    >
    <ul v-if="insuranceAmountListData.parameter && insuranceAmountListData.parameter.amount">
      <li>處所基本費率:{{insuranceAmountListData.parameter.basicFee}}</li>
      <li>高保額係數:{{insuranceAmountListData.parameter.finalHC}}</li>
      <li>規模係數:{{insuranceAmountListData.parameter.sizeParameter}}</li>
      <li>自負額係數:{{insuranceAmountListData.parameter.selfInflictedParameter}}</li>
      <li>短期費率:{{insuranceAmountListData.parameter.shortPeriodParameter}}</li>
      <li>附加費用率:{{insuranceAmountListData.parameter.additionalCostParameter}}</li>
      <li>多處所係數:{{insuranceAmountListData.parameter.mutiSizeParameter}}</li>
      <li v-if="insuranceAmountListData.parameter.underwriteCoefficient">核保加減費系數:{{insuranceAmountListData.parameter.underwriteCoefficient}}</li>
      <li>附加險條款費用係數:{{insuranceAmountListData.parameter.additionTermCoefficientParameter}}</li>
      <li v-if="insuranceAmountListData.parameter.termPL005Fee">PL005:{{insuranceAmountListData.parameter.termPL005Fee}}</li>
      <li v-if="insuranceAmountListData.parameter.termPL058Fee">PL058:{{insuranceAmountListData.parameter.termPL058Fee}}</li>
      <li>AGG > AOA *2係數:{{insuranceAmountListData.parameter.aggAOACoefficient}}</li>
      <li>總保費:{{insuranceAmountListData.parameter.amount}}</li>
    </ul>
    <p v-if="insuranceAmountListData.parameter.amount">{{`(處所基本費率(${insuranceAmountListData.parameter.basicFee})*高保額係數(${insuranceAmountListData.parameter.finalHC})*規模細數(${insuranceAmountListData.parameter.sizeParameter})*多處所係數(${insuranceAmountListData.parameter.mutiSizeParameter})*(1+自負額係數(${insuranceAmountListData.parameter.selfInflictedParameter}))*(1 + 核保加減費系數(${insuranceAmountListData.parameter.underwriteCoefficient}))*(1+附加險條款費用係數(${insuranceAmountListData.parameter.additionTermCoefficientParameter}))*(1+AGG > AOA *2係數(${insuranceAmountListData.parameter.aggAOACoefficient}))*短期費率(${insuranceAmountListData.parameter.shortPeriodParameter})/(1-附加費用率(${insuranceAmountListData.parameter.additionalCostParameter})+PL005(${insuranceAmountListData.parameter.termPL005Fee})+PL058(${insuranceAmountListData.parameter.termPL058Fee}))=總保費(${insuranceAmountListData.parameter.amount})`}}</p>
    <div v-else>尚未試算保費</div>
    </PopupDialog>
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
import Questionnaire from '@/components/PopupDialog/PlaceQuestionnaire.vue'
import FileUpload from '@/components/InputGroup/FileUpload.vue'
import InsuranceRecord from '@/components/Place/InsuranceRecord.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import mixinVerify from '@/utils/mixins/verifyStep1'
import routeChange from '@/utils/mixins/routeChange'
import audit from '@/utils/mixins/audit'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import editCopyQuotation from '@/utils/mixins/editCopyQuotation'
import editCopyQuestionnaire from '@/utils/mixins/editCopyQuestionnaire'
import PlaceModifyAmount from '@/components/PopupDialog/PlaceModifyAmount'
import { Popup } from '@/utils/popups'
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import { numFormat } from '@/utils/regex'
import { quotation } from '@/utils/dataTemp'
export default {
  mixins: [mixinVerify, editCopyQuotation,routeChange,editCopyQuestionnaire,audit],
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
    LoadingScreen,
    PopupDialog,
    PlaceModifyAmount
  },
  data () {
    return {
      numFormat,
      IsRenewal: false,
      searchText: '',
      industryList:[],
      industryType:[],
      countyList: [],
      areaList: [],
      countyAmount: [],
      additionTermsList: [],
      attachmentList: [],
      openQuestionnaire: false,
      openFormula: false,
      openAudit: false,
      createOder: true,//複製報價單時ㄧ次性使用的參數，讓元件不覆蓋報價單資料
      underwriteStatus: {},
      underwriteLevel: null
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
      calculateModel: state => state.common.calculateModel,
      uuid: state => state.place.uuid,
      additionTerms: state => state.place.additionTerms,
      questionnaireFinished: state => state.place.questionnaireFinished,
      InsuranceActive: state => state.place.InsuranceActive,
      orderNo: state => state.common.orderNo,
      mainOrderNo: state => state.common.mainOrderNo,
      quotationData: state => state.place.quotationData,
      userInfo: state => state.home.userInfo,
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
        this.$store.dispatch('place/updatedRemark',value)
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
    openQuestionnaire: async function(val) {
      if(!val && this.questionnaireFinished) {
        await this.questionnaireCoefficient()
      }
    },
    periodData: {
      handler() {
        const startHour = this.period.startDate.hour.toString() == '0' ? '00' : (this.period.startDate.hour.toString() == '24' ? '23' : this.period.startDate.hour.toString())
        const startMinute = this.period.startDate.hour.toString() == '24' ? '59' : '00'
        const endHour = this.period.endDate.hour.toString() == '0' ? '00' : (this.period.endDate.hour.toString() == '24' ? '23' : this.period.endDate.hour.toString())
        const endMinute = this.period.endDate.hour.toString() == '24' ? '59' : '00'
        const startTime = new Date(`${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day}T${startHour}:${startMinute}:00`).getTime()
        const endTime = new Date(`${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day}T${endHour}:${endMinute}:00`).getTime()
        const leapYear = ((Number(this.period.startDate.year) + 1911) %4 == 0) || ((Number(this.period.endDate.year) + 1911) %4 == 0) ? 366 : 365
        const overYear = ((endTime - startTime) / 86400000) > leapYear
        if (overYear) {
          Popup.create({hasHtml:true,htmlText:'保期不能超過一年'})
          this.$nextTick(() => {
            this.periodData = {
              ...this.periodData,
              endDate: {
                day: this.period.startDate.day,
                month: this.period.startDate.month,
                year: new Date(startTime - 1000*60*60*24).getFullYear() - 1910,
                hour: this.period.startDate.hour
              }
            }
          });
        }
      }
    },
    placeInfoList: {
      handler(val) {
        let num = 0
        val.map(item => {
          if (item.holdState) {
            num++
          }
        })
        this.$store.dispatch('place/updateAdditionTerms', {
          ...this.additionTerms,
          PL005: {
            ...this.additionTerms.PL005,
            value2: num
          }
        })
      },
      deep: true
    },
  },
  methods: {
    async nextStep() {
      this.verifyResult = []
      this.verifyRequired('place')
      if(this.requestFile.length === 0 && this.verifyResult.length === 0) {
          await this.quotationMapping()
          if(this.InsuranceActive !== 0 || this.orderNo || this.mainOrderNo) {
            const data = {
              ...this.quotationData,
              placeInsureInfo: {
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
                placeInfo: [],
                remark: '',
                renewal: {isRenewal: false},
                insuranceAmounts: [],
              }
            }
            this.$store.dispatch('place/updatedQuotationData',data)
          }
          this.$router.push({ name: 'place-quotation-step2' })
      }
    },
    async renewInfo() {
      let res = null
      try {
        res = await this.$store.dispatch('quotation/GetRenewInfo', this.renewal.InsuranceNumber)
      } catch (error) {
        Popup.create({hasHtml:true,htmlText:'無此續保單號'})
        return
      }

      if(res.data.code ==1) {
        const data = {
          ...res.data.content,
          insuranceAmounts: res.data.content.insuranceAmounts ? res.data.content.insuranceAmounts.map((item,index) => {
            return {
              ...item,
              // eslint-disable-next-line no-prototype-builtins
              selected: item.hasOwnProperty('isSelected') ? item.isSelected : (index == 0 ? true : false),
              fixed: false,
              amountType: {Value: item.amountType? item.amountType : 0, Text: item.amountType?  this.amountList[item.amountType] : '依各縣市規定'},
              insuranceTotalAmount: item.insuranceTotalAmount ? item.insuranceTotalAmount/10000 : '',
              mergeSingleAmount: item.mergeSingleAmount ? item.mergeSingleAmount/10000 : '',
              perAccidentBodyAmount: item.perAccidentBodyAmount ? item.perAccidentBodyAmount/10000 : '',
              perAccidentFinanceAmount: item.perAccidentFinanceAmount ? item.perAccidentFinanceAmount/10000 : '',
              perBodyAmount: item.perBodyAmount ? item.perBodyAmount/10000 : '',
              selfInflictedAmount: item.selfInflictedAmount ? {Value:item.selfInflictedAmount, Text: `${numFormat(item.selfInflictedAmount)}元`} : { Value: 2500, Text: '2,500元' },
              parameter: {
                basicFee: '',
                finalHC: '',
                sizeParameter: '',
                selfInflictedParameter: '',
                shortPeriodParameter: '',
                additionalCostParameter: '',
                mutiSizeParameter: '',
                additionTermCoefficientParameter: '',
                aggAOACoefficient: '',
                amount: '',
                underwriteCoefficient: '0%'
              }
            }
          }) : this.insuranceAmountListData
        }
        
        this.$store.dispatch(`place/updatedQuotationData`,data)
        this.$store.dispatch(`place/updatedInsuranceActive`, 4)
        if(res.data.content.questionnaire) {
          this.$store.dispatch(`place/updateQuestionnaireFinished`, true)
          this.AssignQuestionnaire('place')
          await this.questionnaireCoefficient()
        } 
        if(res.data.content.placeInsureInfo) {
          this.step1InitAssignValue('place')
        }
      }
    },
    async questionnaireCoefficient(audit = false) {
      let data = {questionnaire: null,}
        const coefficient = await this.$store.dispatch('questionnaire/GetPlaceQuestionnaireCoefficient', this.questionnaireMapping(data).questionnaire)
        if (!audit &&coefficient.data.content.questionnaireCoefficient !== this.insuranceAmountListData.parameter.underwriteCoefficient && this.insuranceAmountListData.amount) {
          this.correctAmount()//如果核保加減費系數不同更正保費
        }

        setTimeout(() => {
          this.insuranceAmountListData = {
          ...this.insuranceAmountListData,
          parameter: {
            ...this.insuranceAmountListData.parameter,
            underwriteCoefficient: Number(coefficient.data.content.questionnaireCoefficient) > 0 
            ? `+${Number(coefficient.data.content.questionnaireCoefficient)*100}%`
            : (Number(coefficient.data.content.questionnaireCoefficient) < 0 ? `${Number(coefficient.data.content.questionnaireCoefficient)*100}%` : `0%`)
          }
        }
        }, 100)
    },
    async initTerm() {
      const data = await this.$store.dispatch('resource/AdditionTermsType', this.industry.Value)
      this.additionTermsList = data.data.content.additionTermsDetails.filter(i => i.isPlaceEnable)
      this.termsInit()
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
              if(item.isSuggest && this.InsuranceActive == 0) {
                terms[item.additionTermName] = {
                  selected: true,
                }
              } else {
                if(this.termsData[item.additionTermName]) {
                  terms[item.additionTermName] = {
                    selected: this.termsData[item.additionTermName].selected,
                  }
                } else {
                  terms[item.additionTermName] = {
                    selected: false,
                  }
                }
              }
            }
          } else {
            if(['758A','911','PL013'].includes(item.additionTermId)) {
              item.disable = true
              terms[item.additionTermName] = {
                selected: true,
              }
            } else {
              if(item.isSuggest && this.InsuranceActive == 0) {
                terms[item.additionTermName] = {
                  selected: true,
                }
              } else {
                if(this.termsData[item.additionTermName]) {
                  terms[item.additionTermName] = {
                    selected: this.termsData[item.additionTermName].selected,
                  }
                } else{
                  terms[item.additionTermName] = {
                    selected: false,
                  }
                }
              }
            }
          }
        })
      this.termsData = terms
      if((this.InsuranceActive !==0 && !this.quotationData.placeInsureInfo)) return
      this.additionTermsList.map(item => {//自訂條款
          let target = null
          if(this.InsuranceActive ==0 && !this.orderNo) {
            target = Object.keys(this.quotationData).length > 0 && this.quotationData.additionTerms.find(i => i.additionTermId === item.additionTermId) ? this.quotationData.additionTerms.find(i => i.additionTermId === item.additionTermId) : null
          } else {
            target = Object.keys(this.quotationData).length > 0 && this.quotationData.placeInsureInfo.additionTerms.find(i => i.additionTermId === item.additionTermId && i.additionTermName === item.additionTermName)
          }
          if (!target && !['758A','911','PL013'].includes(item.additionTermId)) {
            const copyTerms = { ...this.termsData }
            copyTerms[item.additionTermName].selected = false
            this.$store.dispatch(`place/updatedTerms`, copyTerms)
          } else {
            const copyTerms = { ...this.termsData }
            copyTerms[item.additionTermName].selected = true
            this.$store.dispatch(`place/updatedTerms`, copyTerms)
          }
        })
    },
    async pageInit() {
      const places = await this.$store.dispatch('resource/PlacesSetting')
      const districts = await this.$store.dispatch('resource/Districts')
      const county = await this.$store.dispatch('resource/CountyMinimumSettings')
      const underwriteLevel = await this.$store.dispatch('underwriteLevelSetting/GetUserUnderwriteLevel')
      await this.getAttachmentList()
      if(underwriteLevel.data.content.underwriteLevel) {
        this.underwriteLevel = underwriteLevel.data.content.underwriteLevel
      }
      places.data.content.map(item => {
        if(!this.industryType.includes(item.typeName)) {
          this.industryType.push(item.typeName)
        }
      })
      this.industryList = places.data.content
      districts.data.content.map(item => {
        this.countyList.push({
          ...item,
          Value: item.cityId,
          Text: item.cityName
        })
        item.countyDistricts.map(subItem => {
          this.areaList.push({
            ...subItem,
            Value: subItem.areaId,
            Text: subItem.areaName
          })
        })
      })
      this.countyAmount = county.data.content
      if(this.industry.Value) {
        const data = await this.$store.dispatch('resource/AdditionTermsType', this.industry.Value)
        this.additionTermsList = data.data.content.additionTermsDetails.filter(i=> i.isPlaceEnable)
        this.termsInit()
      }
      if((this.InsuranceActive !== 0 || this.orderNo || this.mainOrderNo) ) {//報價明細更正、複製時塞資料
        await this.step1InitAssignValue('place')
        this.AssignQuestionnaire('place')
        if(this.quotationData.questionnaire){await this.questionnaireCoefficient(this.InsuranceActive == 7)}
        if(this.InsuranceActive == 7) {
          if(this.quotationData.insuranceAmounts[0].insuranceAmount)this.$store.dispatch('common/updatedCalculateModel',true)//核保時，如果有保額，鎖著輸入欄位
          if(!this.quotationData.insuranceAmounts[0].insuranceAmount)this.$store.dispatch('place/updatedUnderwriteQuotationIsChange',true)//核保時，如果沒有保額，預設為核保單變更
          const underwriteStatus = await this.$store.dispatch('underwrite/GetUnderwriteStatusParameter', this.orderNo)
          this.underwriteStatus = underwriteStatus.data.content
          await this.calculateAmount(false)
        }
      }
    },
    correctAmount() {
      this.insuranceAmountListData = {
        ...this.insuranceAmountListData,
        amount: '',
      }
      this.$store.dispatch('common/updatedCalculateModel',false)
    },
    async calculateAmount(open) {
      if(this.InsuranceActive == 7) {
        this.placeAuditCalculateAmount({
        additionTermCoefficientParameter: this.insuranceAmountListData.amount == 'NT$ - -' ? '' : this.insuranceAmountListData.parameter.additionTermCoefficientParameter,
        aggAOACoefficient: this.insuranceAmountListData.amount == 'NT$ - -' ? '' : this.insuranceAmountListData.parameter.aggAOACoefficient,
        mutiSizeParameter: this.insuranceAmountListData.amount == 'NT$ - -' ? '' : this.insuranceAmountListData.parameter.mutiSizeParameter,
        sizeCofficient: this.insuranceAmountListData.amount == 'NT$ - -' ? '' : this.insuranceAmountListData.parameter.sizeParameter,
        hexTypeBasicAmount: '',
        type: 'audit'
      },open)
        return
      }
      this.verifyRequired('place', true)
      if(this.requestFile.length === 0 &&
        this.verifyResult.length === 0) {
        const data = {
          renewal: {isRenewal: this.renewal.IsRenewal, insuranceNumber: this.renewal.InsuranceNumber},
          placeActivitySeq: this.industry.Value,
          questionnaire: null,
          placeType: this.industryList.find(item => item.dangerSeq == this.industry.Value).typeName,
          insuranceRecord: this.InsuranceRecordTable,
          insuranceBeginDate: `${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day}`,
          insuranceBeginHour: this.period.startDate.hour?this.period.startDate.hour:'0',
          insuranceEndDate: `${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day}`,
          insuranceEndHour: this.period.endDate.hour? this.period.endDate.hour.toString() : '0',
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
                      itemValue: key =='value1' ? Number(this.additionTerms[item.additionTermId][key].toString().replace(/,/g,''))*10000 : this.additionTerms[item.additionTermId][key].toString().replace(/,/g,'')
                    }
                  })]
                }
              } else if (['PL040','PL049','PL016'].includes(item.additionTermId)) {
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: Number(this.additionTerms[item.additionTermId][key].toString().replace(/,/g,''))*10000
                    }
                  })]
                }
              } else {
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: this.additionTerms[item.additionTermId][key].toString().replace(/,/g,'')
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
          placeInfo:[...this.placeInfo.map(item => {
            return {
              squareFeet: Number(item.squareFeet.toString().replace(/,/g, '')),
            }
          })],
          amountType: Number(this.insuranceAmountList[0].amountType.Value) >1 ? 2 : this.insuranceAmountList[0].amountType.Value,
          perBodyAmount: Number(this.insuranceAmountList[0].perBodyAmount.toString().replace(/,/g, '')) * 10000,
          perAccidentBodyAmount: Number(this.insuranceAmountList[0].perAccidentBodyAmount.toString().replace(/,/g, '')) * 10000,
          perAccidentFinanceAmount: Number(this.insuranceAmountList[0].perAccidentFinanceAmount.toString().replace(/,/g, '')) * 10000,
          insuranceTotalAmount: Number(this.insuranceAmountList[0].insuranceTotalAmount.toString().replace(/,/g, '')) * 10000,
          mergeSingleAmount: Number(this.insuranceAmountList[0].mergeSingleAmount.toString().replace(/,/g, '')) * 10000,
          selfInflictedAmount: this.insuranceAmountList[0].selfInflictedAmount.Value,
          remark: this.remark.text,
        }
        if(this.questionnaireFinished || this.quotationData.questionnaire) {
          this.questionnaireMapping(data)
        }
        this.$store.dispatch('common/updatedCalculateModel',true)
        const res = await this.$store.dispatch('quotation/GetPlaceInsuranceProjectAmount',{data})
        if(!res.data.content) {
          Popup.create({
            headerText: '',
            hasHtml: true,
            htmlText: res.data.message,
          })
        }
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
        } else if (this.InsuranceActive == 7) {
          this.openAudit = true
        }
      }
    },
    async getAttachmentList() {
      const AttachmentDetails = await this.$store.dispatch('common/AttachmentDetails', {policyAttachmentId: this.uuid})
      this.attachmentList = AttachmentDetails.data.content
    },
    async clearAll() {
      this.$store.dispatch('place/clearAll')
      await Promise.all(this.attachmentList.map(item => {
        return this.$store.dispatch('common/DeleteFile', {policyAttachmentId: item.policyAttachmentId, fileAttachmentId: item.id})
      }))
      this.$store.dispatch('place/updatedUUID', '')
      this.$store.dispatch('common/updateOrderNo' ,{orderNo: '',mainOrderNo:''})
      location.reload()
    },
    quotationMapping() {
      const data = {
        policyAttachmentId: this.uuid,
        questionnaire: this.questionnaireFinished ? this.questionnaire : null,
        renewal: {isRenewal: this.renewal.IsRenewal, insuranceNumber: this.renewal.InsuranceNumber},
        insuranceRecord: {
          lastYear: {
            status: this.InsuranceRecord.lastYear.status,
            averagePremium: this.InsuranceRecord.lastYear.averagePremium,
            claimAmount: this.InsuranceRecord.lastYear.claimAmount,
          },
          previousYear: {
            status: this.InsuranceRecord.previousYear.status,
            averagePremium: this.InsuranceRecord.previousYear.averagePremium,
            claimAmount: this.InsuranceRecord.previousYear.claimAmount,
          }
        },
        insurancePeriod: {
          startDate: `${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day}`,
          startHour: this.period.startDate.hour ? this.period.startDate.hour.toString() : '0',
          endDate: `${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day}`,
          endHour: this.period.endDate.hour? this.period.endDate.hour.toString() : '0',
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
                  itemValue: key =='value1' ? Number(this.additionTerms[item.additionTermId][key].toString().replace(/,/g,''))*10000 : this.additionTerms[item.additionTermId][key].toString().replace(/,/g,'')
                }
              })]
            }
          } else if(['PL040','PL049','PL016'].includes(item.additionTermId)) {
            return {
              additionTermId: item.additionTermId,
              additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                return {
                  itemId: key,
                  itemValue: Number(this.additionTerms[item.additionTermId][key].toString().replace(/,/g,''))*10000
                }
              })]
            }
          } else if(this.additionTerms[item.additionTermId]) {
            return {
              additionTermId: item.additionTermId,
              additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                return {
                  itemId: key,
                  itemValue: this.additionTerms[item.additionTermId][key].toString().replace(/,/g,'')
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
        insureIndustryOtherText: this.industryText,
        remark: this.remark.text,
        insuranceAmounts:[...this.insuranceAmountList.map(item => {
          delete item.amount
          return {
            ...item,
            amountType: item.amountType.Value,
            selfInflictedAmount: item.selfInflictedAmount.Value,
            perBodyAmount: Number(item.perBodyAmount.toString().replace(/,/g,'')) * 10000,
            perAccidentBodyAmount: Number(item.perAccidentBodyAmount.toString().replace(/,/g,'')) * 10000,
            perAccidentFinanceAmount: Number(item.perAccidentFinanceAmount.toString().replace(/,/g,'')) * 10000,
            insuranceTotalAmount: Number(item.insuranceTotalAmount.toString().replace(/,/g,'')) * 10000,
            mergeSingleAmount: Number(item.mergeSingleAmount.toString().replace(/,/g,'')) * 10000,
          }
        })],
      }
      
      if(this.questionnaireFinished) {
        this.questionnaireMapping(data)
      }
      if(this.InsuranceActive !==0) {
        data.applicant = this.quotationData.applicant ? JSON.parse(JSON.stringify(this.quotationData.applicant)) : quotation().Applicant
        data.insuraned = this.quotationData.insuraned ? JSON.parse(JSON.stringify(this.quotationData.insuraned)) : quotation().Insuraned
        data.internalControlData = this.quotationData.internalControlData ? JSON.parse(JSON.stringify(this.quotationData.internalControlData)) : quotation().internalControlData
        data.relationText = this.quotationData.relationText
        data.policyTransfer = this.quotationData.policyTransfer ? JSON.parse(JSON.stringify(this.quotationData.policyTransfer)) : quotation().policyTransfer
      }
      this.$store.dispatch('place/updatePlaceQuotation', data)
      console.log(data)
    },
    questionnaireMapping(data) {
      data.questionnaire = JSON.parse(JSON.stringify(this.questionnaire))
      data.questionnaire = {
          ...data.questionnaire,
          part2: {
            ...this.questionnaire.part2,
            buildingNature: this.questionnaire.part2.buildingNature.Value,
            nearbyBuildingNature: this.questionnaire.part2.nearbyBuildingNature.Value,
            securityCheck: this.questionnaire.part2.securityCheck.Value,
            room: {...this.questionnaire.part2.room,roomAmount: this.questionnaire.part2.room.value},
            seat: {...this.questionnaire.part2.seat,seatAmount: this.questionnaire.part2.seat.value},
          }
        }
        if(Object.keys(this.questionnaire.part1.createTime).every(key => this.questionnaire.part1.createTime[key] !== '')) {
          data.questionnaire.part1.createTime = `${Number(this.questionnaire.part1.createTime.year)+1911}-${this.questionnaire.part1.createTime.month}-${this.questionnaire.part1.createTime.day}`
        } else data.questionnaire.part1.createTime = null

        if(Object.keys(this.questionnaire.part1.businessStartDate).every(key => this.questionnaire.part1.businessStartDate[key])) {
          data.questionnaire.part1.businessStartDate = `${this.questionnaire.part1.businessStartDate.hours}:${this.questionnaire.part1.businessStartDate.minutes}`
        } else data.questionnaire.part1.businessStartDate = null

        if(Object.keys(this.questionnaire.part1.businessEndDate).every(key => this.questionnaire.part1.businessEndDate[key])) {
          data.questionnaire.part1.businessEndDate = `${this.questionnaire.part1.businessEndDate.hours}:${this.questionnaire.part1.businessEndDate.minutes}`
        } else data.questionnaire.part1.businessEndDate = null
        return data
    },
    async updateUnderwrite(type) {
      Popup.create({
        hasHtml: true,
				maskClose: false,
				confirm: true,
				ok: '是',
				cancel: '否',
				htmlText: `<p>確定此報價單不予核保？</p>`,
      }).then(async()=> {
        await this.$store.dispatch('underwrite/UpdateUnderwriteProcess', {orderno: this.orderNo, processType: type})
        this.$store.dispatch('common/updatedCalculateModel', false)
        this.$store.dispatch(`place/updatedInsuranceActive`,0)
        this.$router.push('/quotation-ist?tag=1')
        this.$store.dispatch('place/clearAll')
        this.$store.dispatch('place/updatedUUID', '')
        this.$store.dispatch('common/updateOrderNo',{orderNo: '',mainOrderNo: ''})
      })
    }
  },
  async mounted() {
    await this.pageInit()
    this.termsInit()
    if(!this.uuid){
      this.$store.dispatch('place/updatedUUID', uuidv4())
    }
    // if(this.InsuranceActive == 0) {
    //   this.$store.dispatch('common/updateOrderNo', {orderNo: '',mainOrderNo: ''})
    // }
    if(this.InsuranceActive !== 7) {
      this.$store.dispatch('place/updatedQuestionnaire', {...this.questionnaire,userId: this.userInfo.userid})
    }
    if(!this.period.startDate.year && !this.period.startDate.month && !this.period.startDate.day && !this.period.startDate.hour) {
      let date = {
        startDate: {
          year: new Date().getFullYear()-1911,
          month: new Date().getMonth() + 1,
          day: new Date().getHours() > 12 ? new Date().getDate()+1 : new Date().getDate(),
          hour: 12,
        }
      }
      if((new Date().getFullYear()%4) == 0) {
          const leapYear = new Date(`${new Date().getFullYear()}-02-29`).getTime()
          const startDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`).getTime()
          if(new Date().getMonth()+1 !== 2 && new Date().getDate()!==29) {
            date = {
              ...date,
              endDate: {
                year: new Date().getFullYear()-1911,
                month: new Date().getMonth() + 1,
                day:28,
                hour: 12,
              }
            }
          } else if(leapYear > startDate) {
            const newYear = new Date(startDate).getTime()+(1000*60*60*24*366)
            date = {
              ...date,
              endDate: 
                { year: new Date(newYear).getFullYear()-1911,
                  month: new Date(newYear).getMonth()+1,
                  day: new Date().getHours() > 12 ? new Date(newYear).getDate()+1 : new Date(newYear).getDate(),
                  hour: 12,
                }
              }
          } else {
            date = {
            ...date,
            endDate: {
                year: (new Date().getFullYear() + 1)-1911,
                month: new Date().getMonth()+1,
                day: new Date().getHours() > 12 ? new Date().getDate()+1 : new Date().getDate(),
                hour: 12
              }
            }
          }
        } else {
          date = {
            ...date,
            endDate: {
                year: (new Date().getFullYear() + 1)-1911,
                month: new Date().getMonth()+1,
                day: new Date().getHours() > 12 ? new Date().getDate()+1 : new Date().getDate(),
                hour: 12
              }
          }
        }
        this.periodData = date
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