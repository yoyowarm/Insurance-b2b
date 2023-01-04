<template>
  <div>
    <FormTitle title="另行報價保額" class="text-lg mb-14"/>
    <CommonBoard class="category">
      <NavMenu
        class="menu"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
      />
      <div class="flex w-full">
        <TableGroup class="w-full" :data="quoteSeparatelyTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in quoteSeparatelyTable.rows">
          <div :slot="`name-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap custom-column pr-3">
            {{levelText[item.level]}}
          </div>
          <div :slot="`perBodyAmount-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap custom-column pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.perBodyAmount.toString()" @updateValue="(e) =>updatedAmount('perBodyAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
            </InputGroup>
          </div>
          <div :slot="`perAccidentBodyAmount-${index}`" :key="`slot2${index}`" class="flex whitespace-no-wrap custom-column pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.perAccidentBodyAmount.toString()" @updateValue="(e) =>updatedAmount('perAccidentBodyAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
            </InputGroup>
          </div>
          <div :slot="`perAccidentFinanceAmount-${index}`" :key="`slot3${index}`" class="flex whitespace-no-wrap custom-column pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.perAccidentFinanceAmount.toString()" @updateValue="(e) =>updatedAmount('perAccidentFinanceAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
            </InputGroup>
          </div>
          <div :slot="`insuranceTotalAmount-${index}`" :key="`slot4${index}`" class="flex whitespace-no-wrap custom-column pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.insuranceTotalAmount.toString()" @updateValue="(e) =>updatedAmount('insuranceTotalAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
            </InputGroup>
          </div>
          <div :slot="`perBodyAmountPlusPerAccidentBodyAmount-${index}`" :key="`slot4${index}`" class="flex whitespace-no-wrap custom-column pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.perBodyAmountPlusPerAccidentBodyAmount.toString()" @updateValue="(e) =>updatedAmount('perBodyAmountPlusPerAccidentBodyAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
            </InputGroup>
          </div>
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="w-full flex justify-center">
            <Button class="w-full my-2 sm:my-0" @click.native="editSwitch(index)" :outline="!item.edit"><span v-if="!item.edit">編輯</span><span v-else>儲存</span></Button>
          </div>
        </template>
      </TableGroup>
      </div>
    </CommonBoard>
    <LoadingScreen :isLoading="loading.length > 0"/>
      <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import TableGroup from '@/components/TableGroup'
import NavMenu from '@/components/NavMenu'
import Button from '@/components/Button'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { quoteSeparatelyTable } from '@/utils/mockData'
import { mapState } from 'vuex'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    TableGroup,
    InputGroup,
    Input,
    Button,
    LoadingScreen,
    WindowResizeListener
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      quoteSeparately: quoteSeparatelyTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 1,
      itemLists:[
        { text: '處所', value: 1 },
        { text: '活動', value: 2 }
      ],
      levelText: {
        1: '分公司核保門檻',
        2: '分公司核保上限',
        3: '總公司核保上限',
        4: '總公司科處主管上限',
        5: '總公司部室主管上限',
        6: '協理、副總上限',
      }
    }
  },
  watch: {
    windowWidth(val) {
      if(val <= 600) {
        this.quoteSeparately.head[6].text = ''
      } else {
        this.quoteSeparately.head[6].text = '操作'
      }
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    quoteSeparatelyTable: {
      get() {
        return {...this.quoteSeparately, rows: this.quoteSeparately.rows.filter(i => i.placeActivityType === this.currentTag)}
      },
      set(value) {
        this.quoteSeparately = value
      }
    },
    slotArray () {
      const arr = []
      const slotArr = [ 'name','perBodyAmount', 'perAccidentBodyAmount', 'perAccidentFinanceAmount', 'insuranceTotalAmount','perBodyAmountPlusPerAccidentBodyAmount', 'operate']
      for (let i = 0; i < this.quoteSeparatelyTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async editSwitch(index) {
      const value = !this.quoteSeparatelyTable.rows[index].edit
      this.quoteSeparatelyTable = Object.assign(this.quoteSeparatelyTable, {
        ...this.quoteSeparatelyTable.heads,
        rows: this.quoteSeparatelyTable.rows.map((item, i) => {
          if(i === index) {
            return {
              ...item,
              edit: value
            }
          } else {
            return item
          }
        })
      })
      if(!value) {
        const data = JSON.parse(JSON.stringify(this.quoteSeparatelyTable.rows[index]))
        const req = {
          insuranceQuotationSettings: []
        }
        data.detail.map((item,index) => {
          const amount = index == 0 
            ? data.perBodyAmount * 10000
            : (index== 1 
              ? data.perAccidentBodyAmount * 10000
              : (index == 2 
                ? data.perAccidentFinanceAmount * 10000
                : (index == 3 
                  ? data.insuranceTotalAmount * 10000
                  : data.perBodyAmountPlusPerAccidentBodyAmount * 10000)))
          req.insuranceQuotationSettings.push({id:item.id, amount})
        })
        await this.$store.dispatch('parameterSetting/updatedInsuranceQuotationAmountSetting', req)
        await this.getInsuranceQuotationAmountSetting()
      }
    },
    updatedAmount(type,index,e) {
      const rows = Object.assign(this.quoteSeparatelyTable.rows, {...this.quoteSeparatelyTable.rows, [index]: {
        ...this.quoteSeparatelyTable.rows[index],
        [type]: e
      }})
      const all = Object.assign(this.quoteSeparatelyTable, {...this.quoteSeparatelyTable, rows})
      this.quoteSeparatelyTable = all
    },
    async getInsuranceQuotationAmountSetting() {
      const res = await this.$store.dispatch('resource/InsuranceQuotationAmountSetting')
      this.quoteSeparatelyTable = {
          head:this.quoteSeparatelyTable.head,
          rows: res.data.content.map(item => {
            return {
              ...item,
              edit: false,
              perBodyAmount: item.detail[0].amount/10000,
              perAccidentBodyAmount: item.detail[1].amount/10000,
              perAccidentFinanceAmount: item.detail[2].amount/10000,
              insuranceTotalAmount: item.detail[3].amount/10000,
              perBodyAmountPlusPerAccidentBodyAmount: item.detail[4].amount/10000,
            }
          })
        }
    }
  },
  async mounted() {
    await this.getInsuranceQuotationAmountSetting()
    if(this.windowWidth <= 600) {
        this.quoteSeparately.head[6].text = ''
      } else {
        this.quoteSeparately.head[6].text = '操作'
      }
  }
}
</script>

<style scoped lang="scss">
  .category {
    margin-top: 40px;
    @apply  w-full relative
  }
  .menu {
    top: -39px;
    @apply absolute
  }
  @media (max-width: 600px) {
    .custom-column {
    @apply justify-center text-gray-600 bg-gray-100 text-center p-1 rounded-b-xl font-semibold;
  }
  }
</style>