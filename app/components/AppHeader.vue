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
		</nav>
	</header>
	
</template>

<style scoped>

	.AppHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		background-color: var(--grey-850);
		font-family: var(--main-font);
		max-width: 1200px;
		margin: 0 auto;
		
		&__brand {
			margin: 0;
		}

		&__items {
			display: flex;
			align-self: stretch;
			align-items: stretch;
			margin-right: 100px;
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
				background: var(--grey-700);
			}
		}
		&__main {
			display: flex;
			align-items: center;
			color: inherit;
			text-decoration: none;
			font-size: 1.1rem;
			padding: 20px 15px;
			margin-left: 150px;
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
