<template>
	<div >
    <div v-if="title" class="title" :class="{'inline-flex w-full items-end justify-between': $slots.right}">
      <div class="flex">
        <slot name="icon"/>
        <span class="h-8">{{title}}</span>
      </div>
      <slot name="right"/>
    </div>
    <div class="board shadow-main" :class="{'mt-0': $slots.icon}"><slot/></div>
	</div>
</template>

<script>
export default {
	props: {
    title: {
      type:String,
      default: ''
    }
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
  .mt-0 {
    margin-top: 0!important;
  }
</style>