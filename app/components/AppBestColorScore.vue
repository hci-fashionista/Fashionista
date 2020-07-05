<template>
	<div>
		<p>Best Color Match</p>
		<div>
			<div class='flex'>
				<div v-for='(colorScore, j) in colorsArr' :key='j'>
					<div v-for='(color, i) in colorScore.colors' :key='i' :style='getColor(color)' class='dot'>
					</div>
					<div> {{ colorScore.score }} </div>
				</div>
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

	.dot {
		width: 20px;
		height: 20px;
		margin: 5px;
		border-radius: 50%;
		background-color: var(--background-color)
	}
</style>

<script>
	import ColorScore from "@/components/ColorScore";
	import { toRGB, colorMatchScoreMulti } from '@/src/color'

	export default {
		props: {
			selected: {
				type: Boolean,
				default: false
			},
			firstColor: {
				type: String, 
				default: ""
			}
		},

		components: {
			ColorScore
		},
		
		methods: {
			getColor(color) {
				return {
					'--background-color': toRGB(color)
				}
			},
			scoreNotSelected() {
				var colors = ['연청', '스카이 블루', '파란색', '흰색', '데님', '회색', '아이보리', '검정색', '중청', '베이지색', '흑청', '카키', '네이비', '보라색', '라이트 핑크', '샌드', '라즈베리', '다크 그레이', '레드 브라운', '라벤더', '분홍색', '녹색', '라이트 오렌지', '민트'];
				var scores = []
				
				console.log(colors.length)
				for(var i=0; i < colors.length; i++){
					for(var j=0; j < colors.length; j++){
						var color_arr = [colors[i], colors[j]];
						scores.push({colors: color_arr, score: colorMatchScoreMulti(color_arr)});
					}
				}
				scores.sort(function(a, b) { // 내림차순
					return b.score - a.score;
					// 11, 10, 4, 3, 2, 1
				});
				console.log(scores);
				return scores.slice(0, 3);
			},
			scoreSelected(color1){
				var colors = ['연청', '스카이 블루', '파란색', '흰색', '데님', '회색', '아이보리', '검정색', '중청', '베이지색', '흑청', '카키', '네이비', '보라색', '라이트 핑크', '샌드', '라즈베리', '다크 그레이', '레드 브라운', '라벤더', '분홍색', '녹색', '라이트 오렌지', '민트'];
				var scores = []
				
				console.log(colors.length)
				for(var j=0; j < colors.length; j++){
					var color_arr = [color1, colors[j]];
					scores.push({colors: color_arr, score: colorMatchScoreMulti(color_arr)});
				}
				scores.sort(function(a, b) { // 내림차순
					return b.score - a.score;
					// 11, 10, 4, 3, 2, 1
				});
				console.log(scores);
				return scores.slice(0, 3);
			}
		},

		computed: {
			colorsArr() {
				if(this.selected){
					return this.scoreSelected(this.firstColor)
				}
				else {
					return this.scoreNotSelected()
				}
			}
		}

	};
</script>
