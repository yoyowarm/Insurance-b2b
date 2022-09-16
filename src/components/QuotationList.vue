<template>
  <div>
    <template v-for="(tableData,index) in listData">
      <div class="flex flex-row mb-2" :key="index+'tableOderNo'">
        <div @click="() => {if(!tableData.rows[0].isFinishQuotation) {copyQuotation(tableData.rows[0].type,'',tableData.rows[0].mainOrderNo,'addSerialNo')}}">
          <font-awesome-icon :icon="['fas','plus-circle']"  class="download" :class="{'disable': tableData.rows[0].isFinishQuotation}"/>
          <span class="download ml-1" :class="{'disable': tableData.rows[0].isFinishQuotation}">新增序號</span>
        </div>
        <span @click="() =>{if(!tableData.rows[0].isFinishQuotation){copyQuotation(tableData.rows[0].type,'',tableData.rows[0].mainOrderNo,'updateQuotation')}}" class="download text-base ml-4" :class="{'disable': tableData.rows[0].isFinishQuotation}"><font-awesome-icon class="mr-1" :icon="['far','pen-to-square']" /><span>更正要被保人</span></span>
        <span class="ml-4 mr-4">關聯號{{tableData.rows[0].mainOrderNo}}-<span :class="{'text-red-500': !tableData.rows[0].isFinishQuotation, 'text-success': tableData.rows[0].isFinishQuotation}">{{tableData.rows[0].isFinishQuotation ? '已確認' : '未確認'}}</span></span>
        <span>保單編號{{tableData.rows[0].policyNo}}</span>
        <!-- <span class="ml-4">保單號碼070FQ013601</span> -->
      </div>
      <TableGroup :key="'tableData'+index" :data="tableData" :slotName="tableData.slotArray" scrollX>
        <template v-for="(item,index) in tableData.rows">
          <div
            class="mb-3 download"
            @click="() => review(item.type,item.orderNo, item.mainOrderNo)" :slot="`serialNo-${index}`" :key="`serialNo-${index}`">
            <span>{{item.serialNo}}</span>
          </div>
          <div :slot="`edit-${index}`" :key="`edit-${index}`" class="flex flex-row">
            <div v-if="item.policyStatus == 99">序號改為:{{item.newSerialNo}}</div>
            <div v-else-if="(item.policyStatus == 7 && tableData.rows.filter(i => i.mainOrderNo == item.mainOrderNo).length > 1 && tableData.rows.some(i => i.policyStatus == 8))" class="mr-9 mt-5 ml-1">- -</div>
            <div v-else class="flex flex-col items-center mr-7 mt-1" >
              <span class="download mb-3" @click="popup(item)">列印</span>
              <span class="download mb-3" v-if="!tableData.rows[0].isFinishQuotation" @click="copyQuotation(item.type,item.orderNo, item.mainOrderNo,'correct')">更正</span>
              <span class="download" @click="() => {copyQuotation(item.type,item.orderNo,item.mainOrderNo)}">複製</span>
            </div>
            <div class="flex flex-col" v-if="item.policyStatus !== 99">
              <Button class="minButton" disabled outline>查看歷程</Button>
              <Button class="minButton" disabled outline>異動比對</Button>
              <Button class="minButton" @click.native="() => finishQuotation(item.orderNo)" v-if="!item.isFinishQuotation" outline>確認報價</Button>
            </div>
          </div>
          <div :slot="`ConvergeStartDate-${index}`" :key="`ConvergeStartDate-${index}`" class="flex flex-col">
            <span>{{item.insuranceBeginTime.split('T')[0]}}<span class="text-sm ml-1">起</span></span>
            <span>{{item.insuranceEndTime.split('T')[0]}}<span class="text-sm ml-1">迄</span></span>
          </div>
          </template>
      </TableGroup>
    </template>
    <DownloadFile :open.sync="open" :orderNo="orderNo" :item="downloadQuotation" headerText="列印文件"/>
  </div>
</template>

<script>
import TableGroup from '@/components/TableGroup'
import DownloadFile from '@/components/PopupDialog/DownloadFile.vue'
import Button from '@/components/Button'
import { quotationListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
import { Popup } from '@/utils/popups'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
  },
  components: {
    TableGroup,
    DownloadFile,
    Button
  },
  data() {
    return {
      open: false,
      downloadQuotation: {},
    }
  },
  computed: {
    ...mapState({
      'orderNo': state => state.common.orderNo,}),
    listData () {
      const arr = []
      this.list.map(item => {
        if(arr.some(i => i.rows.some(z => z.mainOrderNo === item.mainOrderNo))) {
          const target = arr.find(i => i.rows.find(z => z.mainOrderNo === item.mainOrderNo))
          target.rows.push(item)
          target.slotArray.push(`edit-${target.rows.length-1}`)
          target.slotArray.push(`ConvergeStartDate-${target.rows.length-1}`)
          target.slotArray.push(`serialNo-${target.rows.length-1}`)
        } else {
          arr.push({head:quotationListTable().head, rows: [item], slotArray: ['edit-0', 'ConvergeStartDate-0', 'serialNo-0']})
        }
      })
      return arr
    },
  },
  methods: {
    review(type, orderNo,mainOrderNo) {
      this.$store.dispatch('common/updateOrderNo', {orderNo,mainOrderNo})
      this.$router.push(`/${type == 1 ? 'place' : 'activity'}-quotation/step3`)
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
        this.$router.push(`/${type == 1 ? 'place' : 'activity'}-quotation/step1`)
      }
    },
    async quotationDetail(type,orderNo,mainOrderNo) {
      const detail = await this.$store.dispatch(`quotation/Get${type == 1?'Place': 'Activity'}QuotationDetail`, {orderNo,mainOrderNo})
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
            parameter: {
              basicFee: '',
              finalHC: '',
              sizeParameter: '',
              selfInflictedParameter: '',
              shortPeriodParameter: '',
              additionalCostParameter: '',
              mutiSizeParameter: '',
              additionTermCoefficientParameter: '',
              aggAOACoefficient: '',
              amount: '',
            }
          }
        })
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