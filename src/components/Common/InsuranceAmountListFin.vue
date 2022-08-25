<template>
  <div class="w-full">
    <CommonBoard v-for="(item,index) in copyLists" :key="index" :title="`方案${index+1}、保險金額/自負額(新台幣元)`" :selected="item.isSelected || copyLists.length == 1">
      <Checkbox
        :id="`${index}selected`"
        class="text-md"
        text="選擇此保險金額"
        slot="right"
        :checked="item.isSelected || copyLists.length == 1"
        :value="item.isSelected || copyLists.length == 1"
        :disabled="true"
      />
      <div class="column-5" :class="{'dashed-border': !viewModel}">
        <InputGroup title="金額" class="col-span-2" :borderBtn="viewModel" :editModel="editModel" :disable="disable || item.fixed">
          <Select
            v-if="!viewModel"
            slot="input"
            :options="amountList"
            :selected="item.amountType?item.amountType.toString():''"
            @emitItem="e=>{updatedValue(index,'amountType',e.Value);assignAmount(index)}"
            :disable="disable || item.fixed"
            defaultText="請選擇金額"/>
            <div v-if="viewModel" slot="input">{{item.amountType ==0 ? '依各縣市規定' : (item.amountType ==1 ? '合併單一限額' : '自行輸入保額')}}</div>
        </InputGroup>
        <div v-if="amountMinimum.countyName && item.amountType == 0" class="mt-10 col-span-2">處所行跨多縣市時，將採用最高縣市保額，目前採用 {{amountMinimum.countyName}} 費率</div>
      </div>
      <div class="column-5 pt-5" :class="{'dashed-border': !viewModel}">
        <InputGroup v-if="item.amountType != 1" title="每一個人體傷責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType == 0 || disable || item.fixed">
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perBodyAmount? item.perBodyAmount.toString(): ''"
            @updateValue="(e) => {updatedValue(index,'perBodyAmount',e);assignAmount(index)}"
            placeholder="請輸入金額"
            :disable="item.amountType == 0 || disable || item.fixed"
            numberOnly
            unit="萬元"/>
            <div v-else slot="input">{{item.perBodyAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="每一意外事故體傷責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType == 0 || disable || item.fixed">
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perAccidentBodyAmount?item.perAccidentBodyAmount.toString(): ''"
            @updateValue="(e) => updatedValue(index,'perAccidentBodyAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType == 0 || disable || item.fixed"
            numberOnly
            unit="萬元"/>
            <div v-else slot="input">{{item.perAccidentBodyAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="每一意外事故財物損失責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType == 0 || disable || item.fixed">
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perAccidentBodyAmount?item.perAccidentFinanceAmount.toString(): ''"
            @updateValue="(e) => updatedValue('perAccidentFinanceAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType == 0 || disable || item.fixed"
            numberOnly
            unit="萬元"/>
            <div v-else slot="input">{{item.perAccidentFinanceAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="本保險契約之最高賠償金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType == 0 || disable || item.fixed">
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.insuranceTotalAmount?item.insuranceTotalAmount.toString(): ''"
            @updateValue="(e) => updatedValue(index,'insuranceTotalAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType == 0 || disable || item.fixed"
            numberOnly
            unit="萬元"/>
            <div v-else slot="input">{{item.insuranceTotalAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType == 1" title="單一限額" :disable="disable || item.fixed">
        <Input
          v-if="!viewModel"
          slot="input"
          :value="item.mergeSingleAmount"
          @updateValue="(e) => updatedValue(index,'mergeSingleAmount',e)"
          placeholder="請輸入金額"
          :disable="disable || item.fixed"
          numberOnly
          unit="萬元"/>
          <div v-else slot="input">{{item.mergeSingleAmount}}</div>
      </InputGroup>
      </div>
      <div class="column-5">
        <InputGroup title="自負額" :borderBtn="viewModel" :editModel="editModel" :disable="disable || item.fixed">
          <Select
            v-if="!viewModel"
            slot="input"
            :options="selfPayList"
            :selected="item.selfInflictedAmount?item.selfInflictedAmount.toString():''"
            defaultText="請選擇金額"
            :disable="disable || item.fixed"
            @emitItem="(e) => updatedValue(index,'selfInflictedAmount',e.Value)"/>
            <div v-else slot="input">{{item.selfInflictedAmount}}</div>
        </InputGroup>
      </div>
      <div class="flex flex-row justify-center relative mt-4">
          <PaymentItem slot="input" keyName="保費共計" :value="item.insuranceAmount? item.insuranceAmount.toString() : '請洽核保'" :unit="Boolean(item.insuranceAmount&&item.insuranceAmount!== '請洽核保')" totalStyle/>
          <div class="cursor-pointer absolute top-2 ml-48" @click="() =>{openFormula = true;selectedIndex = index}" v-if="item.insuranceAmount && item.insuranceAmount!== '請洽核保'">
            <font-awesome-icon class="text-xl text-main ml-1" icon="info-circle" />
          </div>
      </div>
      <div class="button-group">
        <Button :class="{'mr-6': windowWidth > 750}" @click.native="downloadFile('insurance', item)" outline>預覽要保書</Button>
        <Button :class="{'mr-6': windowWidth > 750}" @click.native="downloadFile('', item)" outline>預覽報價單</Button>
        <Button :class="{'mr-6': windowWidth > 750}" @click.native="getAmount(index)" outline>試算</Button>
        <Button v-if="item.fixed && !copyLists.some(item => item.isSelected)" :class="{'mr-6': windowWidth > 750}" @click.native="updateFixed(index)" outline>修改</Button>
        <Button :class="{'mr-6': windowWidth > 750}" v-if="!copyLists.some(item => item.isSelected)" @click.native="AddInsuranceProject(index)" outline>保存</Button>
        <Button :class="{'col-span-2': windowWidth < 750}" v-if="!copyLists.some(item => item.isSelected)" @click.native="updateInsuranceProject(index)" outline>編輯投保資料</Button>
        <Button v-if="viewModel && editModel">修改保費</Button>
      </div>
    </CommonBoard>
    <PopupDialog
      :open.sync="openFormula"
    >
    <ul v-if="lists[selectedIndex] && lists[selectedIndex].parameter.amount">
      <li>處所基本費率:{{lists[selectedIndex] ?lists[selectedIndex].parameter.basicFee: ''}}</li>
      <li>高保額係數:{{lists[selectedIndex]? lists[selectedIndex].parameter.finalHC: ''}}</li>
      <li>規模細數:{{lists[selectedIndex]?lists[selectedIndex].parameter.sizeParameter: ''}}</li>
      <li>自負額係數:{{lists[selectedIndex]?lists[selectedIndex].parameter.selfInflictedParameter:''}}</li>
      <li>短期費率:{{lists[selectedIndex]?lists[selectedIndex].parameter.shortPeriodParameter:''}}</li>
      <li>附加費用率:{{lists[selectedIndex]?lists[selectedIndex].parameter.additionalCostParameter:''}}</li>
      <li>多處所係數:{{lists[selectedIndex]?lists[selectedIndex].parameter.mutiSizeParameter: ''}}</li>
      <li>期間係數:{{lists[selectedIndex]?lists[selectedIndex].periodParameter : ''}}</li>
      <li v-if="lists[selectedIndex] && lists[selectedIndex].parameter.underwriteCoefficient">核保加減費系數:{{lists[selectedIndex].parameter.underwriteCoefficient}}</li>
      <li>附加險條款費用係數:{{lists[selectedIndex]?lists[selectedIndex].parameter.additionTermCoefficientParameter: ''}}</li>
      <li>AGG > AOA *2係數:{{lists[selectedIndex]?lists[selectedIndex].parameter.aggAOACoefficient: ''}}</li>
      <li>總保費:{{lists[selectedIndex]?lists[selectedIndex].parameter.amount: ''}}</li>
    </ul>
    <div v-else>尚未試算保費</div>
    <p v-if="lists[selectedIndex] && lists[selectedIndex].parameter.mutiSizeParameter > 0">{{`(處所基本費率(${lists[selectedIndex].parameter.basicFee})*高保額係數(${lists[selectedIndex].parameter.finalHC})*規模細數(${lists[selectedIndex].parameter.sizeParameter})*多處所係數(${lists[selectedIndex].parameter.mutiSizeParameter})*(1+自負額係數(${lists[selectedIndex].parameter.selfInflictedParameter}))*(1 + 核保加減費系數(${lists[selectedIndex].parameter.underwriteCoefficient}))*(1+附加險條款費用係數(${lists[selectedIndex].parameter.additionTermCoefficientParameter}))*(1+AGG > AOA *2係數(${lists[selectedIndex].parameter.aggAOACoefficient}))*短期費率(${lists[selectedIndex].parameter.shortPeriodParameter})/(1-附加費用率(${lists[selectedIndex].parameter.additionalCostParameter}))=總保費(${lists[selectedIndex].parameter.amount})`}}</p>

    <p v-if="lists[selectedIndex] && lists[selectedIndex].parameter.periodParameter > 0">{{`(處所基本費率(${lists[selectedIndex].parameter.basicFee})*高保額係數(${lists[selectedIndex].parameter.finalHC})*規模係數(${lists[selectedIndex].parameter.sizeParameter})*期間係數(${lists[selectedIndex].parameter.periodParameter})*(1+自負額係數(${lists[selectedIndex].parameter.selfInflictedParameter}))*(1 + 核保加減費系數(${lists[selectedIndex].parameter.underwriteCoefficient}))*(1+附加險條款費用係數(${lists[selectedIndex].parameter.additionTermCoefficientParameter}))*(1+AGG > AOA *2係數(${lists[selectedIndex].parameter.aggAOACoefficient}))/(1-附加費用率(${lists[selectedIndex].parameter.additionalCostParameter}))=總保費(${lists[selectedIndex].parameter.amount})`}}</p>
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
import Checkbox from '@/components/Checkbox'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import WindowResizeListener from '@/components/WindowResizeListener'
import { mapState } from 'vuex'
import { Popup } from '@/utils/popups'

export default {
  components: {
    CommonBoard,
    InputGroup,
    Input,
    Select,
    Button,
    PaymentItem,
    Checkbox,
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
    }
  },
  data() {
    return {
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
        {Value: 0, Text: '依各縣市規定'},
        {Value: 1, Text: '合併單一限額'},
        {Value: 2, Text: '自行輸入保額'}
      ],
      copyLists: [...this.lists],
      openFormula: false,
      selectedIndex: 0
    }
  },
  computed: {
    ...mapState({
      editModel: state => state.common.editModel,
      viewModel: state => state.common.viewModel
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
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async downloadFile(type, item) {
      if (type === 'insurance') {
        const URL = `${process.env.VUE_APP_API_URL}Document/GetInsuranceDocument?orderNo=${this.orderNo}&insuranceProjectId=${item.id}`
        const link = document.createElement('a');
              link.href = URL;
              link.download= true;
              link.click();
      } else {
        const URL = `${process.env.VUE_APP_API_URL}Document/GetPlaceQuotationDocument?orderNo=${this.orderNo}&insuranceProjectId=${item.id}`
        const link = document.createElement('a');
              link.href = URL;
              link.download= true;
              link.click();
      }
    },
    addAmount() {
      this.$emit('update:lists', [...this.lists,{...this.lists[this.lists.length -1],selected:false,insuranceAmount: '- -',fixed :false, id: '' }])
    },
    remoteAmount(index) {
      const arr = [...this.lists]
      if(arr[index].id) {
        this.$store.dispatch('quotation/DeleteInusranceProject', {insuranceProjectId: arr[index].id, orderNo: this.orderNo})
      }
      arr.splice(index,1)
      this.$emit('update:lists', arr)
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
      const detail = await this.$store.dispatch(`quotation/Get${type == 'place'? 'Place': 'Activity'}QuotationDetail`, this.orderNo)
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