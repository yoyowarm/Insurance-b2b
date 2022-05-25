<template>
  <div class="flex flex-row column-3">
    <template v-for="item in termsLists">
      <div :key="item.TermName" class="flex flex-row items-center mb-2 ">
        <Checkbox
          class="my-1"
          :id="item.TermName"
          :checked="item.IsRequired ? item.IsRequired :(copyTerms[item.TermName]? copyTerms[item.TermName].selected : false)"
          :value="item.IsRequired ? item.IsRequired :(copyTerms[item.TermName]? copyTerms[item.TermName].selected : false)"
          @updateValue="(e) =>updateTerms(item.TermName, e)"
        />
        <p class="ml-1 cursor-pointer" @click="setDialog(item.TermName,true, item.TermContent)">{{item.TermName}}</p>
      </div>
    </template>
  </div>
</template>

<script>
import { Popup } from '@/utils/popups/index'
import Checkbox from '@/components/Checkbox'
export default {
  components: {
    Checkbox
  },
  props: {
    termsLists: {
      type: Array,
      default: () => ([])
    },
    Terms: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return {
      copyTerms: {
        ...this.Terms
      },
    }
  },
  watch: {
    Terms: {
      handler() {
        this.componentInit()
      }
    },
    termsLists: {
      handler() {
        this.componentInit()
      }
    }
  },
  methods: {
    setDialog(headerText, hasHtml, htmlText) {
      Popup.create({
        headerText,
        hasHtml,
        htmlText
      })
    },
    updateTerms(termName, e) {
      console.log('ddddddd', this.copyTerms)
      this.copyTerms[termName].selected = e
      this.$store.dispatch('place/updatedTerms', this.copyTerms)
    },
    componentInit() {
      if (Object.keys(this.Terms).length === 0) {
        const obj = {}
        this.termsLists.map(item => {
          if (!item.IsRequired) {
            obj[item.TermName] = {
              selected: false
            }
          }
        })
        this.$store.dispatch('place/updatedTerms', obj)
      }
    }
  },
  mounted() {
    this.componentInit()
  }
}
</script>

<style scoped lang="scss">
  
</style>