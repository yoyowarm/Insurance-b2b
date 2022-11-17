<template>
  <div>
    <input
      type="text"
      class="placeholder:text-gray-400 text-xl rounded-full focus:outline-none w-full py-1.5 pl-3.5 pr-2"
      :class="{'pr-9': slotIcon, disable,'disable-white': disableWhite, 'pr-8': unit.length > 0}"
      :placeholder="placeholder"
      :maxLength="inputMaxLength"
      v-model="syncValue"
      ref="input"
      @blur="()=>{ $emit('blurInput');valueFormat()}">
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
    disableWhite: {
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
    },
    maxLength: {
      type: Number,
      default: 10000
    }
  },
  computed: {
    syncValue: {
      get() {
        return this.numberFormat ? this.numFormat(this.value) : this.value
      },
      set (value) {
        this.updateValue(value)
      }
    },
    inputMaxLength() {
      const commaLength = this.syncValue && this.syncValue.toString().match(/,/g) ? this.syncValue.toString().match(/,/g).length : 0
      const pointLength = this.syncValue && this.syncValue.toString().match(/\./g) ? this.syncValue.toString().match(/\./g).length + 2 : 0
      return this.numberFormat ?
        this.maxLength + commaLength + pointLength :
        this.maxLength
    }
  },
  methods: {
    numFormat,
    valueFormat() {
      if(this.numberOnly && Boolean(Number(this.syncValue)) == false && !this.numberFormat) {
        this.$emit('updateValue', '')
        this.$refs.input.value = ''
      } else if(this.numberOnly && this.value.match(/[0-9]/g) &&  Boolean(Number(this.syncValue.match(/[0-9]/g).join(''))) == false && this.numberFormat) {
        this.$emit('updateValue', '')
        this.$refs.input.value = ''
      }
    },
    updateValue (value) {
      let inputValue = value
      if(this.numberOnly && !this.decimalPoint && !this.decimalPoint3) {
        if(Boolean(Number(inputValue.toString().replace(/,/g, ''))) == false) {
          this.$emit('updateValue', '')
          this.$refs.input.value = ''
          return
        } 
        const regex = new RegExp(/^0{0,}/, 'g');
        inputValue = inputValue ? inputValue.replace(regex, '') : ''
        this.$nextTick(() => {
          this.$refs.input.value = inputValue
        })
      }
      if (this.negative) {
        const regex = new RegExp(/^-+[0-9]{1,}/, 'g');
        const regex1 = new RegExp(/[^0-9]/, 'g');
        if(value === '-') {
          inputValue = value
        } else if(regex.test(value)) {
          inputValue = value
        } else if (regex1.test(value)) {
          inputValue = value.replace(regex1, '')
        }
      }
      if(this.decimalPoint) {
        const regex = new RegExp(/^[0-9]+.?[0-9]{0,2}$/, 'g');
        const regex2 = new RegExp(/^0+[0-9]{1,}/, 'g');
        const regex3 = new RegExp(/[0-9]{0,}/, 'g')
          
        if(regex2.test(value)) {
          inputValue = value.replace(regex2, '')
        }
        if(!regex3.test(value)) {
          inputValue = value.replace(regex3, '')
        }
        if(regex.test(inputValue)) {
          inputValue = value
        } else {
          inputValue = value.slice(0, value.length -2)
        }
      }
      if(this.decimalPoint3) {
        const regex = new RegExp(/^[0-9]+.?[0-9]{0,3}$/, 'g');
        const regex2 = new RegExp(/^0+[0-9]{1,}/, 'g');
          
        if(regex2.test(value)) {
          inputValue = value.replace(regex2, '')
        }
        if(regex.test(inputValue)) {
          inputValue = value
        } else {
          inputValue = value.slice(0, value.length -3)
        }
      }
      this.$emit('updateValue', inputValue)
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
  .disable-white {
    @apply cursor-not-allowed bg-white pointer-events-none;
  }
  /* input::placeholder {
    font: 18px;
} */

</style>