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
				<GuidelineButton v-for="templateOption in templateCandidates"
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
			<div class="Guideline__section Clothes" v-if="phase >= 3">
				<h2>Clothes</h2>

				<div class="Clothes__row">
					<div class="Clothes__category">
						<button v-for="component in template.components"
							:key="component.id"
							@click="openCategory(component)">

							<component :is="getIcon(component.icon)" />
						</button>
					</div>

					<transition name="Fade">
						<div class="Clothes__items" v-if="category">
							<AppCloth v-for="cloth in clothes" :key="cloth.id" @click="setCloth(cloth)" />
						</div>
					</transition>
				</div>
			</div>
		</transition>

		<ColorChooserPopup ref="colorChooser"
			:template="template"
			v-if="template"
			@select="setCustomColor($event)"
		/>
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

	.Clothes {
		&__row {
			display: flex;
			margin-left: 20px;
		}

		&__category {
			background: var(--grey-700);
			flex: 1;
			max-width: 150px;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20px 30px;

			* {
				margin: 20px 0;
				width: 100%;
				max-width: 140px;
				height: auto;
			}

			button {
				cursor: pointer;
				background: transparent;
				border: none;
				outline: none;

				&:hover svg {
					fill: var(--grey-550);
				}
			}

			svg {
				fill: var(--grey-600);
				transition: fill .4s ease;
			}
		}

		&__items {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			overflow: auto;
			max-height: 50vh;
			flex: 1;
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
	import AppCloth from "@/components/AppCloth";
	import ColorChooserPopup from "@/components/ColorChooserPopup";
	import GuidelineButton from "@/components/GuidelineButton";
	import GuidelineIcons from "@/components/GuidelineIcons";
	import IconPlus from "@/images/IconPlus.svg?inline";

	import firebase from "@/src/firebase";
	import { getIcon } from "@/components/GuidelineIcons";

	const getMock = () => [
		{
			id: 'tshirts-jeans',
			name: 'T-shirts + Jeans',
			components: [
				{
					id: 'top',
					name: 'T-Shirts',
					icon: 'tshirts',
					tags: [
						'Category:T-Shirts'
					]
				},

				{
					id: 'pants',
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
							color: '검정색'
						},

						{
							id: 'jeans',
							color: '검정색'
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
				templateCandidates: getMock(),
				template: null,
				colors: null,
				category: null,
				clothes: []
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
			},

			compiledTemplate() {
				if(!this.template || !this.colors)
					return {};

				const template = {...this.template};
				template.components = template.components.map((component, index) => {
					return {
						...component,
						...this.colors.components[index]
					};
				});
				delete template.colorCandidates;

				return template;
			}
		},

		methods: {
			showColorChooser() {
				if(this.$refs.colorChooser)
					this.$refs.colorChooser.open();
			},

			setCustomColor(colors) {
				const customIdx = this.template.colorCandidates.findIndex(v => v.id === 'custom');
				if(customIdx > 0)
					this.template.colorCandidates.splice(customIdx, 1);

				const newCandidate = {
					id: 'custom',
					name: 'Custom',
					...colors
				};

				this.template.colorCandidates.push(newCandidate);
				this.colors = newCandidate;
			},

			async openCategory(component) {
				this.category = component.id;
				this.clothes = [];

				const db = firebase.firestore();
				const clothes = await db.collection(component.id)
					.get();

				clothes.forEach(clothDoc => {
					this.clothes.push(clothDoc.data());
				});
			},

			setCloth(cloth) {

			},

			getIcon
		},

		components: {
			AppCloth,
			ColorChooserPopup,
			GuidelineButton,
			GuidelineIcons,
			IconPlus
		}
	};
</script>
