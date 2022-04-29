<template>
  <div class="flex flex-row items-end text-gray-900">
     <div class="key tracking-wider ">{{keyName}}：</div> 
     <div class="text-red-600" :class="{'text-2xl': totalStyle}">{{value}}<span v-if="unit" class="ml-1 text-base text-gray-700" :class="unitClass">元</span></div>
  </div>
</template>

<script>
export default {
  props: {
    keyName: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    unit: {
      type: Boolean,
      default: false
    },
    unitClass: {
      type: String,
      default: ''
    },
    totalStyle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>