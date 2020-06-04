<template>
	<button @click="onClick" :class='getClass()' :disabled='disabled'>
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

		&:disabled {
			cursor: not-allowed;
		}
	}

	button.primary {
		color: var(--grey-900);
		background: var(--blue-400);
		&:hover {
			background: var(--blue-500);
		}
	}

	button.full-width {
		width: 100%;
	}
</style>

<script>
	export default {
		methods: {
			onClick() {
				this.$emit('click');
			},
			getClass() {
				return {
					[this.color]: true,
					'full-width': this.fullWidth
				}
			}
		},
		props: {
			color: {
				type: String,
				default: 'default'
			},
			fullWidth: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
