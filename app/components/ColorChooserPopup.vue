<template>
	<AppPopup class="ColorChooserPopup" ref="popup">
		<div class="Dots">
			<div class="Item" v-for="(component, index) in template.components">
				<div class="Item__dot" :style="{ background: getColor(component.color || palette[index]) }" />
				<div class="Item__line" />
			</div>

			<div class="Item Item--result">
				<IconResult />
			</div>
		</div>

		<div class="ClothesList">
			<div class="ClothesList__list">
				<GuidelineIcons :template="template" />
			</div>
		</div>

		<div class="Colors">
			<div class="Palette"
				:class="{'Palette--disabled': paletteEnabled > index + 1}"
				v-for="selectedColor in palette"
			>
				<div class="Palette__dot" v-for="color in colors" :style="{ background: getColor(color) }" />
			</div>
		</div>
	</AppPopup>
</template>

<style scoped>
	.ColorChooserPopup {
		display: flex;
	}
</style>

<script>
	import AppPopup from "@/components/AppPopup";
	import GuidelineIcons from "@/components/GuidelineIcons";
	import IconResult from "@/images/IconResult.svg?inline";
	import colors from "@/src/colors.js";

	export default {
		data() {
			return {
				palette: [...Array(this.template.components.length)]
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
			}
		},

		methods: {
			getColor(color) {
				return colors[color];
			},

			open() {
				this.$refs.popup.open();
			}
		},

		components: {
			AppPopup,
			GuidelineIcons,
			IconResult
		}
	};
</script>
