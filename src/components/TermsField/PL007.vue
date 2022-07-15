<template>
	<div>
		<FormTitle title="各級學校暨幼兒園責任附加條款" classList="text-xl text-gray-700">
      <font-awesome-icon class="text-xl text-gray-700 mr-1" :icon="['far', 'clipboard']" slot="left"/>
    </FormTitle>	
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="學員">
        <Input
          slot="input"
          placeholder="請輸入人數"
          :value="data.PL007.value1.toString()"
          @updateValue="(e) =>updateValue(e,'value1')"
          numberOnly
        />
        <span class="absolute -right-8 bottom-3" slot="suffix">位</span>
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup class="col-span-2" title="幼兒">
        <Input
          slot="input"
          placeholder="請輸入人數"
          :value="data.PL007.value2.toString()"
          @updateValue="(e) =>updateValue(e,'value2')"
          numberOnly
        />
        <span class="absolute -right-8 bottom-3" slot="suffix">位</span>
      </InputGroup>
    </div>
	</div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import FormTitle from '@/components/FormTitle'
import Input from '@/components/InputGroup/Input.vue'
export default {
	components: {
    InputGroup,
    FormTitle,
    Input
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        PL007: {
          ...this.data.PL007,
          [type]: e
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
	
</style>