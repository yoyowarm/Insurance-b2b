<template>
	<div class="relative">
    <div v-if="title" class="title" :class="{'inline-flex w-full items-end justify-between': $slots.right}">
      <div class="flex">
        <slot name="icon"/>
        <span class="h-auto sm:h-8">{{title}}</span>
      </div>
      <slot name="right"/>
    </div>
    <div class="board shadow-main" :class="{'mt-0': $slots.icon,'selected': selected}"><slot/></div>
    <div v-if="hasCover" class="cover" @click="$emit('clickCover')">{{ coverText }}</div>
	</div>
</template>

<script>
export default {
	props: {
    title: {
      type:String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    hasCover: {
      type: Boolean,
      default: false
    },
    coverText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
	.title {
    @apply text-gray-800 font-bold;
    font-size: 22px;
  }
  .board {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
    @apply bg-white rounded-2xl p-6 my-3 
  }
  .selected {
    @apply border-main border-solid border-4;
  }
  .mt-0 {
    margin-top: 0!important;
  }
  .cover {
    color: #fff;
    font-weight: 500;
    font-size: 22px;
    width: 100%;
    height: calc(100% - 40px);
    position: absolute;
    z-index: 1;
    bottom:0px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(0.5px);
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.6);
    border: 4px solid #B3112C;
    text-shadow: 0.1em 0.1em 0.2em #333;
    padding: 8px;
    cursor: pointer;
    @apply rounded-2xl flex justify-center align-middle items-center;
    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
  @media screen and (max-width: 600px) {
    .title {
      font-size: 18px;
    }
    .cover {
      font-size: 16px;
    }
  }
</style>