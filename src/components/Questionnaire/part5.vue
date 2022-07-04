<template>
  <div class="w-full my-4">
    <div class="column-4">
      <InputGroup title="使用道路者，對附近交通之衝擊是否經交通主管機關認許">
        <SwitchInput
          slot="input"
          id="value1"
          :value="data.part5.value1"
          @updateValue="(e) =>updateValue(e,'value1')"
        />
      </InputGroup>
    </div>
    <div class="column-4 mt-4">
      <InputGroup title="未使用道路者，對附近交通之衝擊、停車事宜、行人及活動結束後之散場動線是否經交通主管機關認許">
        <SwitchInput
          slot="input"
          id="value2"
          :value="data.part5.value2"
          @updateValue="(e) =>updateValue(e,'value2')"
        />
      </InputGroup>
    </div>
    <div class="column-4 mt-4 dashed-border">
      <InputGroup title="保險處所與車道有無有效區隔(含車道與人員動線安排)">
        <SwitchInput
          slot="input"
          id="value3"
          :value="data.part5.value3"
          @updateValue="(e) =>updateValue(e,'value3')"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch/index.vue'
export default {
  components: {
    InputGroup,
    SwitchInput
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part5: {
          ...this.data.part5,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>