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
	img {
		object-fit: contain;
		width: 160px;
        height: 160px;
	}

	div.clothName{
		font-family: var(--main-font);
		width: 100%;
		font-size: 18px;
		margin-left: 5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/* text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; */
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
