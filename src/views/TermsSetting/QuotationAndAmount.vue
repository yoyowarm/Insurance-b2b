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
              <template v-for="(contentText) in item.content">
                <div class="" :key="contentText">
                  {{contentText}}
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
      >
        <div v-if="dialog.type == 0">
          <p>PL005建築物承租人火災附加條款</p>
          <InputGroup class="mt-3" title="超過額度另行報價">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
        <div v-if="dialog.type == 1">
          <p>PL023慰問金費用附加條款</p>
          <FormTitle class="mt-3" title="住院慰問金費用保險金額"/>
          <InputGroup title="每一個人">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="每一意外事故">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="保險期間內最高賠償金額">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <FormTitle class="mt-3" title="奠儀慰問金費用保險金額"/>
          <InputGroup title="每一個人">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="每一意外事故">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="保險期間內最高賠償金額">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
        <div v-if="dialog.type == 2">
          <p>PL040受託物附加條款</p>
          <InputGroup class="mt-3" title="每一意外事故財損責任之保險金額">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="保險期間內最高賠償金額">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
        <div v-if="dialog.type == 3">
          <p>PL049承租人借用人責任附加條款(保額外加)</p>
          <InputGroup class="mt-3" title="額度">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
        <div v-if="dialog.type == 4">
          <p>PL053慰問金費用附加條款</p>
          <InputGroup class="mt-3" title="每一個人傷害醫療慰問金費用保險金額">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="每一個人身故慰問金費用保險金額">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="每一個人事故慰問金費用保險金額">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
          <InputGroup class="mt-2" title="保險期間內慰問金費用最高賠償金額">
            <Input slot="input" placeholder="請輸入金額"/>
          </InputGroup>
        </div>
      </PopupDialog>
      <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
      <WindowResizeListener @resize="handleResize"/>
    </CommonBoard>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import TableGroup from '@/components/TableGroup'
import Pagination from '@/components/pagination'
import Button from '@/components/Button'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import WindowResizeListener from '@/components/WindowResizeListener'
import { amountListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    Pagination,
    WindowResizeListener,
    TableGroup,
    Button,
    PopupDialog,
    InputGroup,
    Input
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      amountListTable: amountListTable(),
      openDialog: false,
      dialog: {
        type: 0
      },
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
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      console.log(page)
      // this.$store.dispatch('app/updatedCurrentPage',page)
    },
  }
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