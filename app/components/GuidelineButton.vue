<template>
	<button class="GuidelineButton" @click="$emit('select')">
		<div class="GuidelineButton__icon">
			<component
				:is="getIconName(component.icon)"
				:style="getIconColor(component.color)"
				v-for="component in template.components"
			/>
		</div>

		{{ template.name }}
	</button>
</template>

<script>
	import colors from "@/src/colors";

	const components = {};

	export default {
		props: {
			template: {
				type: Object,
				required: true
			},

			selected: {
				type: Boolean
			}
		},

		methods: {
			getIconName(icon) {
				if(icon.length === 0)
					return 'IconUnknown';

				const iconName = 'Icon' + icon[0].toUpperCase() + icon.slice(1);
				if(!components.hasOwnProperty(iconName))
					return 'IconUnknown';

				return iconName;
			},

			getIconColor(color) {
				if(!color || this.selected)
					return;

				if(!colors.hasOwnProperty(color))
					return;

				return { fill: colors[color].color };
			}
		}
	};
</script>
