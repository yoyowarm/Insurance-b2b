<template>
  <div class="input-group" :class="inputGroupClass">
      <div class="input-title mt" :class="{'justify-between': $slots.right, 'h0': noMt, 'wrap':wrap, 'h-auto': autoHeight}">
        <div class="text-gray-800 " :class="{'text-lg': lgTitle, 'whitespace-no-wrap': !whitespaceNormal}">{{title}}<slot name="title"/></div>
        <div class="slot" :class="{'whitespaceRight':whitespaceRight}" @click="() => {slotRight = !slotRight; $emit('slotRightPopup')}" v-if="$slots.right">
          <slot name="right"/>
        </div>
        <div v-if="slotRight && popupRight"  @click="() => {slotRight = !slotRight; $emit('slotRightPopup')}" class="popup">
          <slot name="right"/>
        </div>
      </div>
      <div class="input"
        :class="childClass" :style="{'background': bgColor}">
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
    lgTitle: {
      type: Boolean,
      default: false
    },
    noMt: {
      type: Boolean,
      default: false
    },
    autoHeight: {
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
    disableWhite: {
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
    mid: {
      type: Boolean,
      default: false
    },
    editModel: {
      type: Boolean,
      default: false
    },
    inputLeftClass: {
      type: String,
      default: ''
    },
    whitespaceNormal: {
      type: Boolean,
      default: false
    },
    popupRight: {
      type: Boolean,
      default: false
    },
    widthClass: {
      type: String,
      default: ''
    },
    whitespaceRight: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      slotRight: false
    }
  },
  computed: {
    inputGroupClass() {
      let className = ''
      if(this.$slots.suffix) {
        className += 'w70 '
      }
      if(this.widthClass) {
        className += `${this.widthClass} `
      }
      return className
    },
    childClass() {
      let childClass = ''
      if (this.dash) {
        childClass += 'dash '
      }
      if (this.disable) {
        childClass += ' disable '
      }
      if (this.disableWhite) {
        childClass += ' disable-white '
      }
      if (this.border0) {
        childClass += ' border0 '
      }
      if (this.borderBtn) {
        childClass += ' borderBtn '
      }
      if (this.editModel) {
        childClass += ' editModel '
      }
      if (this.min) {
        childClass += ' min '
      }
      if (this.mid) {
        childClass += ' mid '
      }
      if (this.inputLeftClass) {
        childClass += this.inputLeftClass
      }

      return childClass
    }
  }
}
</script>

<style scoped lang="scss">
  .input-group {
    @apply flex flex-col relative justify-end;
    .input {
      border: 1px solid #BFBFBF;
      // max-height: 50px;
      min-height: 50px;
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
      &.disable-white {
        @apply border-0 bg-white pointer-events-none
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
      &.mid {
        min-height: 45px;
        height: 45px;
      }
    }
  }
  .mt {
    height: auto;
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
    &.h-auto {
      @apply h-auto;
    }
  }
  
  @media screen and (max-width: 560px) {
    .input.dash::after {
      @apply hidden;
    }
  }
  @media screen and (max-width: 1130px) {
    .input-title {
      @apply whitespace-normal;
    }
  }
  @media (max-width: 1130px) {
  .input-title {
    width: 100%;
    .slot {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 320px;
      &.whitespaceRight {
        width:170px;
        @apply whitespace-normal overflow-visible absolute left-14 ;
      }
    }
  }
}
  .w70 {
    width: 70%;
  }
  .popup {
    @apply absolute top-0 left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg;
  }
  @media  screen and (min-width:  1130px) {
    .popup {
      @apply hidden;
    }
  }
</style>