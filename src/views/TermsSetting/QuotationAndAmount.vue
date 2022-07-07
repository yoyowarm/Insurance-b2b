<template>
  <div>
    <FormTitle title="另行報價額度 條款設定" class="text-lg"/>
    <CommonBoard>
      <div class="flex w-full">
        <TableGroup class="w-full" :data="amountListTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in amountListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Button @click.native="() => {dialog.type = index; openDialog = true}" class="w-full sm:w-24" outline>編輯</Button>
          </div>
          <div :slot="`content-${index}`" :key="`content${index}`" class="flex flex-col">
              <template v-for="(contentText,copyIndex) in item.content">
                <div class="" :key="`content-${copyIndex}`">
                  <div v-html="Array.isArray(contentText) ? contentText.join('') : contentText"></div>
                </div>
              </template>
            </div>
        </template>
      </TableGroup>
      </div>
      <PopupDialog
        :open.sync="openDialog"
        headerText="編輯另行報價額度"
        confirm
        cancel="取消"
        ok="儲存編輯"
        @ok="submitEdit"
        @cancel="getQuotationsList"
      >
        <div v-if="dialog.type == 0">
          <p>PL005建築物承租人火災附加條款</p>
          <InputGroup class="mt-3" title="超過額度另行報價">
            <Input slot="input" :value="copyQuotationList[0]? copyQuotationList[0].amount.toString(): ''" numberOnly @updateValue="(e) => copyQuotationList[0].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
        <div v-if="dialog.type == 1">
          <p>PL023慰問金費用附加條款</p>
          <FormTitle class="mt-3" title="住院慰問金費用保險金額"/>
          <InputGroup title="每一個人">
            <Input slot="input" :value="copyQuotationList[1] ? copyQuotationList[1].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[1].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="每一意外事故">
            <Input slot="input" :value="copyQuotationList[2] ? copyQuotationList[2].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[2].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="保險期間內最高賠償金額">
            <Input slot="input" :value="copyQuotationList[3] ? copyQuotationList[3].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[3].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <FormTitle class="mt-3" title="奠儀慰問金費用保險金額"/>
          <InputGroup title="每一個人">
            <Input slot="input" :value="copyQuotationList[4] ? copyQuotationList[4].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[4].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="每一意外事故">
            <Input slot="input" :value="copyQuotationList[5] ? copyQuotationList[5].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[5].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="保險期間內最高賠償金額">
            <Input slot="input" :value="copyQuotationList[6] ? copyQuotationList[6].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[6].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
        <div v-if="dialog.type == 2">
          <p>PL040受託物附加條款</p>
          <InputGroup class="mt-3" title="每一意外事故財損責任之保險金額">
            <Input slot="input" :value="copyQuotationList[7] ? copyQuotationList[7].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[7].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="保險期間內最高賠償金額">
            <Input slot="input" :value="copyQuotationList[8] ? copyQuotationList[8].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[8].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
        <div v-if="dialog.type == 3">
          <p>PL049承租人借用人責任附加條款(保額外加)</p>
          <InputGroup class="mt-3" title="額度">
            <Input slot="input" :value="copyQuotationList[9] ? copyQuotationList[9].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[9].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
        <div v-if="dialog.type == 4">
          <p>PL053慰問金費用附加條款</p>
          <InputGroup class="mt-3" title="每一個人傷害醫療慰問金費用保險金額">
            <Input slot="input" :value="copyQuotationList[10] ? copyQuotationList[10].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[10].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="每一個人身故慰問金費用保險金額">
            <Input slot="input" :value="copyQuotationList[11] ? copyQuotationList[11].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[11].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="每一個人事故慰問金費用保險金額">
            <Input slot="input" :value="copyQuotationList[12] ? copyQuotationList[12].amount.toString() : ''" numberOnly @updateValue="(e) => copyQuotationList[12].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="保險期間內慰問金費用最高賠償金額">
            <Input slot="input" :value="copyQuotationList[13] ? copyQuotationList[13].amount.toString(): ''" numberOnly @updateValue="(e) => copyQuotationList[13].amount = e" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
      </PopupDialog>
      <LoadingScreen :isLoading="loading.length > 0"/>
    </CommonBoard>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import TableGroup from '@/components/TableGroup'
import Button from '@/components/Button'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { amountListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    TableGroup,
    Button,
    PopupDialog,
    InputGroup,
    Input,
    LoadingScreen
  },
  data() {
    return {
      amountList: amountListTable(),
      openDialog: false,
      dialog: {
        type: 0
      },
      quotationList: [],
      copyQuotationList: []
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    slotArray () {
      const arr = []
      const slotArr = ['content','operate']
      for (let i = 0; i < this.amountListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    },
    amountListTable: {
      get() {
        return {
          head: this.amountList.head,
          rows: this.amountList.rows.map(item =>{
            return {
              ...item,
              content: item.content.map((content) => {
                return content.split(' ').map((text) => {
                  if(!isNaN(text)) {
                    const target = this.quotationList.find(term => term.id == text)
                    return target
                      ? text = `<span class="text-main">${target.amount}元</span>`
                      : text
                  } else {
                    return text
                  }
                })
              })
            }
          })
        }
      },
      set(val) {
        this.$set(this.amountList, 'rows', val.rows)
      }
    },
  },
  watch: {
    quotationList: {
      handler(val) {
        this.copyQuotationList = [...val]
      },
      deep: true
    }
  },
  methods: {
    async submitEdit() {
      const data = [...this.copyQuotationList]
      await this.$store.dispatch('additionTermSetting/editAdditionTermQuotation', data)
      const res = await this.$store.dispatch('resource/AdditionTermQuotations')
      this.quotationList = res.data.content
    },
    async getQuotationsList() {
      const res = await this.$store.dispatch('resource/AdditionTermQuotations')
      this.quotationList = res.data.content
    }
  },
  async mounted() {
    await this.getQuotationsList()
  },
}
</script>

<style scoped lang="scss">
  .menu {
    top: -39px;
    @apply absolute
  }
  .weight-input {
    @apply rounded-full w-4/6 h-full border-2 border-gray-300 text-center
  }
</style>