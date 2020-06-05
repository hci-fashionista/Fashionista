<template>
	<div class='flex column'>
		<div v-for='color in colors' :key='color' :style='getColor(color)' class='dot'>
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
	import { toRGB, colorMatchScore } from '@/src/color'

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
				default: function() {
					return ['연청', '스카이 블루']
				}
			}
		},
		computed: {
			score() {
				return colorMatchScore(...this.colors)
			}
		}
	}
</script>
