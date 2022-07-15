<template>
  <div class="popup" ref="modal" :class="{'open':open }">
    <div class="dialog">
      <div class="header">
        <span>公共意外責任保險場所詢問表</span>
        <div class="icon" @click="$emit('update:open' ,false)">
          <font-awesome-icon icon="times-circle" />
        </div>
        <InputGroup bgColor="#fff" class="md:ml-4 h-8 w-full md:w-auto md:-mt-9" noMt>
          <Select :options="formList" slot="input" defaultText="選擇表單區塊"  @emitItem="e=> emitSelectItem(e)" />
        </InputGroup>
      </div>
      <div class="body">
        <div class="column-4" ref="1">
          <FormTitle title="(一)營業處所-基本資料"/>
          <InputGroup class="col-start-4" noMt>
            <Input slot="input" :value="questionnaireData.userId" @updateValue="(e)=> questionnaireData = Object.assign(questionnaireData, {userId: e})" placeholder="填表人代號"/>
          </InputGroup>
        </div>
        <Part1 :data.sync="questionnaireData"/>
        <div class="column-4" ref="2">
          <FormTitle title="(二)營業處所-建築物資訊"/>
        </div>
        <Part2 :data.sync="questionnaireData"/>
        <div class="column-4" ref="3">
          <FormTitle title="(三)營業處所-特殊風險項目"/>
        </div>
        <Part3 :data.sync="questionnaireData"/>
        <div class="column-4" ref="4">
          <FormTitle title="(四)營業處所-器材使用"/>
        </div>
        <Part4 :data.sync="questionnaireData"/>
        <div class="column-4" ref="5">
          <FormTitle title="(五)營業處所-交通控管"/>
        </div>
        <Part5 :data.sync="questionnaireData"/>
        <div class="column-4" ref="6">
          <FormTitle title="(六)營業處所-人員動線及管控"/>
        </div>
        <Part6 :data.sync="questionnaireData"/>
        <div class="column-4" ref="7">
          <FormTitle title="(七)營業處所-安全防護"/>
        </div>
        <Part7 :data.sync="questionnaireData"/>
        <div class="column-4" ref="8">
          <FormTitle title="(八)營業處所-緊急救護措施"/>
        </div>
        <Part8 :data.sync="questionnaireData"/>
        <div class="column-4" ref="9">
          <FormTitle title="(九)營業處所-其他考量"/>
        </div>
        <Part9 :data.sync="questionnaireData"/>
        <div class="flex flex-row justify-center">
          <Button>填寫完成</Button>
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
import Part1 from '@/components/PlaceQuestionnaire/part1'
import Part2 from '@/components/PlaceQuestionnaire/part2'
import Part3 from '@/components/PlaceQuestionnaire/part3'
import Part4 from '@/components/PlaceQuestionnaire/part4'
import Part5 from '@/components/PlaceQuestionnaire/part5'
import Part6 from '@/components/PlaceQuestionnaire/part6'
import Part7 from '@/components/PlaceQuestionnaire/part7'
import Part8 from '@/components/PlaceQuestionnaire/part8'
import Part9 from '@/components/PlaceQuestionnaire/part9'
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
    }
  },
   data () {
    return {
      value: false,
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
        this.$store.dispatch(`${this.type}/updatedQuestionnaire`, val)
      }
    }
  },
  methods: {
    emitSelectItem(e) {
      if(this.$refs[e.Value]) {
        this.$refs[e.Value].scrollIntoView({behavior: "smooth"})
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
      @apply flex flex-row items-center pl-6 relative bg-main w-full rounded-t-2xl text-white text-lg;
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