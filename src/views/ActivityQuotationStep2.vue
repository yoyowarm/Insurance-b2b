<template>
  <div>
    <CommonBoard class="w-full mb-7" title="被保險人資料">
      <InsuranceInfo
        :marginTop="marginTop"
        :info.sync="InsuranedData"
        :nationalities="nationalities"
        :cityList="cityList"
        :areaList="InsuranedAreaList.filter(item => item.cityId == InsuranedData.City.Value)"
        @checkID="() =>checkID('Insuraned')"
        type="InsuranedData"
        @getDetail="(type) =>insuredOrApplicantDetail('Insuraned',type)"
        :disable="InsuranceActive == 1 || InsuranceActive == 3"
      />
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="被保人與要保人之關係">
      <div class="column-5">
        <InputGroup class="col-span-2 w-full mb-2.5" noMt :disable="InsuranceActive == 1 || InsuranceActive == 3">
          <Select
            slot="input"
            :disable="InsuranceActive == 1 || InsuranceActive == 3"
            defaultText="選擇關係"
            :options="relationShips"
            :selected="Relation.Value"
            @emitItem="(item) => $store.dispatch('activity/updatedRelation', item)"
          />
        </InputGroup>
      </div>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="要保險人資料">
      <Checkbox
        id="sameAsInsured"
        class="absolute ml-36"
        text="同被保人"
        slot="right"
        :checked="sameAsInsured"
        :value="sameAsInsured"
        @updateValue="(e) => {
          $store.dispatch('activity/sameAsInsured', e);
          $store.dispatch('activity/updatedRelation', {Text: '本人', Value: 'RL00'});
        }"
      />
      <InsuranceInfo
        :disable="sameAsInsured || Relation.Value =='RL00' || InsuranceActive == 1 || InsuranceActive == 3"
        :marginTop="marginTop"
        :info.sync="ApplicantData"
        :nationalities="nationalities"
        :cityList="cityList"
        :areaList="ApplicantAreaList.filter(item => item.cityId == ApplicantData.City.Value)"
         @checkID="() =>checkID('Applicant')"
         @getDetail="(type) =>insuredOrApplicantDetail('Applicant',type)"
         type="ApplicantData"
      />
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="內控資料" v-if="InsuranceActive!==2" :disable="InsuranceActive == 1 || InsuranceActive == 3">
      <BrokerInfo :disable="InsuranceActive == 1 || InsuranceActive == 3" :brokerList="businessSource" :data.sync="internalControl" @getBusinessSource="getBusinessSource"/>
    </CommonBoard>
    <div class="flex flex-row justify-center items-center w-full mt-8">
      <Button v-if="InsuranceActive!==2" @click.native="prevStep" class="my-8 mr-6 w-40 md:w-64 " outline>上一步</Button>
      <Button @click.native="nextStep" class="my-8 w-40 md:w-64 ">{{ InsuranceActiveText[InsuranceActive] }}</Button>
    </div>
    <WindowResizeListener @resize="handleResize"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import InsuranceInfo from '@/components/Common/InsuranceInfo'
