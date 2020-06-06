<template>
	<div @click = "popup" class="clothwithrank">
		<div class="info">
			<div class="rank">{{index + 1}}</div>
			<!-- <div class="new" v-if="detail.is_new">new</div> -->
		</div>
		<AppCoordination :clothes="clothes" :name="detail.name" :price="detail.totalPrice" :likes="detail.likes"></AppCoordination>
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
            }
		},
		components: {
			AppCoordination
		},
		methods: {
			popup() {

			}
		}
	}
</script>
