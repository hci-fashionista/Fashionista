<template>
	<main class="Index">
		<ul>
			<li v-for="tag_name in tag_names" :key="tag_name">
				<AppTag :name="tag_name"></AppTag>
			</li>
		</ul>

		<AppButton>
			asdf
		</AppButton>
	</main>
</template>

<style scoped>
</style>

<script>
	import AppButton from "@/components/AppButton";
	import AppTag from "@/components/AppTag";

	export default {
		data(){
			return {
				tag_names: ["skinny_leg", "small_face", "long_leg"]
			}
		},
		components: {
			AppButton,
			AppTag
		}
	}
</script>
