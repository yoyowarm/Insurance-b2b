<template>
  <div>
    <FormTitle title="投保行業 參數設定" class="text-lg mb-14"/>
    <CommonBoard class="category rotate">
      <NavMenu
        class="menu rotate"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
        rotate
      />
      <div class="column-5 mb-4">
        <InputGroup noMt>
          <Select slot="input" :options="typeList" @emitItem="e=> {currentType = e.Value}" defaultText="選擇投保行業"/>
        </InputGroup>
      </div>
      <div class="flex w-full">
        <TableGroup class="w-full" :data="categoryListTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in categoryListTable.rows">
          <div :slot="`weight-${index}`" :key="`weight${index}`" class="flex whitespace-no-wrap">
            <Input :value="item.weight.toString()" @updateValue="e =>{ item.weight = e}" class="md:mr-4 weight-input w-full sm:w-24" :disable="!item.edit"/>
          </div>
          <div :slot="`hasQuotation-${index}`" :key="`hasQuotation${index}`" class="flex whitespace-no-wrap">
            <Checkbox
              :id="`hasQuotation-${index}`"
              :disabled="!item.edit"
              :checked="item.hasQuotation"
              :value="item.hasQuotation"
              @updateValue="e => item.hasQuotation = e"
            />
          </div>
          <div :slot="`displayItemName-${index}`" :key="`displayItemName${index}`" class="flex whitespace-no-wrap">
            <Input :value="item.displayItemName.toString()" @updateValue="e =>{ item.displayItemName = e}" class="md:mr-4 weight-input w-full" :disable="!item.edit"/>
          </div>
          <div :slot="`dangerCode-${index}`" :key="`dangerCode${index}`" class="flex whitespace-no-wrap pr-2">
            <InputGroup noMt class="w-full -mt-2" :disable="!item.edit">
              <Select
                slot="input"
                class="w-full"
                :disable="!item.edit"
                :options="dangerCodeList"
                @emitItem="e=> {item.dangerCode = e.Value}"
                :selected="item.dangerCode"
                defaultText="選擇投保行業"
              />
            </InputGroup>
          </div>
          <div v-if="false" :slot="`isEnable-${index}`" :key="`isEnable${index}`" class="w-full flex sm:justify-center items-center whitespace-no-wrap">
            <font-awesome-icon v-if="item.isEnable" @click="() =>{ if(item.edit){item.isEnable = !item.isEnable}}" class="text-lg mr-2" :class="{'text-main cursor-pointer': item.edit, 'select-none': !item.edit}" :icon="['fas','eye']" />
            <font-awesome-icon v-else @click="() =>{ if(item.edit){item.isEnable = !item.isEnable}}" :class="{'text-main cursor-pointer': item.edit, 'select-none': !item.edit}" :icon="['fas','eye-slash']" />
            <div class="sm:hidden flex whitespace-no-wrap">
              <span class="pr-3" @click="() =>{ if(item.edit){item.isEnable = !item.isEnable}}" :class="{'text-main cursor-pointer': item.edit, 'select-none': !item.edit}">顯示</span>
              <span class="text-gray-300 pr-3">/</span>
              <span class=" text-gray-300" @click="() =>{ if(item.edit){item.isEnable = !item.isEnable}}" :class="{'cursor-pointer': item.edit, 'select-none': !item.edit}">隱藏</span>
            </div>
          </div>
          <div :slot="`canShowLevel-${index}`" :key="`canShowLevel${index}`" class="flex whitespace-no-wrap">
            <InputGroup :disable="!item.edit" noMt class="w-64">
              <Select slot="input" class="w-full" :disable="!item.edit" :selected="item.canShowLevel" :options="underwritingList" @emitItem="e=> {item.canShowLevel = e.Value}" defaultText="選擇階層"/>
            </InputGroup>
          </div>
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Button class="w-full sm:w-24" @click.native="editSwitch(index)" :outline="!item.edit"><span v-if="!item.edit">編輯</span><span v-else>儲存</span></Button>
          </div>
        </template>
      </TableGroup>
      </div>
      <Pagination v-if="false && windowWidth > 770" :totalPage="totalPage" :currentPage="currentPage" @changePage="changePage"/>
      <WindowResizeListener @resize="handleResize"/>
    </CommonBoard>
     <LoadingScreen :isLoading="loading.length > 0"/>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'
