<template>
  <CommonBoard class="permission-setting rotate">
    <NavMenu
      class="menu rotate"
      :itemLists="itemLists"
      :currentTag="currentTag"
      @updatedMenu="(e) => currentTag = e"
      rotate
    />
    <div class="column-5 mb-4">
      <InputGroup v-if="currentTag == 0" class="industry-input-group" bgColor="white" noMt>
        <Input slot="input" class="max-w-full" placeholder="搜尋姓名或編號" slotIcon>
          <font-awesome-icon class="text-main absolute top-3 right-3" :icon="['fas','magnifying-glass']" />
        </Input>
      </InputGroup>
      <div v-else class="col-start-4 flex justify-end">
        <Button class="mr-2 w-32" @click.native="callDialog(6,'新增群組','新增群組')" outline>新增群組</Button>
      </div>
    </div>
    <div class="flex w-full">
      <TableGroup v-if="currentTag == 0" class="w-full" :data="membersListTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in membersListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Button class="mr-2" @click.native="callDialog(0,'帳號明細')" outline>明細</Button>
            <Button class="mr-2" @click.native="callDialog(1,'編輯帳號', '儲存編輯')" outline>編輯</Button>
            <Button outline @click.native="callDialog(2,'刪除帳號', '確認刪除')">刪除</Button>
        </div>
        </template>
      </TableGroup>
      <TableGroup v-else class="w-full" :data="groupListTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in membersListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Button class="mr-2" @click.native="callDialog(3,'群組明細')" outline>明細</Button>
            <Button class="mr-2" @click.native="callDialog(4,'編輯群組', '儲存編輯')" outline>編輯</Button>
            <Button outline @click.native="callDialog(5,'刪除群組', '確認刪除')">刪除</Button>
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
    >
      <div v-if="dialog.type == 0">
        <ul class="list-detail">
          <li>員工編號：F624</li>
          <li>員工名稱：陳小林</li>
          <li>E-mail：H014@mail.xxxx.com.tw</li>
          <li>權限群組：系統管理員</li>
          <li>帳號狀態：啟用</li>
        </ul>
      </div>
      <div v-if="dialog.type == 1">
        <p><span>員工標號：H014</span><span class="ml-2">員工名稱：陳小林</span></p>
        <div class="column-2 my-3">
          <InputGroup title="群組權限">
            <Select slot="input" defaultText="系統管理員"/>
          </InputGroup>
          <InputGroup title="帳號狀態">
            <Select slot="input" defaultText="啟用"/>
          </InputGroup>
        </div>
        <div class="column-2 my-3">
          <InputGroup title="E-mail">
            <Input slot="input" value="H014@mail.xxxx.com.tw"/>
          </InputGroup>
          <InputGroup title="分機">
            <Input slot="input" value="12"/>
          </InputGroup>
        </div>
      </div>
      <div v-if="dialog.type == 2">
        <ul class="list-detail">
          <li>員工編號：F624</li>
          <li>員工名稱：陳小林</li>
          <li>E-mail：H014@mail.xxxx.com.tw</li>
          <li>權限群組：系統管理員</li>
          <li>帳號狀態：啟用</li>
        </ul>
      </div>
      <div v-if="dialog.type == 3">
        <ul class="list-detail">
          <li>群組名稱：系統管理員</li>
          <li>權限列表：負責人設定、會員管理</li>
        </ul>
      </div>
      <div v-if="dialog.type == 4 || dialog.type == 6">
        <div class="w-full dashed-border">
          <FormTitle title="群組名稱"/>
          <InputGroup noMt>
            <Input slot="input" value="系統管理員"/>
          </InputGroup>
        </div>
        <FormTitle class="mt-2" title="管理者功能"/>
        <div class="column-2 mt-2">
          <Checkbox
            id="管理者帳號設定"
            class="text-md"
            text="管理者帳號設定"
            slot="input"
          />
          <Checkbox
            id="管理者群組設定"
            class="text-md"
            text="管理者群組設定"
            slot="input"
          />
        </div>
        <div class="column-2 mt-2 dashed-border">
          <Checkbox
            id="系統設定"
            class="text-md"
            text="系統設定"
            slot="input"
          />
          <Checkbox
            id="查看資料設定"
            class="text-md"
            text="查看資料設定"
            slot="input"
          />
        </div>
        <FormTitle class="mt-2" title="商品功能"/>
         <div class="column-2 mt-2">
          <Checkbox
            id="權重設定"
            class="text-md"
            text="權重設定"
            slot="input"
          />
          <Checkbox
            id="保費設定"
            class="text-md"
            text="保費設定"
            slot="input"
          />
        </div>
        <div class="column-2 mt-2 dashed-border">
          <Checkbox
            id="額度設定"
            class="text-md"
            text="額度設定"
            slot="input"
          />
          <Checkbox
            id="另行報價設定"
            class="text-md"
            text="另行報價設定"
            slot="input"
          />
        </div>
      </div>
      <div v-if="dialog.type == 5">
        <ul class="list-detail">
          <li>群組名稱：系統管理員</li>
          <li>權限列表：負責人設定、會員管理</li>
        </ul>
      </div>
    </PopupDialog>
    <WindowResizeListener @resize="handleResize"/>
  </CommonBoard>
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
      const slotArr = [ 'operate']
      for (let i = 0; i < this.membersListTable.rows.length; i++) {
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
    callDialog(type,title, okText) {
      this.openDialog = true
      this.dialog.title = title
      this.dialog.type = type
      if(okText) this.dialog.okText = okText
    }
  },

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
@media screen and (max-width: 600px) {
  .permission-setting.rotate {
    margin-top: 0;
    padding-left: 50px;
  }
  .menu.rotate{
    top: 20px;
    left: -5px;
    @apply absolute
  }
}
.list-detail {
  li {
    @apply my-3
  }
}
</style>