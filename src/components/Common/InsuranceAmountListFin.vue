<template>
  <div class="w-full">
    <CommonBoard v-for="(item,index) in copyLists" :key="index" :selected="item.isSelected || copyLists.length == 1">
      <div v-if="false" class="column-5" :class="{'dashed-border': !viewModel}">
        <InputGroup title="金額" class="col-span-2" :borderBtn="viewModel" :editModel="editModel" disableWhite>
          <Select
            v-if="!viewModel"
            slot="input"
            :options="amountList"
            :selected="item.amountType?item.amountType.toString():''"
            @emitItem="e=>{updatedValue(index,'amountType',e.Value);assignAmount(index)}"
            disableWhite
            defaultText="請選擇金額"/>
            <div v-if="viewModel" slot="input">{{item.amountType ==0 ? '依各縣市規定' : (item.amountType ==1 ? '合併單一限額' : '自行輸入保額')}}</div>
        </InputGroup>
        <div v-if="amountMinimum.countyName && item.amountType == 0" class="mt-10 col-span-2">當有多個處所且跨縣市時，將採用最高縣市保額，目前採用 {{amountMinimum.countyName}} 保額</div>
      </div>
      <div class="column-5 pt-5" :class="{'dashed-border': !viewModel}">
        <InputGroup v-if="item.amountType != 1" title="每一個人體傷責任金額" :borderBtn="viewModel" :editModel="editModel" disableWhite>
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perBodyAmount? numFormat(item.perBodyAmount.toString()): ''"
            @updateValue="(e) => {updatedValue(index,'perBodyAmount',e);assignAmount(index)}"
            placeholder="請輸入金額"
            disableWhite
            numberOnly
            unit="萬元"/>
            <div v-else slot="input">{{item.perBodyAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="每一意外事故體傷責任金額" :borderBtn="viewModel" :editModel="editModel" disableWhite>
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perAccidentBodyAmount? numFormat(item.perAccidentBodyAmount.toString()): ''"
            @updateValue="(e) => updatedValue(index,'perAccidentBodyAmount',e)"
            placeholder="請輸入金額"
            disableWhite
            numberOnly
            unit="萬元"/>
            <div v-else slot="input">{{item.perAccidentBodyAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="每一意外事故財物損失責任金額" :borderBtn="viewModel" :editModel="editModel" disableWhite>
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perAccidentBodyAmount? numFormat(item.perAccidentFinanceAmount.toString()): ''"
            @updateValue="(e) => updatedValue('perAccidentFinanceAmount',e)"
            placeholder="請輸入金額"
            disableWhite
            numberOnly
            unit="萬元"/>
            <div v-else slot="input">{{item.perAccidentFinanceAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="本保險契約之最高賠償金額" :borderBtn="viewModel" :editModel="editModel" disableWhite>
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.insuranceTotalAmount? numFormat(item.insuranceTotalAmount.toString()): ''"
            @updateValue="(e) => updatedValue(index,'insuranceTotalAmount',e)"
            placeholder="請輸入金額"
            disableWhite
            numberOnly
            unit="萬元"/>
            <div v-else slot="input">{{item.insuranceTotalAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType == 1" title="單一限額" disableWhite>
        <Input
          v-if="!viewModel"
          slot="input"
          :value="numFormat(item.mergeSingleAmount)"
          @updateValue="(e) => updatedValue(index,'mergeSingleAmount',e)"
          placeholder="請輸入金額"
          disableWhite
          numberOnly
          unit="萬元"/>
          <div v-else slot="input">{{item.mergeSingleAmount}}</div>
      </InputGroup>
      </div>
      <div class="column-5">
        <InputGroup title="自負額" :borderBtn="viewModel" :editModel="editModel" disableWhite>
          <Select
            v-if="!viewModel"
            slot="input"
            :options="selfPayList"
            :selected="item.selfInflictedAmount?item.selfInflictedAmount.toString():''"
            defaultText="請選擇金額"
            disableWhite
            @emitItem="(e) => updatedValue(index,'selfInflictedAmount',e.Value)"/>
            <div v-else slot="input">{{item.selfInflictedAmount}}</div>
        </InputGroup>
      </div>
      <div class="flex flex-row justify-center relative mt-4">
          <PaymentItem slot="input" keyName="保費共計" :value="item.insuranceAmount && InsuranceActive !==8? numFormat(item.insuranceAmount.toString()) : '請洽核保'" :unit="Boolean(item.insuranceAmount&&item.insuranceAmount!== '請洽核保') && InsuranceActive!==8" totalStyle/>
          <div class="cursor-pointer mt-2" @click="() =>{openFormula = true;selectedIndex = index}" v-if="item.insuranceAmount && item.insuranceAmount!== '請洽核保' && InsuranceActive == 7">
            <font-awesome-icon class="text-xl text-main ml-2" icon="info-circle" />
          </div>
      </div>
      <div class="button-group">
        <Button class="h-12" :class="{'mr-6': windowWidth > 750}" @click.native="downloadFile('insurance', item)" outline>預覽要保書</Button>
        <Button class=" h-12" :class="{'mr-6': windowWidth > 750}" @click.native="downloadFile('', item)" outline>預覽報價單</Button>
        <Button class="h-12" :class="{'col-span-2':underwriteCoefficient}" @click.native="downloadFile('questionnaire', item)" outline>預覽詢問表<span v-if="underwriteCoefficient">({{underwriteCoefficient}})</span></Button>
        <!-- <Button :class="{'mr-6': windowWidth > 750}" v-if="!copyLists.some(item => item.isSelected)" @click.native="AddInsuranceProject(index)" outline>保存</Button> -->
        <!-- <Button :class="{'col-span-2': windowWidth < 750}" v-if="!copyLists.some(item => item.isSelected)" @click.native="updateInsuranceProject(index)" outline>編輯投保資料</Button> -->
        <Button v-if="viewModel && editModel">修改保費</Button>
      </div>
    </CommonBoard>
    <PopupDialog
      :open.sync="openFormula"
    >
    <ul v-if="parameter.amount">
      <li>處所基本費率:{{parameter.basicFee}}</li>
      <li>高保額係數:{{parameter.finalHC}}</li>
      <li>規模細數:{{parameter.sizeParameter}}</li>
      <li>自負額係數:{{parameter.selfInflictedParameter}}</li>
      <li>短期費率:{{parameter.shortPeriodParameter}}</li>
      <li>附加費用率:{{parameter.additionalCostParameter}}</li>
      <li>多處所係數:{{parameter.mutiSizeParameter}}</li>
      <li>期間係數:{{parameter.periodParameter}}</li>
      <li v-if="parameter.underwriteCoefficient">核保加減費系數:{{parameter.underwriteCoefficient}}</li>
      <li>附加險條款費用係數:{{parameter.additionTermCoefficientParameter}}</li>
      <li v-if="parameter.termPL005Fee">PL005:{{parameter.termPL005Fee}}</li>
      <li v-if="parameter.termPL058Fee">PL058:{{parameter.termPL058Fee}}</li>
      <li>AGG > AOA *2係數:{{parameter.aggAOACoefficient}}</li>
      <li>總保費:{{parameter.amount}}</li>
    </ul>
    <p v-if="parameter.mutiSizeParameter > 0">{{`(處所基本費率(${parameter.basicFee})*高保額係數(${parameter.finalHC})*規模細數(${parameter.sizeParameter})*多處所係數(${parameter.mutiSizeParameter})*(1+自負額係數(${parameter.selfInflictedParameter}))*(1 + 核保加減費系數(${parameter.underwriteCoefficient}))*(1+附加險條款費用係數(${parameter.additionTermCoefficientParameter}))*(1+AGG > AOA *2係數(${parameter.aggAOACoefficient}))*短期費率(${parameter.shortPeriodParameter})/(1-附加費用率(${parameter.additionalCostParameter})+PL005(${parameter.termPL005Fee})+PL058(${parameter.termPL058Fee}))=總保費(${parameter.amount})`}}</p>

    <p v-if="parameter.periodParameter > 0">{{`(處所基本費率(${parameter.basicFee})*高保額係數(${parameter.finalHC})*規模係數(${parameter.sizeParameter})*期間係數(${parameter.periodParameter})*(1+自負額係數(${parameter.selfInflictedParameter}))*(1 + 核保加減費系數(${parameter.underwriteCoefficient}))*(1+附加險條款費用係數(${parameter.additionTermCoefficientParameter}))*(1+AGG > AOA *2係數(${parameter.aggAOACoefficient}))/(1-附加費用率(${parameter.additionalCostParameter})+PL005(${parameter.termPL005Fee})+PL058(${parameter.termPL058Fee}))=總保費(${parameter.amount})`}}</p>
    </PopupDialog>
    <div v-if="!viewModel && !copyLists.some(item => item.isSelected)" class="flex flex-row justify-center mt-8">
      <!-- <Button @click.native="addAmount" outline>新增保費額度</Button> -->
    </div>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import PaymentItem from '@/components/PaymentItem'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
import Button from '@/components/Button'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import WindowResizeListener from '@/components/WindowResizeListener'
import { mapState } from 'vuex'
import { Popup } from '@/utils/popups'
import { numFormat } from '@/utils/regex'
import FileSaver from 'file-saver'

export default {
  components: {
    CommonBoard,
    InputGroup,
    Input,
    Select,
    Button,
    PaymentItem,
    PopupDialog,
    WindowResizeListener
  },
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    infoList: {
      type: Array,
      default: () => []
    },
    disable: {
      type: Boolean,
      default: false
    },
    orderNo: {
      type: String,
      default: ''
    },
    countyAmount: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    InsuranceActive: {
      type: Number,
      default: 0
    },
    parameter: {
      type: Object,
      default: () => {}
    },
    underwriteCoefficient: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      numFormat,
      windowWidth: window.innerWidth,
      selfPayList: [
        {Value: 0, Text: '0元'},
        {Value: 2500, Text: '2,500元'},
        {Value: 5000, Text: '5,000元'},
        {Value: 10000, Text: '10,000元'},
        {Value: 50000, Text: '50,000元'},
        {Value: 100000, Text: '100,000元'},
        {Value: 200000, Text: '200,000元'},
      ],
      amountList: [
         {Value: 1, Text: '合併單一限額'},
        {Value: 2, Text: '自行輸入保額'},
        {Value: 4, Text: '200萬/1000萬/200萬/2400萬'},
        {Value: 5, Text: '200萬/2000萬/200萬/3600萬'},
        {Value: 6, Text: '300萬/1500萬/200萬/3400萬'},
        {Value: 7, Text: '300萬/1500萬/200萬/4800萬'},
        {Value: 8, Text: '300萬/1500萬/300萬/3600萬'},
        {Value: 9, Text: '300萬/2000萬/300萬/2400萬'},
        {Value: 10, Text: '300萬/3000萬/300萬/4800萬'},
        {Value: 11, Text: '600萬/3000萬/300萬/6600萬'},
      ],
      copyLists: [...this.lists],
      openFormula: false,
      selectedIndex: 0
    }
  },
  computed: {
    ...mapState({
      editModel: state => state.common.editModel,
      viewModel: state => state.common.viewModel,
      mainOrderNo: state => state.common.mainOrderNo
    }),
    amountMinimum() {
      const arr = []
      this.infoList.map(item => {
        const target = this.countyAmount.find(i => i.countyName.includes(item.city? item.city.slice(0,3): ''))
        if (target) {
          arr.push(target)
        }
      })
      arr.sort((a, b) => {
        return a.perBodyAmount - b.perBodyAmount
      })
      return arr.length > 0 
        ? {...arr[arr.length -1]}
        : {
          countyName: '',
          perBodyAmount: this.lists[0].perBodyAmount,
          perAccidentBodyAmount: this.lists[0].perBodyAmount,
          perAccidentFinanceAmount: this.lists[0].perAccidentFinanceAmount,
          insuranceTotalAmount: this.lists[0].insuranceTotalAmount,
          selfInflictedAmount: this.lists[0].selfInflictedAmount}
    }
  },
  watch: {
    lists: {
      handler(val) {
        this.copyLists = [...val]
      },
      deep: true
    },
    openFormula: {
       handler() {
        console.log(this.lists)
      }
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async downloadFile(type) {
      if (type === 'insurance') {
        const res = await this.$store.dispatch('common/GetInsuranceDocument', this.orderNo)
        var blob = new Blob([res.data], {type: "application/octet-stream"});
        FileSaver.saveAs(blob,  `要保書_${this.orderNo}.pdf`);
      } else if (type === 'questionnaire') {
        const res = await this.$store.dispatch(`common/GetQuestionnaireDocument`,{placeActivityType:this.type =='place'? 1: 2,orderNo: this.orderNo})
        if(res.data.size < 100) {
          this.$emit('update:open',false)
          Popup.create({
            hasHtml: true,
            htmlText: '詢問表尚未填寫',
          })
        } else {
          var blob2 = new Blob([res.data], {type: "application/octet-stream"});
          FileSaver.saveAs(blob2, `${this.type =='place'?'處所': '活動'}詢問表_${this.orderNo}.pdf`);
        }
      } else {
        const res = await this.$store.dispatch(`common/${this.type == 'place' ? 'GetPlaceQuotationDocument' : 'GetActivityQuotationDocument'}`,this.orderNo)
        var blob1 = new Blob([res.data], {type: "application/octet-stream"});
        FileSaver.saveAs(blob1, `${this.type == 'place' ?'處所': '活動'}報價單_${this.orderNo}.pdf`);

      }
    },
    addAmount() {
      this.$emit('update:lists', [...this.lists,{...this.lists[this.lists.length -1],selected:false,insuranceAmount: '- -',fixed :false, id: '' }])
    },
    updatedValue(index,key,e) {
      const lists = [...this.lists]
      if(key =='selected') {
        lists.map(item => item[key] = false)
      }
      lists[index][key] = e
      this.$emit('update:lists',lists)
    },
    updateFixed(index) {
      const lists = [...this.lists]
      lists[index].fixed = false
      this.$emit('update:lists',lists)
    },
    async getAmount(index) {
      const lists = [...this.lists]
      const data = {
        orderNo: this.orderNo,
        amountType: lists[index].amountType,
        perBodyAmount: lists[index].perBodyAmount * 10000,
        perAccidentBodyAmount: lists[index].perAccidentBodyAmount * 10000,
        perAccidentFinanceAmount: lists[index].perAccidentFinanceAmount * 10000,
        insuranceTotalAmount: lists[index].insuranceTotalAmount * 10000,
        mergeSingleAmount: lists[index].mergeSingleAmount * 10000,
        selfInflictedAmount: lists[index].selfInflictedAmount,
      }
      if(data.selfInflictedAmount == '請選擇金額' || data.amountType == '請選擇金額' || data.perBodyAmount === '' || data.perAccidentBodyAmount === '' || data.perAccidentFinanceAmount === '' || data.insuranceTotalAmount === '' || data.mergeSingleAmount === '') {
        Popup.create({
          hasHtml: true,
          htmlText: '輸入資料不完整',
        })
      } else {
        lists.map(item => item.fixed = false)
        lists[index].fixed = true
        this.$emit('update:lists',lists)
        const amount = await this.$store.dispatch('quotation/GetInsuranceProjectAmount',{data})
        console.log(amount)
        lists[index].insuranceAmount = amount.data.content.amount? amount.data.content.amount: '請洽核保'
        if(amount.data.content.amount) {
          lists[index].parameter = amount.data.content.parameter
        }
        if(amount.data.content.quotationReason && amount.data.content.quotationReason.length > 0) {
          Popup.create({
            headerText: '請洽核保原因',
            hasHtml: true,
            htmlText: amount.data.content.quotationReason.join('<br>'),
          })
        }
        this.$emit('update:lists',lists)
      }
      
    },
    async updateInsuranceProject() {
      await this.quotationDetail(this.type)
      this.$store.dispatch(`${this.type}/updatedInsuranceActive`,1)
      this.$router.push({name: `${this.type}-quotation-step1`})
    },
    async quotationDetail(type) {
      const detail = await this.$store.dispatch(`quotation/Get${type == 'place'? 'Place': 'Activity'}QuotationDetail`, {orderno:this.orderNo, mainOrderNo: this.mainOrderNo})
      const data = {
        ...detail.data.content,
        insuranceAmounts: detail.data.content.insuranceAmounts.map((item,index) => {
          return {
            ...item,
            // eslint-disable-next-line no-prototype-builtins
            selected: item.hasOwnProperty('isSelected') ? item.isSelected : (index == 0 ? true : false),
            fixed: false,
            insuranceTotalAmount: item.insuranceTotalAmount/10000,
            mergeSingleAmount: item.mergeSingleAmount/10000,
            perAccidentBodyAmount: item.perAccidentBodyAmount/10000,
            perAccidentFinanceAmount: item.perAccidentFinanceAmount/10000,
            perBodyAmount: item.perBodyAmount/10000,
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
            }
          }
        })
      }
      this.$store.dispatch(`${type}/updatedQuotationData`,data)
    },
    async AddInsuranceProject(index) {
      const data = {
        orderNo: this.orderNo,
        amountType: this.lists[index].amountType,
        perBodyAmount: this.lists[index].perBodyAmount * 10000,
        perAccidentBodyAmount: this.lists[index].perAccidentBodyAmount * 10000,
        perAccidentFinanceAmount: this.lists[index].perAccidentFinanceAmount * 10000,
        insuranceTotalAmount: this.lists[index].insuranceTotalAmount * 10000,
        mergeSingleAmount: this.lists[index].mergeSingleAmount * 10000,
        selfInflictedAmount: this.lists[index].selfInflictedAmount,
      }
      let res
      if(this.lists[index].id) {
        data.InsuranceProjectId = this.lists[index].id
         res = await this.$store.dispatch('quotation/EditInsuranceProject',{data})
      } else {
        res = await this.$store.dispatch('quotation/AddInsuranceProject',{data})
        
      }
      if(res.data.code === 0) {
          Popup.create({
          hasHtml: true,
          htmlText: res.data.message,
        })
        }
      this.$emit('getQuotationDetail')
    },
    assignAmount(index) {
      if(this.copyLists[index].amountType == 0) {
        this.copyLists[index] = {
          ...this.copyLists[index],
          perBodyAmount: this.amountMinimum.perBodyAmount,
          perAccidentBodyAmount: this.amountMinimum.perAccidentBodyAmount,
          perAccidentFinanceAmount: this.amountMinimum.perAccidentFinanceAmount,
          insuranceTotalAmount: this.amountMinimum.insuranceTotalAmount,
          selfInflictedAmount: this.copyLists[index].selfInflictedAmount
        }
        this.$emit('update:lists',this.copyLists)
      }
      if(this.copyLists[index].amountType == 2) {
        this.copyLists[index] = {
          ...this.copyLists[index],
          perBodyAmount: this.copyLists[index].perBodyAmount,
          perAccidentBodyAmount: Number(this.copyLists[index].perBodyAmount) * 5,
          perAccidentFinanceAmount: Number(this.copyLists[index].perBodyAmount),
          insuranceTotalAmount: Number(this.copyLists[index].perBodyAmount) * 12,
          selfInflictedAmount: this.copyLists[index].selfInflictedAmount
        }
        this.$emit('update:lists',this.copyLists)
      }
    }
  },
  mounted() {
    this.copyLists = [...this.lists]
    if (this.type == 'place') {
      this.amountList = [{Value: 0, Text: '依各縣市規定'},
        {Value: 1, Text: '合併單一限額'},
        {Value: 2, Text: '自行輸入保額'},]
    }
  }
}
</script>

<style scoped lang="scss">
  .button-group {
    @apply flex flex-row justify-center mt-8
  }
  @media screen and (max-width: 750px) {
    .button-group {
      @apply grid grid-cols-2 gap-6
    }
  }
</style>