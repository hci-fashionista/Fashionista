<template>
	<div>
		{{nameWithHash}}
	</div>
</template>

<style scoped>
	div{
		font-family: 'Raleway';
		width: 140px;
		height: 25px;
		background-color: var(--blue-800);
		border-radius: 50px;
		font-size: medium;
		text-align: center;
		line-height: 25px;
	}
</style>

<script>
	export default {
		computed: {
			nameWithHash(){
				return "#" + this.name
			}
		},

		props: {
			name: {
				type: String,
				default: "None"
			}
		}
	}
</script>
