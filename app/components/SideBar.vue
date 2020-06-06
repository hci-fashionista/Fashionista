<template>
	<div class='sidenav'>
		<slot></slot>
	</div>
</template>

<style scoped>
	.sidenav {
		border-top: 1px solid var(--grey-600);
		border-bottom: 1px solid var(--grey-600);
		height: 100%;
		max-width: 300px;
		min-width: 220px;
		display: flex;
		z-index: 1;
		float: left;
		color: #111;
		background-color: var(--grey-850);
		flex-direction: column;
		overflow-y: scroll;

		& > a {
			text-align: center;
			font-size: 1.3rem;
			margin: 15px 0;
		}
		& > hr {
			height: 1px;
			border: 0;
			border-top: 1px solid var(--grey-600);
			display: block;
			margin: 3px 0;
			padding: 0;
		}
	}
</style>

<script>
	export default {

	}
</script>
