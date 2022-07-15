<template>
  <div class="flex flex-row column-3">
    <template v-for="item in termsLists">
      <div :key="item.additionTermName" class="flex flex-row items-center mb-2 ">
        <Checkbox
          class="my-1"
          :id="item.additionTermName"
          :checked="copyTerms[item.additionTermName]? copyTerms[item.additionTermName].selected : false"
          :value="copyTerms[item.additionTermName]? copyTerms[item.additionTermName].selected : false"
          @updateValue="(e) =>updateTerms(item.additionTermName, e)"
        />
        <p class="ml-1 cursor-pointer" @click="setDialog(item.additionTermName,true, item.additionTermName)">{{item.additionTermName}}</p>
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
    updateTerms(additionTermName, e) {
      this.copyTerms[additionTermName].selected = e
       this.$emit('update:terms', this.copyTerms)
    },
    componentInit() {
      this.termsLists.map(item => {
        // eslint-disable-next-line no-prototype-builtins
        if(!this.terms.hasOwnProperty(item.additionTermName)) {
          this.copyTerms[item.additionTermName] = {
            selected: false
          }
        } else {
          this.copyTerms[item.additionTermName] = {
            selected: this.terms[item.additionTermName].selected
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