import WindowResizeListener from '@/components/WindowResizeListener'
import LoadingScreen from '@/components/LoadingScreen.vue'
import BrokerInfo from '@/components/Common/BrokerInfo.vue'
import mixinVerify from '@/utils/mixins/verifyStep2'
import routeChange from '@/utils/mixins/routeChange'
import editCopyQuotation from '@/utils/mixins/editCopyQuotation'
// import { quotationStep2 } from '@/utils/dataTemp'
// import { Popup } from '@/utils/popups/index'
import { mapState } from 'vuex'
export default {
  mixins: [mixinVerify, editCopyQuotation,routeChange],
  components: {
    CommonBoard,
    Button,
    Checkbox,
    InputGroup,
    Select,
    InsuranceInfo,
    WindowResizeListener,
    LoadingScreen,
    BrokerInfo,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      nationalities: [],
      relationShips: [],
      cityList: [],
      businessSource: [],
      InsuranedAreaList: [],
      ApplicantAreaList: [],
      detailArea: '',
      InsuranceActiveText: {
        0:'產生報價單',
        1:'更正報價單',
        2:'修改要被保人',
        3: '新增序號'
      }
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'Insuraned': state => state.activity.Insuraned,
      'Relation': state => state.activity.Relation,
      'Applicant': state => state.activity.Applicant,
      'sameAsInsured': state => state.activity.sameAsInsured,
      'InsuranceActive': state => state.activity.InsuranceActive,
      'step1Model': state => state.activity.step1Model,
      activityInfo: state => state.activity.activityInfo,
      internalControlData: state => state.activity.internalControlData,
      activityQuotation: state => state.activity.activityQuotation,
      orderNo: state => state.common.orderNo,
      mainOrderNo: state => state.common.mainOrderNo,
      quotationData: state => state.activity.quotationData,
    }),
    InsuranedData: {
      get() {
        return this.Insuraned
      },
      set(value) {
        this.$store.dispatch('activity/updatedInsuraned', value)
        if(this.Relation.Value === 'RL00') {
          this.ApplicantData = value
        }
      }
    },
    ApplicantData: {
      get() {
        return this.Applicant
      },
      set(value) {
        this.$store.dispatch('activity/updatedApplicant', value)
      }
    },
    internalControl: {
      get() {
        return this.internalControlData
      },
      set(value) {
        this.$store.dispatch('activity/updateInternalControlData', value)
      }
    },
  },
  watch: {
    Relation: {
      handler(value) {
        if(value.Value === 'RL00') {
          this.$store.dispatch('activity/sameAsInsured', true)
        } else {
          this.$store.dispatch('activity/sameAsInsured', false)
        }
      },
      deep: true
    },
  },
  methods: {
    marginTop (width = 1180) {
      return this.windowWidth <= width
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async checkID(type) {
      console.log(type)
      // const checkID = await this.$store.dispatch('verify/idOrRegisterNumberFormatOK', {input:this[type].ID, type:1})
      // if(!checkID.data.IsSuccess) {
      //   Popup.create({
      //     hasHtml: true,
      //     htmlText: checkID.data.Message,
      //   })
      // } else if (checkID.data.IsSuccess ) {
      //   this.$store.dispatch(`quotationStep2/updated${type}`, {...this[`${type}Data`], ...{ CorporateRequired: checkID.data.Contain.IsRegister }})
      // }
    },
    async insuredOrApplicantDetail (type,params) {
      const detail = await this.$store.dispatch(`quotation/Get${type}`, {[params== 'Name' ? 'name': 'id']: this[type][params]})
      const detailData = detail.data.content
      const data = {}
      Object.assign(data, {
        ID: detailData.id,
        Name: detailData.name,
        IsForeigner: detailData.isForeigner,
        Nationality: detailData.nationalityName ? this.nationalities.find(i => i.Text == detailData.nationalityName) : { Text: '', Value: '' },
        CorporateName: detailData.corporateName,
        City: this.cityList.find(i => i.Value == detailData.cityId) ? this.cityList.find(i => i.Value == detailData.cityId) : { Text: '', Value: '' },
        Area: this.ApplicantAreaList.find(i => i.areaId == detailData.areaId)? this.ApplicantAreaList.find(i => i.areaId == detailData.areaId): { Text: '', Value: '' } ,
        subAddress: detailData.subAddress,
        Mobile: detailData.mobile,
        IsForeignRegister: detailData.isForeignRegister,
        RegisterNationality: detailData.registerNationality !== '本國' ? (this.nationalities.find(i => i.Text == detailData.registerNationality)?this.nationalities.find(i => i.Text == detailData.registerNationality):{Text: '', Value: ''}) : { Text: '', Value: '' },
        Profession: detailData.isProfession,
        IsPolitician: detailData.isPolitician,
        overseasOrDomestic: Boolean(detailData.overseasOrDomestic),
        IsProOrNot: detailData.isProOrNot,
      })
      this.$store.dispatch(`activity/updated${type}`, data)
    },
    async step2Init() {
      const result = await Promise.all([
        await this.$store.dispatch('resource/Nationality'),
        await this.$store.dispatch('resource/BusinessSource'),
        await this.$store.dispatch('resource/Relationships'),
        await this.$store.dispatch('resource/Districts')
      ])
      const nationalities = result[0]
      const businessSource = result[1]
      const relationShips = result[2]
      const districts = result[3]
      districts.data.content.map(item => {
        this.cityList.push({
          ...item,
          Value: item.cityId,
          Text: item.cityName
        })
        item.countyDistricts.map(subItem => {
          this.InsuranedAreaList.push({
            ...subItem,
            cityCode: item.cityCode,
            cityId: item.cityId,
            Value: subItem.areaId,
            Text: subItem.areaName
          })
          this.ApplicantAreaList.push({
            ...subItem,
            cityCode: item.cityCode,
            cityId: item.cityId,
            Value: subItem.areaId,
            Text: subItem.areaName
          })
        })
      })
      this.nationalities = nationalities.data.content.map(item => {
        return {
          ...item,
          Value: item.countryNum,
          Text: item.countryName
        }
      })
      this.relationShips = relationShips.data.content.map(item => {
        return {
          ...item,
          Value: item.code,
          Text: item.nane
        }
      })
      this.businessSource = businessSource.data.content.map(item => {
        return {
          ...item,
          Value: item.code,
          Text: item.name
        }
      })
      if(this.InsuranceActive !== 0 || this.orderNo || this.mainOrderNo) {
        this.step2InitAssignValue('activity')
      }
    },
    async getBusinessSource() {
      const businessSource = await this.$store.dispatch('resource/BusinessSourceByTaianUser', { employeeId: this.internalControl.issuerNumber })
      if(businessSource.data.content.length > 0) {
        this.businessSource = businessSource.data.content.map(item => {
        return {
          ...item,
          Value: item.code,
          Text: item.name
        }
      })
      }
    },
    async nextStep() {
      this.verifyResult = []
      this.verifySalesInvadeResult = []
      this.verifyRequired('activity', this.InsuranceActive)
      await this.verifyUser()
      if(this.requestFile.length === 0) {
        await this.verifyFinal()
      }
    },
    prevStep() {
      if(this.InsuranceActive !== 0 || this.orderNo) {
        const data = {
          ...this.quotationData,
            applicant: {},
            insuraned: {},
            internalControlData: {},
            relationText: '',
          }
        this.$store.dispatch('activity/updatedQuotationData', data)
      }
      this.$router.push('/activity-quotation/step1')
    },
    async verifyFinal() {
      if(this.verifyResult.length === 0 && this.verifySalesInvadeResult.length === 0) {
        await this.quotationMapping()
        this.$router.push('/activity-quotation/step3')
      }
    },
    async quotationMapping() {
       const obj = JSON.parse(JSON.stringify(this.activityQuotation))
       console.log(obj)
      Object.assign(obj, {insuraned:{
        ...this.Insuraned,
        cityId: this.Insuraned.City.Value,
        city: this.Insuraned.City.Text,
        areaId: this.Insuraned.Area.Value,
        area: this.Insuraned.Area.Text,
        zipCode: this.ApplicantAreaList.find(item => item.Value == this.Insuraned.Area.Value).zipCode,
        nationalityName: this.Insuraned.Nationality.Text,
        corporateName: this.Insuraned.CorporateName,
        registerNationality: this.Insuraned.RegisterNationality.Text,
        overseasOrDomestic: Number(this.Insuraned.overseasOrDomestic)
      }})
      Object.assign(obj, {relationId:this.Relation.Value})
      Object.assign(obj, {relationText:this.Relation.Text})
      Object.assign(obj, {applicant:{
        ...this.Applicant,
        cityId: this.Applicant.City.Value,
        city: this.Applicant.City.Text,
        areaId:this.Applicant.Area.Value ,
        area: this.Applicant.Area.Text,
        zipCode: this.ApplicantAreaList.find(item => item.Value == this.Applicant.Area.Value).zipCode,
        nationalityName: this.Applicant.Nationality.Text,
        corporateName: this.ApplicantAreaList.CorporateName,
        registerNationality: this.Applicant.RegisterNationality.Text,
        overseasOrDomestic: Number(this.Applicant.overseasOrDomestic)
      }})
      Object.assign(obj, {internalControlData: {
        issuerNumber: this.internalControlData.issuerNumber,
        businessSourceCode: this.internalControlData.businessSourceCode.Value,
        statisticsCode: this.internalControlData.statisticsCode,
        loginIdNumber: this.internalControlData.loginIdNumber,}
      })
      delete obj.insuraned.City
      delete obj.insuraned.Area
      delete obj.insuraned.Nationality
      delete obj.insuraned.RegisterNationality
      delete obj.applicant.City
      delete obj.applicant.Area
      delete obj.applicant.Nationality
      delete obj.applicant.RegisterNationality

      if(this.InsuranceActive == 1) {
        if(this.quotationData.questionnaire) {
          obj.questionnaire = this.quotationData.questionnaire
        }
        obj.orderNo = this.orderNo
        obj.mainOrderNo = this.mainOrderNo
        await this.$store.dispatch('quotation/UpdateActivityQuotation', obj)
      } else if (this.InsuranceActive == 2) {
        obj.mainOrderNo = this.mainOrderNo
        await this.$store.dispatch('quotation/EditQuotationApplicantInsured', obj)
      } else if (this.InsuranceActive == 3) {
        obj.mainOrderNo = this.mainOrderNo
        await this.$store.dispatch('quotation/AddActivityQuotationSerialNo', obj)
      } else {
        const insert = await this.$store.dispatch('quotation/AddActivityQuotation', obj)
        this.$store.dispatch('common/updateOrderNo',insert.data.content.orderNo)
      }
    }
  },
  async mounted() {
    await this.step2Init() 
  },
}
</script>

<style scoped lang="scss">
</style>