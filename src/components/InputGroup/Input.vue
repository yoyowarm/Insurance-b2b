<template>
  <div>
    <input
      type="text"
      class="placeholder:text-gray-400 text-xl rounded-full focus:outline-none w-full py-1.5 pl-3.5 pr-2"
      :class="{'pr-9': slotIcon, disable, 'pr-8': unit.length > 0}"
      :placeholder="placeholder"
      :value="numberFormat ? numFormat(value) : value"
      @input="updateValue"
      @blur="()=> $emit('blurInput')">
    <div v-if="slotIcon"><slot/></div>
    <div v-if="unit" class="absolute right-4 bottom-3">{{unit}}</div>
  </div>
</template>

<script>
import { numFormat } from '@/utils/regex'
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String,Number],
      default: ''
    },
    numberOnly: {
      type: Boolean,
      default: false
    },
    decimalPoint: {
      type: Boolean,
      default: false
    },
    slotIcon: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    isNumber: {
      type: Boolean,
      default: false
    },
    numberFormat: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    numFormat,
    updateValue (e) {
      if(this.numberOnly) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
        this.$emit('updateValue', e.target.value.replace(/[^0-9]/g, ''))
      }
      if(this.decimalPoint) {
        if(/^\d+.?\d{0,2}$/.test(e.target.value)) {
          this.$emit('updateValue', e.target.value)
        } else {
          e.target.value = e.target.value.slice(0, e.target.value.length -2)
          this.$emit('updateValue', e.target.value.slice(0, e.target.value.length -2))
        }
      }
      if(this.isNumber) {
        if(isNaN(e.target.value)) {
          e.target.value = e.target.value.replace(/[^0-9]/g, '')
          this.$emit('updateValue', e.target.value.replace(/[^0-9]/g, ''))
        } else {
          this.$emit('updateValue', e.target.value)
        }
      }
      this.$emit('updateValue', e.target.value)
    }
  }
}
</script>

<style scoped lang="postcss">
  input {
    @apply border-0
  }
  .disable {
    @apply cursor-not-allowed bg-gray-100 pointer-events-none;
  }
  /* input::placeholder {
    font: 18px;
} */

</style>