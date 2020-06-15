<template>
	<main class="Guideline">
		<h1 class="Guideline__title">Guideline</h1>

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
						@select="openColor(candidate)"
					/>

					<GuidelineButton
						:template="{ name: 'Custom' }"
						@select="showColorChooser"
						custom
					>
						<IconPlus style="width: 5rem; height: 5rem; fill: var(--grey-300)" />
					</GuidelineButton>
				</div>
			</div>
		</transition>

		<transition name="Fade">
			<div class="Guideline__section Clothes" v-if="phase >= 3">
				<h2>Clothes</h2>

				<div class="Clothes__row">
					<div class="Clothes__category">
						<button v-for="component in compiledTemplate.components"
							:key="component.id"
							@click="openCategory(component)">

							<component :is="getIcon(component.icon)" v-if="!results[component.id]" />
							<AppCloth :cloth="results[component.id]" v-else />
						</button>

						Total Price: ￦{{ totalPrice }}
					</div>

					<div class="Clothes__container">
						<transition name="Fade" mode="out-in">
							<div class="Clothes__items Items"
								v-if="category && loading" key="loading"
							>
								<span class="Items__heading">
									Loading...
								</span>

								Please wait for a second
							</div>

							<div class="Clothes__items Clothes__items--list"
								v-else-if="category && clothes.length > 0" :key="category"
							>
								<AppCloth v-for="cloth in clothes"
									:cloth="cloth"
									:key="cloth.id"
									@click.native="openCloth(cloth)"
								/>
							</div>

							<div class="Clothes__items Items"
								v-else-if="category && clothes.length === 0" key="no-items"
							>
								<span class="Items__heading">
									No items
								</span>

								Please change your criteria
							</div>

							<div class="Clothes__items Items" v-else key="unselected">
								<IconArrowLeft class="Items__icon" />

								<span class="Items__heading">
									Please select category
								</span>

								Click the clothes you want to select
							</div>
						</transition>
					</div>
				</div>
			</div>
		</transition>

		<transition name="Fade">
			<div class="Guideline__section Finish" v-if="phase >= 4">
				<h2>Finish</h2>

				<div class="Finish__row">
					<AppButton @click="toShoppingCart">
						<IconCart />
						To Shopping Cart
					</AppButton>

					<AppButton @click="toMyCoordinations" color="primary">
						<IconPlus />
						To My Coordinates
					</AppButton>
				</div>
			</div>
		</transition>

		<ColorChooserPopup ref="colorChooser"
			:template="template"
			v-if="template"
			@select="setCustomColor($event)"
		/>

		<DetailPopup ref="clothDetail"
			:info="selectedClothes"
			v-if="selectedClothes"
			@select="setCloth(selectedClothes)"
		/>
	</main>
</template>

