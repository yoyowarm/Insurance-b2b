<template>
  <div class="column-2 term">
    <CommonBoard class="w-full ">
      <PL002/>
      <PL003/>
      <PL004/>
      <PL005/>
      <PL007/>
      <PL016/>
      <PL022/>
      <PL023/>
      <PL028/>
      <PL035/>
      <PL040/>
      <PL041/>
      <PL043/>
      <PL047/>
      <PL049/>
      <PL053/>
      <PL055/>
      <PL058/>
    </CommonBoard>
    <CommonBoard class="w-full"></CommonBoard>
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
  props: {
    termsLists: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
</style>