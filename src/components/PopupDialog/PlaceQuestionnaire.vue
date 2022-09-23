<template>
  <div class="popup" ref="modal" :class="{'open':open }">
    <div class="dialog">
      <div class="header">
        <span class="mb-6 md:mb-4">公共意外責任保險場所詢問表</span>
        <div class="icon" @click="$emit('update:open' ,false)">
          <font-awesome-icon icon="times-circle" />
        </div>
        <InputGroup bgColor="#fff" class="md:ml-4 h-8 w-full md:w-auto md:-mt-9 mb-1" noMt>
          <Select :options="formList" slot="input" defaultText="選擇表單區塊"  @emitItem="e=> emitSelectItem(e)" />
        </InputGroup>
      </div>
      <div class="body">
        <p v-if="multiplePlaceInfo" class="text-red-500">若有多處所狀況請以坪數最大處所條件填寫</p>
        <div class="flex flex-row flex-wrap mb-2" v-if="QuestionnaireManagement" >
          <div class="flex flex-row items-center mr-4">
            <span class="mr-2 mt-2">問券名稱</span>
            <InputGroup class="col-start-4" noMt min mid>
              <Input slot="input" class="w-52" :value="questionnaireData.title" @updateValue="(e)=> questionnaireData = Object.assign(questionnaireData, {title: e})" placeholder="輸入問券名稱"/>
            </InputGroup>
          </div>
          <div class="flex flex-row items-center mr-4">
            <span class="mr-2 mt-2">被保險人姓名</span>
            <InputGroup class="col-start-4" noMt min mid>
              <Input slot="input" class="w-32" :value="questionnaireData.insuredName" @updateValue="(e)=> questionnaireData = Object.assign(questionnaireData, {insuredName: e})" placeholder="輸入姓名"/>
            </InputGroup>
          </div>
          <div class="flex flex-row items-center mr-4">
            <span class="mr-2 mt-2">被保險人身分證/統編</span>
            <InputGroup class="col-start-4" noMt min mid>
              <Input slot="input" class="w-32" :value="questionnaireData.insuredId" @updateValue="(e)=> questionnaireData = Object.assign(questionnaireData, {insuredId: e})" placeholder="輸入號碼"/>
            </InputGroup>
          </div>
          <div class="flex flex-row items-center">
            <span class="mr-2 mt-2">填表人代號</span>
            <InputGroup class="col-start-4" noMt min mid disable>
              <Input disable slot="input" class="w-32" :value="questionnaireData.userId" @updateValue="(e)=> questionnaireData = Object.assign(questionnaireData, {userId: e})" placeholder="輸入號碼"/>
            </InputGroup>
          </div>
        </div>
        <div class="column-4" ref="1">
          <FormTitle class="text-lg"  title="(一)營業處所-基本資料"/>
          <InputGroup v-if="!QuestionnaireManagement" class="col-start-4" noMt disable>
            <Input disable slot="input" :value="questionnaireData.userId" @updateValue="(e)=> questionnaireData = Object.assign(questionnaireData, {userId: e})" placeholder="填表人代號"/>
          </InputGroup>
        </div>
        <Part1 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="column-4" ref="2">
          <FormTitle class="text-lg"  title="(二)營業處所-建築物資訊"/>
        </div>
        <Part2 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="column-4" ref="3">
          <FormTitle class="text-lg"  title="(三)營業處所-特殊風險項目"/>
        </div>
        <Part3 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="column-4" ref="4">
          <FormTitle class="text-lg"  title="(四)營業處所-器材使用"/>
        </div>
        <Part4 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="column-4" ref="5">
          <FormTitle class="text-lg"  title="(五)營業處所-交通控管"/>
        </div>
        <Part5 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="column-4" ref="6">
          <FormTitle class="text-lg"  title="(六)營業處所-人員動線及管控"/>
        </div>
        <Part6 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="column-4" ref="7">
          <FormTitle class="text-lg"  title="(七)營業處所-安全防護"/>
        </div>
        <Part7 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="column-4" ref="8">
          <FormTitle class="text-lg"  title="(八)營業處所-緊急救護措施"/>
        </div>
        <Part8 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="column-4" ref="9">
          <FormTitle class="text-lg"  title="(九)營業處所-其他考量"/>
        </div>
        <Part9 :data.sync="questionnaireData" :marginTop="marginTop"/>
        <div class="fixed-button">
          <div class="flex justify-center w-full px-3">
            <Button outline class="h-12 w-52 mr-3" @click.native="clearQuestionnaire">清除資料</Button>
            <Button v-if="questionnaireType == 0" class="h-12 w-52 mr-3" @click.native="() =>{$store.dispatch('place/updateQuestionnaireFinished', true);$emit('update:open' ,false)}">填寫完成</Button>
            <Button v-if="questionnaireType == 1" class="h-12 w-52 mr-3" @click.native="() =>{$emit('addQuestionnaire',1);$emit('update:open' ,false)}">新增問券</Button>
            <Button v-if="questionnaireType == 2" class="h-12 w-52 mr-3" @click.native="() =>{$emit('updateQuestionnaire',1);$emit('update:open' ,false)}">更新問券</Button>
            <Button v-if="orderNo || SerialNo" outline class="h-12 w-52" @click.native="downloadFile(orderNo,'insurance')">列印問卷</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-bg" @click="$emit('ok')"/>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
