<template>
	<main class="Index">
		<SideBar>
			<a>Best</a>
			<hr />
			<a>Men</a>
			<a>Women</a>
			<hr />
			<a>Top</a>
			<a>Outer</a>
			<a>Onepiece</a>
			<a>Pants</a>
			<a>Shirt</a>
			<a>Bag</a>
			<a>Sneakers</a>
			<a>Shoes</a>
			<a>Watch</a>
			<a>Headwear</a>
			<a>Jewelry</a>
		</SideBar>
	</main>
</template>

<style scoped>
	.Index {
		position: relative;
	}
</style>

<script>
	import SideBar from "@/components/SideBar";

	export default {
		components: {
			SideBar
		}
	}
</script>
