<template>
  <div>
    <FormTitle title="詢問表管理" class="text-lg mb-5"/>
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
        <div @click="() => {openQuestionnaire(2,1); SerialNo = ''; clearActivityQuestionnaire()}" class="mr-3">
          <font-awesome-icon :icon="['fas','plus-circle']"  class="download" />
          <span class="download ml-1">活動詢問表</span>
        </div>
        <div  @click="() => {openQuestionnaire(1,1);SerialNo = ''; clearPlaceQuestionnaire()}">
          <font-awesome-icon :icon="['fas','plus-circle']"  class="download" />
          <span class="download ml-1">場所詢問表</span>
        </div>
      </div>
      <TableGroup :data="questionnaireList" :slotName="slotArray" scrollX column3>
        <template v-for="(item,index) in questionnaireList.rows">
          <div :slot="`createTime-${index}`" :key="`createTime-${index}`" class="mr-7 mt-1">
            <span v-if="windowWidth > 600">{{item.createTime.split('T')[0] +' '+ item.createTime.split('T')[1]}}</span>
            <span v-else>{{item.createTime.split('T')[0]}}<br>{{item.createTime.split('T')[1]}}</span>
          </div>
          <div :slot="`operate-${index}`" :key="`operate-${index}`"  class="flex items-center mr-7 mt-1" :class="{'flex-col': windowWidth > 600, 'flex-row ml-2': windowWidth <= 600}">
              <span class="download mb-3" @click="downloadFile(item.serialNo,item.questionnaireType)">列印</span>
              <span class="download mb-3" :class="{'ml-5': windowWidth <= 600}" @click="getQuestionnaire(item.serialNo,item.questionnaireType)">更正</span>
          </div>
        </template>
      </TableGroup>
      <Pagination :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
    </CommonBoard>
    <ActivityQuestionnaire
      type="activity"
      :questionnaire="activityQuestionnaire"
      :open.sync="openActivityQuestionnaire"
      :updateFunc="updatedActivityQuestionnaire"
      :clearFunc="clearActivityQuestionnaire"
      :questionnaireType="questionnaireType"
      :SerialNo="SerialNo"
      @addQuestionnaire="addQuestionnaire"
      @updateQuestionnaire="addQuestionnaire"
      hasUpdateFunc
      hasClearFunc
      QuestionnaireManagement/>
    <PlaceQuestionnaire
      type="place"
      :questionnaire="placeQuestionnaire"
      :open.sync="openPlaceQuestionnaire"
      :updateFunc="updatedPlaceQuestionnaire"
      :clearFunc="clearPlaceQuestionnaire"
      :questionnaireType="questionnaireType"
      :SerialNo="SerialNo"
      @addQuestionnaire="addQuestionnaire"
      @updateQuestionnaire="addQuestionnaire"
      hasUpdateFunc
      hasClearFunc
      QuestionnaireManagement/>
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
import ActivityQuestionnaire from '@/components/PopupDialog/ActivityQuestionnaire'
import PlaceQuestionnaire from '@/components/PopupDialog/PlaceQuestionnaire'
import { mapState } from 'vuex'
import { questionnaireList } from '@/utils/mockData'
import editCopyQuestionnaire from '@/utils/mixins/editCopyQuestionnaire'
import FileSaver from 'file-saver'
export default {
  mixins: [editCopyQuestionnaire],
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
    Select,
    ActivityQuestionnaire,
    PlaceQuestionnaire
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      openPlaceQuestionnaire: false,
      openActivityQuestionnaire: false,
      questionnaireType: 1,
      SerialNo: '',
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
        {Text:'活動詢問表',Value:'1'},
        {Text:'場所詢問表',Value:'2'}
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
      'activityQuestionnaire': state => state.questionnaire.activityQuestionnaire,
      'placeQuestionnaire': state => state.questionnaire.placeQuestionnaire,
      userInfo: state => state.home.userInfo
    }),
    slotArray () {
      const arr = []
      const slotArr = [ 'createTime','operate']
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
      this.questionnaireList.rows = res.data.content.questionnaires.map(item => {
        return {
          ...item,
          rate: item.rate* 100 + '%',
          questionnaireType: item.questionnaireType === 1 ? '處所' : '活動'
        }
      })
      this.$store.dispatch('app/updatedCurrentPage',page? page: 1)
      this.$store.dispatch('app/updatedTotalPage',Math.ceil(res.data.content.totalCount/10))
    },
    async downloadFile(orderNo, type) {
      const res = await this.$store.dispatch('common/GetQuestionnaireDocument',{ placeActivityType:type == '處所' ? 1 : 2 ,orderNo})
      var blob = new Blob([res.data], {type: "application/octet-stream"});
       FileSaver.saveAs(blob,  `${type}詢問表_${orderNo}.pdf`);
    },
    async getQuestionnaire(serialNo,type) {
      this.SerialNo = serialNo
      if(type === '處所') {
        const res = await this.$store.dispatch('questionnaire/GetPlaceQuestionnaireWithoutOrder',serialNo)
        if(res.data.content.placeQuestionnaire ) {
          const data = this.AssignQuestionnaireToManagement(res.data.content.placeQuestionnaire,type === '處所' ? 'place' : 'activity')
          data.insuredName = res.data.content.insuredName
          data.insuredId = res.data.content.insuredId
          data.title = res.data.content.title
          this.updatedPlaceQuestionnaire(data)
        }
      } else {
        const res = await this.$store.dispatch('questionnaire/GetActivityQuestionnaireWithoutOrder',serialNo)
        if(res.data.content.activityQuestionnaire) {
          const data = this.AssignQuestionnaireToManagement(res.data.content.activityQuestionnaire,type === '處所' ? 'place' : 'activity')
          data.insuredName = res.data.content.insuredName
          data.insuredId = res.data.content.insuredId
          data.title = res.data.content.title
          this.updatedActivityQuestionnaire(data)
        }
      }
      this.openQuestionnaire(type == '處所' ? 1 : 2,2)
    },
    async addQuestionnaire(type) {
      if(type == 1) {
        const data = this.placeQuestionnaireMapping(this.placeQuestionnaire)
        let payload = {
          placeQuestionnaire:JSON.parse(JSON.stringify(data)),
          insuredName: data.insuredName,
          insuredId: data.insuredId,
          title: data.title
        }
        if(this.questionnaireType == 1) {
          await this.$store.dispatch('questionnaire/AddPlaceQuestionnaireWithoutOrder',payload)
        } else {
          payload.questionnaireNo = this.SerialNo
          await this.$store.dispatch('questionnaire/UpdatePlaceQuestionnaireWithoutOrder',payload)
        }
      } else {
        const data = this.activityQuestionnaireMapping(this.activityQuestionnaire)
        let payload = {
          activityQuestionnaire:JSON.parse(JSON.stringify(data)),
          insuredName: data.insuredName,
          insuredId: data.insuredId,
          title: data.title
        }
        if(this.questionnaireType == 1) {
          await this.$store.dispatch('questionnaire/AddActivityQuestionnaireWithoutOrder',payload)
        } else {
          payload.questionnaireNo = this.SerialNo
          await this.$store.dispatch('questionnaire/UpdateActivityQuestionnaireWithoutOrder',payload)
        }
      }
      await this.getQuestionnaireList()
    },
    activityQuestionnaireMapping(data) {
      let copyData = JSON.parse(JSON.stringify(data))
      if(Object.keys(copyData.sheet1.part1.beginDateTime).every(key => copyData.sheet1.part1.beginDateTime[key] !== '')) {
        copyData.sheet1.part1.beginDateTime = `${Number(copyData.sheet1.part1.beginDateTime.year)+1911}-${copyData.sheet1.part1.beginDateTime.month}-${copyData.sheet1.part1.beginDateTime.day} ${copyData.sheet1.part1.beginDateTime.hours}:${copyData.sheet1.part1.beginDateTime.minutes}`
      } else {
        copyData.sheet1.part1.beginDateTime = null
      }
      if(copyData.sheet1.part3.afterActivityHasAccessByTransportation == '是'){
        copyData.sheet1.part3.afterActivityHasAccessByTransportation = true
      } else if(copyData.sheet1.part3.afterActivityHasAccessByTransportation == '否') {
        copyData.sheet1.part3.afterActivityHasAccessByTransportation = false
      } else {
        copyData.sheet1.part3.afterActivityHasAccessByTransportation = null
      }
      if(copyData.sheet1.part3.useRoadHasAccessByTransportation == '是'){
        copyData.sheet1.part3.useRoadHasAccessByTransportation = true
      } else if (copyData.sheet1.part3.useRoadHasAccessByTransportation == '否') {
        copyData.sheet1.part3.useRoadHasAccessByTransportation = false
      } else {
        copyData.sheet1.part3.useRoadHasAccessByTransportation = null
      }
      return copyData
    },
    placeQuestionnaireMapping(data) {
      let copyData = JSON.parse(JSON.stringify(data))
      copyData = {
          ...copyData,
          part2: {
            ...copyData.part2,
            buildingNature: copyData.part2.buildingNature.Value,
            nearbyBuildingNature: copyData.part2.nearbyBuildingNature.Value,
            securityCheck: copyData.part2.securityCheck.Value,
            room: {...copyData.part2.room,roomAmount: copyData.part2.room.value},
            seat: {...copyData.part2.seat,seatAmount: copyData.part2.seat.value},
          }
        }
        if(Object.keys(copyData.part1.createTime).every(key => copyData.part1.createTime[key] !== '')) {
          copyData.part1.createTime = `${Number(copyData.part1.createTime.year)+1911}-${copyData.part1.createTime.month}-${copyData.part1.createTime.day}`
        } else copyData.part1.createTime = null

        if(Object.keys(copyData.part1.businessStartDate).every(key => copyData.part1.businessStartDate[key])) {
          copyData.part1.businessStartDate = `${copyData.part1.businessStartDate.hours}:${copyData.part1.businessStartDate.minutes}`
        } else copyData.part1.businessStartDate = null

        if(Object.keys(copyData.part1.businessEndDate).every(key => copyData.part1.businessEndDate[key])) {
          copyData.part1.businessEndDate = `${copyData.part1.businessEndDate.hours}:${copyData.part1.businessEndDate.minutes}`
        } else copyData.part1.businessEndDate = null
        return copyData
    },
    openQuestionnaire(type,status) {
      this.questionnaireType = status
      if(type === 1) {
        this.openPlaceQuestionnaire = true
      } else {
        this.openActivityQuestionnaire = true
      }
    },
    updatedActivityQuestionnaire(data) {
      this.$store.dispatch('questionnaire/updatedActivityQuestionnaire',data)
    },
    updatedPlaceQuestionnaire(data) {
      this.$store.dispatch('questionnaire/updatedPlaceQuestionnaire',data)
    },
    clearActivityQuestionnaire() {
      this.$store.dispatch('questionnaire/clearActivityQuestionnaire')
      this.$store.dispatch('questionnaire/updatedActivityQuestionnaire', {...this.$store.state.questionnaire.activityQuestionnaire,userId:this.userInfo.userid})
    },
    clearPlaceQuestionnaire() {
      this.$store.dispatch('questionnaire/clearPlaceQuestionnaire')
      this.$store.dispatch('questionnaire/updatedPlaceQuestionnaire', {...this.$store.state.questionnaire.placeQuestionnaire,userId:this.userInfo.userid})
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