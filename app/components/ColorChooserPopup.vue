<template>
	<AppPopup class="ColorChooserPopup" ref="popup">
		<div class="ColorChooserPopup__content">
			<div class="ClothesList">
				<div class="ClothesList__list">
					<GuidelineIcons :template="computedTemplate" />
				</div>
				<BestColorScore
					:selected-colors="palette"
					:selected-normalized="paletteNormalized"
					:colors="defaultColors"
				/>
			</div>

			<div class="Colors">
				<div class="Colors__row">
					<div class="Colors__dots">
						<div class="Item" v-for="(component, index) in template.components" :key="component.id">
							<ColorDot class="Item__dot"
								:color="component.color || palette[index]"
								@select="deletePalette(index)"
							>
							</ColorDot>

							<div class="Item__line" />
						</div>
					</div>

					<div class="Colors">
						<div class="Palette"
							:class="{'Palette--disabled': paletteEnabled + 1 < index}"
							:key="template.components[index].id"
							v-for="(selectedColor, index) in palette"
						>
							<ColorDot class="Palette__dot"
								v-for="color in colors[index]"
								:color="color"
								:key="getColorKey(color)"
								@select="togglePalette(index, color)"
							>
							</ColorDot>

							<ColorDot class="Palette__dot Palette__dot--plus"
								description="Add Custom Color"
								@select="openColorChooser(index)"
								v-click-outside="addColor(index)"
							>
								+

								<Chrome class="ColorChooser"
									v-if="colorChooser[index]"
									v-model="newColor"
								/>
							</ColorDot>

						</div>
					</div>
				</div>

				<div class="Colors__row Result">
					<IconResult class="Result__icon" />
					<div class="Result__content">
						Color Match Score <br>
						<div class="Result__result" v-if="colorScore !== null">
							<span class="Result__large">
								{{ colorScore }}
							</span> / 100
						</div>
					</div>
				</div>

				<div class="Colors__row Colors__buttons">
					<AppButton color="primary" @click="select" :disabled="paletteNormalized.length < palette.length">
						Select
					</AppButton>

					<AppButton @click="cancel">
						Cancel
					</AppButton>
				</div>
			</div>
		</div>
	</AppPopup>
</template>

<style scoped>
	.ColorChooserPopup {
		&__content {
			display: flex;
			background: var(--grey-800);
			border-radius: 5px;
			padding: 20px;
		}
	}

	.Colors {
		display: flex;
		flex-direction: column;

		&__row {
			display: flex;
		}

		&__buttons {
			margin-top: 40px;
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;

			& > * {
				margin: 0 10px;
			}
		}

		&__dots {
			display: flex;
			flex-direction: column;
			margin-left: 20px;
		}
	}

	.Palette {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		margin-top: 20px;
		margin-left: 20px;

		&__dot {
			margin: 5px;

			&--plus {
				text-align: center;
				line-height: 20px;
			}
		}

		&--disabled {
			cursor: not-allowed;
			filter: grayscale();
		}

		&--disabled &__dot {
			pointer-events: none;
		}
	}

	.Item {
		display: flex;
		flex-direction: column;
		flex: 1;

		&__dot {
			margin-top: 10px;
		}

		&__line {
			width: 6px;
			flex: 1;
			margin-top: 10px;
			margin-left: 7px;
			background: var(--grey-700);
		}
	}

	.Result {
		margin-left: 27px;

		&__content {
			padding-top: 20px;
			padding-left: 20px;
		}

		&__large {
			font-size: 2rem;
		}
	}

	.ClothesList {
		&__list {
			background: var(--grey-700);
			border-radius: 5px;
			display: flex;
			flex-direction: column;
			align-items: center;

			& > * {
				margin: 20px;
			}
		}
	}

	.ColorChooser {
		position: absolute;
		z-index: 1;
	}
</style>

<script>
	import AppButton from "@/components/AppButton";
	import AppPopup from "@/components/AppPopup";
	import BestColorScore from "@/components/BestColorScore";
	import { Chrome } from "vue-color";
	import ClickOutside from "vue-click-outside";
	import ColorDot from "@/components/ColorDot";
	import GuidelineIcons from "@/components/GuidelineIcons";
	import IconResult from "@/images/IconResult.svg?inline";

	import { colors, colorMatchScoreMulti, normalizeColor, sortColor } from "@/src/color";
	import firebase from "@/src/firebase";

	const definedColors = colors;
	const db = firebase.firestore();

	export default {
		data() {
			return {
				palette: [...Array(this.template.components.length)],
				colorChooser: [...Array(this.template.components.length)],
				colors: [...Array(this.template.components.length)].map(v => []),
				defaultColors: [...Array(this.template.components.length)].map(v => []),
				newColor: "#404040"
			};
		},

		props: {
			template: {
				type: Object,
				required: true
			}
		},

		computed: {
			paletteEnabled() {
				return this.palette.reduce((lastEnabled, color, index) => {
					if(index === lastEnabled + 1 && color)
						return index;

					return lastEnabled;
				}, -1);
			},

			paletteNormalized() {
				return this.palette.filter(v => v).map((v, i) => normalizeColor(v, this.defaultColors[i]));
			},

			colorScore() {
				if(this.paletteNormalized.length < 2)
					return null;

				return colorMatchScoreMulti(this.paletteNormalized);
			},

			computedTemplate() {
				const components = this.template
					.components
					.map((component, index) => {
						if(this.paletteNormalized[index])
							return {
								...component,
								...{
									color: this.paletteNormalized[index],
									colorHex: this.palette[index].hex
								}
							};

						return component;
					});

				return {
					components
				};
			}
		},

		methods: {
			open(colors) {
				if(colors)
					this.palette = colors;

				this.$refs.popup.open();
			},

			openColorChooser(index) {
				this.$set(this.colorChooser, index, true);
			},

			addColor(index) {
				return () => {
					if(!this.colorChooser[index])
						return;

					this.$set(this.colorChooser, index, false);
					this.colors[index].push(this.newColor);
				};
			},

			deletePalette(index) {
				this.$set(this.palette, index, undefined);
			},

			togglePalette(index, color) {
				if(this.palette[index] === color)
					this.deletePalette(index);
				else
					this.$set(this.palette, index, color);
			},

			select() {
				this.$emit('select', this.computedTemplate);
				this.$refs.popup.close();
			},

			cancel() {
				this.$refs.popup.close();
			},

			getColorKey(color) {
				if(!color)
					return 'none';

				if(typeof this.color === 'object')
					return this.color.hex;

				return color;
			}
		},

		async mounted() {
			const items = await db.collection('colors').get();
			items.forEach(item => {
				const { id, colors } = item.data();
				const index = this.template.components.findIndex(({ id: componentId }) => componentId === id);
				if(index < 0) return;

				const colorsSorted = colors
					.sort(sortColor)
					.filter(color => definedColors.includes(color));

				this.$set(this.colors, index, [...colorsSorted]);
				this.$set(this.defaultColors, index, [...colorsSorted]);
			});
		},

		components: {
			AppButton,
			AppPopup,
			BestColorScore,
			Chrome,
			ColorDot,
			GuidelineIcons,
			IconResult
		},

		directives: {
			ClickOutside
		}
	};
</script>
