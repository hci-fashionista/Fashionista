<template>
	<main class="Index">
		<ul>
			<li v-for="tag_name in tag_names" :key="tag_name">
				<Tag :name="tag_name"></Tag>
			</li>
		</ul>
		
	</main>
</template>

<style scoped>
</style>

<script>
	import Tag from "@/components/Tag"

	export default {
		data(){
			return {
				tag_names: ["skinny_leg", "small_face", "long_leg"]
			}
		},
		components: {
			Tag
		}
	}
</script>