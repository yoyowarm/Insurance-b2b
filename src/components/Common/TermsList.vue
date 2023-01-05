<template>
<div>
  <div class="flex flex-row column-3 gap-important">
    <template v-for="item in more && switchBtn && termsLists.length > 3 ? termsLists.slice(0,3) : termsLists">
      <div :key="item.additionTermName" class="flex flex-row items-center mb-2 ">
        <Checkbox
          class="my-1"
          :id="item.additionTermName"
          :checked="copyTerms[item.additionTermName]? copyTerms[item.additionTermName].selected : false"
          :value="copyTerms[item.additionTermName]? copyTerms[item.additionTermName].selected : false"
          :disabled="disable || item.disable"
          @updateValue="(e) =>updateTerms(item.additionTermName, e)"
        />
        <p class="ml-1 cursor-pointer" @click="setDialog(item,true)">{{item.additionTermName}}</p>
      </div>
    </template>
  </div>
  <div v-if="more && termsLists.length > 3 " class="flex flex-row justify-center items-center w-full mt-2">
      <span class="more" v-if="switchBtn" @click="switchBtn = !switchBtn" >更多<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-down']" /></span>
      <span class="more" v-if="switchBtn == false" @click="switchBtn = !switchBtn" >收起<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-up']" /></span>
  </div>
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
    },
    more: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      switchBtn: true,
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
        console.log(val)
        if(Object.keys(this.terms).filter(key => this.terms[key].selected).length > 3) {
          this.switchBtn = false
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
  },
  mounted() {
    if(Object.keys(this.terms).filter(key => this.terms[key].selected).length > 3) {
      this.switchBtn = false
    }
  }
}
</script>

<style scoped lang="scss">
  .more {
    width: 90px;
    height: 40px;
    margin: 0px auto;
    left: 0px;
    right: 0px;
    @apply text-main cursor-pointer bg-white z-10 text-center -bottom-13 flex justify-center items-center ;
  }
  .gap-important {
    grid-gap: 0.65rem!important;
    gap: 0.65rem!important
  }
</style>