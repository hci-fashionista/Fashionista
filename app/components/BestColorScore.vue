<template>
	<div>
		<p>Best Color Match</p>

		<div class="flex">
			<div v-for="(colorScore, j) in colorsArr" :key="j">
				<div class="dots">
					<ColorDot v-for="(color, i) in colorScore.colors" :key="i" :color="color" />
				</div>
				<div> {{ colorScore.score }} </div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.flex {
		display: flex;
		align-items: center;
		font-size: 1.2rem;

		& > * {
			margin: 10px;
		}
	}

	.dots {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

<script>
	import ColorDot from "@/components/ColorDot";
	import { colors, colorMatchScoreMulti } from '@/src/color'

	export default {
		props: {
			selectedColors: {
				type: Array,
				default: []
			},

			selectedNormalized: {
				type: Array,
				default: []
			},

			colors: {
				type: Array,
				default: colors
			}
		},

		computed: {
			colorsArr() {
				let combinations = [this.selectedNormalized];

				for(let i = this.selectedNormalized.length; i < this.colors.length; i++) {
					const colors = this.colors[i];

					combinations = combinations.reduce((arr, originalColors) => {
						for(let j = 0; j < colors.length; j++) {
							arr.push([...originalColors, colors[j]])
						}

						return arr;
					}, []);
				}

				const scores = combinations.map(item => ({
					colors: item,
					score: colorMatchScoreMulti(item)
				}));

				return scores.sort((a, b) => b.score - a.score).slice(0, 3);
			}
		},

		components: {
			ColorDot
		}
	};
</script>