import CommonBoard from '@/components/CommonBoard'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import TableGroup from '@/components/TableGroup'
import NavMenu from '@/components/NavMenu'
import Select from '@/components/Select'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Pagination from '@/components/pagination'
import WindowResizeListener from '@/components/WindowResizeListener'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { categoryListTable,underwritingCategoryListTable } from '@/utils/mockData'
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
    Checkbox,
    Input,
    Button,
    LoadingScreen
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      categoryList: categoryListTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 0,
      currentType: '',
      itemLists:[
        { text: '處所', value: 0 },
        { text: '活動', value: 1 },
        { text: '核保處所', value: 2 },
        { text: '核保活動', value: 3 }
      ],
      underwritingList: [
        { Text:'經手人', Value: 0 },
        { Text:'分公司核保', Value: 1 },
        { Text:'總公司核保', Value: 2 },
        { Text:'總公司科處主管', Value: 3 },
        { Text:'總公司部室主管', Value: 4 },
        { Text:'協理、副總', Value: 5 },
      ],
      typeList: [],
      dangerCodeList: [],
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
      'currentPage': state => state.app.currentPage,
      'totalPage': state => state.app.totalPage,
    }),
    categoryListTable: {
      get() {
        this.categoryList.rows.map(item => {
          // eslint-disable-next-line no-prototype-builtins
          if(item.hasOwnProperty('edit')) {
            return item
          } else {
            return {
              ...item,
              edit: false
            }
          }
        })
        return this.categoryList
      },
      set(value) {
        this.categoryList = value
      }
    },
    slotArray () {
      const arr = []
      const slotArr = [ 'weight','hasQuotation','displayItemName', 'isEnable', 'operate','dangerCode', 'canShowLevel']
      for (let i = 0; i < this.categoryListTable.rows.length; i++) {
        slotArr.map(item => {
          arr.push(`${item}-${i}`)
        })
      }
      return arr
    }
  },
  watch: {
    currentTag: {
      async handler(val,oldVal) {
        if(!isNaN(oldVal) && val !== oldVal) {
          const data = await this.$store.dispatch('resource/PlaceActivities', {
            placeActivityType: this.currentTag == 0 || this.currentTag == 2 ? 1 : 2,
            typeName: val == '選擇投保行業' ? '' : val
          })
          this.categoryListTable = {
            head: val ==0 || val ==1 ? categoryListTable().head : underwritingCategoryListTable().head,
            rows: data.data.content.placeActivityDetails
          }
          this.currentType = data.data.content.placeActivityDetails[0]
          await this.getAllList(val)
        }
      },
      immediate: true
    },
    currentType: {
      async handler(val, oldVal) {
        if(val === oldVal) return 
        if(val == '選擇投保行業') {
          await this.getAllList(this.currentTag)
        } else {
          const data = await this.$store.dispatch('resource/PlaceActivities', {
            placeActivityType: this.currentTag == 0 || this.currentTag == 2 ? 1 : 2,
            typeName: val == '選擇投保行業' ? '' : val
          })
          this.categoryListTable = {
            head: this.currentTag ==0 || this.currentTag ==1 ? categoryListTable().head : underwritingCategoryListTable().head,
            rows: data.data.content.placeActivityDetails
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    async changePage(page) {
      if(this.currentPage === page || page < 1) return
    },
    async editSwitch(index) {
      const value = !this.categoryListTable.rows[index].edit
      this.categoryListTable = Object.assign(this.categoryListTable, {
        ...categoryListTable().heads,
        rows: this.categoryListTable.rows.map((item, i) => {
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
        if(this.currentTag == 0 || this.currentTag == 1) {
          const data = {
            seq: this.categoryListTable.rows[index].dangerSeq,
            weight: this.categoryListTable.rows[index].weight,
            hasQuotation: this.categoryListTable.rows[index].hasQuotation,
            displayItemName: this.categoryListTable.rows[index].displayItemName,
            dangerCode: this.categoryListTable.rows[index].dangerCode,
            isEnable: this.categoryListTable.rows[index].isEnable
          }
          await this.$store.dispatch('parameterSetting/updatePlacesActivity', data)
        } else {
          const data = {
            seq: this.categoryListTable.rows[index].dangerSeq,
            canShowLevel: this.categoryListTable.rows[index].canShowLevel
          }
           await this.$store.dispatch('parameterSetting/editPlaceActivitiesShowLevel', data)
        }
        const category = await this.$store.dispatch('resource/PlaceActivities', {
          placeActivityType: this.currentTag == 0 || this.currentTag == 2 ? 1 : 2,
          typeName: this.currentType === '選擇投保行業' ? '' : this.currentType
        })
        this.categoryListTable = {
          head: this.currentTag ==0 || this.currentTag ==1 ? categoryListTable().head : underwritingCategoryListTable().head,
          rows: category.data.content.placeActivityDetails
        }
      }
    },
    async getAllList(val) {
      const data = await this.$store.dispatch('resource/PlaceActivities', {
            placeActivityType: this.currentTag == 0 || this.currentTag == 2 ? 1 : 2,
            typeName: this.currentType == '選擇投保行業' ? '' : this.currentType
          })
      this.categoryListTable = {
        head: val ==0 || val ==1 ? categoryListTable().head : underwritingCategoryListTable().head,
        rows: data.data.content.placeActivityDetails
      }
      const type = await this.$store.dispatch(`resource/${val === 0 ||val === 2 ? 'PlaceTypes' :'ActivityTypes'}`)
      
      this.typeList = type.data.content.map(item => {
        return {
          Text: item,
          Value: item
        }
      })
    },
    async GetPlaceActivitieDangerCodes() {
      const res = await this.$store.dispatch('parameterSetting/GetPlaceActivitieDangerCodes')
      this.dangerCodeList = res.data.content.map(item => {
        return {
          Text: `(${item.dangerCode})${item.dangerName}`,
          Value: item.dangerCode
        }
      })
    }
  },
  async mounted() {
    await this.GetPlaceActivitieDangerCodes()
    await this.getAllList(this.currentTag)
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
  .weight-input {
    @apply rounded-full h-full border-2 border-gray-300 text-center
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