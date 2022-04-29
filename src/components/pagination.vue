<template>
  <div class="pagination">
    <div style="margin-top: 0.625rem">
      <span class="arrow" @click="changePage(currentPage -1)"><font-awesome-icon class="text-lg cursor-pointer" :icon="['fa', 'angle-left']" :class="{'disabled': currentPage === 1}"/></span>
      <span v-if="!pages.includes(1)" class="page" @click="changePage(1)">1</span>
      <span v-if="!pages.includes(1)" class="cursor-pointer" @click="changePage(currentPage-5)">...</span>
      <span v-for="(item, index) in pages" :key="index" class="page" :class="{'active': item == currentPage}" @click="changePage(item)">{{item}}</span>
      <span v-if="!pages.includes(totalPage)" class="cursor-pointer" @click="changePage(currentPage+5 > totalPage ? totalPage : currentPage+5)">...</span>
      <span v-if="!pages.includes(totalPage)" class="page" @click="changePage(totalPage)">{{totalPage}}</span>
      <span class="arrow" @click="changePage(currentPage +1)"><font-awesome-icon class="text-lg cursor-pointer" :icon="['fa', 'angle-right']" :class="{'disabled': currentPage === totalPage}" /></span>
    </div>
    <div class="flex flex-no-wrap ml-5">
      <InputGroup class="mr-1.5" noMt>
        <Input slot="input" placeholder="輸入頁碼" :value="page" ref="currentPage" @updateValue="(e) => changeCurrentPage(e)" class="copy-input"/>
      </InputGroup>
      <Button class="copy-button" @click.native="changePage()">前往</Button>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'
import Input from '@/components/InputGroup/Input.vue'
export default {
  components:{
    InputGroup,
    Button,
    Input
  },
  props: {
    totalPage: {
      type: Number,
      default: () => 1
    },
    currentPage: {
      type: Number,
      default: () => 1
    },
  },
  data () {
    return {
      page: '',
    }
  },
  computed: {
    pages() {
      const arrObj = {}
      let arr = []
      let arrIndex = 0
      for(let i = 1; i <= this.totalPage; i++) {
        if(!arrObj[Math.ceil(i/5)])arrObj[Math.ceil(i/5)] = []
        arrObj[Math.ceil(i/5)].push(i)
      }
      Object.keys(arrObj).map((arrKey,index)=> {
        arrObj[arrKey].map(item=>{
          if(item == this.currentPage) {
            arr = [...arrObj[arrKey]]
          }
        })
        if(arr.length < 5) {
          arrIndex = index+1
        }
      })
      if(arrIndex > 0) {
        arr = [...arrObj[arrIndex].slice(arrObj[arrIndex].length, 5),...arr]
      }
      return arr
    }
  },
   methods: {
    changePage(page) {
      if(page === this.currentPage || page < 1 || page > this.totalPage || (page === '' && this.page === '')) return
      if(!page) {
        this.$emit('changePage', Number(this.page))
      } else {
        this.$emit('changePage', Number(page))
      }
    },
    changeCurrentPage(page) {
      if(page > this.totalPage) {
        this.page = this.totalPage.toString()
        this.$refs.currentPage.$el.value = this.totalPage.toString()
      } else {
        this.page = page.toString()
      }
    }
   },
}
</script>

<style scoped lang="postcss">
  .pagination {
    @apply flex flex-no-wrap justify-end items-center mt-9 select-none;
  }
  .active {
    @apply text-red-500
  }
  .page {
    @apply px-3 text-lg cursor-pointer
  }
  .arrow {
    @apply h-full;
    svg {
      @apply text-lg
    }
  }
  .disabled {
    @apply opacity-50 cursor-not-allowed
  }
  .copy-input {
    width: 110px;
    @apply ml-2 mx-1 rounded-full relative flex items-center pl-3 
  }
  .copy-button {
    height: 50px;
    margin-top: 0.625rem
  }
</style>