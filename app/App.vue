<template>
	<div class="App">
		<AppHeader />
		<transition name="Fade" mode="out-in">
			<router-view class="App__view" />
		</transition>
	</div>
</template>

<style scoped>
	.App {

	}
</style>

<style>
	html, body {
		margin: 0;
		padding: 0;
	}
</style>

<script>
	import AppHeader from "@/components/AppHeader";

	export default {
		components: {
			AppHeader
		}
	};
</script>
