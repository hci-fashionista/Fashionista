<script>
	import IconJeans from "@/images/IconJeans.svg?inline";
	import IconTshirts from "@/images/IconTshirts.svg?inline";
	import IconUnknown from "@/images/IconUnknown.svg?inline";
	import { toRGB } from "@/src/color.js";

	const icons = { IconJeans, IconTshirts };
	const getIcon = icon => {
		if(icon.length === 0)
			return IconUnknown;

		const iconName = 'Icon' + icon[0].toUpperCase() + icon.slice(1);
		if(!icons.hasOwnProperty(iconName))
			return IconUnknown;

		return icons[iconName];
	};

	const getIconColor = ({ color, colorHex }) => {
		if(colorHex)
			return { fill: colorHex };

		if(!color)
			return { fill: 'var(--grey-300)' };

		const rgb = toRGB(color);
		return { fill: rgb };
	};

	export default {
		functional: true,
		props: {
			template: {
				type: Object,
				required: true
			}
		},
		render(createElement, { props }) {
			return props.template.components.map(component => {
				return createElement(
					getIcon(component.icon),
					{
						style: getIconColor(component),
						key: component.id
					}
				);
			});
		}
	};

	export { getIcon, getIconColor };
</script>
