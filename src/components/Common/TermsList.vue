<template>
  <div class="flex flex-row column-3">
    <template v-for="item in termsLists">
      <div :key="item.additionTermName" class="flex flex-row items-center mb-2 ">
        <Checkbox
          class="my-1"
          :id="item.additionTermName"
          :checked="copyTerms[item.additionTermName]? copyTerms[item.additionTermName].selected : false"
          :value="copyTerms[item.additionTermName]? copyTerms[item.additionTermName].selected : false"
          :disabled="disable || item.disable"
          @updateValue="(e) =>updateTerms(item.additionTermName, e)"
        />
        <p class="ml-1 cursor-pointer" @click="setDialog(item,true)">{{item.additionTermId}} {{item.additionTermName}}</p>
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
    },
    disable: {
      type: Boolean,
      default: false
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
    async setDialog(item, hasHtml) {
      const Descriptions = await this.$store.dispatch('resource/AdditionTermDescriptions',{additionTermId: item.additionTermId})
      if(Descriptions.data.content.descriptions.length >0) {
        Popup.create({
          headerText: item.additionTermName,
          hasHtml,
          htmlText: Descriptions.data.content.descriptions.map(i => i.replace(' ','　')).join('<br>'),
        })
      }
      
    },
    updateTerms(additionTermName, e) {
      this.copyTerms[additionTermName].selected = e
       this.$emit('update:terms', this.copyTerms)
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>