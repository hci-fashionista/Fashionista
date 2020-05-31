<template>
	<div class='root flex'>
		<div class='flex'><img :src="require('@/images/' + src)" alt='Clothes Picture'></div>
		<div class='flex column info'>
			<div class='flex title'>
				<h1>{{ info.title }}</h1>
				<AppLike :likes='info.likes'/>
			</div>
			<hr />
			<div class='flex column'>
				<h3>Product Info</h3>
				<div class='table'>
					<div>Brand</div>
					<div>{{ info.brand }}</div>
					<div>Size</div>
					<div>{{ info.size }}</div>
					<div>Ratings</div>
					<div>{{ info.rating }}</div>
				</div>
			</div>
			<hr />
			<div class='flex column'>
				<h3>Price Info</h3>
				<div class='table'>
					<div>Price</div>
					<div>{{ info.price }} ₩</div>
					<div>Delivery</div>
					<div>{{ info.deliveryPrice }} ₩</div>
				</div>
			</div>
			<hr />
			<div class='flex column'>
				<h3>Delivery Info</h3>
				<div class='table'>
					<div>Company</div>
					<div>{{ info.deliveryCompany }}</div>
					<div>ETA</div>
					<div>{{ info.eta }} days</div>
				</div>
			</div>
			<div class='flex buttons'>
				<AppButton>Select</AppButton>
				<AppButton>Cancel</AppButton>
			</div>
		</div>
	</div>
</template>

<style scoped>
.root {
	width: 1000px;
	padding: 20px 40px;
}

img {
	object-fit: contain;
}

.flex {
	display: flex;

	&.title {
		justify-content: flex-start;
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
	}
}

.table {
	display: grid;
	grid-template-columns: 1fr 3fr;
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
import testclothes from '@/images/testclothes.png'
import AppLike from '@/components/AppLike'
import AppButton from '@/components/AppButton'

export default {
	components: {
		AppLike,
		AppButton
	},
	props: {
		src: {
			type: String,
			default: 'testclothes.png'
		},
		info: {
			type: Object,
			default() {
				return {
					title: '멋쟁이 청바지',
					likes: 198,
					brand: 'Gap',
					size: 'S / M / L / XL',
					rating: 4,
					price: 10000,
					deliveryPrice: 2500,
					deliveryCompany: 'Daehan Tongun',
					eta: 2
				}
			}
		}
	}
}
</script>
