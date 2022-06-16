<template>
  <div class="input-group" :class="{'w70': $slots.suffix}">
      <div class="input-title mt" :class="{'justify-between': $slots.right, 'h0': noMt, 'wrap':wrap}">
        <div class="text-gray-800">{{title}}<slot name="title"/></div>
        <div class="slot" v-if="$slots.right">
          <slot name="right"/>
        </div>
      </div>
      <div class="input" :class="{'dash': dash, 'disable': disable, 'border0':border0, 'borderBtn': borderBtn, 'editModel':editModel, 'min': min, 'ml-10': $slots['input-left']}" :style="{'background': bgColor}">
        <slot name="input-left"/>
        <slot name="input"/>
        <slot name="input-right"/>
      </div>
      <div v-if="error" class="flex flex-row items-center mt-1.5">
        <font-awesome-icon class="mr-1 text-main " icon="exclamation-circle" />
        <span class="text-main text-base">{{errorText}}</span>
      </div>
      <slot name="suffix"/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    noMt: {
      type: Boolean,
      default: false
    },
    dash: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    border0: {
      type: Boolean,
      default: false
    },
    borderBtn: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: '必填欄位'
    },
    bgColor: {
      type: String,
      default: ''
    },
    min: {
      type: Boolean,
      default: false
    },
    editModel: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .input-group {
    @apply flex flex-col relative;
    .input {
      border: 1px solid #BFBFBF;
      max-height: 50px;
      height: 50px;
      @apply w-full rounded-full relative flex items-center;
      &.dash::after {
        content: '-';
        color: #757575;
        right: -1.25rem;
        @apply absolute inset-y-0 top-1 my-auto text-3xl font-medium;
      }
      &.disable {
        @apply border-0 bg-gray-100 pointer-events-none
      }
      &.border0 {
        @apply border-0
      }
      &.borderBtn {
        @apply border-0 border-b-2 border-solid border-gray-200 rounded-none
      }
      &.editModel {
        @apply border-main
      }
      &.min {
        height: 20px;
      }
    }
  }
  .mt {
    @apply h-5;
    &.h0 {
      @apply h-0;
    } 
  }
  .input-title {
    @apply flex w-full mb-2.5 text-sm whitespace-no-wrap;
    &.wrap {
      @apply items-end;
      > div {
        @apply whitespace-normal ;
      }
    }
  }
  
  @media screen and (max-width: 560px) {
    .input.dash::after {
      @apply hidden;
    }
  }
  @media (max-width: 1126px) {
  .input-title {
    width: 100%;
    .slot {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 320px;
    }
  }
}
  .w70 {
    width: 70%;
  }
</style>