<template>
	<div class="flex flex-row items-center">
		<slot name="left"/>
			<span :class="classList">{{title}}</span>
		<slot name="right"/>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		classList: {
			type: String,
			default: ''
		}
	}
}
</script>

<style scoped lang="scss">
	
</style>