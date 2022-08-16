<template>
  <div>
    <FormTitle title="建議條款 條款設定" class="text-lg mb-14"/>
    <CommonBoard class="category rotate">
      <NavMenu
        class="menu"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
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
      <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
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
import Pagination from '@/components/pagination'
import WindowResizeListener from '@/components/WindowResizeListener'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { termsListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    Pagination,
    WindowResizeListener,
    TableGroup,
    Select,
    InputGroup,
    LoadingScreen
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
        } else {}
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
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      console.log(page)
      // this.$store.dispatch('app/updatedCurrentPage',page)
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
      this.termsListTable.rows = data.data.content.additionTermsDetails.map(item => {
        return {
          ...item,
          additionTermName: `${item.additionTermId}${item.additionTermName}`,
        }
      })
    },
  },
  async mounted() {
    await this.getAllList(0)
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
</style>