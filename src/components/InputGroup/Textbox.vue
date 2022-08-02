<template>
	<textarea class="textbox" name="textbox" rows="2" placeholder="輸入文字內容" :value="value" @input="(e)=> updateValue(e)" required/>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	methods: {
		updateValue(e) {
			this.$emit('update:value', e.target.value)
		}
	}
}
</script>

<style scoped lang="scss">
	.textbox {
		border: 1px solid #BFBFBF;
		border-radius: 10px;
		@apply w-full p-3
	}
</style>