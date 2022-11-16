<template>
  <div>
    <FormTitle title="核保明細階級設定" class="text-lg"/>
    <CommonBoard class="w-full">
      <div class="column-5 sm:mb-4">
        <div class="col-start-5 flex justify-end">
          <Button class="sm:mr-2 w-full sm:w-32" @click.native="() => {openDialog = true; type = 0}" outline>新增</Button>
        </div>
      </div>
      <TableGroup :data="cooperationListTable" :slotName="slotArray" scrollX boldFont>
        <template v-for="(item,index) in cooperationListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex flex-row whitespace-no-wrap">
            <Button outline class="mr-3" @click.native="() => {openDialog = true; cooperationName = item.title; type = 1}">編輯</Button>
            <Button @click.native="() => {openDialog = true; type = 2}">刪除</Button>
          </div>
        </template>
      </TableGroup>
    </CommonBoard>
    <PopupDialog
      :open.sync="openDialog"
      :headerText="type == 0 ? '新增組織' : (type == 1 ? '編輯組織' : '刪除組織')"
      @cancel="() => {openDialog = false; cooperationName = ''}"
    >
      <div class="w-full flex flex-col mb-5" v-if="type < 2">
        <InputGroup title="階級" class="mb-6">
          <Select slot="input" defaultText="選擇階級" />
        </InputGroup>
        <InputGroup title="單位" class="mb-6">
          <Select slot="input" defaultText="選擇單位" />
        </InputGroup>
        <InputGroup title="上層組織" class="mb-6">
          <Select slot="input" defaultText="選擇上層組織" />
        </InputGroup>
        <InputGroup title="員編">
          <Select slot="input" defaultText="選擇員編" search/>
        </InputGroup>
      </div>
      <div class="w-full" v-if="type == 2">
        <p class="text-lg">確定刪除此核保明細階級設定？</p>
      </div>
      <div class="w-full flex justify-center mt-8">
        <Button v-if="type == 0" class="w-40" @click.native="() => {openDialog = false}">新增</Button>
        <Button v-if="type == 1" class="w-40" @click.native="() => {openDialog = false}">確定修改</Button>
        <Button v-if="type == 2" class="w-40" @click.native="() => {openDialog = false}">確定刪除</Button>
      </div>
    </PopupDialog>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import Button from '@/components/Button'
import TableGroup from '@/components/TableGroup'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import InputGroup from '@/components/InputGroup'
import Select from '@/components/Select'
export default {
  components: {
    FormTitle,
    CommonBoard,
    Button,
    TableGroup,
    PopupDialog,
    InputGroup,
    Select
  },
  data () {
    return {
      openDialog: false,
      cooperationName: '',
      type: 0,//0新增 1編輯 2刪除
      cooperationListTable: {
        head: [
           {
            text: '名稱',
            value: 'name',
            size: '6-6'
          },
          {
            text: '單位',
            value: 'company',
            size: '3-6'
          },
          {
            text: '層級',
            value: 'level',
            size: '3-6'
          },
          {
            text: '建立時間',
            value: 'lumchTime',
            size: '3-6'
          },
          {
            text: '更新人員',
            value: 'updated',
            size: '3-6'
          },
          {
            text: '操作',
            value: 'operate',
            size: '2-6'
          },
        ],
        rows: [
          {
            name: '(4832)吳善智、(4834)張峰瑞',
            company: '台北分公司',
            level: '第一階',
            lumchTime: '2020/01/01',
            updated : '張峰瑞',
          }
        ]
      },
    }
  },
  computed: {
    slotArray () {
      const arr = []
      const slotArr = ['operate']
      for (let i = 0; i < this.cooperationListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    },
  },
  methods: {
    confirmDialog () {
      this.openDialog = false
      this.cooperationName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>