<template>
  <div class="w-full">
    <CommonBoard v-for="(item,index) in lists" :key="index" :title="`方案${index+1}、保險金額/自負額(新台幣元)`" :selected="item.selected">
      <div v-if="!viewModel && index != 0" slot="icon" class="input-right mr-2" @click="remoteAmount(index)">
        <font-awesome-icon icon="times-circle" class="text-2xl text-main" />
      </div>
      <Checkbox
        v-if="!viewModel"
        :id="`${index}selected`"
        class="text-md"
        text="選擇此保險金額"
        slot="right"
        :checked="item.selected"
        :value="item.selected"
        @updateValue="(e) =>updatedValue(index,'selected', e)"
      />
      <div class="column-5" :class="{'dashed-border': !viewModel}">
        <InputGroup title="金額" class="col-span-2" :borderBtn="viewModel" :editModel="editModel" :disable="disable || item.fixed">
          <Select
            v-if="!viewModel"
            slot="input"
            :options="amountList"
            :selected="item.amountType.toString()"
            @emitItem="e=>updatedValue(index,'amountType',e.Value)"
            :disable="disable || item.fixed"
            defaultText="請選擇金額"/>
            <div v-if="viewModel" slot="input">{{item.amountType ==0 ? '依各縣市規定' : (item.amountType ==1 ? '合併單一限額' : '自行輸入保額')}}</div>
        </InputGroup>
      </div>
      <div class="column-5 pt-5" :class="{'dashed-border': !viewModel}">
        <InputGroup v-if="item.amountType != 1" title="每一個人體傷責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType == 0 || disable || item.fixed">
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perBodyAmount.toString()"
            @updateValue="(e) => updatedValue(index,'perBodyAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType == 0 || disable || item.fixed"
            unit="萬元"/>
            <div v-else slot="input">{{item.perBodyAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="每一意外事故體傷責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType == 0 || disable || item.fixed">
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perAccidentBodyAmount.toString()"
            @updateValue="(e) => updatedValue(index,'perAccidentBodyAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType == 0 || disable || item.fixed"
            unit="萬元"/>
            <div v-else slot="input">{{item.perAccidentBodyAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="每一意外事故財物損失責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType == 0 || disable || item.fixed">
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.perAccidentFinanceAmount.toString()"
            @updateValue="(e) => updatedValue('perAccidentFinanceAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType == 0 || disable || item.fixed"
            unit="萬元"/>
            <div v-else slot="input">{{item.perAccidentFinanceAmount}}</div>
        </InputGroup>
        <InputGroup v-if="item.amountType != 1" title="本保險契約之最高賠償金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType == 0 || disable || item.fixed">
          <Input
            v-if="!viewModel"
            slot="input"
            :value="item.insuranceTotalAmount.toString()"
            @updateValue="(e) => updatedValue(index,'insuranceTotalAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType == 0 || disable || item.fixed"
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
          unit="萬元"/>
          <div v-else slot="input">{{item.mergeSingleAmount}}</div>
      </InputGroup>
        <InputGroup title="自負額" :borderBtn="viewModel" :editModel="editModel" :disable="disable || item.fixed">
          <Select
            v-if="!viewModel"
            slot="input"
            :options="selfPayList"
            :selected="item.selfInflictedAmount.toString()"
            defaultText="請選擇金額"
            :disable="disable || item.fixed"
            @emitItem="(e) => updatedValue(index,'selfInflictedAmount',e.Value)"/>
            <div v-else slot="input">{{item.selfInflictedAmount}}</div>
        </InputGroup>
      </div>
      <div class="flex flex-row justify-center mt-4">
        <PaymentItem keyName="保費共計" :value="item.insuranceAmount? item.insuranceAmount : '請洽核保'" :unit="Boolean(item.insuranceAmount)" totalStyle/>
      </div>
      <div class="flex flex-row justify-center mt-8">
        <Button class="mr-6" @click.native="downloadFile('insurance', item)" outline>預覽要保書</Button>
        <Button class="mr-6" @click.native="downloadFile('', item)" outline>預覽報價單</Button>
        <Button class="mr-6" @click.native="getAmount(index)" outline>試算</Button>
        <Button v-if="item.fixed" class="mr-6" @click.native="updateFixed(index)" outline>修改</Button>
        <Button @click.native="AddInsuranceProject(index)" outline>保存</Button>
        <Button v-if="viewModel && editModel">修改保費</Button>
      </div>
    </CommonBoard>
    <div v-if="!viewModel" class="flex flex-row justify-center mt-8">
      <Button @click.native="addAmount" outline>新增保費額度</Button>
    </div>
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
import { mapState } from 'vuex'
export default {
  components: {
    CommonBoard,
    InputGroup,
    Input,
    Select,
    Button,
    PaymentItem,
    Checkbox
  },
  props: {
    lists: {
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
  },
  data() {
    return {
      selfPayList: [
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
    }
  },
  computed: {
    ...mapState({
      editModel: state => state.common.editModel,
      viewModel: state => state.common.viewModel
    })
  },
  methods: {
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
      this.$emit('update:lists', [...this.lists,{...this.lists[this.lists.length -1],selected:false,insuranceAmount: '- -',fixed :false }])
    },
    remoteAmount(index) {
      if(index==0) return
      this.$emit('update:lists',[...this.lists].splice(index,1))
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
      lists.map(item => item.fixed = false)
      lists[index].fixed = true
      this.$emit('update:lists',lists)
      const data = {
        orderNo: this.orderNo,
        amountType: lists[index].amountType,
        perBodyAmount: lists[index].perBodyAmount,
        perAccidentBodyAmount: lists[index].perAccidentBodyAmount,
        perAccidentFinanceAmount: lists[index].perAccidentFinanceAmount,
        insuranceTotalAmount: lists[index].insuranceTotalAmount,
        mergeSingleAmount: lists[index].mergeSingleAmount,
        selfInflictedAmount: lists[index].selfInflictedAmount,
      }
      const amount = await this.$store.dispatch('quotation/GetInsuranceProjectAmount',{data})
      
      lists[index].insuranceAmount = amount.data.content.amount
      this.$emit('update:lists',lists)
    },
    async AddInsuranceProject(index) {
      const data = {
        orderNo: this.orderNo,
        amountType: this.lists[index].amountType,
        perBodyAmount: this.lists[index].perBodyAmount,
        perAccidentBodyAmount: this.lists[index].perAccidentBodyAmount,
        perAccidentFinanceAmount: this.lists[index].perAccidentFinanceAmount,
        insuranceTotalAmount: this.lists[index].insuranceTotalAmount,
        mergeSingleAmount: this.lists[index].mergeSingleAmount,
        selfInflictedAmount: this.lists[index].selfInflictedAmount,
      }
      if(this.lists[index].id) {
        data.InsuranceProjectId = this.lists[index].id
         await this.$store.dispatch('quotation/EditInsuranceProject',{data})
      } else {
        await this.$store.dispatch('quotation/AddInsuranceProject',{data})
      }
      this.$emit('getQuotationDetail')
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>