<style scoped>
	.Guideline {
		max-width: 900px;
		margin: 0 auto;
		font-family: var(--main-font);
		padding: 50px 0;

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

		&__title {
			font-size: 3rem;
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

			.cloth {
				padding: 0;
				margin: 0;
			}

			button, svg {
				margin: 20px 0;
				padding: 0;
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

		&__container {
			flex: 1;
			position: relative;
			background: var(--grey-800);
		}

		&__items {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			position: absolute;
			width: 100%;
			height: 100%;
			padding: 0 50px;
			box-sizing: border-box;

			&--list {
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: space-around;
				align-items: stretch;
				overflow: auto;
				padding: 0;

				& > * {
					cursor: pointer;
					margin: 10px 5px;
				}
			}
		}
	}

	.Finish {
		&__row {
			display: flex;
			justify-content: center;

			button {
				display: flex;
				align-items: center;
				font-size: 1.3rem;
				margin: 0 10px;

				svg {
					width: 1.5rem;
					height: 1.5rem;
					margin-right: 10px;
				}

				&.primary svg {
					fill: var(--grey-900) !important;
				}
			}
		}
	}

	.Items {
		color: var(--grey-550);

		&__heading {
			margin-top: 2rem;
			margin-bottom: .3rem;
			font-size: 2rem;
			font-weight: 700;
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
	import AppButton from "@/components/AppButton";
	import AppCloth from "@/components/AppCloth";
	import ColorChooserPopup from "@/components/ColorChooserPopup";
	import DetailPopup from "@/components/DetailPopup";
	import GuidelineButton from "@/components/GuidelineButton";
	import GuidelineIcons from "@/components/GuidelineIcons";
	import IconArrowLeft from "@/images/IconArrowLeft.svg?inline";
	import IconCart from "@/images/IconCart.svg?inline";
	import IconPlus from "@/images/IconPlus.svg?inline";

	import firebase from "@/src/firebase";
	import { getIcon } from "@/components/GuidelineIcons";
	import getTemplates from "@/src/templates";

	const db = firebase.firestore();

	export default {
		data() {
			return {
				stages: ['Template', 'Color', 'Clothes', 'Finish'],
				templateCandidates: getTemplates(),
				template: null,
				colors: null,
				category: null,
				clothes: [],
				results: {},
				cache: {},
				loading: false,
				selectedClothes: null,
				editingColor: null,
				customCount: 0
			};
		},

		computed: {
			phase() {
				if(!this.template)
					return 1;

				if(!this.colors)
					return 2;

				if(!this.compiledTemplate.components.every(({id}) => this.results[id]))
					return 3;

				return 4;
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
			},

			totalPrice() {
				return Object.keys(this.results)
					.map(v => this.results[v])
					.reduce((prev, {price}) => prev + price, 0);
			}
		},

		methods: {
			showColorChooser(editingColor = null) {
				this.editingColor = editingColor || `custom-${this.customCount}`;

				if(!this.$refs.colorChooser)
					return;

				const originalColor = this.template.colorCandidates.find(v => v.id === this.editingColor);
				if(!originalColor) {
					this.$refs.colorChooser.open();
					this.customCount++;
					return;
				}

				const palette = originalColor.components.map(v => {
					if(v.colorHex)
						return { hex: v.colorHex };

					return v.color;
				});

				this.$refs.colorChooser.open(palette);
			},

			setCustomColor(colors) {
				const customIdx = this.template.colorCandidates.findIndex(v => v.id === this.editingColor);
				const newCandidate = {
					id: this.editingColor,
					name: 'Custom',
					isCustom: true,
					...colors
				};

				if(customIdx > 0)
					this.template.colorCandidates.splice(customIdx, 1, newCandidate);
				else
					this.template.colorCandidates.push(newCandidate);

				this.colors = newCandidate;
			},

			openColor(candidate) {
				if(candidate.isCustom && this.colors && this.colors.id === candidate.id) {
					this.showColorChooser(candidate.id);
					return;
				}

				this.colors = candidate;
			},

			async openCategory(component) {
				this.category = component.id;
				this.clothes = [];

				let clothesList = [];

				this.loading = true;
				if(!this.cache[component.id]) {
					let cursor = db.collection(component.id);

					if(component.color) {
						cursor = cursor.where("color", "==", component.color);
					}

					const clothes = await cursor.get();
					clothes.forEach(clothDoc => {
						const data = clothDoc.data();
						data.id = clothDoc.id;
						clothesList.push(data);
					});

					this.cache[component.id] = [...clothesList];
				} else {
					clothesList = [...this.cache[component.id]];
				}

				this.loading = false;
				this.clothes = clothesList;
			},

			openCloth(cloth) {
				this.selectedClothes = cloth;
				this.$nextTick(() => {
					if(this.$refs.clothDetail)
						this.$refs.clothDetail.open();
				});
			},

			setCloth(cloth) {
				this.$set(this.results, this.category, cloth);
			},

			async toMyCoordinations() {
				const coordination = {
					author: 'Dol Lee',
					bodyShape: {
						height: 'height',
						weight: 'weight'
					},
					clothes: Object.keys(this.results).reduce((obj, key) => {
						obj[key] = this.results[key].id;
						return obj;
					}, {}),
					colors: this.compiledTemplate.components.map(v => v.color),
					date: Date.now(),
					description: '',
					likes: 0,
					name: `New Coordination ${(new Date).toLocaleString()}`,
					published: false,
					reviews: [],
					tags: [],
					totalPrice: `${this.totalPrice}`
				};

				await db.collection('ranking').add(coordination);
				this.$router.push('/mypage');
			},

			toShoppingCart() {

			},

			getIcon
		},

		watch: {
			template() {
				this.cache = {};
				this.results = {};
				this.clothes = [];
				this.category = null;
				this.colors = null;
			},

			async colors() {
				this.cache = {};
				this.clothes = [];

				if(this.category) {
					const component = this.compiledTemplate.components
						.find(({id}) => id === this.category);

					if(component)
						await this.openCategory(component);
				}
			}
		},

		components: {
			AppButton,
			AppCloth,
			ColorChooserPopup,
			DetailPopup,
			GuidelineButton,
			GuidelineIcons,
			IconArrowLeft,
			IconCart,
			IconPlus
		}
	};
</script>
