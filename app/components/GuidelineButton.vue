<template>
	<button class="GuidelineButton"
		:class="{'GuidelineButton--selected': selected}"
		@click="$emit('select')">

		<CoordinationImages class="GuidelineButton__button" v-if="!custom">
			<GuidelineIcons :template="template" />
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
			font-family: var(--main-font);
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
	import GuidelineIcons from "@/components/GuidelineIcons";

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

		components: {
			CoordinationImages,
			GuidelineIcons
		}
	};
</script>
