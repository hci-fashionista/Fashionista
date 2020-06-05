<template>
	<main class="Guideline">
		<div class="Progress">
			<div class="Progress__item" v-for="stage in stages">
				<div class="Progress__item__decorator"></div>
				{{ stage }}
			</div>
		</div>

		<div class="Guideline__section">
			<h2>Template</h2>

			<div class="Guideline__buttons">
				<GuidelineButton v-for="templateOption in templates"
					:key="templateOption.id"
					:template="templateOption"
					:selected="template && template.id === templateOption.id"
					@select="template = templateOption"
				/>
			</div>
		</div>

		<transition name="Fade">
			<div class="Guideline__section" v-if="phase >= 2">
				<h2>Colors</h2>

				<div class="Guideline__buttons">
					<GuidelineButton v-for="candidate in colorCandidates"
						:key="candidate.id"
						:template="candidate"
						:selected="colors && colors.id === candidate.id"
						@select="colors = candidate"
					/>

					<GuidelineButton
						:template="{ name: 'Custom' }"
						@select="showColorChooser"
						custom
					>
						<IconPlus />
					</GuidelineButton>
				</div>
			</div>
		</transition>

		<transition name="Fade">
			<div class="Guideline__section" v-if="phase >= 3">
				<h2>Clothes</h2>


			</div>
		</transition>

		<ColorChooserPopup ref="colorChooser" :template="template" />
	</main>
</template>

<style scoped>
	.Guideline {
		max-width: 900px;
		margin: 0 auto;
		font-family: 'Raleway', sans-serif;

		&__section {
			margin-top: 50px;

			& > h2 {
				font-size: 2rem;
			}

			&--hidden {
				position: relative;

				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, .5);
				}
			}
		}

		&__buttons {
			display: flex;
			margin-left: 20px;

			* {
				margin: 0 10px;
			}
		}
	}

	.Progress {
		display: flex;
		justify-content: center;
		margin-top: 20px;

		&__item {
			position: relative;
			display: flex;
			align-items: center;
			height: 50px;
			margin: 0 20px;
			padding: 0 20px;
			box-sizing: border-box;
			background: var(--grey-850);

			&__decorator {
				position: absolute;
				top: 0;
				left: -25px;

				&::before {
					content: '';
					display: block;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 0 25px 25px 0;
					border-color: transparent var(--grey-850) transparent transparent;
				}

				&::after {
					content: '';
					display: block;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 0 0 25px 25px;
					border-color: transparent transparent var(--grey-850) transparent;
				}
			}

			&::after {
				content: '';
				width: 0;
				height: 0;
				position: absolute;
				top: 0;
				right: -25px;
				border-style: solid;
				border-width: 25px 0 25px 25px;
				border-color: transparent transparent transparent var(--grey-850);
			}
		}
	}
</style>

<script>
	import ColorChooserPopup from "@/components/ColorChooserPopup";
	import GuidelineButton from "@/components/GuidelineButton";
	import IconPlus from "@/images/IconPlus.svg?inline";

	const getMock = () => [
		{
			id: 'tshirts-jeans',
			name: 'T-shirts + Jeans',
			components: [
				{
					id: 't-shirts',
					name: 'T-Shirts',
					icon: 'tshirts',
					tags: [
						'Category:T-Shirts'
					]
				},

				{
					id: 'jeans',
					name: 'Jeans',
					icon: 'jeans',
					tags: [
						'Category:Jeans'
					]
				}
			],

			colorCandidates: [
				{
					id: 'black-black',
					name: 'Black + Black',
					components: [
						{
							id: 't-shirts',
							color: 'black'
						},

						{
							id: 'jeans',
							color: 'black'
						}
					]
				}
			]
		}
	];

	export default {
		data() {
			return {
				stages: ['Template', 'Color', 'Clothes', 'Finish'],
				templates: getMock(),
				template: null,
				colors: null
			};
		},

		computed: {
			phase() {
				if(!this.template)
					return 1;

				if(!this.colors)
					return 2;

				return 3;
			},

			colorCandidates() {
				if(!this.template)
					return [];

				return this.template.colorCandidates.map(candidate => {
					const candidateCompiled = {...candidate};

					candidateCompiled.components.forEach((_, index) => {
						candidateCompiled.components[index] = {
							...this.template.components[index],
							...candidate.components[index]
						}
					});

					return candidateCompiled;
				});
			}
		},

		methods: {
			showColorChooser() {
				this.$refs.colorChooser.open();
			}
		},

		components: {
			ColorChooserPopup,
			GuidelineButton,
			IconPlus
		}
	};
</script>
