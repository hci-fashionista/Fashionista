<template>
	<div class="clothwithrank">
		<div class="info">
			<div class="rank">{{index + 1}}</div>
		</div>
		<div v-if="newItem" class="new">
			<div>new</div>
		</div>
		<AppCoordination :clothes="clothes" :name="detail.name" :price="detail.totalPrice" :likes="detail.likes"></AppCoordination>
	</div>
</template>

<style scoped>
	div.clothwithrank{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div.info{
		position: absolute;
		left: 0;
		top: -5px;
		height: 250px;
	}

	div.new {
		position: absolute;
		left: 0;
		top: 50px;
		height: 250px;

		& > div {
			border-radius: 50%;
			width: 45px;
			height: 45px;
			display: flex;
			align-items: center;
			background-color: var(--red-800);
			color: var(--grey-900);
			justify-content: center;
			font-weight: bold;
			font-size: 20px;
		}
	}

	div.rank {
		width: 45px;
		height: 45px;
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
	import AppCoordination from "@/components/AppCoordination";
	export default {
		props: {
			index: {
				type: Number,
				default: 0
			},
			detail: {
				type: Object,
			},
			clothes: {
				type: Array,
			},
			newItem: {
				type: Boolean,
				default: false
			}
		},
		components: {
			AppCoordination
		}
	}
</script>
