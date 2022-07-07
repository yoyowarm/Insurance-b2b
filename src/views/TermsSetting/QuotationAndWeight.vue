<template>
  <div>
    <FormTitle title="另行報價和權重(數值大者優先) 條款設定" class="text-lg mb-14"/>
    <CommonBoard class="category rotate">
      <NavMenu
        class="menu"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
      />
      <div class="flex w-full">
        <TableGroup class="w-full" :data="weightListTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in weightListTable.rows">
          <div :slot="`weight-${index}`" :key="`weight${index}`" class="flex whitespace-no-wrap">
            <Input :value="item.weight.toString()" @updateValue="e =>{ item.weight = e}" class="md:mr-4 weight-input w-full sm:w-24" :disable="!item.edit"/>
          </div>
          <div :slot="`hasQuotation-${index}`" :key="`hasQuotation${index}`" class="flex whitespace-no-wrap">
            <span
              class="pr-3"
              :class="{'cursor-pointer': item.edit && !item.hasQuotation,'text-main': item.hasQuotation, 'select-none': !item.edit}"
              @click="() =>{ if(item.edit){item.hasQuotation = !item.hasQuotation}}"
            >是</span>
            <span class="text-gray-300 pr-3">/</span>
            <span
              :class="{'cursor-pointer': item.edit && item.hasQuotation,'text-main': !item.hasQuotation, 'select-none': !item.edit}"
              @click="() =>{ if(item.edit){item.hasQuotation = !item.hasQuotation}}"
            >否</span>
          </div>
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Button class="w-full sm:w-24" @click.native="editSwitch(index)" :outline="!item.edit"><span v-if="!item.edit">編輯</span><span v-else>儲存</span></Button>
          </div>
        </template>
      </TableGroup>
      </div>
      <Pagination v-if="windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
      <WindowResizeListener @resize="handleResize"/>
    </CommonBoard>
    <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import TableGroup from '@/components/TableGroup'
import Input from '@/components/InputGroup/Input.vue'
import NavMenu from '@/components/NavMenu'
import Pagination from '@/components/pagination'
import Button from '@/components/Button'
import WindowResizeListener from '@/components/WindowResizeListener'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { weightListTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    Pagination,
    WindowResizeListener,
    TableGroup,
    Input,
    Button,
    LoadingScreen
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      weightList: weightListTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 0,
      itemLists:[
        { text: '處所', value: 0 },
        { text: '活動', value: 1 }
      ],
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    weightListTable: {
      get() {
        return this.weightList
      },
      set(value) {
        this.weightList = value
      }
    },
    slotArray () {
      const arr = []
      const slotArr = [ 'weight','hasQuotation', 'operate']
      for (let i = 0; i < this.weightListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
      await this.getAdditionTerms((page-1)*10,10)
      this.$store.dispatch('app/updatedCurrentPage',page)
    },
    async editSwitch(index) {
      const value = !this.weightListTable.rows[index].edit
      this.weightListTable = Object.assign(this.weightListTable, {
        ...this.weightListTable.heads,
        rows: this.weightListTable.rows.map((item, i) => {
          if(i === index) {
            return {
              ...item,
              edit: value
            }
          } else {
            return item
          }
        })
      })
      if(!value) {
        await this.$store.dispatch('additionTermSetting/editAdditionTerm', {
          additionTermId: this.weightListTable.rows[index].additionTermId,
          weight: Number(this.weightListTable.rows[index].weight),
          hasQuotation: this.weightListTable.rows[index].hasQuotation
        })
        await this.getAdditionTerms((this.currentPage-1)*10,10, this.currentPage)
      }
    },
    async getAdditionTerms(skip,take,page) {
      const res = await this.$store.dispatch('resource/AdditionTerms',{skip,take})
      this.weightListTable = {
        head:this.weightListTable.head,
        rows: res.data.content.additionTerms.map(item => {
          return {
            ...item,
            edit: false
          }
        })
      }
      this.$store.dispatch('app/updatedCurrentPage',page? page: 1)
      this.$store.dispatch('app/updatedTotalPage',Math.ceil(res.data.content.totalCount/10))
    },
  },
  async mounted() {
    await this.getAdditionTerms()
  },
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
  .weight-input {
    @apply rounded-full h-full border-2 border-gray-300 text-center
  }
</style>