<template>
  <div class="w-full">
    <template v-for="(info,index) in infoList">
      <FormTitle :key="`title${index}`" :title="`處所${index+1}`" classList="text-xl text-gray-700 my-3 " >
        <div v-if="index !== 0 && windowWidth <= 600" class=" absolute right-10 mt-2" slot="right">
          <font-awesome-icon @click="() => {if(!disable){$emit('removeItem',index)}}" icon="times-circle" class="text-2xl " :class="{'text-gray-500':disable, 'text-main': !disable}" />
        </div>
      </FormTitle>
      <div :key="index" class="column-5 dashed-border relative">
        <InputGroup title="持有狀態" :disable="disable">
          <SwitchInput
            checkedText="承租"
            uncheckedText="自有"
            slot="input"
            :value="info.holdState"
            :id="`IsHold-${index}`"
            :disabled="disable"
            @updateValue="(e) =>updateValue(e,'holdState',index)"
          />
        </InputGroup>
        <InputGroup title="處所坪數" :disable="disable">
          <Input
            slot="input"
            inputmode="tel"
            placeholder="輸入坪數"
            :value="info.squareFeet.toString()"
            numberOnly
            numberFormat
            decimalPoint
            :maxLength="9"
            :disable="disable"
            @updateValue="(e) =>updateValue(e,'squareFeet',index)"
          />
        </InputGroup>
        <InputGroup title="經營業務處所" :disable="disable">
          <Select slot="input" :options="countyList" :selected="info.city.Value" @emitItem="e=>updateValue(e,'city',index)" defaultText="選擇縣市" :disable="disable"/>
        </InputGroup>
        <div v-if="index !== 0 && windowWidth > 600" class="flex items-end pb-4" >
          <font-awesome-icon @click="() => {if(!disable){$emit('removeItem',index)}}" icon="times-circle" class="text-2xl " :class="{'text-gray-500':disable, 'text-main': !disable}" />
        </div>
      </div>
    </template>
    <div class="flex justify-center mt-6">
      <Button @click.native="$emit('addItem')" outline :disabled="disable">新增處所資料</Button>
    </div>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import SwitchInput from '@/components/Switch'
import Select from '@/components/Select'
import FormTitle from '@/components/FormTitle'
import Button from '@/components/Button/index.vue'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  components: {
    InputGroup,
    Input,
    SwitchInput,
    Select,
    FormTitle,
    Button,
    WindowResizeListener
  },
  props: {
    infoList: {
      type: Array,
      default: () => []
    },
    countyList: {
      type: Array,
      default: () => []
    },
    disable: {
      type: Boolean,
      default: false
    },
    questionnaire: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    updateValue(e,type,index) {
      const copyInfoList = [...this.infoList]
      copyInfoList[index][type] = e
      this.$emit('update:infoList', copyInfoList)
      if(type == 'squareFeet') {
        let total = 0
        const arr = []
        this.infoList.map(item => {
          total += Number(item.squareFeet)
          arr.push(Number(item.squareFeet))
        })
        arr.reduce((a,b) => a>b?a:b)
        this.$store.dispatch('place/updatedQuestionnaire', {...this.questionnaire,part1:{...this.questionnaire.part1,area: arr[0], totalArea: total}})
      }
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>