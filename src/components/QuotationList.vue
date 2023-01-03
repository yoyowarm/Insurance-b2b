<template>
  <div>
    <template v-for="(tableData,index) in listData">
      <div class="flex mb-2" :class="{'flex-row': windowWidth > 600, 'flex-col': windowWidth <= 600}" :key="index+'tableOderNo'">
        <div class="flex flex-row"  :class="{'ml-4': windowWidth <= 600}">
          <div v-if="currentTag == 0" @click="() => {if(!tableData.rows[0].isFinishQuotation) {copyQuotation(tableData.rows[0].type,'',tableData.rows[0].mainOrderNo,'addSerialNo')}}">
            <font-awesome-icon :icon="['fas','plus-circle']"  class="download" :class="{'disable': tableData.rows[0].isFinishQuotation}"/>
            <span class="download ml-1" :class="{'disable': tableData.rows[0].isFinishQuotation}">新增序號</span>
          </div>
          <span v-if="currentTag == 0" @click="() =>{if(!tableData.rows[0].isFinishQuotation){copyQuotation(tableData.rows[0].type,'',tableData.rows[0].mainOrderNo,'updateQuotation')}}" class="download text-base ml-4 mr-2" :class="{'disable': tableData.rows[0].isFinishQuotation}"><font-awesome-icon class="mr-1" :icon="['far','pen-to-square']" /><span>更正要被保人</span></span>
          <span class="text-white px-2 leading-none rounded-xl text-sm flex justify-center items-center" :class="{'bg-green-700': tableData.rows[0].type == 1, 'bg-red-500':tableData.rows[0].type == 2}">{{tableData.rows[0].type == 1 ? '處所':'活動'}}</span>
        </div>
        <div class="flex flex-row" :class="{'ml-4': windowWidth <= 600}">
          <span :class="{'ml-0 mr-4': windowWidth <= 600, 'ml-4 mr-4': windowWidth > 600}">關聯號{{tableData.rows[0].mainOrderNo}}-<span :class="{'text-red-500': !tableData.rows[0].isFinishQuotation, 'text-success': tableData.rows[0].isFinishQuotation}">{{tableData.rows[0].isFinishQuotation ? '已確認' : '未確認'}}</span></span>
          <span>保單編號{{tableData.rows[0].policyNo}}</span>
        </div>
      </div>
      <TableGroup :key="'tableData'+index" :data="tableData" :slotName="tableData.slotArray" scrollX column3 @review="(e) =>review(e,tableData.rows)" class="mb-4" style="border-bottom: 1px solid #d1d5db">
        <template v-for="(item,index) in tableData.rows">
          <div v-if="currentTag == 0" :slot="`edit-${index}`" :key="`edit-${index}`" class="flex flex-row relative" :class="{'h-24': windowWidth <= 600 && item.policyStatus !== 99}">
            <div class="text-gray-600 bg-gray-100 md:bg-white text-center md:text-left md:p-1 md:rounded-b-xl  min-h-4" v-if="item.policyStatus == 99">序號改為:{{item.newSerialNo}}</div>
            <div class="text-gray-600 bg-gray-100 md:bg-white text-center md:text-left md:p-1 md:rounded-b-xl  min-h-4 mr-9 mt-5 ml-1" v-else-if="(item.policyStatus == 7 && tableData.rows.filter(i => i.mainOrderNo == item.mainOrderNo).length > 1 && tableData.rows.some(i => i.policyStatus == 8))">- -</div>
            <div v-else class="flex items-center mr-7 mt-1" :class="{'absolute flex-row top-12': windowWidth <= 600, 'flex-col': windowWidth > 600}">
              <span class="download whitespace-no-wrap" :class="{'mb-3': windowWidth > 600}" @click.stop="popup(item)">列印</span>
              <span class="download whitespace-no-wrap" :class="{'mb-3': windowWidth > 600, 'ml-16': windowWidth <= 600}" v-if="!tableData.rows[0].isFinishQuotation" @click.stop="copyQuotation(item.type,item.orderNo, item.mainOrderNo,'correct')">更正</span>
              <span class="download whitespace-no-wrap" :class="{'ml-16': windowWidth <= 600}" @click.stop="() => {copyQuotation(item.type,item.orderNo,item.mainOrderNo)}">複製</span>
            </div>
            <div class="flex" v-if="item.policyStatus !== 99" :class="{'flex-row absolute top-2': windowWidth <= 600, 'flex-col': windowWidth > 600}">
              <Button class="minButton whitespace-no-wrap" @click.native="(e) =>{e.stopPropagation();processHistory(item.orderNo)}" outline>查看歷程</Button>
              <Button v-if="false" class="minButton whitespace-no-wrap" :class="{'ml-5': windowWidth <= 600}" @click.native="(e) =>{e.stopPropagation();modifyLogs(item.orderNo)}" outline>異動比對</Button>
              <Button class="minButton whitespace-no-wrap" :disabled="item.policyStatus !== 7" :class="{'ml-5': windowWidth <= 600}" @click.native="(e) => {e.stopPropagation();finishQuotation(item.orderNo)}" v-if="!item.isFinishQuotation" outline>確認報價</Button>
            </div>
          </div>
          <div v-if="currentTag == 1" :slot="`edit-${index}`" :key="`edit-${index}`" class="flex flex-row relative" :class="{'h-24': windowWidth <= 600 && item.policyStatus !== 99}">
            <div class="flex items-center mr-7 mt-1" :class="{'absolute flex-row top-12': windowWidth <= 600, 'flex-col': windowWidth > 600}">
              <span class="download whitespace-no-wrap" :class="{'mb-3': windowWidth > 600}" @click.stop="popup(item)">列印</span>
              <span class="download whitespace-no-wrap" :class="{'ml-16': windowWidth <= 600}" @click.stop="() => {copyQuotation(item.type,item.orderNo,item.mainOrderNo,'audit')}">審核</span>
            </div>
          </div>
          <div class="text-gray-600 bg-gray-100 md:bg-white md:p-1 md:rounded-b-xl text-center md:text-left  min-h-4 flex flex-col" :slot="`ConvergeStartDate-${index}`" :key="`ConvergeStartDate-${index}`">
            <span class="whitespace-no-wrap">{{item.insuranceBeginTime.split('T')[0]}}<span class="text-sm ml-1">起</span></span>
            <span class="whitespace-no-wrap">{{item.insuranceEndTime.split('T')[0]}}<span class="text-sm ml-1">迄</span></span>
          </div>
          </template>
      </TableGroup>
    </template>
    <HistoryPopup :open.sync="openHistory" :historyData="historyData"/>
    <ModifyLogPopup :open.sync="openLog" :modifyLogData="modifyLogData"/>
    <DownloadFile :open.sync="open" :orderNo="orderNo" :item="downloadQuotation" headerText="列印文件"/>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import TableGroup from '@/components/TableGroup'
