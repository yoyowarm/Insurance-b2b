<template>
  <div>
    <div class="column-6">
      <InputGroup class=" w-full mb-2.5" title="姓名" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full pr-24 relative text-main" value="陳曉明"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.name}}
        </div>
      </InputGroup>
      <InputGroup class=" w-full mb-2.5" title="統編/身分證" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="A123456789"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.id}}
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="電話" borderBtn :editModel="editModel">
      <Input v-if="editModel" slot="input" class="w-full relative text-main" value="0912345678"/>
        <div v-else slot="input">{{info.mobile}}</div>
      </InputGroup>
      <InputGroup class="w-full" title="國籍" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="本國"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.isForeigner ? '外國' : '本國'}}
        </div>
      </InputGroup>
      <InputGroup class="w-full" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="- -"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.nationalityName ? info.nationalityName : '- -'}}
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="職業/行業別" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="一般"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.isProfession ? '專業' : '一般'}}
        </div>
      </InputGroup>
    </div>
    <div class="column-6 pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="負責(代表)人" v-if="copyInfo.corporateName" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full pr-24 relative text-main" value="陳曉明"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.corporateName}}
        </div>
      </InputGroup>
      <InputGroup class="w-full" title="登記/註冊地" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="本國"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.isForeignRegister ? '外國' : '本國'}}
        </div>
      </InputGroup>
      <InputGroup class="item" title="居住地址(選填)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="台北市"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.city}}
        </div>
      </InputGroup>
      <InputGroup class="item" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="大安區"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.area}}
        </div>
      </InputGroup>
      <InputGroup class="col-span-2" :noMt="marginTop(1180)" borderBtn :editModel="editModel">
        <Input v-if="editModel" slot="input" class="w-full relative text-main" value="敦化南路1段183號5樓"/>
        <div v-else slot="input" class=" pr-24 relative">
          {{info.subAddress}}
        </div>
      </InputGroup>
    </div>
    <div class="column-6 pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="是否為國內、外或國際組織之重要政治性職務人士(含家庭成員或密切關係者)" :wrap="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="是"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.isPolitician ? '是' : '否'}}
        </div>
      </InputGroup>
      <InputGroup class="w-full col-span-5" :noMt="marginTop(560)" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="國內"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.overseasOrDomestic == 0 ? '國內' : '國外'}}
        </div>
      </InputGroup>
    </div>
    <div class="column-6 pt-6 pb-3 mb-4">
      <InputGroup class="w-full col-span-6" title="客戶屬性" borderBtn :editModel="editModel">
        <Select v-if="editModel" slot="input" defaultText="非專業"/>
        <div v-else slot="input" class="w-full pr-24 relative">
          {{info.isProOrNot ? '專業' : '非專業'}}
        </div>
        <div class="customer-attr" slot="right">
        <span><font-awesome-icon class="mr-1" icon="exclamation-circle" />專業客戶指法人客戶符合「專業投資機構」及「總資產達新台幣五千萬元以上」其中一項者，其他及自然人客戶則屬非專業客戶。</span>
      </div>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import Select from '@/components/Select/index.vue'
import { mapState } from 'vuex'
export default {
  components: {
    InputGroup,
    Input,
    Select
  },
  props: {
    marginTop: {
      type: Function,
      default: () => {}
    },
    info: {
      type: Object,
      default: () => ({})
    },
    nationalities: {
      type: Array,
      default: () => []
    },
    cityList: {
      type: Array,
      default: () => []
    },
    areaList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      copyInfo: {
        ...this.info
      }
    }
  },
  computed: {
    ...mapState({
      editModel: state => state.common.editModel
    })
  },
  watch: {
    info (val) {
      this.copyInfo = {
        ...val
      }
    }
  },
  methods: {
    emitSelectItem(key, item) {
      const select = {
        placeholder: item.Text,
        id: item.Value
      }
      this.updateInfo(key, select)
    },
    updateInfo (key, value) {
      this.$emit('update:info', Object.assign(this.copyInfo, { [key]: value }))
    }
  }
}
</script>

<style scoped lang="scss">
  .customer-attr {
    @apply  flex items-center text-red-500 ml-3 absolute whitespace-no-wrap left-13
  }
  @media (min-width: 771px) and (max-width: 1126px) {
    .customer-attr { 
      width: calc(100vw - 350px);
      span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%
      }
    }
  }
   @media (max-width: 771px) {
     .customer-attr { 
      width: calc(100vw - 150px);
      span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%
      }
     }
   }
</style>