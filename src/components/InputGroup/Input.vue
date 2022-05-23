<template>
  <div>
    <input type="text" class="placeholder:text-gray-400 text-xl rounded-full focus:outline-none w-full py-1.5 pl-3.5 pr-2" :class="{'pr-9': slotIcon}" :placeholder="placeholder" :value="value" @input="updateValue">
    <div v-if="slotIcon"><slot/></div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
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
    }
  },
  methods: {
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
      this.$emit('updateValue', e.target.value)
    }
  }
}
</script>

<style scoped lang="postcss">
  input {
    @apply border-0
  }
</style>