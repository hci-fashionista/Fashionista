<script>
	import IconJeans from "@/images/IconJeans.svg?inline";
	import IconTshirts from "@/images/IconTshirts.svg?inline";
	import IconUnknown from "@/images/IconUnknown.svg?inline";
	import colors from "@/src/colors";
	
	const icons = { IconJeans, IconTshirts };

	export default {
		functional: true,
		props: {
			template: {
				type: Object,
				required: true
			}
		},
		render(createElement, { props }) {
			const getIcon = icon => {
				if(icon.length === 0)
					return IconUnknown;

				const iconName = 'Icon' + icon[0].toUpperCase() + icon.slice(1);
				if(!icons.hasOwnProperty(iconName))
					return IconUnknown;

				return icons[iconName];
			};

			const getIconColor = color => {
				if(!color)
					return { fill: 'var(--grey-300)' };

				if(!colors.hasOwnProperty(color))
					return { fill: 'var(--grey-300)' };

				return { fill: colors[color].color };
			};

			return props.template.components.map(component => {
				return createElement(
					getIcon(component.icon),
					{
						style: getIconColor(component.color),
						key: component.id
					}
				);
			})
		}
	};
</script>
