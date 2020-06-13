<template>
	<div class="clothwithrank">
		<div class="info">
			<div class="rank">{{clothId + 1}}</div>
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
		height: 250px;
		align-self: start;
	}

	div.rank{
		width: 45px;
		height: 45px;
		margin-bottom: 5px;
		background-color: var(--blue-400);
		text-align: center;
		color: white;
		line-height: 45px;
		font-family: var(--main-font);
		font-size: 35px;
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
		}
	}
</script>
