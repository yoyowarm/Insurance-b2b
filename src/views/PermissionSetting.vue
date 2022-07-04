<template>
  <div>
  <FormTitle title="權限群組設定" class="sm:hidden text-lg mb-14"/>
  <CommonBoard class="permission-setting">
    <NavMenu
      class="menu"
      :itemLists="itemLists"
      :currentTag="currentTag"
      @updatedMenu="(e) => currentTag = e"
    />
    <div class="column-5 sm:mb-4">
      <InputGroup v-if="currentTag == 0" class="industry-input-group" bgColor="white" noMt>
        <Input slot="input" class="max-w-full" placeholder="搜尋姓名或編號" slotIcon>
          <font-awesome-icon class="text-main absolute top-3 right-3" :icon="['fas','magnifying-glass']" />
        </Input>
      </InputGroup>
      <Button v-if="currentTag == 0" class="col-start-5 h-10" @click.native="callDialog(7,'新增成員','新增成員')" outline>新增成員</Button>
      <div v-else class="col-start-5 flex justify-end">
        <Button class="sm:mr-2 w-full sm:w-32" @click.native="callDialog(6,'新增群組','新增群組')" outline>新增群組</Button>
      </div>
    </div>
    <div class="flex w-full">
      <TableGroup v-if="currentTag == 0" class="w-full" :data="membersListTable" :slotName="slotArray" column2 scrollX>
        <template v-for="(item,index) in membersListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex justify-between sm:justify-start whitespace-no-wrap">
            <Button class="mr-2" @click.native="callDialog(0,'帳號明細','',item)" outline>明細</Button>
            <Button class="mr-2" @click.native="callDialog(1,'編輯帳號', '儲存編輯',item)" outline>編輯</Button>
            <Button outline @click.native="callDialog(2,'刪除帳號', '確認刪除',item)">刪除</Button>
        </div>
        </template>
      </TableGroup>
      <TableGroup v-else class="w-full" :data="groupListTable" :slotName="slotArray" column2 scrollX>
        <template v-for="(item,index) in groupListTable.rows">
          <div :slot="`permissions-${index}`" :key="`permissions-${index}`" class="text-gray-700">
            <span v-for="(subPermission,subIndex) in item.permissions" :key="subPermission.subPermissionName">{{subPermission.subPermissionName}}<span v-if="item.permissions.length -1 !== subIndex">、</span></span>
          </div>
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Button class="mr-2" @click.native="callDialog(3,'群組明細','',item)" outline>明細</Button>
            <Button class="mr-2" @click.native="callDialog(4,'編輯群組', '儲存編輯',item)" outline>編輯</Button>
            <Button outline @click.native="callDialog(5,'刪除群組', '確認刪除',item)">刪除</Button>
        </div>
        </template>
      </TableGroup>
    </div>
    <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
    <PopupDialog
      :open.sync="openDialog"
      :headerText="dialog.title"
      :confirm="dialog.type !== 0 && dialog.type !== 3"
      cancel="取消"
      :ok="dialog.okText"
      @cancel="closeDialog"
      @ok="confirmDialog"
    >
    <!-- 成員明細 -->
      <div v-if="dialog.type == 0">
        <ul class="list-detail">
          <li>員工編號：{{currentItem.employeeId}}</li>
          <li>員工名稱：{{currentItem.employeeName}}</li>
          <li>E-mail：{{currentItem.email}}</li>
          <li>權限群組：{{currentItem.groupName}}</li>
          <li>帳號狀態：{{currentItem.employeeStatus}}</li>
        </ul>
      </div>
      <!-- 編輯成員 -->
      <div v-if="dialog.type == 1">
        <p><span>員工標號：{{currentItem.employeeId}}</span><span class="ml-2">員工名稱：{{currentItem.employeeName}}</span></p>
        <div class="column-2 my-3">
          <InputGroup title="群組權限">
            <Select slot="input" defaultText="選擇權限" :options="groupsList" :selected="currentItem.groupId"  @emitItem="e =>{ currentItem.groupId = e.Value}"/>
          </InputGroup>
          <InputGroup title="帳號狀態">
            <Select slot="input" :options="employeeStatusList" :selected="currentItem.employeeStatus === '啟用' ? '1': '0'" defaultText="請選擇狀態" @emitItem="e => currentItem.employeeStatus = e.Text" />
          </InputGroup>
        </div>
        <div class="column-2 my-3">
          <InputGroup title="E-mail">
            <Input slot="input" :value="currentItem.email" placeholder="請輸入E-mail" @updateValue="(e)=> currentItem.email = e"/>
          </InputGroup>
          <InputGroup title="分機">
            <Input slot="input" value="12"/>
          </InputGroup>
        </div>
      </div>
      <!-- 刪除成員 -->
      <div v-if="dialog.type == 2">
        <ul class="list-detail">
          <li>員工編號：{{currentItem.employeeId}}</li>
          <li>員工名稱：{{currentItem.employeeName}}</li>
          <li>E-mail：{{currentItem.email}}</li>
          <li>權限群組：{{currentItem.groupName}}</li>
          <li>帳號狀態：{{currentItem.employeeStatus}}</li>
        </ul>
      </div>
      <!-- 群組明細 -->
      <div v-if="dialog.type == 3">
        <ul class="list-detail">
          <li>群組名稱：{{currentItem.groupName}}</li>
          <li>權限列表：<span v-for="(subPermission,index) in currentItem.permissions" :key="subPermission.subPermissionName">{{subPermission.subPermissionName}}<span v-if="currentItem.permissions.length -1 !== index">、</span></span></li>
        </ul>
      </div>
      <!-- 新增群組、編輯群組 -->
      <div v-if="dialog.type == 4 || dialog.type == 6">
        <div class="w-full dashed-border">
          <FormTitle title="群組名稱"/>
          <InputGroup noMt>
            <Input
              slot="input"
              :value="dialog.type == 6 ? createGroup.groupName : currentItem.groupName"
              @updateValue="e=>{ dialog.type == 6 ? createGroup.groupName = e : currentItem.groupName = e}"
            />
          </InputGroup>
        </div>
        <div class="column-2 mt-2">
          <template v-for="(item,index) in permissionsList">
            <Checkbox
              :key="`checkbox-${index}`"
              :id="item.menuSubTitleName"
              class="text-md"
              :text="item.menuSubTitleName"
              :checked="dialog.type == 4 ? currentItem.permissions.filter(i => i.subPermissionId == item.menuSubTitleId).length !== 0 : false"
              :value="dialog.type == 4 ? currentItem.permissions.filter(i => i.subPermissionId == item.menuSubTitleId).length !== 0  : false"
              @updateValue="e => updatePermissions(e, item)"
            />
          </template>
        </div>
      </div>
      <!-- 群組刪除 -->
      <div v-if="dialog.type == 5">
        <ul class="list-detail">
          <li>群組名稱：{{currentItem.groupName}}</li>
          <li>權限列表：<span v-for="(subPermission,index) in currentItem.permissions" :key="subPermission.subPermissionName">{{subPermission.subPermissionName}}<span v-if="currentItem.permissions.length -1 !== index">、</span></span></li>
        </ul>
      </div>
      <!-- 新增成員 -->
      <div v-if="dialog.type == 7">
        <div class="column-2">
          <InputGroup title="員工編號">
            <Select slot="input" :options="taianUsers" :selected="createUser.employeeName" @emitItem="e =>{createUser.employeeId = e.Value; createUser.employeeName = e.Text}" defaultText="選擇員工" search/>
          </InputGroup>
          <InputGroup title="群組權限">
            <Select slot="input" defaultText="選擇權限" :options="groupsList" :selected="createUser.groupId"  @emitItem="e =>{ createUser.groupId = e.Value}"/>
          </InputGroup>
        </div>
        <div class="column-2">
          <InputGroup title="帳號狀態">
            <Select slot="input" defaultText="選擇狀態" :options="employeeStatusList" @emitItem="e => {createUser.employeeStatus = e}"/>
          </InputGroup>
          <InputGroup title="E-mail">
            <Input slot="input" placeholder="輸入E-mail" :value="createUser.email" @updateValue="e => {createUser.email = e}"/>
          </InputGroup>
        </div>
        <div class="column-2">
          <InputGroup title="分機">
            <Input slot="input" placeholder="輸入分機" :value="createUser.extension" @updateValue="e => {createUser.extension = e}"/>
          </InputGroup>
        </div>
      </div>
    </PopupDialog>
    <WindowResizeListener @resize="handleResize"/>
  </CommonBoard>
  <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import TableGroup from '@/components/TableGroup'
