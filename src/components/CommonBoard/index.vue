<template>
	<div >
    <div v-if="title" class="title" :class="{'inline-flex w-full items-end justify-between': $slots.right}">
      <div class="flex">
        <slot name="icon"/>
        <span class="h-auto sm:h-8">{{title}}</span>
      </div>
      <slot name="right"/>
    </div>
    <div class="board shadow-main" :class="{'mt-0': $slots.icon,'selected': selected}"><slot/></div>
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
  }
}
</script>

<style scoped lang="postcss">
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
  @media screen and (max-width: 600px) {
    .title {
      font-size: 18px;
    }
  }
</style>