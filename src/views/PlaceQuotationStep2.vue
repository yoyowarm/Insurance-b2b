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
        @getDetail="() =>insuredOrApplicantDetail('Insuraned')"
      />
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="經營處所地址">
      <Address :lists.sync="placeInfoData" :cityList="cityList" :areaList="ApplicantAreaList"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="被保人與要保人之關係">
      <div class="column-5">
        <InputGroup class="col-span-2 w-full mb-2.5" noMt>
          <Select
            slot="input"
            defaultText="選擇關係"
            :options="relationShips"
            :selected="Relation.Value"
            @emitItem="(item) => $store.dispatch('place/updatedRelation', item)"
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
          $store.dispatch('place/sameAsInsured', e);
          $store.dispatch('place/updatedRelation', {Text: '本人', Value: 'RL00'});
        }"
      />
      <InsuranceInfo
        :marginTop="marginTop"
        :info.sync="ApplicantData"
        :nationalities="nationalities"
        :cityList="cityList"
        :areaList="ApplicantAreaList.filter(item => item.cityId == ApplicantData.City.Value)"
         @checkID="() =>checkID('Applicant')"
         @getDetail="() =>insuredOrApplicantDetail('Applicant')"
         type="ApplicantData"
      />
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="內控資料">
      <BrokerInfo :brokerList="businessSource" :data.sync="internalControl"/>
    </CommonBoard>
    <div class="flex flex-row justify-center items-center w-full mt-8">
      <DynamicLink type="router" path="/place-quotation/step1" >
        <Button class="my-8 mr-6 w-40 md:w-64 " outline>上一步</Button>
      </DynamicLink>
      <Button @click.native="nextStep" class="my-8 w-40 md:w-64 ">產生報價單</Button>
    </div>
    <WindowResizeListener @resize="handleResize"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'