import Pagination from '@/components/pagination'
import LoadingScreen from '@/components/LoadingScreen.vue'
import NavMenu from '@/components/NavMenu'
import InputGroup from '@/components/InputGroup/index.vue'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import FormTitle from '@/components/FormTitle.vue'
import WindowResizeListener from '@/components/WindowResizeListener'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import { membersListTable, groupListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components:{
    CommonBoard,
    TableGroup,
    Pagination,
    LoadingScreen,
    NavMenu,
    InputGroup,
    Input,
    Button,
    PopupDialog,
    WindowResizeListener,
    Select,
    Checkbox,
    FormTitle
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      membersListTable: membersListTable(),
      groupListTable: groupListTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 0,
      itemLists:[
        { text: '成員', value: 0 },
        { text: '群組', value: 1 }
      ],
      employeeStatusList:[
        { Text: '啟用', Value: 1 },
        { Text: '停用', Value: 0 }
      ],
      taianUsers: [],
      groupsList: [],
      permissionsList: [],
      currentItem: {},
      createUser: {
        employeeId: '',
        employeeName: '',
        employeeStatus: '',
        email: '',
        extension: '',
      },
      createGroup: {
        groupName: '',
        permissions: [],
      }
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
      const slotArr = ['permissions','operate']
      for (let i = 0; i < this.membersListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  watch: {
    async currentTag(val) {
      if (val === 0) {
        await this.$store.dispatch('resource/PermissionSettingUsers')
      } else {
        await this.groupInit()
      }
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      // this.$store.dispatch('app/updatedCurrentPage',page)
    },
    callDialog(type,title, okText, item) {
      this.openDialog = true
      this.dialog.title = title
      this.dialog.type = type
      if(item)this.currentItem = JSON.parse(JSON.stringify(item))
      if(okText) this.dialog.okText = okText
    },
    closeDialog() {
      if(this.dialog.type === 0 || this.dialog.type === 1 || this.dialog.type === 2 ) {
        this.currentItem = {}
      }
      if(this.dialog.type === 7) {
        this.createUser = {
          employeeId: '',
          employeeName: '',
          employeeStatus: '',
          email: '',
          extension: '',
        }
      }
    },
    updatePermissions(value, item) {
      const data = {
        ...item,
        subPermissionId: item.menuSubTitleId,
        subPermissionName: item.menuSubTitleName,
      }
      
      if(this.dialog.type == 4) {//編輯群組
      const index = this.currentItem.permissions.findIndex(i => i.subPermissionId === item.menuSubTitleId)
        value
          ? this.currentItem.permissions.push(data)
          : this.currentItem.permissions.splice(index, 1)
      } else if(this.dialog.type == 6) {//新增群組
      const index = this.createGroup.permissions.findIndex(i => i.subPermissionId === item.menuSubTitleId)
        value
          ? this.createGroup.permissions.push(data)
          : this.createGroup.permissions.splice(index, 1)
      }
    },
    async confirmDialog() {
      if(this.dialog.type === 7) {//新增成員
        const data = {...this.createUser}
        data.employeeStatus = Number(this.createUser.employeeStatus.Value)
        await this.$store.dispatch('permissionSetting/AddUsers', data)
        await this.getUser()
      }
      if(this.dialog.type === 1) {//編輯成員
         const data = {...this.currentItem}
        data.employeeStatus = this.currentItem.employeeStatus=== '啟用' ? 1 : 0
        await this.$store.dispatch('permissionSetting/UpdateUser', data)
        await this.getUser()
        this.currentItem = {}
      }
      if(this.dialog.type === 2) {//刪除成員
        await this.$store.dispatch('permissionSetting/DeleteUser', this.currentItem)
        await this.getUser()
        this.currentItem = {}
      }
      
      if(this.dialog.type === 6) {//新增群組
        const data = {
          ...this.createGroup,
          menuSubTitleIds: this.createGroup.permissions.map(item => item.subPermissionId),
        }
        await this.$store.dispatch('permissionSetting/AddGroup', data)
        await this.groupInit()
        this.createGroup = {
          groupName: '',
          permissions: [],
        }
      }
      if(this.dialog.type === 4) {//編輯群組
        const data = {
          ...this.currentItem,
          modifyGroupName: this.currentItem.groupName,
          menuSubTitleIds: this.currentItem.permissions.map(item => item.subPermissionId),
        }
        await this.$store.dispatch('permissionSetting/UpdateGroup', data)
        await this.groupInit()
        this.currentItem = {permissions: []}
      }
      if(this.dialog.type === 5) {//刪除群組
        await this.$store.dispatch('permissionSetting/DeleteGroup', {groupId: this.currentItem.groupId})
        await this.groupInit()
        this.currentItem = {permissions: []}
      }
    },
    async pageInit() {
      const groupsList = await this.$store.dispatch('resource/PermissionSettingGroups')
      const taianUsers = await this.$store.dispatch('resource/TaianUsers')
      this.taianUsers = taianUsers.data.content.map(item => {
        return {
          ...item,
          Text: item.employeeName,
          Value: item.employeeNumber
        }
      })
      this.groupsList = groupsList.data.content.map(item => {
        return {
          ...item,
          Text: item.groupName,
          Value: item.groupId
        }
      })
      await this.getUser()
    },
    async groupInit() {
      const group = await this.$store.dispatch('resource/PermissionSettingGroupsDetail')
        this.groupListTable.rows = group.data.content.map(item => {
          const permissions = []
          item.permissions.map(subItem => {
            subItem.subPermissions.map(subSubItem => {
              permissions.push(subSubItem)
            })
          })
          return {
            ...item,
            permissions
          }
        })
      const permissions = await this.$store.dispatch('resource/PermissionSettingGroupPermissions')
      this.permissionsList = permissions.data.content
    },
    async getUser() {
      const usersList = await this.$store.dispatch('resource/PermissionSettingUsers', 0)
      this.membersListTable.rows = usersList.data.content.userPermissionSettings.map(item => {
        return {
          ...item,
          employeeStatus: item.employeeStatus == 1 ? '啟用' : '停用',
          groupId: this.groupsList.find(i => i.Text === item.groupName).Value.toString(),
        }
      })
      this.$store.dispatch('app/updatedCurrentPage',1)
      this.$store.dispatch('app/updatedTotalPage',Math.ceil(usersList.data.content.totalCount/10))
    }
  },
  async mounted() {
    await this.pageInit()
  }
}
</script>

<style scoped lang="scss">
  .permission-setting {
    margin-top: 40px;
    @apply  w-full relative
  }
  .menu {
    top: -39px;
    @apply absolute
  }
.list-detail {
  li {
    @apply my-3
  }
}
</style>