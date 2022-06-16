<template>
  <div>
    <div class="column-5 dashed-border">
      <InputGroup class=" w-full mb-2.5" title="姓名">
        <div slot="input" class="w-full pr-24 relative">
          <Input slot="input" placeholder="輸入名稱" :value="copyInfo.Name" @updateValue="(e) => updateInfo('Name', e)"/>
          <Button class="absolute right-0 -top-1 w-10 md:w-16 h-full" style="height: 50px" @click.native="() => { if(copyInfo.ID) {$emit('getDetail')}}">查詢</Button>
        </div>
      </InputGroup>
      <InputGroup class=" w-full mb-2.5" title="統編/身分證">
        <div slot="input" class="w-full pr-24 relative">
          <Input placeholder="輸入號碼" :value="copyInfo.ID" @updateValue="(e) => updateInfo('ID', e)" @blur.native="$emit('checkID')"/>
          <Button class="absolute right-0 -top-1 w-10 md:w-16 h-full" style="height: 50px" @click.native="() => { if(copyInfo.ID) {$emit('getDetail')}}">查詢</Button>
        </div>
      </InputGroup>
    </div>
    <div class="column-5 pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="電話">
        <Input slot="input" placeholder="輸入號碼" :value="copyInfo.Mobile" @updateValue="(e) => updateInfo('Mobile', e)"/>
      </InputGroup>
      <InputGroup class="w-full" title="國籍" dash>
        <SwitchInput
          slot="input"
          :id="`${type}IsForeigner`"
          :value="copyInfo.IsForeigner"
          checkedText="外國"
          uncheckedText="本國"
          @updateValue="(e) =>updateInfo('IsForeigner', e)"
        />
      </InputGroup>
      <InputGroup class="w-full" :noMt="marginTop(560)">
        <Select
          slot="input"
          defaultText="選擇國籍"
          :options="nationalities"
          :selected="copyInfo.Nationality.placeholder"
          @emitItem="(item) => emitSelectItem('Nationality', item)"
          search
        />
      </InputGroup>
      <InputGroup class="w-full" title="職業/行業別">
        <SwitchInput
          slot="input"
          :id="`${type}Profession`"
          checkedText="特殊"
          uncheckedText="一般"
          :value="copyInfo.Profession"
          @updateValue="(e) =>updateInfo('Profession', e)"
        />
      </InputGroup>
      <InputGroup class="w-full" title="負責(代表)人" v-if="copyInfo.CorporateRequired">
        <Input slot="input" placeholder="輸入姓名" :value="copyInfo.Corporate" @updateValue="(e) => updateInfo('Corporate', e)"/>
      </InputGroup>
    </div>
    <div class="column-5">
      <InputGroup class="item" title="居住地址(選填)" dash>
        <Select
          slot="input"
          defaultText="選擇縣市"
          :options="cityList"
          :selected="copyInfo.City.id"
          @emitItem="(item) => emitSelectItem('City', item)"
        />
      </InputGroup>
      <InputGroup class="item" dash :noMt="marginTop(560)" >
        <Select
          slot="input"
          defaultText="選擇區域"
          :options="areaList"
          :selected="copyInfo.Area.id"
          @emitItem="(item) => emitSelectItem('Area', item)"
        />
      </InputGroup>
      <InputGroup class="address" :noMt="marginTop(1180)">
        <Input slot="input" placeholder="輸入後續地址" :value="copyInfo.Street" @updateValue="(e) => updateInfo('Street', e)"/>
      </InputGroup>
    </div>
    <div class="column-5 dashed-border pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="登記/註冊地" dash>
        <SwitchInput
          slot="input"
          :id="`${type}IsForeignRegister`"
          :value="copyInfo.IsForeignRegister"
          checkedText="外國"
          uncheckedText="本國"
          @updateValue="(e) =>updateInfo('IsForeignRegister', e)"
        />
      </InputGroup>
      <InputGroup class="w-full" :noMt="marginTop(560)">
      <Select
          slot="input"
          defaultText="選擇國籍"
          :options="nationalities"
          :selected="copyInfo.RegisterNationality.placeholder"
          @emitItem="(item) => emitSelectItem('RegisterNationality', item)"
          search
        />
      </InputGroup>
      
    </div>
    <div class="column-5 dashed-border pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="是否為國內、外或國際組織之重要政治性職務人士(含家庭成員或密切關係者)" dash :wrap="marginTop(560)">
        <SwitchInput
          slot="input"
          :id="`${type}IsPolitician`"
          :value="copyInfo.IsPolitician"
          @updateValue="(e) =>updateInfo('IsPolitician', e)"
        />
      </InputGroup>
      <InputGroup class="w-full" :noMt="marginTop(560)">
        <SwitchInput
          slot="input"
          :id="`${type}IsOverseasOrDomestic`"
          checkedText="外國"
          uncheckedText="本國"
          :value="copyInfo.IsOverseasOrDomestic"
          @updateValue="(e) =>updateInfo('IsOverseasOrDomestic', e)"
        />
      </InputGroup>
    </div>
    <div class="column-5 pt-6 pb-3 mb-4">
      <InputGroup class="w-full" title="客戶屬性">
        <SwitchInput
          slot="input"
          :id="`${type}IsProOrNot`"
          checkedText="非專業"
          uncheckedText="專業"
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
    }
  },
  data () {
    return {
      copyInfo: {
        ...this.info
      }
    }
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