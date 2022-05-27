<template>
  <div class="column-2 term">
    <CommonBoard class="w-full h-full" v-for="item in termConditionsList" :key="item.TermName">
      <PL002 v-if="item.TermName === 't2停車場責任附加條款'"/>
      <PL003 v-if="item.TermName === 't3電梯意外責任附加條款'"/>
      <PL004 v-if="item.TermName === 't4游泳池責任附加條款'"/>
      <PL005 v-if="item.TermName === 't5廣告招牌附加條款A (含天災)'"/>
      <PL007 v-if="item.TermName === 't7各級學校暨幼兒園責任附加條款'"/>
      <PL016 v-if="item.TermName === 't16獨立承攬人責任附加條款'"/>
      <PL022 v-if="item.TermName === 't22裝卸搬運責任附加條款'"/>
      <PL023 v-if="item.TermName === 't23慰問金費用附加條款'"/>
      <PL028 v-if="item.TermName === 't28安養事業責任附加條款'"/>
      <PL035 v-if="item.TermName === 't35小型營繕工程附加條款'"/>
      <PL040 v-if="item.TermName === 't40受託物責任附加條款'"/>
      <PL041 v-if="item.TermName === 't41接駁運送責任附加條款'"/>
      <PL043 v-if="item.TermName === 't43保管箱責任附加條款'"/>
      <PL047 v-if="item.TermName === 't47放棄代位求償權附加條款'"/>
      <PL049 v-if="item.TermName === 't49承租人借用人責任附加條款(保額外加)'"/>
      <PL053 v-if="item.TermName === 't53傷害醫療及身故慰問金費用附加條款'"/>
      <PL055 v-if="item.TermName === 't55營業中斷損失責任附加條款'"/>
      <PL058 v-if="item.TermName === 't58液化石油氣及容器附加條款'"/>
    </CommonBoard>
  </div>
</template>

<script>
import CommonBoard from '@/components/CommonBoard'
import PL002 from '@/components/TermsField/PL002'
import PL003 from '@/components/TermsField/PL003'
import PL004 from '@/components/TermsField/PL004'
import PL005 from '@/components/TermsField/PL005'
import PL007 from '@/components/TermsField/PL007'
import PL016 from '@/components/TermsField/PL016'
import PL022 from '@/components/TermsField/PL022'
import PL023 from '@/components/TermsField/PL023'
import PL028 from '@/components/TermsField/PL028'
import PL035 from '@/components/TermsField/PL035'
import PL040 from '@/components/TermsField/PL040'
import PL041 from '@/components/TermsField/PL041'
import PL043 from '@/components/TermsField/PL043'
import PL047 from '@/components/TermsField/PL047'
import PL049 from '@/components/TermsField/PL049'
import PL053 from '@/components/TermsField/PL053'
import PL055 from '@/components/TermsField/PL055'
import PL058 from '@/components/TermsField/PL058'
export default {
  components: {
    CommonBoard,
    PL002,
    PL003,
    PL004,
    PL005,
    PL007,
    PL016,
    PL022,
    PL023,
    PL028,
    PL035,
    PL040,
    PL041,
    PL043,
    PL047,
    PL049,
    PL053,
    PL055,
    PL058

  },
  data() {
    return {
      copyTerms: {},
      termConditions: ['PL002','PL003','PL004','PL005','PL007','PL016','PL022','PL023','PL028','PL035','PL040','PL041','PL043','PL047','PL049','PL053','PL055','PL058'],
    }
  },
  props: {
    terms: {
      type: Object,
      default: () => {}
    },
    termsLists: {
      type: Array,
      default: () => ([])
    },
  },
  computed: {
    termConditionsList() {
      const arr = []
      Object.keys(this.copyTerms).map(key => {
        const target = this.termsLists.find(item => item.TermName === key)
        if (this.copyTerms[key].selected && target && this.termConditions.indexOf(target.TermID) !== -1) {
          arr.push(target)
        }
      })
      return arr
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
    }
  }
}
</script>

<style scoped lang="postcss">
.h-full>>>.board {
  height: 100%;
}
</style>