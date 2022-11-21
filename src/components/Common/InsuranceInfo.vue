<template>
  <div>
    <div class="column-5 dashed-border">
      <InputGroup class=" w-full mb-2.5" title="姓名" lgTitle mid :disable="disable">
        <div slot="input" class="w-full pr-24 relative">
          <Input slot="input" placeholder="輸入名稱" :value="copyInfo.Name" @updateValue="(e) => updateInfo('Name', e)" :disable="disable"/>
          <Button class="absolute right-0 -top-1 w-16 h-full" style="height: 46px" @click.native="() => { if(copyInfo.Name) {$emit('getDetail', 'Name')}}" :disable="disable">查詢</Button>
        </div>
      </InputGroup>
      <InputGroup class=" w-full mb-2.5" title="統編/身分證" lgTitle mid :disable="disable">
        <div slot="input" class="w-full pr-24 relative" :disable="disable">
          <Input placeholder="輸入號碼" :value="copyInfo.ID" @updateValue="(e) => updateInfo('ID', e)" @blurInput="idVerify" :disable="disable"/>
          <Button class="absolute right-0 -top-1 w-16 h-full" style="height: 46px" @click.native="() => { if(copyInfo.ID) {$emit('getDetail', 'ID')}}" :disable="disable">查詢</Button>
        </div>
      </InputGroup>
      <InputGroup v-if="quotationType == 'activity'" class="w-full mb-2.5" title="活動名稱" lgTitle mid :disable="disable || (InsuranceActive == 1 || InsuranceActive > 2)">
        <Input slot="input" placeholder="輸入活動名稱" :value="copyInfo.activityName" @updateValue="(e) => updateInfo('activityName', e)" :disable="disable || (InsuranceActive == 1 || InsuranceActive > 2)"/>
      </InputGroup>
    </div>
    <div class="column-5 pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="電話" lgTitle mid :disable="disable">
        <Input slot="input" placeholder="輸入號碼" :value="copyInfo.Mobile" @updateValue="(e) => updateInfo('Mobile', e)" :disable="disable"/>
      </InputGroup>
      <InputGroup class="w-full" title="國籍" :disable="disable" lgTitle mid dash>
        <SwitchInput
          slot="input"
          :id="`${type}IsForeigner`"
          :value="copyInfo.IsForeigner"
          checkedText="外國"
          uncheckedText="本國"
          :disable="disable"
          @updateValue="(e) =>updateInfo('IsForeigner', e)"
        />
      </InputGroup>
      <InputGroup class="w-full" :noMt="marginTop(560)" lgTitle mid :disable="!copyInfo.IsForeigner || disable">
        <Select
          slot="input"
          defaultText="選擇國籍"
          :options="nationalities"
          :selected="copyInfo.Nationality.Text"
          :disable="!copyInfo.IsForeigner || disable"
          @emitItem="(item) => emitSelectItem('Nationality', item)"
          search
        />
      </InputGroup>
      <InputGroup class="w-full" title="職業/行業別" lgTitle mid :disable="disable">
        <SwitchInput
          slot="input"
          :id="`${type}Profession`"
          checkedText="特殊"
          uncheckedText="一般"
          :value="copyInfo.Profession"
          :disable="disable"
          @updateValue="(e) =>updateInfo('Profession', e)"
        />
      </InputGroup>
      <InputGroup class="w-full" title="負責(代表)人" lgTitle mid v-if="copyInfo.CorporateRequired" :disable="disable">
        <Input slot="input" placeholder="輸入姓名" :value="copyInfo.CorporateName" @updateValue="(e) => updateInfo('CorporateName', e)" :disable="disable"/>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="item" title="居住地址(選填)" lgTitle mid :disable="disable" dash>
        <Select
          slot="input"
          defaultText="選擇縣市"
          :options="cityList"
          :selected="copyInfo.City.Value"
          :disable="disable"
          @emitItem="(item) => emitSelectItem('City', item)"
        />
      </InputGroup>
      <InputGroup class="item" dash :noMt="marginTop(560)" lgTitle mid :disable="disable">
        <Select
          slot="input"
          defaultText="選擇區域"
          :options="areaList"
          :selected="copyInfo.Area.Value"
          :disable="disable"
          @emitItem="(item) => emitSelectItem('Area', item)"
        />
      </InputGroup>
      <InputGroup class="address" :noMt="marginTop(1180)" lgTitle mid :disable="disable">
        <Input slot="input" placeholder="輸入後續地址" class="w-full" :value="copyInfo.subAddress" @updateValue="(e) => updateInfo('subAddress', e)" :disable="disable"/>
      </InputGroup>
    </div>
    <div class="column-5 dashed-border pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="登記/註冊地" lgTitle mid :disable="disable" dash>
        <SwitchInput
          slot="input"
          :id="`${type}IsForeignRegister`"
          :value="copyInfo.IsForeignRegister"
          checkedText="外國"
          uncheckedText="本國"
          :disable="disable"
          @updateValue="(e) =>updateInfo('IsForeignRegister', e)"
        />
      </InputGroup>
      <InputGroup class="w-full" :noMt="marginTop(560)" lgTitle mid :disable="!copyInfo.IsForeignRegister || disable">
      <Select
          slot="input"
          defaultText="選擇國籍"
          :options="nationalities"
          :selected="copyInfo.RegisterNationality.Text"
          :disable="!copyInfo.IsForeignRegister || disable"
          @emitItem="(item) => emitSelectItem('RegisterNationality', item)"
          search
        />
      </InputGroup>
      
    </div>
    <div class="column-5 dashed-border pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="是否為國內、外或國際組織之重要政治性職務人士(含家庭成員或密切關係者)" dash lgTitle mid :wrap="marginTop(560)" :disable="disable">
        <SwitchInput
          slot="input"
          :id="`${type}IsPolitician`"
          :value="copyInfo.IsPolitician"
          :disable="disable"
          @updateValue="(e) =>updateInfo('IsPolitician', e)"
        />
      </InputGroup>
      <InputGroup class="w-full" :noMt="marginTop(560)" lgTitle mid :disable="disable">
        <SwitchInput
          slot="input"
          :id="`${type}overseasOrDomestic`"
          checkedText="外國"
          uncheckedText="本國"
          :value="copyInfo.overseasOrDomestic"
          :disable="disable"
          @updateValue="(e) =>updateInfo('overseasOrDomestic', e)"
        />
      </InputGroup>
    </div>
    <div class="column-5 pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="客戶屬性" lgTitle mid :disable="disable">
        <SwitchInput
          slot="input"
          :id="`${type}IsProOrNot`"
          checkedText="專業"
          uncheckedText="非專業"
          :value="copyInfo.IsProOrNot"
          :disable="disable"
          @updateValue="(e) =>updateInfo('IsProOrNot', e)"
        />
        <div class="customer-attr" slot="right">
          <span><font-awesome-icon class="mr-1" icon="exclamation-circle" />專業客戶指法人客戶符合「專業投資機構」及「總資產達新台幣五千萬元以上」其中一項者，其他及自然人客戶則屬非專業客戶。</span>
        </div>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Input from '@/components/InputGroup/Input'
