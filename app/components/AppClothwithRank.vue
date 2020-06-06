<template>
	<div @click = "popup" class="clothwithrank">
		<div class="info">
			<div class="rank">{{clothId + 1}}</div>
			<!-- <div class="new" v-if="detail.is_new">new</div> -->
		</div>
		<AppCloth :cloth="detail"></AppCloth>
	</div>
</template>

<style scoped>
	div.clothwithrank{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div.info{
		height: 100%;
		margin-right: 10px;
		align-self: start;
	}

	div.rank{
		width: 56px;
		height: 56px;
		margin-bottom: 5px;
		background-color: var(--blue-400);
		text-align: center;
		color: white;
		line-height: 56px;
		font-family: 'Roboto';
		font-size: 41px;
		font-weight: 800;
	}
</style>

<script>
	import AppCloth from "@/components/AppCloth";
	export default {
		props: {
			clothId: {
				type: Number,
				default: 0
			},
			detail: {
				type: Object,
				default() {
					return {
						name: "Lorem",
						likes: 0,
						color: "Color",
						price: "0",
						type: "ClothesType",
						delivery_date: 0,
						gender: "남",
						size: ["S", "M", "L"],
						brand: "String",
						image: "String" // Filename
					}
				}
			}
		},
		components: {
			AppCloth
		},
		methods: {
			popup() {

			}
		}
	}
</script>
