<template>
  <div class="w-full term mb-4">
    <template v-for="(item,index) in termsLists">
      <PL002 :key="item.additionTermId" v-if="item.additionTermId === 'PL002'" :data.sync="copyTermsLists[index]"/>
      <PL003 :key="item.additionTermId" v-if="item.additionTermId === 'PL003'" :data.sync="copyTermsLists[index]"/>
      <PL004 :key="item.additionTermId" v-if="item.additionTermId === 'PL004'" :data.sync="copyTermsLists[index]"/>
      <PL007 :key="item.additionTermId" v-if="item.additionTermId === 'PL007'" :data.sync="copyTermsLists[index]"/>
      <PL005 :key="item.additionTermId" v-if="item.additionTermId === 'PL005'" :data.sync="copyTermsLists[index]"/>
      <PL016 :key="item.additionTermId" v-if="item.additionTermId === 'PL016'" :data.sync="copyTermsLists[index]"/>
      <PL022 :key="item.additionTermId" v-if="item.additionTermId === 'PL022'" :data.sync="copyTermsLists[index]"/>
      <PL023 :key="item.additionTermId" v-if="item.additionTermId === 'PL023'" :data.sync="copyTermsLists[index]"/>
      <PL028 :key="item.additionTermId" v-if="item.additionTermId === 'PL028'" :data.sync="copyTermsLists[index]"/>
      <PL035 :key="item.additionTermId" v-if="item.additionTermId === 'PL035'" :data.sync="copyTermsLists[index]"/>
      <PL040 :key="item.additionTermId" v-if="item.additionTermId === 'PL040'" :data.sync="copyTermsLists[index]"/>
      <PL041 :key="item.additionTermId" v-if="item.additionTermId === 'PL041'" :data.sync="copyTermsLists[index]"/>
      <PL043 :key="item.additionTermId" v-if="item.additionTermId === 'PL043'" :data.sync="copyTermsLists[index]"/>
      <PL047 :key="item.additionTermId" v-if="item.additionTermId === 'PL047'" :data.sync="copyTermsLists[index]"/>
      <PL049 :key="item.additionTermId" v-if="item.additionTermId === 'PL049'" :data.sync="copyTermsLists[index]"/>
      <PL053 :key="item.additionTermId" v-if="item.additionTermId === 'PL053'" :data.sync="copyTermsLists[index]"/>
      <PL055 :key="item.additionTermId" v-if="item.additionTermId === 'PL055'" :data.sync="copyTermsLists[index]"/>
      <PL058 :key="item.additionTermId" v-if="item.additionTermId === 'PL058'" :data.sync="copyTermsLists[index]"/>
      <div v-if="!['PL002','PL003','PL004','PL007','PL005','PL016','PL022','PL023','PL028','PL035','PL040','PL041','PL043','PL047','PL049','PL053','PL055','PL058'].includes(item.additionTermId)" :key="item.additionTermId" class="my-4">
        <FormTitle :title="item.additionTermName" classList="text-lg text-gray-700">
          <font-awesome-icon class="text-lg text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
        </FormTitle>
      </div>
    </template>
  </div>
</template>

<script>
import PL002 from '@/components/TermsFieldFin/PL002'
import PL003 from '@/components/TermsFieldFin/PL003'
import PL004 from '@/components/TermsFieldFin/PL004'
import PL007 from '@/components/TermsFieldFin/PL007'
import PL005 from '@/components/TermsFieldFin/PL005'
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
import FormTitle from '@/components/FormTitle'
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
    PL058,
    FormTitle

  },
  data() {
    return {
      copyTerms: {},
      copyTermsLists:[],
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
      handler (val) {
        this.copyTermsLists = [...val]
      },
      deep: true
    }
  },
  mounted() {
    this.copyTerms = {
      ...this.terms
    }
    this.copyTermsLists = [...this.termsLists]
  },
}
</script>

<style scoped lang="postcss">
.h-full>>>.board {
  height: 100%;
}
</style>