import SwitchInput from '@/components/Switch'
import { IDRegex } from '@/utils/regex'
import { Popup } from '@/utils/popups'
export default {
  components: {
    InputGroup,
    Button,
    Select,
    Input,
    SwitchInput
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
    },
    disable: {
      type: Boolean,
      default: () => false
    },
    quotationType: {
      type: String,
      default: () => ''
    },
    InsuranceActive: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      copyInfo: {
        ...this.info
      },
      IDRegex
    }
  },
  watch: {
    info (val) {
      this.copyInfo = {
        ...val
      }
    },
    'copyInfo.IsForeignRegister' (val) {
      if(!val) {
        this.emitSelectItem('RegisterNationality', {
          Value: '',
          Text: '選擇國籍'
        })
      }
    },
    'copyInfo.IsForeigner' (val) {
      if(!val) {
        this.emitSelectItem('Nationality', {
          Value: '',
          Text: '選擇國籍'
        })
      }
    }
  },
  methods: {
    emitSelectItem(key, item) {
      this.updateInfo(key, item)
    },
    updateInfo (key, value) {
      this.$emit('update:info', Object.assign(this.copyInfo, { [key]: value }))
    },
    idVerify() {
      if(this.IDRegex(this.copyInfo.ID).every(item => !item)) {
        Popup.create({
          hasHtml: true,
          htmlText: '請輸入正確身分證字號或統一編號',
        })
      } else if(this.IDRegex(this.copyInfo.ID)[1]) {
        this.updateInfo('CorporateRequired', true)
      } else {
        this.updateInfo('CorporateRequired', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .customer-attr {
    @apply  flex items-center text-red-500 ml-3 absolute whitespace-no-wrap left-16
  }
  .address {
    @apply col-span-3;
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
  @media only screen and (min-width: 1180px) and (max-width: 1614px) {
    .address {
      @apply col-span-2;
    }
  }
</style>