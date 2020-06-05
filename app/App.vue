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
		--grey-300: #404040;
		--grey-600: #cccccc;
		--grey-700: #dddddd;
		--grey-750: #efefef;
		--grey-800: #f5f5f5;
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

	.FadeMove {
		&-enter-active, &-leave-active {
			transition: all .4s ease;
		}

		&-enter, &-leave-to {
			opacity: 0;
		}

		&-leave-active {
			position: absolute;
		}

		&-move {
			transition: all .4s ease;
		}
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
