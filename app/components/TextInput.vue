<template>
	<div>
		<input type="text" v-model="typetext">
		{{typetext}}
	</div>
</template>

<style scoped>

</style>

<script>
	export default {
		data() {
			return {
				typetext: ""
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
