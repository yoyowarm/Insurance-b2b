<template>
  <div class="radio">
    <input
      type="checkbox"
      :id="id"
      :value="value"
      :checked="value"
      @change="$emit('updateValue', !value)"
      :disabled="disabled"
    >
    <label :for="id">
      <span class="icon" :class="{disabled}"/>
      <span class="ml-1">{{text}}</span>
      <slot/>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
  },
  methods: {
    checkItem(item) {
      console.log(!item.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
  input[type="checkbox"] {
    display:none;
    + label {
      @apply text-lg flex items-center;
      span {
        @apply cursor-pointer
      }
      .icon {
        width: 18px;
        height: 18px;
        min-width: 18px;
        min-height: 18px;
        background: url('../../assets/images/radio_button.png') no-repeat;
        background-size: 18px;
        margin: auto 0;
        @apply inline-block align-middle bg-no-repeat;
        &.disabled {
          background: url('../../assets/images/radio_disable.png') no-repeat;
          background-size: 19px;
          min-width: 19px;
          min-height: 19px;
        }
      }
    }
    &:checked + label {
      .icon {
        background: url('../../assets/images/radio_dot.png') no-repeat;
        &.disabled {
          background: url('../../assets/images/radio_checked_disable.png') no-repeat;
          background-size: 19px;
          min-width: 19px;
          min-height: 19px;
        }
      }
    }
  }
  .radio {
    @apply flex items-center
  }

</style>