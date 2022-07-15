<template>
  <div>
    <CommonBoard class="w-full mb-7" title="被保險人資料">
      <InsuranceInfo
        :marginTop="marginTop"
        :info.sync="InsuranedData"
        :nationalities="nationalities"
        :cityList="cityList"
        :areaList="InsuranedAreaList"
        @checkID="() =>checkID('Insuraned')"
        type="InsuranedData"
        @getDetail="() =>insuredOrApplicantDetail('Insuraned')"
      />
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="活動處所地址">
      <Address :lists="activityInfo"/>
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="被保人與要保人之關係">
      <div class="column-5">
        <InputGroup class="col-span-2 w-full mb-2.5" noMt>
          <Select
            slot="input"
            defaultText="選擇關係"
            :options="relationShips"
            :selected="Relation.Value"
            @emitItem="(item) => $store.dispatch('quotationStep2/updatedRelation', item)"
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
          $store.dispatch('quotationStep2/sameAsInsured', e);
          $store.dispatch('quotationStep2/updatedRelation', {Text: '本人', Value: 'RL00'});
        }"
      />
      <InsuranceInfo
        :marginTop="marginTop"
        :info.sync="ApplicantData"
        :nationalities="nationalities"
        :cityList="cityList"
        :areaList="ApplicantAreaList"
         @checkID="() =>checkID('Applicant')"
         @getDetail="() =>insuredOrApplicantDetail('Applicant')"
         type="ApplicantData"
      />
    </CommonBoard>
    <CommonBoard class="w-full mb-7" title="內控資料">
      <BrokerInfo/>
    </CommonBoard>
    <div class="flex flex-row justify-center items-center w-full mt-8">
      <DynamicLink type="router" path="/activity-quotation/step1" >
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
import Address from '@/components/Activity/Address'
import mixinVerify from '@/utils/mixins/verifyStep2'
import routeChange from '@/utils/mixins/routeChange'
import editCopyQuotation from '@/utils/mixins/editCopyQuotation'
import { formatDate } from '@/utils/dateFormat'
// import { quotationStep2 } from '@/utils/dataTemp'
// import { Popup } from '@/utils/popups/index'
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
      InsuranedAreaList: [],
      ApplicantAreaList: [],
      detailArea: ''
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
    }),
    InsuranedData: {
      get() {
        return this.Insuraned
      },
      set(value) {
        this.$store.dispatch('activity/updatedInsuraned', value)
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
  },
  watch: {
    // 'Insuraned.City': async function(val, odlVal) {
    //   if(val.id === odlVal.id) return
    //   const areaList = await this.$store.dispatch('resource/areaByCityID', this.Insuraned.City.id)
    //   this.InsuranedAreaList = areaList.data
    //   if(this.InsuranceActive !== 0) {
    //     this.step2InitAssignArea()
    //   }
    //   if(this.detailArea) {
    //     const Area = this.InsuranedAreaList.find(item => item.Value == this.detailArea)
    //     if (Area) {
    //       Area.activityholder = Area.Text
    //       Area.id = Area.Value
    //       this.InsuranedData = Object.assign( {...this.InsuranedData}, {Area})
    //     }
    //     this.detailArea = ''
    //   }
    // },
    // 'Applicant.City': async function(val, odlVal) {
    //   if(val.id === odlVal.id) return
    //   const areaList = await this.$store.dispatch('resource/areaByCityID', this.Applicant.City.id)
    //   this.ApplicantAreaList = areaList.data
    //   if(this.InsuranceActive !== 0) {
    //     this.step2InitAssignArea()
    //   }
    //   if(this.detailArea) {
    //     const Area = this.ApplicantAreaList.find(item => item.Value == this.detailArea)
    //     if (Area) {
    //       Area.activityholder = Area.Text
    //       Area.id = Area.Value
    //       this.ApplicantData = Object.assign( {...this.ApplicantData}, {Area})
    //     }
    //     this.detailArea = ''
    //   }
    // },
    Relation: {
      handler(value) {
        if(value.Value === 'RL00') {
          this.$store.dispatch('quotationStep2/sameAsInsured', true)
        } else {
          this.$store.dispatch('quotationStep2/sameAsInsured', false)
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
      //      Nationality.activityholder = Nationality.Text
      //      Nationality.id = Nationality.Value
      //     }
      //   }
      //   if(detailData.RegisterNationality) {
      //     RegisterNationality = this.nationalities.find(item => item.Value === detailData.RegisterNationality)
      //     if(RegisterNationality) {
      //      RegisterNationality.activityholder = RegisterNationality.Text
      //      RegisterNationality.id = RegisterNationality.Value
      //     }
      //   }
      //   if(detailData.City) {
      //     City = this.cityList.find(item => item.Value === detailData.City)
      //     if(City) {
      //       City.activityholder = City.Text
      //       City.id = City.Value
            
      //     }
      //   }
      //   if(detailData.Area) {
      //     this.detailArea = detailData.Area
      //     Area = this[`${type}AreaList`].find(item => item.Value == detailData.Area)
      //     if (Area) {
      //       Area.activityholder = Area.Text
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
      //     City: City? City: { activityholder: '選擇縣市', id: ''},
      //     Area: Area? Area: {activityholder: '選擇區域',id: '',},
      //     Street: detailData.Street,
      //     Mobile: detailData.Mobile,
      //     IsForeignRegister: detailData.IsForeignRegister,
      //     Profession: detailData.Profession,
      //     IsPolitician: detailData.IsPolitician,
      //     IsOverseasOrDomestic: detailData.IsOverseasOrDomestic,
      //     IsProOrNot: detailData.IsProOrNot,
      //   })
      //   this[`${type}Data`] = copyData
      // }
    },
    async step2Init() {
      const result = await Promise.all([
        await this.$store.dispatch('resource/nationalities'),
        await this.$store.dispatch('resource/relationShips'),
        await this.$store.dispatch('resource/cityList')
      ])
      const nationalities = result[0]
      const relationShips = result[1]
      const cityList = result[2]
      this.nationalities = nationalities.data
      this.relationShips = relationShips.data
      this.cityList = cityList.data
      if(this.Applicant.City.id) {
        const areaList = await this.$store.dispatch('resource/areaByCityID', this.Applicant.City.id)
        this.ApplicantAreaList = areaList.data
      }
      if(this.Insuraned.City.id) {
        const areaList = await this.$store.dispatch('resource/areaByCityID', this.Insuraned.City.id)
        this.InsuranedAreaList = areaList.data
      }
      if(this.InsuranceActive !== 0) {
        this.step2InitAssignValue()
        this.step2InitAssignArea()
      }
    },
    async nextStep() {
      this.$router.push('/activity-quotation/step3')
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
    async quotationMapping() {
      const obj = {
        step2ViewModel: {
          Insuraned: {},
          Relation: '',
          Applicant: {},
          Paper: {}
        }
      }
      const model = {...this.step1Model}
      if(this.InsuranceActive === 0) {
        model.InsuranceActive = 0
        delete model.OrderNo
        delete model.SerialNo
      }
      model.CreateDate = formatDate(new Date())
      Object.assign(obj, model)
      Object.assign(obj.step2ViewModel.Insuraned, this.Insuraned)
      Object.assign(obj.step2ViewModel, {Relation:this.Relation.Value})
      Object.assign(obj.step2ViewModel.Applicant, this.Applicant)
      Object.assign(obj.step2ViewModel.Paper, this.Paper)
      Object.keys(obj.step2ViewModel.Insuraned).map(key => {
        if(typeof obj.step2ViewModel.Insuraned[key] === 'object') {
          if(obj.step2ViewModel.Insuraned[key] === null ) {
            delete obj.step2ViewModel.Insuraned[key]
          } else {
          obj.step2ViewModel.Insuraned[key] = obj.step2ViewModel.Insuraned[key].id
          }
        }
      })
      Object.keys(obj.step2ViewModel.Applicant).map(key => {
        if(typeof obj.step2ViewModel.Applicant[key] === 'object') {
          if(obj.step2ViewModel.Applicant[key] === null) { 
            delete obj.step2ViewModel.Insuraned[key]
          } else {
            obj.step2ViewModel.Applicant[key] = obj.step2ViewModel.Applicant[key].id
          }
        }
      })
      obj.step2ViewModel.Paper.InsuredReciepts.map(item => {
        Object.assign(item, {
          Title: item.Title,
          Charge: item.Charge,
          OriginalNumber: 1,
          CopyNumber: item.CopyNumber,
        })
      })
      obj.step2ViewModel.Paper.IsRecieptChoseOther = Boolean(obj.step2ViewModel.Paper.IsRecieptChoseOther)
      obj.step2ViewModel.Insuraned.IsForeignRegister = Number(obj.step2ViewModel.Insuraned.IsForeignRegister)
      obj.step2ViewModel.Applicant.IsForeignRegister = Number(obj.step2ViewModel.Applicant.IsForeignRegister)
      const insert = await this.$store.dispatch('quotation/insertQuotation', obj)
      return insert.data
    }
  },
  async mounted() {
    // await this.step2Init() 
  },
}
</script>

<style scoped lang="scss">
</style>