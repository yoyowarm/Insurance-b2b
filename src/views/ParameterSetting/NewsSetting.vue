<template>
<div>
  <FormTitle title="最新消息設定" class="text-lg"/>
  <CommonBoard class="w-full">
    <div class="column-5 sm:mb-4">
      <div class="col-start-5 flex justify-end">
        <Button class="sm:mr-2 w-full sm:w-32" @click.native="callDialog(0,'新增消息','新增消息')" outline>新增</Button>
      </div>
    </div>
    <TableGroup :data="newsListTable" @popup="popup" :slotName="newsSlotArray" scrollX boldFont>
      <template v-for="(item,index) in newsListTable.rows">
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex flex-row whitespace-no-wrap">
            <Button outline class="mr-3" @click.native="callDialog(1,'編輯消息','儲存編輯',item)">編輯</Button>
            <Button @click.native="callDialog(2,'刪除消息','確認刪除',item)">刪除</Button>
          </div>
        </template>
    </TableGroup>
    <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
    <WindowResizeListener @resize="handleResize"/>
    <PopupDialog
      :open.sync="openDialog"
      :headerText="dialog.title"
      confirm
      cancel="取消"
      :ok="dialog.okText"
      @cancel="closeDialog"
      @ok="confirmDialog"
    >
    <div v-if="dialog.type == 2">
      確定刪除此消息？
    </div>
    <div v-if="dialog.type !== 2" class="flex flex-col">
      <div class="column-3 mb-5">
        <InputGroup class="col-span-2" title="標題">
          <Input slot="input" placeholder="請輸標題" :value="currentItem.title" @updateValue="e => currentItem.title = e"/>
        </InputGroup>
        <InputGroup title="狀態">
          <Select slot="input" defaultText="選擇狀態" :options="isEnableOptions" :selected="currentItem.isEnable" @emitItem="e => currentItem.isEnable = e.Value"/>
        </InputGroup>
      </div>
      <VueEditor v-model="currentItem.content"/>
      <div class="column-4 mt-5">
        <InputGroup class="col-span-2" title="前台排序">
          <Input slot="input" numberOnly placeholder="請輸入排序" :value="currentItem.sort" @updateValue="e => currentItem.sort = e"/>
        </InputGroup>
      </div>
      <div class="column-4 mt-5">
        <InputGroup class="col-span-2" title="開始時間">
          <DatePicker slot="input" :dateObject="startDate" @emitDateItem="(e) => startDate = e"/>
        </InputGroup>
        <InputGroup>
          <Select
            slot="input"
            :options="hoursOptions"
            :selected="startDate.hours"
            @emitItem="(e) => startDate.hours = e.Value"
            defaultText="- - 點"
          />
        </InputGroup>
        <InputGroup >
          <Select
            slot="input"
            defaultText="- - 分"
            :selected="startDate.minutes"
            @emitItem="(e) => startDate.minutes = e.Value"
            :options="minutesOptions"
          />
        </InputGroup>
      </div>
      <div class="column-4 mt-2">
        <InputGroup class="col-span-2" title="結束時間">
          <DatePicker slot="input" :dateObject="endDate" @emitDateItem="(e) => endDate = e"/>
        </InputGroup>
        <InputGroup>
          <Select
            slot="input"
            :options="hoursOptions"
            :selected="endDate.hours"
            @emitItem="(e) => endDate.hours = e.Value"
            defaultText="- - 點"
          />
        </InputGroup>
        <InputGroup >
          <Select
            slot="input"
            defaultText="- - 分"
            :selected="endDate.minutes"
            @emitItem="(e) => endDate.minutes = e.Value"
            :options="minutesOptions"
          />
        </InputGroup>
      </div>
    </div>
    </PopupDialog>
  </CommonBoard>
