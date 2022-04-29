<template>
<div class="w-full">
  <label class="switch">
    <input type="checkbox" :id="id" :value="value" @change="$emit('updateValue', !value)" :checked="value" :disabled="disabled">
    <label class="slider" :for="id" :data-checkedText="checkedText" :data-uncheckedText="uncheckedText"/>
</label>
</div>
</template>

<script>
export default {
  props: {
    checkedText: {
      type: String,
      default: '是'
    },
    uncheckedText: {
      type: String,
      default: '否'
    },
    value: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
 .switch {
  position: relative;
  display: block;
  width: calc( 100% - 6px );
  height: 42px;
  margin: 3px;
  @apply rounded-full;
  input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: .4s;
    transition: .4s;
    @apply rounded-full bg-main;
    &:before {
      position: absolute;
      content: attr(data-uncheckedText);
      height: 42px;
      width: 50%;
      left: -1px;
      bottom: 0px;
      color: #fff;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 40px 0px 0px 40px;
      @apply flex items-center justify-center text-xl
    }
    &:after {
      position: absolute;
      content: attr(data-checkedText);
      height: 42px;
      width: 50%;
      right: -1px;
      bottom: 0px;
      color: #A4A4A4;
      background-color: #FAFAFA;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 0px 40px 40px 0px;
      @apply flex items-center justify-center text-xl
    }
  }
}

input:checked + .slider {
  background-color: #FAFAFA;
  &:before {
    color: #A4A4A4;
  }
  &:after {
    color: #fff;
    @apply bg-main
    
  }
}


</style>