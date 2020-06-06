<template>
	<div>
		<input type="text" v-model="typetext">
	</div>
</template>

<style scoped>
	input {
		border: none;
		background-color: var(--grey-800);
	}
</style>

<script>
	export default {
		data() {
			return {
				typetext: this.message
			};
		},

		model: {
			prop: "message",
			event: "textSubmit"
		},

		props: {
			message: {
				type: String,
				default : 'text'
			}
		},

		watch: {
			typetext () {
				this.$emit('textSubmit', this.typetext);
			}
		}
	};
</script>
