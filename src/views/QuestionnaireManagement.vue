<template>
  <div>
    <FormTitle title="問卷表管理" class="text-lg mb-14"/>
    <CommonBoard>
      <div class="column-6 pb-6">
        <InputGroup class="w-full" title="被保險人姓名">
          <Input slot="input" placeholder="輸入姓名" :value="Parameters.InsuredName" @updateValue="e => Parameters.InsuredName = e"/>
        </InputGroup>
        <InputGroup class="w-full" title="被保險人身分證/統編">
          <Input slot="input" placeholder="輸入身分證/統編" :value="Parameters.InsuredId" @updateValue="e => Parameters.InsuredId = e"/>
        </InputGroup>
        <InputGroup class="w-full" title="分公司">
          <Select slot="input" defaultText="選擇名稱" :options="groupList" :value="Parameters.NGroup" @emitItem="(e) => Parameters.NGroup = e.Value"/>
        </InputGroup>
        <InputGroup class="w-full" title="經手人姓名或代號">
          <Input slot="input" placeholder="輸入姓名或代號" :value="Parameters.OfficerIdOrName" @updateValue="e => Parameters.OfficerIdOrName = e"/>
        </InputGroup>
        <InputGroup class="w-full" title="流水號">
          <Input slot="input" placeholder="輸入流水號" :value="Parameters.SerialNo" @updateValue="e => Parameters.SerialNo = e"/>
        </InputGroup>
        <InputGroup class="w-full" title="詢問表類型">
          <Select slot="input" defaultText="選擇類型" :options="typeList" :value="Parameters.QuestionnaireType" @emitItem="(e) => Parameters.QuestionnaireType = e.Value"/>
        </InputGroup>
      </div>
      <div class="column-6 pb-6">
        <InputGroup class="w-full" title="報價日期">
          <DatePicker slot="input" :dateObject="startDate" @emitDateItem="(e) => startDate = e" suffix="起"/>
        </InputGroup>
        <InputGroup class="w-full" >
          <DatePicker slot="input" :dateObject="endDate" @emitDateItem="(e) => endDate = e" suffix="迄"/>
        </InputGroup>
      </div>
      <div class="w-full flex justify-center mt-6 border-dashed border-0 border-t-2 h-10 relative">
        <Button @click.native="getQuestionnaireList" class="absolute -top-5 w-32">查詢</Button>
      </div>
      <div class="flex flex-row justify-end py-3">
        <div class="mr-3">
          <font-awesome-icon :icon="['fas','plus-circle']"  class="download" />
          <span class="download ml-1">活動問卷</span>
        </div>
        <div >
          <font-awesome-icon :icon="['fas','plus-circle']"  class="download" />
          <span class="download ml-1">場所問卷</span>
        </div>
      </div>
      <TableGroup :data="questionnaireList" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in questionnaireList.rows">
          <div :slot="`operate-${index}`" :key="`operate-${index}`"  class="flex flex-col items-center mr-7 mt-1" >
              <span class="download mb-3" >列印</span>
              <span class="download mb-3" >更正</span>
          </div>
        </template>
      </TableGroup>
      <Pagination v-if="false" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
    </CommonBoard>
    <WindowResizeListener @resize="handleResize"/>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import DatePicker from '@/components/DatePicker/index.vue'
import Button from '@/components/Button/index.vue'
import Select from '@/components/Select'
import WindowResizeListener from '@/components/WindowResizeListener'
import LoadingScreen from '@/components/LoadingScreen.vue'
import Pagination from '@/components/pagination'
import TableGroup from '@/components/TableGroup'
import { mapState } from 'vuex'
import { questionnaireList } from '@/utils/mockData'
export default {
  components: {
    FormTitle,
    CommonBoard,
    InputGroup,
    Input,
    DatePicker,
    Button,
    WindowResizeListener,
    LoadingScreen,
    Pagination,
    TableGroup,
    Select
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      startDate: {
        year: '',
        month: '',
        day: ''
      },
      endDate: {
        year: '',
        month: '',
        day: ''
      },
      groupList:[],
      typeList:[
        {
          Value: '',
          Text: '全部'
        },
        {Text:'活動問卷',Value:'1'},
        {Text:'場所問卷',Value:'2'}
      ],
      Parameters:{
        InsuredName:'',
        InsuredId: '',
        NGroup: '',
        OfficerIdOrName: '',
        SerialNo: '',
        QuestionnaireType: '',
        CreateTimeBegin: '',
        CreateTimeEnd: '',
        Skip: (Number(this.currentPage)-1)*10,
        Take: 10
      },
      questionnaireList: questionnaireList()
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
      'orderNo': state => state.common.orderNo,
      'token': state => state.home.token,
    }),
    slotArray () {
      const arr = []
      const slotArr = [ 'operate']
      for (let i = 0; i < this.questionnaireList.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  watch: {
    async currentPage(val) {
      await this.getQuestionnaireList(val)
    },
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    changePage(page) {
      if(this.currentPage === page || page < 1) return
      this.$store.dispatch('app/updatedCurrentPage',page)
    },
    async getQuestionnaireList(page) {
      if(page) {
        this.Parameters.Skip = (Number(page)-1)*10
      }
      const res = await this.$store.dispatch('questionnaire/GetQusetionnaireList',this.Parameters)
      this.questionnaireList.rows = res.data.content.map(item => {
        return {
          ...item,
          createTime: item.createTime.split('T')[0] + item.createTime.split('T')[1],
          rate: item.rate* 100 + '%',
          questionnaireType: item.questionnaireType === 1 ? '處所' : '活動'
        }
      })
    }
  },
  async mounted() {
    this.$store.dispatch('app/updatedCurrentPage',1)
    await this.getQuestionnaireList()
    const group = await this.$store.dispatch('resource/GetTaianNGroup')
    this.groupList = group.data.content.map(i => {
      return {
        Value: i,
        Text: i
      }
    })
    this.groupList.push({
      Value: '',
      Text: '全部'
    })
  }
}
</script>

<style lang="scss" scoped>
  .download {
    color: #1076EE;
    @apply cursor-pointer;
    &.disable {
      color: #C4C4C4;
      @apply cursor-not-allowed
    }
  }
</style>