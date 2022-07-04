<template>
  <div class="flex flex-row column-3">
    <template v-for="item in termsLists">
      <div :key="item.TermName" class="flex flex-row items-center mb-2 ">
        <Checkbox
          class="my-1"
          :id="item.TermName"
          :checked="copyTerms[item.TermName]? copyTerms[item.TermName].selected : false"
          :value="copyTerms[item.TermName]? copyTerms[item.TermName].selected : false"
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
    terms: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return {
      copyTerms: {
        ...this.terms
      },
    }
  },
  watch: {
    terms: {
      handler (val) {
				this.copyTerms = {
					...val
				}
			},
			deep: true
    },
    termsLists: {
      handler() {
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
      this.copyTerms[termName].selected = e
       this.$emit('update:terms', this.copyTerms)
    },
    componentInit() {
      this.termsLists.map(item => {
        // eslint-disable-next-line no-prototype-builtins
        if(!this.terms.hasOwnProperty(item.TermName)) {
          this.copyTerms[item.TermName] = {
            selected: false
          }
        } else {
          this.copyTerms[item.TermName] = {
            selected: this.terms[item.TermName].selected
          }
        }
      })
      this.$emit('update:terms', this.copyTerms)
    }
  },
  mounted() {
    this.componentInit()
  }
}
</script>

<style scoped lang="scss">
  
</style>