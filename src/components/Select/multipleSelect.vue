<template>
<div :class="{'search':search}" class="w-full my-1.5 ml-2 mr-2" ref="select">
  <div v-if="search" class="custom-select" @click="()=> {open = !open}" ref="custom-select">
    <span v-if="selected.length > 0" class="truncate">{{selected}}</span>
    <span v-else class="truncate">{{defaultText}}</span>
    <font-awesome-icon class="text-sm" :icon="['fa', 'angle-down']" />
  </div>
  <div class="custom-options" v-if="open" ref="custom-options">
    <div  class="searchInput" ref="custom-input" :style="{'width':offsetWidth + 'px'}">
      <div class="text-gray-200 mb-3" v-if="selectedArrText.length > 0">
        {{selectedArrText.reduce((a,b) => a + b[textName] + ', ', '').slice(0,-2)}}
      </div>
      <input type="text" class="focus:outline-none placeholder-gray-400" placeholder="搜尋..." v-model="searchText">
    </div>
    <div class="virtual-scroller" @scroll="onScroll" :style="{height: 600 + 'px', 'width':offsetWidth + 'px'}">
      <div class="phantom" :style="{height: (this.filterOptions.length + 1) * itemHeight + 'px'}">
        <ul :style="{'margin-top': `${scrollTop}px`}">
          <li v-for="(item,index) in filterOptions" :key="`${item[textName]}${index}`">
            <Checkbox
              :id="`${item[textName]}${index}`"
              :text="item[textName]"
              :checked="selectedArrText.filter(i => i[textName] == item[textName]).length > 0"
              :value="selectedArrText.filter(i => i[textName] == item[textName]).length > 0"
              @updateValue="e => {updateValue(e, item)}"
            />
          </li>
          <li v-if="this.searchText.toString().trim().length > 0 && filterOptions.length === 0 && !query">沒有與搜尋相符的選項!</li>
          <li v-else-if="query && filterOptions.length === 0">搜尋中!</li>
          <li v-if="isBottom">
            <div class="loader loader--style2" title="1">
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
              <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  
  <select
    v-if="!search"
    class="text-gray-800 bg-white text-xl focus:outline-none w-full"
    :class="{'appearance-none':hiddenArrow, 'editModel': editModel, disable, 'disable-white': disableWhite}"
    @change="(item) =>choiceItem({Value:item.target.value, Text: item.target.selectedOptions[0].dataset.text})">
    <option>{{ defaultText }}</option>
    <option v-for="(item, index) in options" :key="index" :value="item[valueName]" :data-text="item[textName]" :selected="item[valueName] == selected">{{item[textName]}}</option>
  </select>
</div>
  
</template>

