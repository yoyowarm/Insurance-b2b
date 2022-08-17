<template>
  <div>
    <FormTitle title="建議條款 條款設定" class="text-lg sm:mb-14"/>
    <CommonBoard class="category rotate">
      <NavMenu
        class="menu rotate"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
        rotate
        bigItem
      />
      <div class="column-5 mb-4" v-if="currentTag==0 || currentTag==1">
        <InputGroup noMt>
          <Select
            slot="input"
            :options="typeList"
            @emitItem="e=> currentType = e.Value"
            :selected="currentType"
            defaultText="選擇類別"/>
        </InputGroup>
        <InputGroup noMt>
          <Select
            slot="input"
            :options="categoryList"
            :selected="currentCategory"
            @emitItem="e=> currentCategory = e.Value"
            :defaultText="currentTag === 0 ?'選擇場所' : '選擇活動'"
          />
        </InputGroup>
      </div>
      <div class="flex w-full" v-if="currentTag==0 || currentTag==1">
        <TableGroup class="w-full" :data="termsListTable" :slotName="slotArray" scrollX>
          <template v-for="(item,index) in termsListTable.rows">
            <div :slot="`isSuggest-${index}`" :key="`isSuggest${index}`" class="flex whitespace-no-wrap">
              <span @click="updateTerm(!item.isSuggest,item.id)" class="pr-3" :class="{'cursor-pointer text-main': item.isSuggest, 'cursor-pointer text-gray-300': !item.isSuggest}">是</span>
              <span class="text-gray-300 pr-3">/</span>
              <span @click="updateTerm(!item.isSuggest,item.id)" :class="{'text-main': !item.isSuggest, 'cursor-pointer text-gray-300': item.isSuggest}">否</span>
            </div>
          </template>
        </TableGroup>
      </div>
      <AdditionTermExtraRates v-else :type="currentTag" :ratesList="ratesList" @updateRates="getTermsRates(currentTag)"/>
      <WindowResizeListener @resize="handleResize"/>
      <LoadingScreen :isLoading="loading.length > 0"/>
    </CommonBoard>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import TableGroup from '@/components/TableGroup'
import NavMenu from '@/components/NavMenu'
import Select from '@/components/Select'
import WindowResizeListener from '@/components/WindowResizeListener'
import LoadingScreen from '@/components/LoadingScreen.vue'
import AdditionTermExtraRates from '@/components/Common/AdditionTermExtraRates.vue'
import { termsListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    WindowResizeListener,
    TableGroup,
    Select,
    InputGroup,
    LoadingScreen,
    AdditionTermExtraRates
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      termsListTable: termsListTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 0,
      currentType: '',
      currentCategory: '',
      categoryList:[],
      typeList:[],
      ratesList:[],
      itemLists:[
        { text: '處所', value: 0 },
        { text: '活動', value: 1 },
        { text: '處所費率設定', value: 2 },
        { text: '活動費率設定', value: 3 },
      ],
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    slotArray () {
      const arr = []
      const slotArr = ['isSuggest']
      for (let i = 0; i < this.termsListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  watch: {
    currentTag: {
      async handler(val) {
        if(val === 0 || val === 1) {
          await this.getAllList(val)
          this.currentType = this.typeList[0].Value
        } else {
          await this.getTermsRates(val)
        }
      },
      immediate: true
    },
    currentType: {
      async handler(val) {
        if(val == '選擇類別') {
          await this.getAllList(this.currentTag)
        } else {
          const data = await this.$store.dispatch('resource/PlaceActivities', {
            placeActivityType: this.currentTag+1,
            typeName: val
          })
          this.categoryList = data.data.content.placeActivityDetails.map(item => {
            return {
              Text: item.itemName,
              Value: item.dangerSeq
            }
          })
          this.currentCategory = this.categoryList[0].Value
        }
      },
      immediate: true
    },
    currentCategory: {
      async handler(val) {
        await this.AdditionTermsType(val)
      },
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async getTermsRates(val) {
      const data = await this.$store.dispatch('resource/AdditionTermExtraRates',{placeActivityType: val-1})
      this.ratesList = data.data.content.map(item => {
        const data = {
          ...item,
          edit: false,
          additionTermName: item.additionTermName
        }
        item.extraRateDetails.map(i => {
          data[`${i.typeName}1`] = {rate: i.rate*100, id: i.id}
        })
        return data
      })
    },
    async getAllList(val) {
      const type = await this.$store.dispatch(`resource/${val === 0 ? 'PlaceTypes' :'ActivityTypes'}`)
      this.typeList = type.data.content.map(item => {
        return {
          Text: item,
          Value: item
        }
      })
    },
    async updateTerm(value, id) {
      await this.$store.dispatch('additionTermSetting/editAdditionTermDetail', {
        id: id,
        isSuggest: value
      })
      await this.AdditionTermsType(this.currentCategory)
    },
    async AdditionTermsType(val) {
      const data = await this.$store.dispatch('resource/AdditionTermsType', val)
      this.termsListTable.rows = data.data.content.additionTermsDetails
    },
  },
  async mounted() {
    await this.getAllList(0)
    await this.getTermsRates(2)
    this.currentType = this.typeList[0].Value
  }
}
</script>

<style scoped lang="scss">
  .category {
    margin-top: 40px;
    @apply  w-full relative
  }
  .menu {
    top: -39px;
    @apply absolute
  }
  @media screen and (max-width: 600px) {
  .category.rotate {
    margin-top: 0;
    padding-left: 50px;
  }
  .menu.rotate{
    top: 20px;
    left: -5px;
    @apply absolute
  }
  >>> .board {
    min-height: 400px;
  }
}
</style>