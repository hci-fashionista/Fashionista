<template>
	<button @click="onClick">
		<slot></slot>
	</button>
</template>

<style scoped>
	button {
		cursor: pointer;
		color: #ffffff;
		font-family: 'Raleway', sans-serif;
		background: #2196f3;
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		transition: all .4s ease;

		&:hover {
			background: #42a5f5;
		}
	}
</style>

<script>
	export default {
		methods: {
			onClick() {
				this.$emit('click');
			}
		}
	};
</script>