import DynamicLink from '@/components/DynamicLink'
import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import InsuranceInfo from '@/components/Common/InsuranceInfo'
import WindowResizeListener from '@/components/WindowResizeListener'
import LoadingScreen from '@/components/LoadingScreen.vue'
import BrokerInfo from '@/components/Common/BrokerInfo.vue'
import Address from '@/components/Place/Address'
import mixinVerify from '@/utils/mixins/verifyStep2'
import routeChange from '@/utils/mixins/routeChange'
import editCopyQuotation from '@/utils/mixins/editCopyQuotation'
// import { quotationStep2 } from '@/utils/dataTemp'
import { Popup } from '@/utils/popups/index'
import { mapState } from 'vuex'
export default {
  mixins: [mixinVerify, routeChange, editCopyQuotation],
  components: {
    CommonBoard,
    Button,
    DynamicLink,
    Checkbox,
    InputGroup,
    Select,
    InsuranceInfo,
    WindowResizeListener,
    LoadingScreen,
    BrokerInfo,
    Address
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      nationalities: [],
      relationShips: [],
      cityList: [],
      areaList: [],
      businessSource: [],
      InsuranedAreaList: [],
      ApplicantAreaList: [],
      detailArea: ''
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'Insuraned': state => state.place.Insuraned,
      'Relation': state => state.place.Relation,
      'Applicant': state => state.place.Applicant,
      'sameAsInsured': state => state.place.sameAsInsured,
      'InsuranceActive': state => state.place.InsuranceActive,
      'step1Model': state => state.place.step1Model,
      placeInfo: state => state.place.placeInfo,
      internalControlData: state => state.place.internalControlData,
      placeQuotation: state => state.place.placeQuotation,
    }),
    InsuranedData: {
      get() {
        return this.Insuraned
      },
      set(value) {
        this.$store.dispatch('place/updatedInsuraned', value)
      }
    },
    ApplicantData: {
      get() {
        return this.Applicant
      },
      set(value) {
        this.$store.dispatch('place/updatedApplicant', value)
      }
    },
    internalControl: {
      get() {
        return this.internalControlData
      },
      set(value) {
        this.$store.dispatch('place/updateInternalControlData', value)
      }
    },
    placeInfoData: {
      get() {
        return this.placeInfo
      },
      set(value) {
        this.$store.dispatch('place/updatedPlaceInfo', value)
      }
    },
  },
  watch: {
    Relation: {
      handler(value) {
        if(value.Value === 'RL00') {
          this.$store.dispatch('place/sameAsInsured', true)
        } else {
          this.$store.dispatch('place/sameAsInsured', false)
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
    async insuredOrApplicantDetail (type) {
      console.log(type)
      // const data = {
      //   identity: 1,
      //   ID: ''
      // }
      // const TypeKey = type === 'Insuraned' ? '被保人' : '要保人'
      // if(type === 'Insuraned') {
      //   data.ID = this.Insuraned.ID
      // } else {
      //   data.ID = this.Applicant.ID
      //   data.identity = 0
      // }
      // const detail = await this.$store.dispatch('resource/insuredOrApplicantDetail', data)
      // if(detail.data.Msg) {
      //   return Popup.create({
      //     hasHtml: true,
      //     htmlText: detail.data.Msg,
      //   })
      // }
      // const detailData = detail.data[TypeKey]
      // const copyData = quotation().Insuraned
      // if(detailData) {
      //   let Nationality = {}
      //   let RegisterNationality = {}
      //   let City = {}
      //   let Area = {}
      //   if(detailData.Nationality) {
      //     Nationality = this.nationalities.find(item => item.Value === detailData.Nationality)
      //     if(Nationality) {
      //      Nationality.placeholder = Nationality.Text
      //      Nationality.id = Nationality.Value
      //     }
      //   }
      //   if(detailData.RegisterNationality) {
      //     RegisterNationality = this.nationalities.find(item => item.Value === detailData.RegisterNationality)
      //     if(RegisterNationality) {
      //      RegisterNationality.placeholder = RegisterNationality.Text
      //      RegisterNationality.id = RegisterNationality.Value
      //     }
      //   }
      //   if(detailData.City) {
      //     City = this.cityList.find(item => item.Value === detailData.City)
      //     if(City) {
      //       City.placeholder = City.Text
      //       City.id = City.Value
            
      //     }
      //   }
      //   if(detailData.Area) {
      //     this.detailArea = detailData.Area
      //     Area = this[`${type}AreaList`].find(item => item.Value == detailData.Area)
      //     if (Area) {
      //       Area.placeholder = Area.Text
      //       Area.id = Area.Value
      //     } else {
      //       this.detailArea = detailData.Area
      //     }
      //   }
      //   Object.assign(copyData, {
      //     ID: detailData.ID,
      //     Name: detailData.Name,
      //     IsForeigner: detailData.IsForeigner,
      //     Nationality,
      //     RegisterNationality,
      //     Corporate: detailData.Corporate,
      //     CorporateRequired: detailData.Corporate ? true : false,
      //     City: City? City: { placeholder: '選擇縣市', id: ''},
      //     Area: Area? Area: {placeholder: '選擇區域',id: '',},
      //     Street: detailData.Street,
      //     Mobile: detailData.Mobile,
      //     IsForeignRegister: detailData.IsForeignRegister,
      //     Profession: detailData.Profession,
      //     IsPolitician: detailData.IsPolitician,
      //     overseasOrDomestic: detailData.overseasOrDomestic,
      //     IsProOrNot: detailData.IsProOrNot,
      //   })
      //   this[`${type}Data`] = copyData
      // }
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
            Value: subItem.zipCode,
            Text: subItem.areaName
          })
          this.ApplicantAreaList.push({
            ...subItem,
            cityCode: item.cityCode,
            cityId: item.cityId,
            Value: subItem.zipCode,
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
      // this.cityList = cityList.data
      // if(this.Applicant.City.id) {
      //   const areaList = await this.$store.dispatch('resource/areaByCityID', this.Applicant.City.id)
      //   this.ApplicantAreaList = areaList.data
      // }
      // if(this.Insuraned.City.id) {
      //   const areaList = await this.$store.dispatch('resource/areaByCityID', this.Insuraned.City.id)
      //   this.InsuranedAreaList = areaList.data
      // }
      // if(this.InsuranceActive !== 0) {
      //   this.step2InitAssignValue()
      //   this.step2InitAssignArea()
      // }
    },
    async nextStep() {
      this.verifyResult = []
      this.verifySalesInvadeResult = []
      this.verifyRequired()
      if(this.requestFile.length === 0) {
        // await this.verifyIdOrRegisterNumberFormat()
        // await this.verifyResultPopup()
        await this.verifyFinal()
      }
      
      // this.verifyResult = []
      // this.verifyRequired()
      // if(this.requestFile.length === 0) {
      //   await this.verifySalesInvade()
      //   await this.verifyIdOrRegisterNumberFormat()
      //   this.verifyResultPopup()
      //   if(this.verifyResult.length === 0) {
      //     Popup.create({
      //       hasHtml: true,
      //       htmlText: '<p>檢核完成！</p>',
      //     })
      //     const {IsSuccess, SerailNo} = await this.quotationMapping()
      //     if(IsSuccess) {
      //       this.$store.dispatch('quotationStep1/updatedInsuranceActive', 0)
      //       this.$store.dispatch('quotationStep2/updatedSerailNo', SerailNo)
      //       this.$router.push('/quotation/step3')
      //     } else {
      //       Popup.create({
      //       hasHtml: true,
      //       htmlText: `<p>${SerailNo}，請洽承辦人員</p>`,
      //     })
      //     }
      //   }
      // }
    },
    async verifyFinal() {
      if(this.verifyResult.length === 0 && this.verifySalesInvadeResult.length === 0) {
        Popup.create({
          hasHtml: true,
          htmlText: '<p>檢核完成！</p>',
        })
        const data = await this.quotationMapping()
        this.$router.push('/place-quotation/step3')
        this.$store.dispatch('common/updateOrderNo',data.data.content.orderNo)
        // if(IsSuccess) {
        //   this.$store.dispatch('quotationStep1/updatedInsuranceActive', 0)
        //   this.$store.dispatch('quotationStep2/updatedSerailNo', SerailNo)
        // } else {
        //   Popup.create({
        //   hasHtml: true,
        //   htmlText: `<p>${SerailNo}，請洽承辦人員</p>`,
        // })
        // }
      }
    },
    async quotationMapping() {
      const obj = JSON.parse(JSON.stringify(this.placeQuotation))
      Object.assign(obj, {placeInfo: [...this.placeInfo.map(item => {
          return {
            squareFeet: item.squareFeet,
            holdState: item.holdState ? 1 : 0,
            cityId: item.city.Value,
            city: item.city.Text,
            areaId: item.area.Value,
            area: item.area.Text,
            subAddress: item.address,
            countyCode: this.cityList.find(i => i.Value == item.city.Value).cityCode,
          }
        })],})
      Object.assign(obj, {insuraned:{
        ...this.Insuraned,
        cityId: this.Insuraned.City.Value,
        city: this.Insuraned.City.Text,
        areaId: this.ApplicantAreaList.find(item => item.Value == this.Insuraned.Area.Value).areaId,
        area: this.Insuraned.Area.Text,
        zipCode: this.Insuraned.Area.Value,
        nationalityName: this.Insuraned.Nationality.Value,
        overseasOrDomestic: Number(this.Insuraned.overseasOrDomestic)
      }})
      Object.assign(obj, {relationId:this.Relation.Value})
      Object.assign(obj, {relationText:this.Relation.Text})
      Object.assign(obj, {applicant:{
        ...this.Applicant,
        cityId: this.Applicant.City.Value,
        city: this.Applicant.City.Text,
        areaId: this.ApplicantAreaList.find(item => item.Value == this.Applicant.Area.Value).areaId,
        area: this.Applicant.Area.Text,
        zipCode: this.Applicant.Area.Value,
        nationalityName: this.Applicant.Nationality.Value,
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
      delete obj.applicant.City
      delete obj.applicant.Area

      const insert = await this.$store.dispatch('quotation/AddPlaceQuotation', obj)
      console.log(insert)
    }
  },
  async mounted() {
    await this.step2Init() 
  },
}
</script>

<style scoped lang="scss">
</style>