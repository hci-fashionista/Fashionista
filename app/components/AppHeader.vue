<template>
	<header class="AppHeader">
		<router-link class="AppHeader__main" to="/">
			<h1 class="AppHeader__brand">
				Fashionista
			</h1>
		</router-link>
		

		<nav class="AppHeader__items">
			<router-link class="AppHeader__item" to="/cart">
				<IconCart /> Shopping Cart
			</router-link>

			<router-link class="AppHeader__item" to="/ranking">
				<IconTrophy /> Ranking
			</router-link>

			<router-link class="AppHeader__item" to="/mypage">
				<IconShirt /> My Coordinates
			</router-link>

			<div class="AppHeader__item">

			</div>
		</nav>
	</header>
</template>

<style scoped>
	.AppHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: 'Raleway', sans-serif;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 10px;

		&__brand {
			margin: 0;
		}

		&__items {
			display: flex;
			align-self: stretch;
			align-items: stretch;
		}

		&__item {
			display: flex;
			align-items: center;
			color: inherit;
			text-decoration: none;
			font-size: 1.1rem;
			padding: 20px 15px;
			transition: all .4s ease;

			svg {
				width: 1.7rem;
				height: 1.7rem;
				margin-right: 10px;
			}

			&:hover {
				background: var(--grey-850);
			}
		}
		&__main {
			display: flex;
			align-items: center;
			color: inherit;
			text-decoration: none;
			font-size: 1.1rem;
			padding: 20px 15px;
		}
	}
</style>

<script>
	import IconCart from "@/images/IconCart.svg?inline";
	import IconShirt from "@/images/IconShirt.svg?inline";
	import IconTrophy from "@/images/IconTrophy.svg?inline";

	export default {
		components: {
			IconCart,
			IconShirt,
			IconTrophy
		}
	};
</script>
