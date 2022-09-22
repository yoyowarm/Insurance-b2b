<template>
  <div class="popup" ref="modal" :class="{'open':open }">
    <div class="dialog">
      <div class="header">
        <span class="mb-4">公共意外責任保險活動詢問表</span>
        <div class="icon" @click="$emit('update:open' ,false)">
          <font-awesome-icon icon="times-circle" />
        </div>
        <InputGroup bgColor="#fff" class="md:ml-4 h-8 w-full md:w-auto md:-mt-9 mb-1" noMt>
          <Select :options="formList" slot="input" defaultText="選擇表單區塊"  @emitItem="e=> emitSelectItem(e)" />
        </InputGroup>
      </div>
      <div class="body">
        <div class="column-4" ref="1">
          <FormTitle class="text-lg" title="詢問表(一)"/>
          <InputGroup class="col-start-4" noMt disable>
            <Input disable slot="input" :value="questionnaireData.userId" @updateValue="(e)=> questionnaireData = Object.assign(questionnaireData, {userId: e})" placeholder="填表人代號"/>
          </InputGroup>
        </div>
        <div class="column-4" ref="1">
          <FormTitle class="text-lg" title="(一)活動場所-活動性質與場所"/>
        </div>
        <Part1 :data.sync="questionnaireData"/>
        <div class="column-4" ref="2">
          <FormTitle class="text-lg" title="(二)活動場所-器材使用"/>
        </div>
        <Part2 :data.sync="questionnaireData"/>
        <div class="column-4" ref="3">
          <FormTitle class="text-lg" title="(三)活動場所-交通控管"/>
        </div>
        <Part3 :data.sync="questionnaireData"/>
        <div class="column-4" ref="4">
          <FormTitle class="text-lg" title="(四)活動場所-人員動線及管控"/>
        </div>
        <Part4 :data.sync="questionnaireData"/>
        <div class="column-4" ref="5">
          <FormTitle class="text-lg" title="(五)活動場所-安全防護"/>
        </div>
        <Part5 :data.sync="questionnaireData"/>
        <div class="column-4" ref="6">
          <FormTitle class="text-lg" title="(六)活動場所-緊急救護措施"/>
        </div>
        <Part6 :data.sync="questionnaireData"/>
        <div class="column-4" ref="7">
          <FormTitle  class="text-lg" title="(七)活動場所-其他考量"/>
        </div>
        <Part7 :data.sync="questionnaireData"/>
        <div class="column-4 mt-10" ref="8">
          <FormTitle class="text-lg" title="詢問表(二)"/>
        </div>
        <Part8 :data.sync="questionnaireData"/>
        <div class="column-4" ref="9">
          <FormTitle class="text-lg" title="(二)器材使用"/>
        </div>
        <Part9 :data.sync="questionnaireData"/>
        <div class="fixed-button">
          <div class="flex justify-center w-full px-3">
            <Button outline class="h-12 w-52 mr-3" @click.native="() =>{$store.dispatch('place/clearQuestionnaire')}">清除資料</Button>
            <Button class="h-12 w-52 mr-3" @click.native="() =>{$store.dispatch('activity/updateQuestionnaireFinished', true);$emit('update:open' ,false)}">填寫完成</Button>
            <Button v-if="orderNo" outline class="h-12 w-52" @click.native="downloadFile(orderNo,'insurance')">列印問卷</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-bg" @click="$emit('ok')"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Select from '@/components/Select'
import Button from '@/components/Button'
import Part1 from '@/components/ActivityQuestionnaire/part1'
import Part2 from '@/components/ActivityQuestionnaire/part2'
import Part3 from '@/components/ActivityQuestionnaire/part3'
import Part4 from '@/components/ActivityQuestionnaire/part4'
import Part5 from '@/components/ActivityQuestionnaire/part5'
import Part6 from '@/components/ActivityQuestionnaire/part6'
import Part7 from '@/components/ActivityQuestionnaire/part7'
import Part8 from '@/components/ActivityQuestionnaire/part8'
import Part9 from '@/components/ActivityQuestionnaire/part9'
import FileSaver from 'file-saver'
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
    Select
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
    orderNo: {
      type: String,
      default: ''
    }
  },
   data () {
    return {
      value: false,
      formList: [
        { Value: '1', Text: '(一)活動場所-活動性質與場所'},
        { Value: '2', Text: '(二)活動場所-器材使用'},
        { Value: '3', Text: '(三)活動場所-交通控管'},
        { Value: '4', Text: '(四)活動場所-人員動線及管控'},
        { Value: '5', Text: '(五)活動場所-安全防護'},
        { Value: '6', Text: '(六)活動場所-緊急救護措施'},
        { Value: '7', Text: '(七)活動場所-其他考量'},
        { Value: '8', Text: '(一)場地選定'},
        { Value: '9', Text: '(二)器材使用'},
        { Value: '9', Text: '(三)交通控管'},
        { Value: '9', Text: '(四)安全防護'},
      ]
    }
  },
  computed: {
    questionnaireData: {
      get() {
        return this.questionnaire
      },
      set(val) {
        this.$store.dispatch(`${this.type}/updatedQuestionnaire`, val)
      }
    }
  },
  methods: {
    emitSelectItem(e) {
      if(this.$refs[e.Value]) {
        this.$refs[e.Value].scrollIntoView({behavior: "smooth"})
      }
    },
    async downloadFile () {
      const res = await this.$store.dispatch('common/GetQuestionnaireDocument',{placeActivityType:2,orderNo:this.orderNo})
      var blob = new Blob([res.data], {type: "application/octet-stream"});
       FileSaver.saveAs(blob,  `活動問券_${this.orderNo}.pdf`);
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
      @apply  p-6
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
        @apply flex-col pl-0 px-4 justify-center;
        >span {
          @apply -mt-5
        }
      }
    }
    
  }
</style>