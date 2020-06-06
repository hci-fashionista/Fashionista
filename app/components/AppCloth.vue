<template>
	<div class="cloth">
		<div class="clothImage"><img :src="this.cloth.image" alt="cloth image"></div>
		<div class="clothName">{{this.cloth.name}}</div>
		<div class="description">
			<div class="price">{{priceWithWon}}</div>
			<div class="like"><AppLike :likes="likes"></AppLike></div>
		</div>

	</div>
</template>

<style scoped>
	div.cloth{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		max-width: 150px;
	}

	img {
		object-fit: contain;
		max-height : 120px;
	}

	div.clothName{
		font-family: 'Roboto';
		width: 100%;
		font-size: 13px;
		margin-left: 5px;
		text-align: center;
	}
	div.description{
		display: flex;
		width: 80%;
	}
	div.price {
		font-size: 12px;
		flex-grow: 1;
		margin-left: 5px;
	}
	div.like{
		margin-right: 5px;

		& >>> div {
			width: 25px;
		}

		& >>> span {
			font-size: 11px;
		}

		& >>> img {
			width : 10px;
			height : 10px;
		}
	}
</style>

<script>
	import AppLike from "@/components/AppLike";

	export default {
		data(){
			return {
				likes : 0
			}
		},
		computed: {
			priceWithWon(){
				return "￦" + this.cloth.price
			},
		},
		props: {
			cloth: {
				type: Object,
				default: () => {
					return {
						'name': 'NAME',
						'id': 'ID',
						'price': 0,
						'image': 'IMAGE'
					}
				}
			},
		},
		components: {
			AppLike
		}
	}
</script>
