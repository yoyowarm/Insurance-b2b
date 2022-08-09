<template>
  <div class="w-full">
    <CommonBoard v-for="(item,index) in lists" :key="index" :title="`方案${index+1}、保險金額/自負額(新台幣元)`" :selected="!viewModel">
      <div v-if="!viewModel" slot="icon" class="input-right mr-2" @click="$emit('removeItem',index)">
        <font-awesome-icon icon="times-circle" class="text-2xl text-main" />
      </div>
      <Checkbox
        v-if="!viewModel"
        :id="`${index}selected`"
        class="text-md"
        text="選擇此保險金額"
        slot="right"
      />
      <div class="column-5" :class="{'dashed-border': !viewModel}">
        <InputGroup title="金額" class="col-span-2" :borderBtn="viewModel" :editModel="editModel" :disable="disable">
          <Select
            slot="input"
            :options="amountList"
            :selected="item.amountType.Value.toString()"
            @emitItem="e=>updatedValue('amountType',e)"
            :disable="disable"
            defaultText="請選擇金額"/>
        </InputGroup>
      </div>
      <div class="column-5 pt-5" :class="{'dashed-border': !viewModel}">
        <InputGroup v-if="item.amountType.Value != 1" title="每一個人體傷責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType.Value == 0 || disable">
          <Input
            slot="input"
            :value="item.perBodyAmount.toString()"
            @updateValue="(e) => updatedValue('perBodyAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType.Value == 0 || disable"
            unit="萬元"/>
        </InputGroup>
        <InputGroup v-if="item.amountType.Value != 1" title="每一意外事故體傷責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType.Value == 0 || disable">
          <Input
            slot="input"
            :value="item.perAccidentBodyAmount.toString()"
            @updateValue="(e) => updatedValue('perAccidentBodyAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType.Value == 0 || disable"
            unit="萬元"/>
        </InputGroup>
        <InputGroup v-if="item.amountType.Value != 1" title="每一意外事故財物損失責任金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType.Value == 0 || disable">
          <Input
            slot="input"
            :value="item.perAccidentFinanceAmount.toString()"
            @updateValue="(e) => updatedValue('perAccidentFinanceAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType.Value == 0 || disable"
            unit="萬元"/>
        </InputGroup>
        <InputGroup v-if="item.amountType.Value != 1" title="本保險契約之最高賠償金額" :borderBtn="viewModel" :editModel="editModel" :disable="item.amountType.Value == 0 || disable">
          <Input
            slot="input"
            :value="item.insuranceTotalAmount.toString()"
            @updateValue="(e) => updatedValue('insuranceTotalAmount',e)"
            placeholder="請輸入金額"
            :disable="item.amountType.Value == 0 || disable"
            unit="萬元"/>
        </InputGroup>
        <InputGroup v-if="item.amountType.Value == 1" title="單一限額" :disable="disable">
        <Input
          slot="input"
          :value="item.mergeSingleAmount"
          @updateValue="(e) => updatedValue('mergeSingleAmount',e)"
          placeholder="請輸入金額"
          :disable="disable"
          unit="萬元"/>
      </InputGroup>
        <InputGroup title="自負額" :borderBtn="viewModel" :editModel="editModel" :disable="disable">
          <Select
            slot="input"
            :options="selfPayList"
            :selected="item.selfInflictedAmount.Value"
            defaultText="請選擇金額"
            :disable="disable"
            @emitItem="(e) => updatedValue('selfInflictedAmount',e)"/>
        </InputGroup>
      </div>
      <div class="flex flex-row justify-center mt-4">
        <PaymentItem keyName="保費共計" value="--" unit totalStyle/>
      </div>
      <div class="flex flex-row justify-center mt-8">
        <Button class="mr-6" outline>預覽要保書</Button>
        <Button class="mr-6" outline>預覽報價單</Button>
        <Button v-if="viewModel">修改保費</Button>
      </div>
    </CommonBoard>
    <div v-if="!viewModel" class="flex flex-row justify-center mt-8">
      <Button outline>新增保費額度</Button>
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
  },
  data() {
    return {
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
    }
  },
  computed: {
    ...mapState({
      editModel: state => state.common.editModel,
      viewModel: state => state.common.viewModel
    })
  },
}
</script>

<style scoped lang="scss">
  
</style>