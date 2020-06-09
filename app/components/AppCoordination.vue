<template>
	<div class="cloth">
		<CoordinationImages class="coordination_photo" is_photo>
			<div v-for="cloth in clothes" :key="cloth.name">
				<img :src="cloth.image">
			</div>
		</CoordinationImages>
		<div class="clothName">{{this.name}}</div>
		<div class="description">
			<div class="price">{{priceWithWon}}</div>
			<div class="like"><AppLike :likes="likes"></AppLike></div>
		</div>

	</div>
</template>

<style scoped>
	div.cloth{
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 220px;
		padding: 15px 15px;
		border-radius: 20px;
		margin: 10px 10px;
		transition: all .4s ease;
		&:hover{
			background: var(--grey-850);
		}
	}
	div.clothName{
		font-family: var(--main-font);
		width: 12vw;
		font-size: 18px;
		margin-left: 5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	div.description{
		display: flex;
		width: 100%;
	}
	div.price {
		font-size: 16px;
		flex-grow: 1;
		margin-left: 5px;
	}
	div.like{
		margin-right: 5px;
		& >>> div {
			width: 25px;
		}

		& >>> span {
			font-size: 15px;
		}

		& >>> img {
			width : 10px;
			height : 10px;
		}
	}
	.coordination_photo {
		width: 160px;
		height: 160px;
	}
</style>

<script>
	import AppLike from "@/components/AppLike";
	import CoordinationImages from "@/components/CoordinationImages"

	export default {
		data(){
			return {
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
			},
			clothes: {
				type: Array,
				default: () => []
			}
		},
		components: {
			AppLike,
			CoordinationImages
		}
	}
</script>
