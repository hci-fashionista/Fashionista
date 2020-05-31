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
	:root{
		--grey-100: #000000;
		--grey-850: #f1f1f1;
		--grey-900: #ffffff;

		--blue-400: #2196f3;
		--blue-500: #42a5f5;
		--blue-800: #c1dffb;
	}

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
