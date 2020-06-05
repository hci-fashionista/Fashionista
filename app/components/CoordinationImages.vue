<template>
	<div class="CoordinationImages" :class="[`CoordinationImages--${count}`, {is_photo}]" ref="images">
		<slot></slot>
	</div>
</template>

<style scoped>
	.CoordinationImages {
		display: grid;
		border-radius: 10px;
		overflow: hidden;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(6, 1fr);
		grid-column-gap: 10px;
		grid-row-gap: 10px;

		&--1 {
			grid-template-areas:
				'pic1 pic1 pic1 pic1 pic1'
				'pic1 pic1 pic1 pic1 pic1'
				'pic1 pic1 pic1 pic1 pic1'
				'pic1 pic1 pic1 pic1 pic1'
				'pic1 pic1 pic1 pic1 pic1'
				'pic1 pic1 pic1 pic1 pic1';
		}
		&--2 {
			grid-template-areas:
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic2 pic2';
		}
		&--3 {
			grid-template-areas:
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic2 pic2'
				'pic1 pic1 pic1 pic3 pic3'
				'pic1 pic1 pic1 pic3 pic3';
		}
		&--4 {
			grid-template-areas:
				'pic1 pic1 pic1 pic3 pic3'
				'pic1 pic1 pic1 pic3 pic3'
				'pic1 pic1 pic1 pic3 pic3'
				'pic2 pic2 pic2 pic3 pic3'
				'pic2 pic2 pic2 pic4 pic4'
				'pic2 pic2 pic2 pic4 pic4';
		}
		&--5 {
			grid-template-areas:
				'pic1 pic1 pic1 pic3 pic3'
				'pic1 pic1 pic1 pic3 pic3'
				'pic1 pic1 pic1 pic4 pic4'
				'pic2 pic2 pic2 pic4 pic4'
				'pic2 pic2 pic2 pic5 pic5'
				'pic2 pic2 pic2 pic5 pic5';
		}

		:nth-child(1) {
			grid-area: pic1;
		}

		:nth-child(2) {
			grid-area: pic2;
		}

		:nth-child(3) {
			grid-area: pic3;
		}

		:nth-child(4) {
			grid-area: pic4;
		}

		:nth-child(5) {
			grid-area: pic5;
		}

		* {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		
		&.is_photo * {
			object-fit: cover;
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				count: 0
			};
		},
		props: {
			is_photo: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			this.count = this.$refs.images.children.length;
		}
	};
</script>