<script>
import Checkbox from '@/components/Checkbox'
import { mapState } from 'vuex'
export default {
  props: {
    defaultText: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    },
    hiddenArrow: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    disableWhite: {
      type: Boolean,
      default: false
    },
    selected: {
      type: [Number, String, Boolean],
      default: ''
    },
    selectedArr: {
      type: Array,
      default: () => []
    },
    valueName: {
      type: String,
      default: 'Value'
    },
    textName: {
      type: String,
      default: 'Text'
    },
    page: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    },
    query: {
      type: Boolean,
      default: false
    },
    outsideStatus: {
      type: Boolean,
      default: false
    },
  },
  components: {
    Checkbox
  },
  data () {
    return {
      open: false,
      searchText: '',
      visibleCount: 10,
      itemHeight: 46,
      startIndex: 0,
      endIndex: 10,
      scrollTop: 0,
      isBottom: false,
      offsetWidth: 0,
    }
  },
  computed: {
    ...mapState({
      editModel: state => state.common.editModel
    }),
    filterOptions() {
      let arr = JSON.parse(JSON.stringify(this.options))
      return arr.filter(item => this.selectedArrText.some(i => i[this.valueName] == item[this.valueName])).concat(arr.filter(item => !this.selectedArrText.some(i => i[this.valueName] == item[this.valueName]))).filter(item => item.Text.includes(this.searchText))
    },
    visibleList() {
      return this.filterOptions.slice(this.startIndex, this.endIndex)
    },
    selectedArrText() {
      return this.selectedArr.map(i => {
        return {
          ...i,
          Text: `(${i.employeeId})${i.employeeName}`
        }
      })
    }

  },
  watch: {
    filterOptions() {
      this.startIndex = 0
      this.endIndex = this.visibleCount
      this.scrollTop = 0
    },
    scrollTop() {
      const isBottom = (((this.filterOptions.length + 1) * this.itemHeight) - this.scrollTop) === 600
      if(this.totalPage > this.page && isBottom) {
        this.isBottom = isBottom
        this.$emit('nextPage')
      }
    },
    searchText(val) {
      if(this.query) {
        setTimeout(() => {
          this.$emit('queryText', val)
        }, 100)
      }
    },
    outsideStatus (val) {
      if(!val) {
        this.open = false
      }
    },
    open() {
      if(this.$refs['select']) {
        this.offsetWidth = this.$refs['select'].offsetWidth
      }
    }
  },
  methods: {
    choiceItem(item) {
      this.open = false
      this.$emit('update:defaultText', item.Text)
      this.$emit('emitItem', item)
      this.searchText = ''
      this.startIndex = 0
      this.endIndex = 10
      this.scrollTop = 0
    },
    switchOptions(e) {
      if (e.path[0].className == 'body') this.open = false
      if (!this.search) return
      const parentElement = e.target.parentElement
      if (parentElement === this.$refs['custom-input']) return
      if (parentElement !== this.$refs['select'] &&
          parentElement !== this.$refs['custom-select'] &&
          parentElement !== this.$refs['custom-options']) {
          // this.open = false
          // this.searchText = ''
          this.startIndex = 0
          this.endIndex = 10
          this.scrollTop = 0
        }
    },
    onScroll(e) {
      const scrollTop = e.target.scrollTop
      this.scrollTop = scrollTop
      this.startIndex = (this.filterOptions.length >= 20)? Math.floor(scrollTop / this.itemHeight) : 0
      this.endIndex = (this.filterOptions.length >= 10) ? this.startIndex + 10: 10
    },
    updateValue(value, item) {
      const arr = JSON.parse(JSON.stringify(this.selectedArrText))
      if(value) {
        arr.push({...item,Text: `(${item.Value})${item.employeeName}`, employeeId: item.Value})
      } else {
        arr.splice(arr.findIndex(i => i[this.valueName] == item[this.valueName]), 1)
      }
      this.$emit('update:selectedArr', arr)
      console.log(arr)
    },
  },
  mounted() {
    window.addEventListener('click', (e) => this.switchOptions(e))
  },
  destroyed() {
    window.removeEventListener('click', (e) => this.switchOptions(e))
  }
  }
</script>

<style scoped lang="scss">
  .search {
    @apply relative
    select {
      @apply hidden
    }
    .custom-select {
      @apply cursor-pointer text-gray-800 text-xl px-1 flex flex-row justify-between items-center
    }
    .custom-options {
      &::-webkit-scrollbar {
        width: 0;
      }
      @apply fixed z-10 mt-1 
    }
    ul {
      height: 400px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
    li {
      @apply bg-gray-500 text-gray-100 text-base p-3 cursor-pointer;
      &:hover {
        @apply bg-gray-700
      }
    }
    .searchInput {
      @apply mt-1.5 w-full pl-3 py-2 bg-gray-500;
      input {
        @apply bg-gray-500 text-gray-100 text-base w-full
      }
    }
  }
  .virtual-scroller {
    overflow: auto
  }
  .phantom {
    overflow: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .editModel {
    @apply text-main
  }
  .disable {
    @apply border-0 bg-gray-100 pointer-events-none
  }
  .disable-white {
    @apply border-0 bg-white pointer-events-none appearance-none
  }
  svg path,
  svg rect{
    fill: #fff;
  }
</style>