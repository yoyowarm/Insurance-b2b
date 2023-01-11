<template>
  <div>
    <FormTitle title="基本純保費 參數設定" class="text-lg mb-14"/>
    <CommonBoard class="category rotate">
      <NavMenu
        class="menu"
        :itemLists="itemLists"
        :currentTag="currentTag"
        @updatedMenu="(e) => currentTag = e"
      />
      <div class="flex w-full">
        <TableGroup class="w-full" :data="basicPremiumTable" :slotName="slotArray" scrollX>
        <template v-for="(item,index) in basicPremiumTable.rows">
          <div :slot="`basicPremium-${index}`" :key="`basicPremium${index}`" class="flex whitespace-no-wrap">
            <Input :value="item.basicPremium.toString()" @updateValue="e =>{ item.basicPremium = e}" class="md:mr-4 weight-input w-full sm:w-24" :disable="!item.edit"/>
          </div>
          <div :slot="`operate-${index}`" :key="`operate${index}`" class="flex whitespace-no-wrap">
            <Button class="w-full sm:w-24" @click.native="editSwitch(index)" :outline="!item.edit"><span v-if="!item.edit">編輯</span><span v-else>儲存</span></Button>
          </div>
        </template>
      </TableGroup>
      </div>
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
import Button from '@/components/Button'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { basicPremiumTable } from '@/utils/mockData'
import { mapState } from 'vuex'
export default {
  components: {
    FormTitle,
    CommonBoard,
    NavMenu,
    TableGroup,
    Input,
    Button,
    LoadingScreen
  },
  data() {
    return {
      basicPremiumList: basicPremiumTable(),
      openDialog: false,
      dialog: {
        title: '',
        okText: '',
        type: 0
      },
      currentTag: 1,
      itemLists:[
        { text: '處所', value: 1 },
        { text: '活動', value: 2 }
      ],
    }
  },
  computed: {
    ...mapState({
      'loading': state => state.app.loading,
    }),
    basicPremiumTable: {
      get() {
        return {...this.basicPremiumList,rows: this.basicPremiumList.rows.filter(i => i.placeAvtivityTypeID === this.currentTag)}
      },
      set(value) {
        this.basicPremiumList = value
      }
    },
    slotArray () {
      const arr = []
      const slotArr = [ 'basicPremium', 'operate']
      for (let i = 0; i < this.basicPremiumTable.rows.length; i++) {
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
    async editSwitch(index) {
      const value = !this.basicPremiumTable.rows[index].edit
      this.basicPremiumTable = Object.assign(this.basicPremiumTable, {
        ...this.basicPremiumTable.heads,
        rows: this.basicPremiumTable.rows.map((item, i) => {
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
        await this.$store.dispatch('parameterSetting/updateBasicPremiums', {
          id: this.basicPremiumTable.rows[index].id,
          basicPremium: Number(this.basicPremiumTable.rows[index].basicPremium),
        })
        await this.getBasicPremiums()
      }
    },
    async getBasicPremiums() {
      const res = await this.$store.dispatch('resource/basicPremiums')
      this.basicPremiumTable = {
        head:this.basicPremiumTable.head,
        rows: res.data.content.map(item => {
          return {
            ...item,
            edit: false
          }
        })
      }
    },
  },
  async mounted() {
    await this.getBasicPremiums()
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