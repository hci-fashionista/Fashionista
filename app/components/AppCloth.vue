<template>
	<div class="cloth">
		<div class="clothImage"><img :src="Tshirts" alt="cloth image" width="228" height="240"></div>
		<div class="clothName">{{this.name}}</div>
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
	}
	div.clothName{
		font-family: 'Roboto';
		width: 100%;
		font-size: 24px;
		margin-left: 5px;
	}
	div.description{
		display: flex;
		width: 100%;
	}
	div.price {
		font-size: 18px;
		flex-grow: 1;
		margin-left: 5px;
	}
	div.like{
		margin-right: 5px;
	}
</style>

<script>
	import AppLike from "@/components/AppLike";
	import Tshirts from '@/images/Tshirts.png';

	export default {
		data(){
			return {
				Tshirts
			}
		},
		computed: {
			priceWithWon(){
				return "￦" + this.price
			}
		},
		props: {
			name: {
				type: String,
				default: "None"
			},
			price: {
				type: String,
				default: "0"
			},
			likes: {
				type: Number,
				default: 0
			}
		},
		components: {
			AppLike
		}
	}
</script>
