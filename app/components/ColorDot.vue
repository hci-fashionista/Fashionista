<template>
	<button class="ColorDot"
		:data-color="colorName"
		:style="{ background: colorStyle }"
		@click="$emit('select')"
	>
		<slot />
	</button>
</template>

<style scoped>
	.ColorDot {
		cursor: pointer;
		outline: none;
		width: 20px;
		height: 20px;
		padding: 0;
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, .3);
		position: relative;

		&:hover {
			&::after {
				position: absolute;
				content: attr(data-color);
				white-space: nowrap;
				z-index: 1;
				background: var(--grey-900);
				border-radius: 5px;
				padding: 5px 10px;
				box-shadow: 0 0 4px 0 rgba(0, 0, 0, .4);
				top: 50%;
				left: 25px;
				transform: translate(0, -50%);
			}
		}
	}
</style>

<script>
	import { toRGB } from "@/src/color";

	export default {
		props: {
			color: {},
			description: {
				type: String
			}
		},

		computed: {
			colorStyle() {
				if(!this.color)
					return `var(--grey-700)`;

				return toRGB(this.color);
			},

			colorName() {
				if(this.description)
					return this.description;

				if(!this.color)
					return 'Unselected';

				if(typeof this.color === 'object')
					return 'Custom Color: ' + this.color.hex;

				return this.color;
			}
		}
	}
</script>
