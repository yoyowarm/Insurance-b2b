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
      <Button @click.native="nextStep" class="my-8 w-40 md:w-64 ">{{ InsuranceActive == 0 ? '產生報價單' : '修改報價單' }}</Button>
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
import { mapState } from 'vuex'
export default {
  mixins: [mixinVerify, editCopyQuotation,routeChange],
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
      orderNo: state => state.common.orderNo,
      quotationData: state => state.place.quotationData,
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
      const detail = await this.$store.dispatch(`quotation/Get${type}`, {name: this[type].Name, id: this[type].ID})
      const detailData = detail.data.content
      const data = {}
      Object.assign(data, {
        ID: detailData.id,
        Name: detailData.name,
        IsForeigner: detailData.isForeigner,
        Nationality: detailData.nationalityName ? this.nationalities.find(i => i.Text == detailData.nationalityName) : { Text: '', Value: '' },
        Corporate: detailData.corporateName,
        City: this.cityList.find(i => i.Value == detailData.cityId),
        Area: this.ApplicantAreaList.find(i => i.areaId == detailData.areaId),
        subAddress: detailData.subAddress,
        Mobile: detailData.mobile,
        IsForeignRegister: detailData.isForeignRegister,
        RegisterNationality: detailData.registerNationality !== '本國' ? this.nationalities.find(i => i.Text == detailData.registerNationality) : { Text: '', Value: '' },
        Profession: detailData.isProfession,
        IsPolitician: detailData.isPolitician,
        overseasOrDomestic: Boolean(detailData.overseasOrDomestic),
        IsProOrNot: detailData.isProOrNot,
      })
      this.$store.dispatch(`place/updated${type}`, data)
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

      if(this.InsuranceActive !== 0 || this.orderNo) {
        this.step2InitAssignValue('place')
      }
    },
    async nextStep() {
      this.verifyResult = []
      this.verifySalesInvadeResult = []
      this.verifyRequired('place')
      if(this.requestFile.length === 0) {
        await this.verifyFinal()
      }
    },
    async verifyFinal() {
      if(this.verifyResult.length === 0 && this.verifySalesInvadeResult.length === 0) {
        await this.quotationMapping()
        this.$router.push('/place-quotation/step3')
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
            subAddress: item.subAddress,
            countyCode: this.cityList.find(i => i.Value == item.city.Value).cityCode,
          }
        })],})
      Object.assign(obj, {insuraned:{
        ...this.Insuraned,
        cityId: this.Insuraned.City.Value,
        city: this.Insuraned.City.Text,
        areaId: this.Insuraned.Area.Value,
        area: this.Insuraned.Area.Text,
        zipCode: this.ApplicantAreaList.find(item => item.Value == this.Insuraned.Area.Value).zipCode,
        nationalityName: this.Insuraned.Nationality.Text,
        registerNationality: this.Insuraned.RegisterNationality.Text,
        overseasOrDomestic: Number(this.Insuraned.overseasOrDomestic)
      }})
      Object.assign(obj, {relationId:this.Relation.Value})
      Object.assign(obj, {relationText:this.Relation.Text})
      Object.assign(obj, {applicant:{
        ...this.Applicant,
        cityId: this.Applicant.City.Value,
        city: this.Applicant.City.Text,
        areaId: this.Applicant.Area.Value ,
        area: this.Applicant.Area.Text,
        zipCode: this.ApplicantAreaList.find(item => item.Value == this.Applicant.Area.Value).zipCode,
        nationalityName: this.Applicant.Nationality.Text,
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

      if(this.InsuranceActive !== 0) {
        Object.assign(obj, {orderNo:this.orderNo})
        await this.$store.dispatch('quotation/UpdatePlaceQuotation', obj)
      } else {
        const insert = await this.$store.dispatch('quotation/AddPlaceQuotation', obj)
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