</div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import TableGroup from '@/components/TableGroup'
import Pagination from '@/components/pagination'
import LoadingScreen from '@/components/LoadingScreen.vue'
import Button from '@/components/Button'
import WindowResizeListener from '@/components/WindowResizeListener'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
import DatePicker from '@/components/DatePicker'
import { NewsPopup } from '@/utils/popups'
import { mapState } from 'vuex'
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import { VueEditor } from "vue2-editor";
export default {
  components:{
    CommonBoard,
    TableGroup,
    Pagination,
    LoadingScreen,
    WindowResizeListener,
    Button,
    PopupDialog,
    VueEditor,
    InputGroup,
    Input,
    Select,
    DatePicker,
    FormTitle
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentItem: {
        sort: 0,
      },
      startDate: {
        year: '',
        month: '',
        day: '',
        hours: '',
        minutes: ''
      },
      endDate: {
        year: '',
        month: '',
        day: '',
        hours: '',
        minutes: ''
      },
      isEnableOptions: [
        {
          Value: true,
          Text: '啟用'
        },
        {
          Value: false,
          Text: '停用'
        }
      ],
      audienceTypeOptions: [
        {
          Value: 0,
          Text: '外部通路'
        },
        {
          Value: 1,
          Text: '泰安員工'
        },
      ],
      newsListTable: {
        head: [
          {
            text: '消息標題',
            value: 'title',
            size: '3-6'
          },
          {
            text: '發布日期',
            value: 'lumchTime',
            size: '3-6'
          },
          {
            text: '下架時間',
            value: 'offTime',
            size: '3-6'
          },
          {
            text: '建立時間',
            value: 'createTime',
            size: '3-6'
          },
          {
            text: '啟用狀態',
            value: 'isEnableText',
            size: '2-6'
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
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    newsSlotArray () {
      const arr = []
      const slotArr = ['operate']
      for (let i = 0; i < this.newsListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    },
    hoursOptions () {
        const arr = []
        for (let i = 0; i <= 24; i++) {
          arr.push({
            Text: `${i}點`,
            Value: i
          })
        }
        return arr 
      },
      minutesOptions () {
        const arr = []
        for (let i = 0; i <= 59; i++) {
          arr.push({
            Text: `${i}分`,
            Value: i
          })
        }
        return arr 
      }
  },
  watch: {
    async currentPage() {
      await this.getNews()
    },
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    callDialog(type,title, okText, item) {
      this.openDialog = true
      this.dialog.title = title
      this.dialog.type = type
      if(item)this.currentItem = JSON.parse(JSON.stringify(item))
      if(okText) this.dialog.okText = okText
      if (type == 1) {
        this.startDate = {
          year: Number(this.currentItem.lumchTime.split(' ')[0].split('-')[0])-1911,
          month: this.currentItem.lumchTime.split(' ')[0].split('-')[1],
          day: this.currentItem.lumchTime.split(' ')[0].split('-')[2],
          hours: this.currentItem.lumchTime.split(' ')[1].split(':')[0],
          minutes: this.currentItem.lumchTime.split(' ')[1].split(':')[1]
        }
        this.endDate = {
          year: Number(this.currentItem.offTime.split(' ')[0].split('-')[0])-1911,
          month: this.currentItem.offTime.split(' ')[0].split('-')[1],
          day: this.currentItem.offTime.split(' ')[0].split('-')[2],
          hours: this.currentItem.offTime.split(' ')[1].split(':')[0],
          minutes: this.currentItem.offTime.split(' ')[1].split(':')[1]
        }
      } 
      if(type == 0) {
          this.startDate = {
            year: new Date().getFullYear()-1911,
            month: new Date().getMonth()+1,
            day: new Date().getDate(),
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
          }
          this.endDate = {
            year: (new Date().getFullYear()-1910),
            month: new Date().getMonth()+1,
            day: new Date().getDate(),
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
          }
        }
    },
    closeDialog() {
      this.openDialog = false
      this.currentItem = {}
    },
    async confirmDialog() {
      const data = {
        id: this.currentItem.id,
        title: this.currentItem.title,
        content: this.currentItem.content,
        lumchTime: `${Number(this.startDate.year)+1911}-${this.startDate.month}-${this.startDate.day} ${this.startDate.hours}:${this.startDate.minutes}`,
        offTime: `${Number(this.endDate.year)+1911}-${this.endDate.month}-${this.endDate.day} ${this.endDate.hours}:${this.endDate.minutes}`,
        audienceType: 0,
        isEnable: this.currentItem.isEnable,
        sort: this.currentItem.sort ? this.currentItem.sort : 0
      }
      if (this.dialog.type == 0) {
        await this.$store.dispatch('news/AddNews', data)
      }
      if (this.dialog.type ==1) {
        await this.$store.dispatch('news/UpdateNews', data)
      }
      if (this.dialog.type == 2) {
        await this.$store.dispatch('news/DeleteNews', this.currentItem.id)
      }
      await this.getNews(this.currentPage)
      this.openDialog = false
      this.currentItem = {}
      this.startDate = { year: '',month: '',day: '',hours: '',minutes: ''}
      this.endDate = { year: '',month: '',day: '',hours: '',minutes: ''}
    },
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
      await this.getNews(page)
    },
    async getNews(page) {
      const newsList = await this.$store.dispatch('news/GetNewsList', {skip: page ? (page-1)*10 : (this.currentPage-1)*10})
      this.$store.dispatch('app/updatedTotalPage',newsList.data.TotalPage)
      this.newsListTable.rows = newsList.data.content.news.map(i => {
        return {
          ...i,
          lumchTime: i.lumchTime.split('T')[0] + ' ' + i.lumchTime.split('T')[1].split('.')[0],
          offTime: i.offTime.split('T')[0] + ' ' + i.offTime.split('T')[1].split('.')[0],
          isEnableText: i.isEnable ? '啟用' : '停用',
          createTime: i.createTime.split('T')[0] + ' ' + i.createTime.split('T')[1].split('.')[0],
        }
      })
      this.$store.dispatch('app/updatedCurrentPage',1)
      this.$store.dispatch('app/updatedTotalPage',Math.ceil(newsList.data.content.totalCount/10))
    },
    popup(item) {
      NewsPopup.create({
        headerText: item.title,
        hasHtml: true,
        htmlText: `<div>${item.content}</div>`,
        lanuchDate: item.lumchTime,
      })
    },
  },
  async mounted() {
    this.$store.dispatch('app/updatedCurrentPage',1)
    await this.getNews()
  }
}
</script>

<style scoped lang="postcss">
  .link {
    color: #1076EE;
    @apply cursor-pointer
  }
</style>