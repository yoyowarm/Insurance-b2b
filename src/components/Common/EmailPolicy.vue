<template>
  <CommonBoard :hasCover="hasCover" :coverText="coverText" class="w-full" title="出單方式(二擇一)">
    <FormTitle classList="text-xl text-gray-700" class="mb-6" title="電子保單">
      <Checkbox
        class="my-1.5 disabled"
        id="ePolicy"
        :checked="eletric.transferType == 1"
        :value="eletric.transferType == 1"
        disabled
        @updateValue="(e) =>{ if(eletric.transferType !== 1){updateValue('', 'transferType', 1)}}"
        slot="left"
      />
      <!-- <div class="flex flex-no-wrap items-center text-red-500 ml-3" slot="right">
        <font-awesome-icon class="mr-1" icon="exclamation-circle" />
        <span>如有抵押請選擇紙本保單方式</span>
      </div> -->
    </FormTitle>
    <template v-for="(item,index) in eletric.transferDetails">
      <FormTitle title="寄送資訊" :key="index + '寄送資訊'" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
      <div v-if="eletric.transferDetails.length > 1" class=" ml-2" :class="{'cursor-pointer': !disable}" slot="right" @click="() => {if(!disable && eletric.transferType == 1){remoteInfo(index)}}">
        <font-awesome-icon icon="times-circle" class="text-2xl" :class="{'text-main': !disable, 'text-gray-500': disable}"/>
      </div>
    </FormTitle>
      <div class="column-3 pb-3 mb-4" :key="index">
        <InputGroup class="w-full" title="寄送方式" :disable="disable || eletric.transferType == 2">
          <SwitchInput
            slot="input"
            :id="index + 'email'"
            checkedText="Email"
            uncheckedText="手機"
            :value="item.transferDetailType"
            :disable="disable || eletric.transferType == 2"
            @updateValue="(e) =>updateValue(index, 'transferDetailType', e)"
          />
        </InputGroup>
        <InputGroup class="w-full" title="寄送資料" :disable="disable || eletric.transferType == 2">
          <Input
            slot="input"
            placeholder="輸入寄送資料"
            :value="item.transferInfo"
            :disable="disable || eletric.transferType == 2"
            @updateValue="(e) =>updateValue(index, 'transferInfo', e)"
          />
        </InputGroup>
      </div>
      <div class="column-3 pb-3 mb-4 dashed-border " :key="index+'column2'">
        <InputGroup class="w-full" title="保單" dash :disable="disable || eletric.transferType == 2">
          <SwitchInput
            slot="input"
            :id="index + '正本'"
            checkedText="副本"
            uncheckedText="正本"
            :disable="disable || eletric.transferType == 2"
            :value="item.transferOriginalType"
            @updateValue="(e) =>updateValue(index, 'transferOriginalType', e)"
          />
        </InputGroup>
        <InputGroup class="w-full" title="保單正本排序" :disable="disable || item.transferOriginalType || eletric.transferType == 2">
          <Input
            slot="input"
            placeholder="輸入排序"
            inputmode="tel" 
            :value="item.sort"
            :disable="disable || item.transferOriginalType || eletric.transferType == 2"
            @updateValue="(e) =>updateValue(index, 'sort', e)"
            numberOnly
          />
        </InputGroup>
      </div>
    </template>
    <div class="flex justify-center items-center mb-3 mt-6">
      <Button @click.native="addItem" outline :disabled="disable || eletric.transferType == 2">新增寄送資訊</Button>
    </div>
    <FormTitle classList="text-xl text-gray-700" title="紙本保單">
      <Checkbox
        class="my-1.5"
        id="paper"
        :checked="eletric.transferType == 2"
        :value="eletric.transferType == 2"
        :disabled="disable || InsuranceActive == 7"
        @updateValue="(e) =>{ if(eletric.transferType !== 2){updateValue('', 'transferType', 2)}}"
        slot="left"
      />
    </FormTitle>
    <div class="column-5 pb-3 mb-4 dashed-border">
      <InputGroup class="w-full" title="保單正本份數" :disable="disable || InsuranceActive == 7">
        <Input
          slot="input"
          :disable="disable || InsuranceActive == 7"
          class="w-full"
          placeholder="輸入份數"
          numberOnly
          :value="eletric.paperTransferDetails.policyOriginalsAmount"
          @updateValue="(e) => updateValue('','policyOriginalsAmount', e)"/>
      </InputGroup>
      <InputGroup class="w-full" title="保單副本份數" :disable="disable || InsuranceActive == 7">
        <Input
          slot="input"
          :disable="disable || InsuranceActive == 7"
          class="w-full"
          placeholder="輸入份數"
          numberOnly
          hasZero
          :value="eletric.paperTransferDetails.policyCopiesAmount"
          @updateValue="(e) => updateValue('','policyCopiesAmount', e)"/>
      </InputGroup>
      <InputGroup class="w-full" title="是否需要證明書" :disable="disable">
          <SwitchInput
            slot="input"
            :id="'是否需要證明書'"
            :disable="disable"
            :value="eletric.paperTransferDetails.needCertificate"
            @updateValue="(e) =>updateValue('','needCertificate', e)"
          />
        </InputGroup>
    </div>
  </CommonBoard>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
import Input from '@/components/InputGroup/Input'
import SwitchInput from '@/components/Switch'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
export default {
  components: {
    CommonBoard,
    InputGroup,
    FormTitle,
    Input,
    SwitchInput,
    Checkbox,
    Button
  },
  props: {
    eletric: {
      type: Object,
      default: () => {}
    },
    disable: {
      type: Boolean,
      default: false
    },
    PolicyType: {
      type: String,
      default: ''
    },
    InsuranceActive: {
      type: Number,
      default: 0
    },
    hasCover: {
      type: Boolean,
      default: false
    },
    coverText: {
      type: String,
      default: ''
    }
  },
  methods: {
    addItem() {
      const data = JSON.parse(JSON.stringify(this.eletric))
      data.transferDetails.push({
          transferDetailType: false,
          transferOriginalType: false,
          transferInfo: '',
          sort: 1
        })
      this.$emit('update:eletric', data)
    },
    remoteInfo(index) {
      const data = JSON.parse(JSON.stringify(this.eletric))
      data.transferDetails.splice(index, 1)
      this.$emit('update:eletric', data)
    },
    updateValue(index, key, value) {
      console.log(index, key, value,this.eletric)
      const data = JSON.parse(JSON.stringify(this.eletric))
      if (key == 'needCertificate' || key == 'policyOriginalsAmount' || key == 'policyCopiesAmount') {
        data.paperTransferDetails[key] = value
      } else if(key == 'transferType') {
        data.transferType = value
      } else {
        if(key == 'transferOriginalType' && value) {
          data.transferDetails[index].sort = ''
        }
        data.transferDetails[index][key] = value
      }
      this.$emit('update:eletric', data)
    },
  }
}
</script>

<style scoped lang="postcss">
  
</style>