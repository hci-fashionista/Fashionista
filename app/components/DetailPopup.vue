<template>
	<AppPopup ref='popup'>
		<div class='root flex'>
			<div class='flex'><img :src="info.img_large || info.image" alt='Clothes Picture'></div>
			<div class='flex column info' style='justify-content: space-around;'>
				<div>
					<div class='flex title'>
						<h1 :title="info.name">{{ info.name }}</h1>
						<AppLike :likes='likes'/>
					</div>
					<hr />
					<div class='flex column'>
						<h3>Product Info</h3>
						<div class='table'>
							<div>Brand</div>
							<div>{{ info.brand }}</div>
							<div>Size</div>
							<div>{{ info.size.join(' / ') }}</div>
							<div>Ratings</div>
							<div>{{ rating }}</div>
						</div>
					</div>
					<hr />
					<div class='flex column'>
						<h3>Price Info</h3>
						<div class='table'>
							<div>Price</div>
							<div>{{ info.price }} ₩</div>
						</div>
					</div>
					<hr />
					<div class='flex column'>
						<h3>Delivery Info</h3>
						<div class='table'>
							<div>Company</div>
							<div>{{ deliveryCompany }}</div>
							<div>Average ETA</div>
							<div>{{ info['delivery-date'] }} days</div>
						</div>
					</div>
				</div>
				<div>
					<div class='flex buttons'>
						<AppButton color='primary' @click="select" fullWidth>Select</AppButton>
						<AppButton fullWidth @click='close'>Cancel</AppButton>
					</div>
				</div>
			</div>
		</div>
	</AppPopup>
</template>

<style scoped>
.root {
	width: 90vw;
	max-width: 1000px;
	padding: 40px 40px;
	background-color: #FFFFFF;
	border-radius: 15px;
}

img {
	object-fit: contain;
	min-width: 250px;
}

.flex {
	display: flex;

	&.title {
		justify-content: flex-start;

		h1 {
			font-size: 1.8rem;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}

	&.buttons {
		justify-content: flex-end;
		margin-top: 50px;
	}

	&.title > *, &.buttons > * {
		margin-right: 20px;
	}

	&.column {
		flex-direction: column;
	}

	&.info {
		padding: 0 40px;
		flex-grow: 1;
		width: 0;
	}
}

.table {
	display: grid;
	grid-template-columns: 2fr 3fr;
	grid-column-gap: 80px;
	margin-left: 20px;
}

hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #ccc;
	margin: 15px 0;
	padding: 0;
}

h3 {
	margin: 0;
	margin-bottom: 10px;
}

</style>

<script>
import AppLike from '@/components/AppLike'
import AppButton from '@/components/AppButton'
import AppPopup from '@/components/AppPopup'

export default {
	components: {
		AppLike,
		AppButton,
		AppPopup
	},
	data() {
		return {
			deliveryCompany: 'Daehan Tongun',
			rating: `${Math.floor(Math.random() * 5)} / 5`,
			likes: 0
		}
	},
	props: {
		info: {
			type: Object,
			default() {
				return {
					brand: 'Gap',
					color: '데님',
					'delivery-date': 2,
					gender: 'M',
					image: 'https://image.msscdn.net/images/goods_img/20190416/1014964/1014964_2_125.jpg',
					img_large: 'https://image.msscdn.net/images/goods_img/20180813/827198/827198_2_500.jpg',
					name: '멋쟁이 청바지',
					price: 10000,
					size: ['XS', 'S', 'M', 'L', 'XL'],
					type: 'pants'
				}
			}
		}
	},
	methods: {
		open() {
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		select() {
			this.$emit('select');
			this.close();
		}
	}
}
</script>
