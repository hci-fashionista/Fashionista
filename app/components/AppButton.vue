<template>
	<button @click="onClick" :class='color'>
		<slot></slot>
	</button>
</template>

<style scoped>
	button {
		cursor: pointer;
		color: var(--grey-100);
		background: var(--grey-700);
		font-family: 'Raleway', sans-serif;
		font-size: 1.2rem;
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		transition: all .4s ease;

		&:hover {
			background: #cccccc;
		}

		&:focus {
			outline: 0;
		}
	}

	button.primary {
		color: var(--grey-900);
		background: var(--blue-400);
		&:hover {
			background: var(--blue-500);
		}
	}
</style>

<script>
	export default {
		methods: {
			onClick() {
				this.$emit('click');
			}
		},
		props: {
			color: {
				type: String,
				default: 'default'
			}
		}
	};
</script>
