<template>
	<div class="clothwithrank">
		<div class="info">
			<div class="rank">{{index + 1}}</div>
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
		height: 250px;
		align-self: start;
	}

	div.rank{
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
		components: {
			AppCoordination
		}
	}
</script>
