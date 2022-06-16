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
        <InputGroup title="金額" class="col-span-2" :borderBtn="viewModel" :editModel="editModel">
          <Select slot="input" defaultText="依各縣市規定"/>
        </InputGroup>
      </div>
      <div class="column-5 pt-5" :class="{'dashed-border': !viewModel}">
        <InputGroup title="每一個人體傷責任金額" :borderBtn="viewModel" :editModel="editModel">
          <Input slot="input" placeholder="請輸入金額" unit="萬元"/>
        </InputGroup>
        <InputGroup title="每一意外事故體傷責任金額" :borderBtn="viewModel" :editModel="editModel">
          <Input slot="input" placeholder="請輸入金額" unit="萬元"/>
        </InputGroup>
        <InputGroup title="每一意外事故財物損失責任金額" :borderBtn="viewModel" :editModel="editModel">
          <Input slot="input" placeholder="請輸入金額" unit="萬元"/>
        </InputGroup>
        <InputGroup title="本保險契約之最高賠償金額" :borderBtn="viewModel" :editModel="editModel">
          <Input slot="input" placeholder="請輸入金額" unit="萬元"/>
        </InputGroup>
        <InputGroup title="自負額" :borderBtn="viewModel" :editModel="editModel">
          <Select slot="input" defaultText="請選擇金額" unit="萬元"/>
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