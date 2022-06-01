<template>
  <div>
    <div class="column-6">
      <InputGroup class="w-full col-span-2" title="投保行業" v-if="copyInfo.CorporateRequired || true" borderBtn>
         <div slot="input" class="w-full pr-24 relative">
          心理輔導與家庭諮詢機構
        </div>
      </InputGroup>
      <div class="flex flex-row col-span-2">
        <InputGroup class="w-full pr-1" title="保險開始時間" borderBtn>
          <div slot="input">111年</div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn>
          <div slot="input">04月</div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn>
          <div slot="input">15日</div>
        </InputGroup>
        <InputGroup class="w-full" borderBtn>
          <div slot="input">12時</div>
        </InputGroup>
      </div>
      <div class="flex flex-row col-span-2">
        <InputGroup class="w-full pr-1" title="保險結束時間" borderBtn>
          <div slot="input">111年</div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn>
          <div slot="input">04月</div>
        </InputGroup>
        <InputGroup class="w-full pr-1" borderBtn>
          <div slot="input">15日</div>
        </InputGroup>
        <InputGroup class="w-full" borderBtn>
          <div slot="input">12時</div>
        </InputGroup>
      </div>
    </div>
    <template v-for="(item, index) in lists">
      <FormTitle :key="`title${index}`" :title="`活動資訊-場次${index+1}`" classList="text-xl mt-4" />
      <div :key="`row1${index}`" class="column-6 pb-3 mb-2">
        <InputGroup class="w-full" title="每日人數" :noMt="marginTop(560)" borderBtn>
          <div slot="input" class="w-full pr-24 relative">
            1000人
          </div>
      </InputGroup>
      <InputGroup class="w-full" title="居住地址" :noMt="marginTop(560)" borderBtn>
          <div slot="input" class="w-full pr-24 relative">
            台北市
          </div>
      </InputGroup>
      <InputGroup class="w-full" :noMt="marginTop(560)" borderBtn>
          <div slot="input" class="w-full pr-24 relative">
            大安區
          </div>
      </InputGroup>
      <InputGroup class="w-full col-span-3" :noMt="marginTop(560)" borderBtn>
          <div slot="input" class="w-full pr-24 relative">
            敦化南路1段183號5樓
          </div>
      </InputGroup>
      </div>
      <div :key="`row2${index}`" class="column-6 pb-3 mb-2">
        <div class="flex flex-row col-span-2">
          <InputGroup class="w-full pr-1" title="活動開始時間" borderBtn>
            <div slot="input">111年</div>
          </InputGroup>
          <InputGroup class="w-full pr-1" borderBtn>
            <div slot="input">04月</div>
          </InputGroup>
          <InputGroup class="w-full pr-1" borderBtn>
            <div slot="input">15日</div>
          </InputGroup>
          <InputGroup class="w-full" borderBtn>
            <div slot="input">12時</div>
          </InputGroup>
        </div>
        <div class="flex flex-row col-span-2">
          <InputGroup class="w-full pr-1" title="活動開始時間" borderBtn>
            <div slot="input">111年</div>
          </InputGroup>
          <InputGroup class="w-full pr-1" borderBtn>
            <div slot="input">04月</div>
          </InputGroup>
          <InputGroup class="w-full pr-1" borderBtn>
            <div slot="input">15日</div>
          </InputGroup>
          <InputGroup class="w-full" borderBtn>
            <div slot="input">12時</div>
          </InputGroup>
        </div>
        <InputGroup class="w-full pr-1" title="活動計日" borderBtn>
            <div slot="input">4天</div>
          </InputGroup>
      </div>
    </template>
    <div class="column-6 pb-3 mb-4">
      <InputGroup class="w-full col-span-6" title="備註" borderBtn>
        <div slot="input" class="w-full pr-24 relative">
          備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容備註文字內容
        </div>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'

export default {
  components: {
    InputGroup,
    FormTitle
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
    lists: {
      type: Array,
      default: () => []
    },
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