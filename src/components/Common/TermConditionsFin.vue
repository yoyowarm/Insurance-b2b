<template>
  <div class="w-full term mb-4">
    <template v-for="item in termConditionsList">
      <PL002 :key="item.TermName" v-if="item.TermName === 't2停車場責任附加條款'"/>
      <PL003 :key="item.TermName" v-if="item.TermName === 't3電梯意外責任附加條款'"/>
      <PL004 :key="item.TermName" v-if="item.TermName === 't4游泳池責任附加條款'"/>
      <PL005 :key="item.TermName" v-if="item.TermName === 't5廣告招牌附加條款A (含天災)'"/>
      <PL007 :key="item.TermName" v-if="item.TermName === 't7各級學校暨幼兒園責任附加條款'"/>
      <PL016 :key="item.TermName" v-if="item.TermName === 't16獨立承攬人責任附加條款'"/>
      <PL022 :key="item.TermName" v-if="item.TermName === 't22裝卸搬運責任附加條款'"/>
      <PL023 :key="item.TermName" v-if="item.TermName === 't23慰問金費用附加條款'"/>
      <PL028 :key="item.TermName" v-if="item.TermName === 't28安養事業責任附加條款'"/>
      <PL035 :key="item.TermName" v-if="item.TermName === 't35小型營繕工程附加條款'"/>
      <PL040 :key="item.TermName" v-if="item.TermName === 't40受託物責任附加條款'"/>
      <PL041 :key="item.TermName" v-if="item.TermName === 't41接駁運送責任附加條款'"/>
      <PL043 :key="item.TermName" v-if="item.TermName === 't43保管箱責任附加條款'"/>
      <PL047 :key="item.TermName" v-if="item.TermName === 't47放棄代位求償權附加條款'"/>
      <PL049 :key="item.TermName" v-if="item.TermName === 't49承租人借用人責任附加條款(保額外加)'"/>
      <PL053 :key="item.TermName" v-if="item.TermName === 't53傷害醫療及身故慰問金費用附加條款'"/>
      <PL055 :key="item.TermName" v-if="item.TermName === 't55營業中斷損失責任附加條款'"/>
      <PL058 :key="item.TermName" v-if="item.TermName === 't58液化石油氣及容器附加條款'"/>
    </template>
  </div>
</template>

<script>
import PL002 from '@/components/TermsFieldFin/PL002'
import PL003 from '@/components/TermsFieldFin/PL003'
import PL004 from '@/components/TermsFieldFin/PL004'
import PL005 from '@/components/TermsFieldFin/PL005'
import PL007 from '@/components/TermsFieldFin/PL007'
import PL016 from '@/components/TermsFieldFin/PL016'
import PL022 from '@/components/TermsFieldFin/PL022'
import PL023 from '@/components/TermsFieldFin/PL023'
import PL028 from '@/components/TermsFieldFin/PL028'
import PL035 from '@/components/TermsFieldFin/PL035'
import PL040 from '@/components/TermsFieldFin/PL040'
import PL041 from '@/components/TermsFieldFin/PL041'
import PL043 from '@/components/TermsFieldFin/PL043'
import PL047 from '@/components/TermsFieldFin/PL047'
import PL049 from '@/components/TermsFieldFin/PL049'
import PL053 from '@/components/TermsFieldFin/PL053'
import PL055 from '@/components/TermsFieldFin/PL055'
import PL058 from '@/components/TermsFieldFin/PL058'
export default {
  components: {
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
  },
  mounted() {
    this.copyTerms = {
      ...this.terms
    }
  },
}
</script>

<style scoped lang="postcss">
.h-full>>>.board {
  height: 100%;
}
</style>