<template>
	<div class='sidenav'>
		<slot></slot>
	</div>
</template>

<style scoped>
	.sidenav {
		border-bottom: 1px solid var(--grey-600);
		height: 100vh;
		max-width: 300px;
		min-width: 220px;
		display: flex;

		float: left;
		color: #111;
		background-color: var(--grey-850);
		flex-direction: column;
		overflow-y: hidden;

		& > a {
			text-align: center;
			font-size: 1.3rem;
			padding: 15px 0;
			&:hover{
				background: var(--grey-700);
				transition: all .2s ease

			}
		}
		& > hr {
			height: 1px;
			border: 0;
			border-top: 1px solid var(--grey-600);
			background-color: var(--grey-600);
			display: block;
			margin: 1px 0;
			padding: 0;
		}
	}
</style>

<script>
	export default {

	}
</script>
