<template>
	<button class="GuidelineButton"
		:class="{'GuidelineButton--selected': selected}"
		@click="$emit('select')">

		<CoordinationImages class="GuidelineButton__button" v-if="!custom">
			<component
				class="GuidelineButton__icon"
				:is="getIconName(component.icon)"
				:style="getIconColor(component.color)"
				:key="index"
				v-for="(component, index) in template.components"
			/>
		</CoordinationImages>
		
		<div class="GuidelineButton__button GuidelineButton__button--custom" v-else>
			<slot />
		</div>

		<div class="GuidelineButton__text">
			{{ template.name }}
		</div>
	</button>
</template>

<style scoped>
	.GuidelineButton {
		cursor: pointer;
		background: transparent;
		border: none;
		outline: none;

		&__button {
			background: var(--grey-750);
			border-radius: 10px;
			padding: 15px;
			border: 5px solid transparent;
			transition: all .4s ease;
			width: 128px;
			height: 128px;

			&--custom {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		&__icon {
			fill: var(--grey-300);
		}

		&__text {
			margin-top: 10px;
			font-size: 1.1rem;
			font-family: 'Raleway', sans-serif;
		}

		&:hover &__button {
			background: var(--grey-850);
		}

		&--selected &__button {
			border-color: var(--blue-400);
		}
	}
</style>

<script>
	import CoordinationImages from "@/components/CoordinationImages";
	import IconJeans from "@/images/IconJeans.svg?inline";
	import IconTshirts from "@/images/IconTshirts.svg?inline";
	import colors from "@/src/colors";

	const icons = {
		IconJeans, IconTshirts
	};

	export default {
		props: {
			template: {
				type: Object,
				required: true
			},

			selected: {
				type: Boolean
			},

			custom: {
				type: Boolean
			}
		},

		methods: {
			getIconName(icon) {
				if(icon.length === 0)
					return 'IconUnknown';

				const iconName = 'Icon' + icon[0].toUpperCase() + icon.slice(1);
				if(!icons.hasOwnProperty(iconName))
					return 'IconUnknown';

				return iconName;
			},

			getIconColor(color) {
				if(!color)
					return;

				if(!colors.hasOwnProperty(color))
					return;

				return { fill: colors[color].color };
			}
		},

		components: {
			CoordinationImages,
			...icons
		}
	};
</script>
