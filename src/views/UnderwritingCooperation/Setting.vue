<template>
  <div>
    <FormTitle title="核保組織" class="text-lg"/>
    <CommonBoard class="w-full">
      <div class="column-5 sm:mb-4">
        <div class="col-start-5 flex justify-end">
          <Button class="sm:mr-2 w-full sm:w-32" @click.native="() => {openDialog = true; type = 0}" outline>新增</Button>
        </div>
      </div>
      <TableGroup :data="cooperationListTable" :slotName="slotArray" scrollX boldFont>
        <template v-for="(item,index) in cooperationListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex flex-row whitespace-no-wrap">
            <Button outline class="mr-3" @click.native="() => {openDialog = true; cooperation = JSON.parse(JSON.stringify(item)); type = 1}">編輯</Button>
            <Button @click.native="() => {openDialog = true;cooperation = JSON.parse(JSON.stringify(item)), type = 2}">刪除</Button>
          </div>
        </template>
      </TableGroup>
    </CommonBoard>
    <PopupDialog
      :open.sync="openDialog"
      :headerText="type == 0 ? '新增組織' : (type == 1 ? '編輯組織' : '刪除組織')"
      @cancel="() => {openDialog = false; cooperation = {name: '',id: ''}}"
    >
      <div class="w-full" v-if="type < 2">
        <InputGroup title="組織名稱">
          <Input slot="input" class="w-full" :value="cooperation.name" @updateValue="e => {cooperation.name = e}" />
        </InputGroup>
      </div>
      <div class="w-full" v-if="type ==2">
        <p class="text-lg">確定刪除此組織？</p>
      </div>
      <div class="w-full flex justify-center mt-8">
        <Button v-if="type == 0" class="w-40" @click.native="confirmDialog('add')">新增</Button>
        <Button v-if="type == 1" class="w-40" @click.native="confirmDialog('update')">確定修改</Button>
        <Button v-if="type == 2" class="w-40" @click.native="confirmDialog('delete')">確定刪除</Button>
      </div>
    </PopupDialog>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import Button from '@/components/Button'
import TableGroup from '@/components/TableGroup'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    Button,
    TableGroup,
    PopupDialog,
    InputGroup,
    Input,
    LoadingScreen
  },
  data () {
    return {
      openDialog: false,
      cooperation: {
        name: '',
        id: ''
      },
      type: 0,//0新增 1編輯 2刪除
      cooperationListTable: {
        head: [
           {
            text: '組織',
            value: 'name',
            size: '3-6'
          },
          {
            text: '建立時間',
            value: 'createTime',
            size: '3-6'
          },
          {
            text: '操作',
            value: 'operate',
            size: '2-6'
          },
        ],
        rows: []
      },
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
    }),
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
    async confirmDialog (type) {
      if(type == 'add') {
        console.log(this.cooperation)
        await this.$store.dispatch('underwriteLevelSetting/AddUnderwriteGroup', {name: this.cooperation.name})
      }
      if (type == 'update') {
        await this.$store.dispatch('underwriteLevelSetting/UpdateUnderwriteGroup', {name: this.cooperation.name, id: this.cooperation.id})
      }
      if (type == 'delete') {
        await this.$store.dispatch('underwriteLevelSetting/DeleteUnderwriteGroup', this.cooperation.id)
      }
      await this.getGroups()
      this.openDialog = false
      this.cooperation = {
        name: '',
        id: ''
      }
    },
    async getGroups() {
      const groups = await this.$store.dispatch('underwriteLevelSetting/GetUnderwriteGroups')
      this.cooperationListTable.rows = groups.data.content
    }
  },
  async mounted () {
    await this.getGroups()
  }
}
</script>

<style lang="scss" scoped>
  
</style>