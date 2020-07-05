<template>
	<div class='flex column'>
		<div v-for='(color, i) in colors' :key='i' :style='getColor(color)' class='dot'>
		</div>
		<div> {{ score }} </div>
	</div>
</template>

<style scoped>
	.flex {
		display: flex;
		align-items: center;
		font-size: 1.8rem;

		&.column {
			flex-direction: column;
		}

		& > * {
			margin: 10px;
		}
	}

	.dot {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--background-color)
	}
</style>

<script>
	import { toRGB, colorMatchScoreMulti } from '@/src/color'

	export default {
		methods: {
			getColor(color) {
				return {
					'--background-color': toRGB(color)
				}
			}
		},
		props: {
			colors: {
				type: Array,
				default: ['연청', '스카이 블루']
			}
		},
		computed: {
			score() {
				return colorMatchScoreMulti(this.colors)
			}
		}
	}
</script>
