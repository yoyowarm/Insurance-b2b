<template>
  <div class="column-2 term">
    <CommonBoard class="w-full h-full" v-for="item in termConditionsList" :key="item.additionTermName">
      <PL002 v-if="item.additionTermId === 'PL002'" :data.sync="additionTerms"/>
      <PL003 v-if="item.additionTermId === 'PL003'" :data.sync="additionTerms"/>
      <PL004 v-if="item.additionTermId === 'PL004'" :data.sync="additionTerms"/>
      <PL005 v-if="item.additionTermId === 'PL005'" :data.sync="additionTerms"/>
      <PL007 v-if="item.additionTermId === 'PL007'" :data.sync="additionTerms"/>
      <PL016 v-if="item.additionTermId === 'PL016'" :data.sync="additionTerms"/>
      <PL022 v-if="item.additionTermId === 'PL022'" :data.sync="additionTerms"/>
      <PL023 v-if="item.additionTermId === 'PL023'" :data.sync="additionTerms"/>
      <PL028 v-if="item.additionTermId === 'PL028'" :data.sync="additionTerms"/>
      <PL035 v-if="item.additionTermId === 'PL035'" :data.sync="additionTerms"/>
      <PL040 v-if="item.additionTermId === 'PL040'" :data.sync="additionTerms"/>
      <PL041 v-if="item.additionTermId === 'PL041'" :data.sync="additionTerms"/>
      <PL043 v-if="item.additionTermId === 'PL043'" :data.sync="additionTerms"/>
      <PL047 v-if="item.additionTermId === 'PL047'" :data.sync="additionTerms"/>
      <PL049 v-if="item.additionTermId === 'PL049'" :data.sync="additionTerms"/>
      <PL053 v-if="item.additionTermId === 'PL053'" :data.sync="additionTerms"/>
      <PL055 v-if="item.additionTermId === 'PL055'" :data.sync="additionTerms"/>
      <PL058 v-if="item.additionTermId === 'PL058'" :data.sync="additionTerms"/>
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
    type: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    additionTerms: {
      get() {
        return this.$store.state[this.type].additionTerms
      },
      set(val) {
        this.$store.dispatch(`${this.type}/updateAdditionTerms`, val)
      }
    },
    termConditionsList() {
      const arr = []
      Object.keys(this.copyTerms).map(key => {
        const target = this.termsLists.find(item => item.additionTermName === key)
        if (this.copyTerms[key].selected && target && this.termConditions.indexOf(target.additionTermId) !== -1) {
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