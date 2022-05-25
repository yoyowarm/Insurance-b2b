<template>
  <div class="flex flex-row items-center">
    <input :id="id" type="checkbox" :value="value" :disabled="disabled" :checked="checked" @change="updateValue(value)">
    <label :for="id" class="flex flex-row ml-2"><span>{{text}}</span><slot/></label>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('updateValue', !e)
    }
  },
  
}
</script>

<style scoped lang="scss">
  input[type="checkbox"] {
    display: none;
    + label:before {
      content: "";
      display: inline-block;
      background: url('../../assets/images/input_checkbox_bg.png') no-repeat;
      background-size: 20px;
      width: 20px;
      height: 20px;
      border-radius: 2px;
      margin: auto 0;
      margin-right: 10px;
      vertical-align: middle;
      @apply bg-center
    }
    &:checked + label:before {
      background: url('../../assets/images/input_checkbox_bg_checked.png') no-repeat;
      background-size: 20px;
    }
    &[disabled] + label:before {
      background: url('../../assets/images/input_checkbox_bg_disabled.png') no-repeat;
      background-size: 20px;
    }
    &[disabled]:checked + label:before {
      background: url('../../assets/images/input_checkbox_bg_disabled_checked.png') no-repeat;
      background-size: 20px;
    }
  }
  
</style>