import DownloadFile from '@/components/PopupDialog/DownloadFile.vue'
import Button from '@/components/Button'
import HistoryPopup from '@/components/PopupDialog/historyPopup'
import ModifyLogPopup from '@/components/PopupDialog/modifyLogPopup'
import { quotationListTable, quotationLisMobileTable, auditListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
import { Popup } from '@/utils/popups'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    currentTag: {
      type: Number,
      default: 0
    }
  },
  components: {
    TableGroup,
    DownloadFile,
    Button,
    WindowResizeListener,
    HistoryPopup,
    ModifyLogPopup
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      open: false,
      openHistory: false,
      openLog:false,
      historyData: [],
      modifyLogData: [],
      downloadQuotation: {},
    }
  },
  computed: {
    ...mapState({
      'orderNo': state => state.common.orderNo,
    }),
    listData () {
      const arr = []
      this.list.map(item => {
        if(arr.some(i => i.rows.some(z => z.mainOrderNo === item.mainOrderNo))) {
          const target = arr.find(i => i.rows.find(z => z.mainOrderNo === item.mainOrderNo))
          target.rows.push(item)
          target.slotArray.push(`edit-${target.rows.length-1}`)
          target.slotArray.push(`ConvergeStartDate-${target.rows.length-1}`)
        } else {
          if(this.windowWidth > 600) {
            arr.push({head: this.currentTag == 0 ? quotationListTable().head : auditListTable().head, rows: [item], slotArray: ['edit-0', 'ConvergeStartDate-0']})
          } else {
            arr.push({head: this.currentTag == 0 ? quotationLisMobileTable().head : auditListTable().head, rows: [item], slotArray: ['edit-0', 'ConvergeStartDate-0']})
          }
        }
      })
      return arr
    },
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    review(e,table) {
      if(this.currentTag == 1) return
      this.$store.dispatch(`${e.type == 1 ? 'place' : 'activity'}/updatedPolicyStatus`,e.item.policyStatus)
      if((e.item.stateText !== '取消' && e.item.insuranceAmount) && !table.some(i => i.stateText == '完成報價')) {
        this.$store.dispatch(`${e.type == 1 ? 'place' : 'activity'}/updatedInsuranceActive`,5)
      } else {
        this.$store.dispatch(`${e.type == 1 ? 'place' : 'activity'}/updatedInsuranceActive`,6)
      }
      this.$store.dispatch('common/updateOrderNo', {orderNo: e.orderNo,mainOrderNo: e.mainOrderNo})
      this.$router.push(`/${e.type == 1 ? 'place' : 'activity'}-quotation/step3`)
    },
    popup(item) {
      console.log(item)
      this.downloadQuotation = item
      this.open = true
      this.$store.dispatch('common/updateOrderNo', {orderNo:item.orderNo,mainOrderNo: item.mainOrderNo})
    },
    async copyQuotation(type,orderNo,mainOrderNo,update) {
      this.$store.dispatch('common/updateOrderNo', {orderNo,mainOrderNo})
      await this.quotationDetail(type,orderNo,mainOrderNo)
      if(update == 'updateQuotation') {
        this.$router.push(`/${type == 1 ? 'place' : 'activity'}-quotation/step2`)
        this.$store.dispatch(`${type == 1 ? 'place' : 'activity'}/updatedInsuranceActive`,2)
      } else {
        if(update == 'addSerialNo') { this.$store.dispatch(`${type == 1 ? 'place' : 'activity'}/updatedInsuranceActive`,3) }
        if(update == 'correct') { this.$store.dispatch(`${type == 1 ? 'place' : 'activity'}/updatedInsuranceActive`,1)}
        if(update == 'audit') { this.$store.dispatch(`${type == 1 ? 'place' : 'activity'}/updatedInsuranceActive`,7)}
        this.$router.push(`/${type == 1 ? 'place' : 'activity'}-quotation/step1`)
      }
    },
    async quotationDetail(type,orderNo,mainOrderNo) {
      const detail = await this.$store.dispatch(`quotation/Get${type == 1?'Place': 'Activity'}QuotationDetail`, {orderno:orderNo,mainOrderNo})
      const data = {
        ...detail.data.content,
        insuranceAmounts: detail.data.content.insuranceAmounts.map((item,index) => {
          return {
            ...item,
            // eslint-disable-next-line no-prototype-builtins
            selected: item.hasOwnProperty('isSelected') ? item.isSelected : (index == 0 ? true : false),
            fixed: false,
            insuranceTotalAmount: item.insuranceTotalAmount/10000,
            mergeSingleAmount: item.mergeSingleAmount/10000,
            perAccidentBodyAmount: item.perAccidentBodyAmount/10000,
            perAccidentFinanceAmount: item.perAccidentFinanceAmount/10000,
            perBodyAmount: item.perBodyAmount/10000,
            // parameter: {
            //   basicFee: '',
            //   finalHC: '',
            //   sizeParameter: '',
            //   selfInflictedParameter: '',
            //   shortPeriodParameter: '',
            //   additionalCostParameter: '',
            //   mutiSizeParameter: '',
            //   additionTermCoefficientParameter: '',
            //   aggAOACoefficient: '',
            //   amount: '',
            // }
          }
        })
      }
      if(detail.data.content.questionnaire) {
        this.$store.dispatch(`${type == 1 ? 'place' : 'activity'}/updateQuestionnaireFinished`, true)
      }
      this.$store.dispatch(`${type == 1?'place' : 'activity'}/updatedQuotationData`,data)
    },
    async finishQuotation(orderNo) {
      Popup.create({
        hasHtml: true,
				maskClose: false,
				confirm: true,
				ok: '確定',
				cancel: '取消',
				htmlText: `<p>完成報價後將無法改動報價內容，確定完成報價？</p>`,
      }).then(async () => {
        const res = await this.$store.dispatch('quotation/FinishQuotation', {orderNo})
        if(res.data.code == 1) {
          Popup.create({
            hasHtml: true,
            htmlText:'報價完成'
          })
          this.$emit('updateQuotationList')
        } else {
          Popup.create({
            hasHtml: true,
            htmlText:res.data.message
          })
        }
      })
    },
    async processHistory(orderNo) {
      const res = await this.$store.dispatch('underwrite/GetUnderwriteProcessHistory', orderNo)
      this.historyData = res.data.content.map(item => {
        return {
          ...item,
          employee: `${item.employeeName}(${item.employeeId})`,
        }
      })
      this.openHistory = true
    },
    async modifyLogs(orderNo) {
      const res = await this.$store.dispatch('underwrite/GetUnderwriteModifyLogs', orderNo)
      this.modifyLogData = res.data.content.map(item => {
        return {
          ...item,
          employee: `${item.eMployeeName}(${item.employeeId})`,
        }
      })
      this.openLog = true
    }
  }
}
</script>

<style scoped lang="scss">
  .download {
    color: #1076EE;
    @apply cursor-pointer;
    &.disable {
      color: #C4C4C4;
      @apply cursor-not-allowed
    }
  }
  .disable {
      color: #C4C4C4;
      @apply cursor-not-allowed
    }
  .minButton {
    @apply text-sm p-1 px-2 mb-1
  }
</style>