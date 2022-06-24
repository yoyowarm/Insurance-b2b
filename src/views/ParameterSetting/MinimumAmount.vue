<template>
  <div>
    <FormTitle title="縣市最低保額 參數設定" class="text-lg mb-14"/>
    <CommonBoard class="category">
      <NavMenu
        class="menu"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
      />
      <div class="flex w-full">
        <TableGroup class="w-full" :data="minimumAmountTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in minimumAmountTable.rows">
          <div :slot="`perBodyAmount-${index}`" :key="`slot1${index}`" class="flex whitespace-no-wrap pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.perBodyAmount.toString()" @updateValue="(e) =>updatedAmount('perBodyAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
            </InputGroup>
          </div>
          <div :slot="`perAccidentBodyAmount-${index}`" :key="`slot2${index}`" class="flex whitespace-no-wrap pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.perAccidentBodyAmount.toString()" @updateValue="(e) =>updatedAmount('perAccidentBodyAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
            </InputGroup>
          </div>
          <div :slot="`perAccidentFinanceAmount-${index}`" :key="`slot3${index}`" class="flex whitespace-no-wrap pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.perAccidentFinanceAmount.toString()" @updateValue="(e) =>updatedAmount('perAccidentFinanceAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
            </InputGroup>
          </div>
          <div :slot="`insuranceTotalAmount-${index}`" :key="`slot4${index}`" class="flex whitespace-no-wrap pr-3">
            <InputGroup class="-mt-2 w-full" noMt :disable="!item.edit">
              <Input slot="input" placeholder="請輸入金額" :value="item.insuranceTotalAmount.toString()" @updateValue="(e) =>updatedAmount('insuranceTotalAmount',index, e)" unit="萬元" :disable="!item.edit" numberOnly/>
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
import { minimumAmountTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    TableGroup,
    InputGroup,
    Input,
    Button,
    LoadingScreen
  },
  data() {
    return {
      minimumAmount: minimumAmountTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 0,
      itemLists:[
        { text: '處所', value: 0 }
      ],
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    minimumAmountTable: {
      get() {
        this.minimumAmount.rows.map(item => {
          // eslint-disable-next-line no-prototype-builtins
          if(item.hasOwnProperty('edit')) {
            return item
          } else {
            return {
              ...item,
              edit: false
            }
          }
        })
        return this.minimumAmount
      },
      set(value) {
        this.minimumAmount = value
      }
    },
    slotArray () {
      const arr = []
      const slotArr = [ 'perBodyAmount', 'perAccidentBodyAmount', 'perAccidentFinanceAmount', 'insuranceTotalAmount', 'operate']
      for (let i = 0; i < this.minimumAmountTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  methods: {
    editSwitch(index) {
      const value = !this.minimumAmountTable.rows[index].edit
      this.minimumAmountTable = Object.assign(this.minimumAmountTable, {
        ...this.minimumAmountTable.heads,
        rows: this.minimumAmountTable.rows.map((item, i) => {
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
    },
    updatedAmount(type,index,e) {
      const rows = Object.assign(this.minimumAmountTable.rows, {...this.minimumAmountTable.rows, [index]: {
        ...this.minimumAmountTable.rows[index],
        [type]: e
      }})
      const all = Object.assign(this.minimumAmountTable, {...this.minimumAmountTable, rows})
      this.minimumAmountTable = all
    }
  },
  async mounted() {
    const data = await this.$store.dispatch('resource/CountyMinimumSettings')
    this.minimumAmountTable.rows = data.data
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
</style>