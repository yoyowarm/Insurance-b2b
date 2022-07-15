<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup title="是否有使用明火(瓦斯槍、火把)、爆炸性物質(如：爆竹、煙火)或高溫物質(高溫加熱固體/液體/氣體)">
        <SwitchInput
          slot="input"
          id="ddd"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有揮發性溶劑或粉塵(造成人員吸入性中毒或窒息)">
        <SwitchInput
          slot="input"
          id="eefv"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="是否有機械式或充氣式遊樂設備">
        <SwitchInput
          slot="input"
          id="eefvd"
        />
      </InputGroup>
      <InputGroup title="是否使用高壓電設施(600V以上)">
        <SwitchInput
          slot="input"
          id="eefvd"
        />
      </InputGroup>
      <InputGroup title="是否有裸露電線或導體">
        <SwitchInput
          slot="input"
          id="dff"
        />
      </InputGroup>
      <InputGroup title="供電系統是否裝有自動斷電設備">
        <SwitchInput
          slot="input"
          id="dfdf"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch'
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
      if(type.includes('.')) {
        let arr = type.split('.')
        const obj = Object.assign({}, {[arr[1]]: e})
        const obj2 = {...this.data.part2[arr[0]], ...obj}
        const part2 = {...this.data.part2, [arr[0]]: obj2}
        this.$emit('update:data',{...this.data, part2})
      } else {
        this.$emit('update:data',{
          ...this.data,
          part2: {
            ...this.data.part2,
            [type]: e
          }
        })
      }
    },
    updateRadio(e,type,value) {
      if(e) {
        this.$emit('update:data',{
        ...this.data,
        part2: {
          ...this.data.part2,
          [type]: value
        }
      })
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>