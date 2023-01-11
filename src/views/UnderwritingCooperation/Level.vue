<template>
  <div>
    <FormTitle title="核保明細階級" class="text-lg"/>
    <CommonBoard class="w-full">
      <div class="column-5 sm:mb-4">
        <div class="col-start-5 flex justify-end">
          <Button class="sm:mr-2 w-full sm:w-32" @click.native="() => {openDialog = true; type = 0}" outline>新增</Button>
        </div>
      </div>
      <TableGroup :data="cooperationListTable" :slotName="slotArray" scrollX boldFont>
        <template v-for="(item,index) in cooperationListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex flex-row whitespace-no-wrap justify-center md:justify-start">
            <Button outline class="mr-3" @click.native="() => {openDialog = true; cooperation = JSON.parse(JSON.stringify(item)); type = 1}">編輯</Button>
            <Button @click.native="() => {openDialog = true; cooperation = JSON.parse(JSON.stringify(item));type = 2}">刪除</Button>
          </div>
        </template>
      </TableGroup>
    </CommonBoard>
    <PopupDialog
      :open.sync="openDialog"
      :headerText="type == 0 ? '新增組織' : (type == 1 ? '編輯組織' : '刪除組織')"
      @cancel="() => {openDialog = false; cooperation = {
        id: '',
        level: '',
        groupName: '',
        groupId: '',
        employees: [],
        parentUnderwriteGroupId: ''}}"
    >
      <div class="w-full flex flex-col mb-5" v-if="type < 2">
        <InputGroup title="階級" class="mb-6" :disable="type ==1">
          <Select slot="input" defaultText="選擇階級" :disable="type ==1" :options="levelList" :selected="cooperation.level" @emitItem="(e) => cooperation.level = e.Value"/>
        </InputGroup>
        <InputGroup title="單位" class="mb-6" :disable="type ==1">
          <Select slot="input" defaultText="選擇單位" :disable="type ==1" :options="settingList" :selected="cooperation.groupId" @emitItem="(e) => cooperation.groupId = e.Value"/>
        </InputGroup>
        <InputGroup title="上層組織" class="mb-6" v-if="cooperation.level <= 1">
          <Select slot="input" defaultText="選擇上層組織" :options="settingList" :selected="cooperation.parentUnderwriteGroupId" @emitItem="(e) => cooperation.parentUnderwriteGroupId = e.Value"/>
        </InputGroup>
        <InputGroup title="員編">
          <MultipleSelect
            slot="input"
            :defaultText="cooperation.employees.length > 0 ? `已選擇${cooperation.employees.length}個成員` : '選擇員編'"
            :options="taianUsers"
            :selectedArr.sync="cooperation.employees"
            :outsideStatus="openDialog"
            valueName="employeeName"
            search/>
        </InputGroup>
      </div>
      <div class="w-full" v-if="type == 2">
        <p class="text-lg">確定刪除此核保明細階級設定？</p>
      </div>
      <div class="w-full flex justify-center mt-8">
        <Button v-if="type == 0" class="w-40" @click.native="confirmDialog('add')">新增</Button>
        <Button v-if="type == 1" class="w-40" @click.native="confirmDialog('update')">確定修改</Button>
        <Button v-if="type == 2" class="w-40" @click.native="confirmDialog('delete')">確定刪除</Button>
      </div>
    </PopupDialog>
    <LoadingScreen :isLoading="loading.length > 0"/>
      <WindowResizeListener @resize="handleResize"/>
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
import MultipleSelect from '@/components/Select/multipleSelect.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { mapState } from 'vuex'
import { Popup } from '@/utils/popups'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  components: {
    FormTitle,
    CommonBoard,
    Button,
    TableGroup,
    PopupDialog,
    InputGroup,
    Select,
    MultipleSelect,
    LoadingScreen,
    WindowResizeListener
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      openDialog: false,
      cooperationName: '',
      cooperation: {
        id: '',
        level: '',
        groupName: '',
        groupId: '',
        parentUnderwriteGroupId: '',
        employees: []
      },
      type: 0,//0新增 1編輯 2刪除
      cooperationListTable: {
        head: [
           {
            text: '名稱',
            value: 'employeeList',
            size: '6-6'
          },
          {
            text: '單位',
            value: 'groupName',
            size: '3-6'
          },
          {
            text: '上層組織名稱',
            value: 'parentUnderwriteGroupName',
            size: '3-6'
          },
          {
            text: '層級',
            value: 'level',
            size: '3-6'
          },
          {
            text: '建立時間',
            value: 'createTime',
            size: '3-6'
          },
          {
            text: '更新人員',
            value: 'updateUser',
            size: '3-6'
          },
          {
            text: '操作',
            value: 'operate',
            size: '2-6',
            hidden: true
          },
        ],
        rows: [
        ]
      },
      levelList: [
        { Text: '第一階層', Value: 1},
        { Text: '第二階層', Value: 2},
        { Text: '第三階層', Value: 3},
        { Text: '第四階層', Value: 4},
        { Text: '第五階層', Value: 5},
        { Text: '第六階層', Value: 6},
      ],
      settingList: [],
      taianUsers: [],
    }
  },
  watch: {
    windowWidth(val) {
      if(val <= 600) {
        this.cooperationListTable.head[6].text = ''
      } else {
        this.cooperationListTable.head[6].text = '操作'
      }
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
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async confirmDialog (type) {
      let res = {}
      if(type == 'add') {
        if((this.cooperation.level ==1 && !this.cooperation.parentUnderwriteGroupId) || !this.cooperation.groupId || !this.cooperation.level || this.cooperation.employees.map(item => item.employeeNumber || item.employeeId).length == 0) return
        res = await this.$store.dispatch('underwriteLevelSetting/AddUnderwriteLevel', {
          level: this.cooperation.level,
          groupId: this.cooperation.groupId,
          parentGroupId: this.cooperation.parentUnderwriteGroupId,
          employeeIds: this.cooperation.employees.map(item => item.employeeNumber || item.employeeId)
        })
      }
      if (type == 'update') {
        if((this.cooperation.level ==1 && !this.cooperation.parentUnderwriteGroupId) || !this.cooperation.groupId || !this.cooperation.level || this.cooperation.employees.map(item => item.employeeNumber || item.employeeId).length == 0) return
        res = await this.$store.dispatch('underwriteLevelSetting/UpdateUnderwriteLevel', {
          levelId: this.cooperation.id,
          groupId: this.cooperation.groupId,
          parentGroupId: this.cooperation.parentUnderwriteGroupId,
          employeeIds: this.cooperation.employees.map(item => item.employeeNumber || item.employeeId)
        })
      }
      if (type == 'delete') {
        res = await this.$store.dispatch('underwriteLevelSetting/DeleteUnderwriteLevel', this.cooperation.id)
      }
       if(res.data.code == 0) {
        Popup.create({
          headerText: '',
          hasHtml: true,
          htmlText: res.data.message,
        })
      }
      await this.getSettingGroup()
      await this.getGroups()
      this.openDialog = false
      this.cooperation = {
        id: '',
        level: '',
        groupName: '',
        groupId: '',
        parentUnderwriteGroupId: '',
        employees: []
      }
    },
    async getGroups() {
      const levels = await this.$store.dispatch('underwriteLevelSetting/GetUnderwriteLevels')
      this.cooperationListTable.rows = levels.data.content.map(item => {
        const employeeList = []
        for (let i = 0; i < item.employees.length; i++) {
          employeeList.push(`(${item.employees[i].employeeId})${item.employees[i].employeeName}`)
        }
        return {
          ...item,
          employeeList: employeeList.join('、'),
          createTime: item.createTime ? item.createTime : '',
          updateUser: item.updateUser ? item.updateUser : '',
          level: item.level ? item.level.toString() : '',
        }
      })
    },
    async getSettingGroup () {
      const groups = await this.$store.dispatch('underwriteLevelSetting/GetUnderwriteGroups')
      this.settingList = groups.data.content.map(item => {
        return {
          Text: item.name,
          Value: item.id
        }
      })
    },
    async getTaianUsers() {
      const taianUsers = await this.$store.dispatch('resource/TaianUsers')
      this.taianUsers = taianUsers.data.content.map(item => {
        return {
          ...item,
          Text: `(${item.employeeNumber})${item.employeeName}`,
          Value: item.employeeNumber
        }
      })
    }
  },
  async mounted () {
    await this.getGroups()
    await this.getSettingGroup()
    await this.getTaianUsers()
    if(this.windowWidth <= 600) {
        this.cooperationListTable.head[6].text = ''
      } else {
        this.cooperationListTable.head[6].text = '操作'
      }
  }
}
</script>

<style lang="scss" scoped>
  
</style>