import Button from '@/components/Button'
import Part1 from '@/components/PlaceQuestionnaire/part1'
import Part2 from '@/components/PlaceQuestionnaire/part2'
import Part3 from '@/components/PlaceQuestionnaire/part3'
import Part4 from '@/components/PlaceQuestionnaire/part4'
import Part5 from '@/components/PlaceQuestionnaire/part5'
import Part6 from '@/components/PlaceQuestionnaire/part6'
import Part7 from '@/components/PlaceQuestionnaire/part7'
import Part8 from '@/components/PlaceQuestionnaire/part8'
import Part9 from '@/components/PlaceQuestionnaire/part9'
import WindowResizeListener from '@/components/WindowResizeListener'
import FileSaver from 'file-saver'
import { quotation } from '@/utils/dataTemp'
export default {
  components: {
    FormTitle,
    InputGroup,
    Input,
    Button,
    Part1,
    Part2,
    Part3,
    Part4,
    Part5,
    Part6,
    Part7,
    Part8,
    Part9,
    Select,
    WindowResizeListener
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: ''
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: false
    },
    ok: {
      type: String,
      default: 'ok'
    },
    cancel: {
      type: String,
      default: 'cancel'
    },
    questionnaire: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: ''
    },
    multiplePlaceInfo: {
      type: Boolean,
      default: false
    },
    orderNo: {
      type: String,
      default: ''
    },
    hasUpdateFunc: {
      type: Boolean,
      default: false
    },
    updateFunc: {
      type: Function,
      default: () => {}
    },
    hasClearFunc: {
      type: Boolean,
      default: false
    },
    clearFunc: {
      type: Function,
      default: () => {}
    },
    QuestionnaireManagement: {
      type: Boolean,
      default: false
    },
    questionnaireType: {
      type: Number,
      default: 0
    },
    SerialNo: {
      type: String,
      default: ''
    }
  },
   data () {
    return {
      value: false,
      windowWidth: window.innerWidth,
      formList: [
        { Value: '1', Text: '(一)營業處所-基本資料'},
        { Value: '2', Text: '(二)營業處所-建築物資訊'},
        { Value: '3', Text: '(三)營業處所-特殊風險項目'},
        { Value: '4', Text: '(四)營業處所-器材使用'},
        { Value: '5', Text: '(五)營業處所-交通控管'},
        { Value: '6', Text: '(六)營業處所-人員動線及管控'},
        { Value: '7', Text: '(七)營業處所-安全防護'},
        { Value: '8', Text: '(八)營業處所-緊急救護措施'},
        { Value: '9', Text: '(九)營業處所-其他考量'},
      ]
    }
  },
  computed: {
    questionnaireData: {
      get() {
        return this.questionnaire
      },
      set(val) {
        if(this.hasUpdateFunc) {
          this.updateFunc(val)
        } else {
          this.$store.dispatch(`${this.type}/updatedQuestionnaire`, val)
        }
      }
    }
  },
  methods: {
    emitSelectItem(e) {
      if(this.$refs[e.Value]) {
        this.$refs[e.Value].scrollIntoView({behavior: "smooth"})
      }
    },
    marginTop (width = 1180) {
      return this.windowWidth <= width
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async downloadFile () {
      const res = await this.$store.dispatch('common/GetQuestionnaireDocument',{placeActivityType:1,orderNo:this.SerialNo ? this.SerialNo :this.orderNo})
      var blob = new Blob([res.data], {type: "application/octet-stream"});
       FileSaver.saveAs(blob,  `處所問券_${this.SerialNo ? this.SerialNo :this.orderNo}.pdf`);
    },
    clearQuestionnaire() {
      if(this.hasClearFunc) {
        this.clearFunc()
      } else {
        this.$store.dispatch('place/updatedQuestionnaire', {...quotation().questionnaire,userId:this.$store.state.home.userInfo.userid})
      }
    }
  }
}
</script>

<style scoped lang="scss">
.popup {
    @apply hidden relative;
    &.open {
      @apply block;
    }
  }
  .dialog {
    position: fixed;
    top: 6%;
    left: 0;
    right:0;
    margin: 0 auto;
    max-width: 90vw;
    width: 100%;
    z-index: 100;
    @apply bg-white rounded-2xl;
    .header {
      height: 60px;
      @apply flex flex-row items-end pl-6 relative bg-main w-full rounded-t-2xl text-white text-lg;
    }
    .icon {
      @apply absolute inset-y-0 my-auto right-0 mr-3 text-3xl cursor-pointer;
    }
    .body {
      overflow: scroll;
      max-height: 80vh;
      @apply  p-6 pb-20
    }
  }
  .mask-bg {
    @apply inset-0 bg-black opacity-75 w-screen h-screen z-20 overflow-hidden fixed
  }

  .fixed-button {
    max-width: 90vw;
    height: 80px;
    margin-left: 5%;
    margin-bottom: 5%;
    box-shadow: 0px 0px 5px #00000029;
    @apply fixed flex flex-row justify-center items-center w-full bg-white z-30 bottom-0 left-0 rounded-b-xl
  }

  @media (max-width: 770px) {
    .dialog {
      width: 90%;
      @apply bg-white rounded-2xl;
      .header {
        height: 100px;
        @apply flex-col pl-0 px-4 justify-end items-center;
        >span {
          @apply -mt-5
        }
      }
    }
    
  }
</style>