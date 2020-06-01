<template>
	<div class="review">
		<span id="ID"><strong>
			{{id}}
		</strong></span>
		<span id="content">
			{{content}}
		</span>
	</div>
</template>

<style scoped>
	.review {
		background: var(--grey-750);
		border-radius: 18px;

		padding : 3px 12px;
	}

	#id, #content {
		font-family: Titillium Web;
		font-style: normal;
		font-weight: normal;
		font-size: 13.7647px;
		line-height: 21px;

	}
</style>

<script>
	export default {

		props: {
			id: {
				type: String,
				default: "None"
			},
			content : {
				type: String,
				default: "None"
			}
		}
	}
</script>
