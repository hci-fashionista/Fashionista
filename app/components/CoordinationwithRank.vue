<template>
	<div class="clothwithrank">
		<div class="info">
			<div class="rank">{{index + 1}}</div>
		</div>
		<div v-if="newItem" class="new first">
			<div>new</div>
		</div>
		<div v-if="showPublished && detail.published" class="published" :class="{first: !newItem, second: newItem}">
			<IconCheck />
		</div>
		<AppCoordination :clothes="clothes" :name="detail.name" :price="detail.totalPrice" :likes="detail.likes"></AppCoordination>
	</div>
</template>

<style scoped>
	div.clothwithrank {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div.info {
		position: absolute;
		left: 0;
		top: -5px;
		height: 250px;
	}

	div.first {
		top: 50px;
	}

	div.second {
		top: 100px;
	}

	div.new {
		position: absolute;
		left: 0;

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

	div.published {
		position: absolute;
		left: 10px;
		cursor: pointer;
		outline: none;
		padding: 0;

		&:hover {
			&::after {
				border-radius: 5px;
				box-shadow: 0 0 4px 0 rgba(0, 0, 0, .4);
				content: "Coordination is already uploaded";
				position: absolute;
				left: -110px;
				bottom: 15px;
				z-index: 1;
				white-space: nowrap;
				background: var(--grey-900);
				padding: 5px 10px;
				transform: translate(0, -50%);
			}
		}

		& > div {
			border-radius: 5px;
			width: 45px;
			height: 20px;
			display: flex;
			align-items: center;
			background-color: var(--blue-500);
			color: var(--grey-900);
			justify-content: center;
			font-weight: bold;
			font-size: 10px;
			overflow-wrap: break-word;
		}

		& > svg {
			fill: var(--blue-500);
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
	import IconCheck from "@/images/IconCheck.svg?inline";
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
			},
			showPublished: {
				type: Boolean,
				default: false
			}
		},
		components: {
			AppCoordination,
			IconCheck
		}
	}
</script>
