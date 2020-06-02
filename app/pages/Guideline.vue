<template>
	<main class="Guideline">
		<div class="Progress">
			<div class="Progress__item"> Template </div>
			<div class="Progress__item"> Clothes </div>
			<div class="Progress__item"> Finish </div>
		</div>

		<div class="Guideline__section">
			<h2>Template</h2>

			<div class="Guideline__buttons">
				<GuidelineButton v-for="template in templates" />
			</div>
		</div>

		<div class="Guideline__section" :class="{ 'Guideline__section--hidden': phase <= 1 }">
			<h2>Colors</h2>

			<div class="Guideline__buttons">
				<GuidelineButton v-for="template in templates" />
			</div>
		</div>
	</main>
</template>

<style scoped>
</style>

<script>
	export default {
		data() {
			return {
				templates: [
					{
						id: 'tshirts-jeans',
						name: 'T-shirts + Jeans',
						components: {
							't-shirts': {
								name: 'T-Shirts',
								icon: 't-shirts',
								tags: [
									'Category:T-Shirts'
								]
							},

							'jeans': {
								name: 'Jeans',
								icon: 'jeans',
								tags: [
									'Category:Jeans'
								]
							}
						},

						colorCandidates: [
							{
								id: 'black-black',
								name: 'Black + Black',
								components: {
									't-shirts': {
										color: 'black'
									},

									'jeans': {
										color: 'black'
									}
								}
							}
						]
					}
				]
			};
		}
	};
</script>
