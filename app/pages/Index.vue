<template>
	<main class="Index">
		<SideBar>
			<hr />
			<a>Best</a>
			<hr />
			<a>Men</a>
			<a>Women</a>
			<hr />
			<a>Top</a>
			<a>Outer</a>
			<a>Onepiece</a>
			<a>Pants</a>
			<a>Shirt</a>
			<a>Bag</a>
			<a>Sneakers</a>
			<a>Shoes</a>
			<a>Watch</a>
			<a>Headwear</a>
			<a>Jewelry</a>
		</SideBar>

		<div class='content'>
			<div class="rankings">
				<h1>New Item</h1>
				<div class="center">
					<ul class="coordinations_list">
						<li @click="showpopupCloth(value)" v-for="(value, index) in clothes" :key="index">
							<AppClothwithRank :clothId="index" :detail="value" />
						</li>
					</ul>
				</div>
			</div>
			<div class="rankings">
				<h1>Ranking</h1>
				<div class="center">
					<ul class="coordinations_list">
						<li @click="showpopupCoordi(value.detail)" v-for="(value, index) in coordinations" :key="index">
							<CoordinationwithRank :clothes="value.clothes" :detail="value.detail" :index="index"/>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<RankingCoordinationDetail ref="coordinationChooser" :Coordinations="selected_info" v-if="selected_info" />
		<DetailPopup ref="clothChooser" :info="selected_info_cloth" v-if="selected_info_cloth" />
	</main>
</template>

<style scoped>
	.Index {
		position: relative;
		display: flex;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.rankings{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		& > h1 {
			margin-left: 20px;
			align-self: start;
		}
	}
	.coordinations_list {
		list-style: none;
		padding: 0px 0px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin: 0 auto;
		grid-gap: 2vw;
		grid-auto-rows: minmax(100px, auto);

		& > li {
			margin: 20px 20px;
			cursor: pointer;
		}
	}
</style>

<script>
	import SideBar from "@/components/SideBar";
	import AppClothwithRank from "@/components/AppClothwithRank"
	import CoordinationwithRank from "@/components/CoordinationwithRank"
	import firebase from "@/src/firebase.js"
	import RankingCoordinationDetail from "@/components/RankingCoordinationDetail"
	import DetailPopup from "@/components/DetailPopup"
	import IconPlus from "@/images/IconPlus.svg?inline";

	export default {
		data() {
			return {
				coordinations: [],
				clothes: [],
				rankings: [],
				selected_info: {
					'id': '0nZifbU3OmmfCI6wRfSY',
					'name': "None",
					'description': "None",
					'totalPrice': '22000',
					'colors': ['파란색', '데님'],
					'clothes': {
						'top': '1033001',
						'pants': '1014964'
					},
					'bodyShape': {
						'height': '180-190',
						'weight': '80-90'
					},
					'tags': ["skinny_leg", "small_face", "long_leg"],
					'likes': 0,
					'reviews': [{'review_id': "None", 'review_content': "None"}],
					'published': false,
					'author' : "Dol Lee"
				},
				selected_info_cloth: {
					brand: 'Gap',
					color: '데님',
					'delivery-date': 2,
					gender: 'M',
					image: 'https://image.msscdn.net/images/goods_img/20190416/1014964/1014964_2_125.jpg',
					image_large: 'https://image.msscdn.net/images/goods_img/20180813/827198/827198_2_500.jpg',
					name: '멋쟁이 청바지',
					price: 10000,
					size: ['XS', 'S', 'M', 'L', 'XL'],
					type: 'pants'
				}
			}
		},
		components: {
			SideBar,
			AppClothwithRank,
			CoordinationwithRank,
			RankingCoordinationDetail,
			DetailPopup
		},
		methods:{
			showpopupCoordi(coordi){
				this.selected_info = coordi
				if(this.$refs.coordinationChooser){
					this.$refs.coordinationChooser.open();
				}
			},
			showpopupCloth(cloth){
				this.selected_info_cloth = cloth
				if(this.$refs.clothChooser){
					this.$refs.clothChooser.open();
				}
			},
		},
		async mounted() {
			const db = firebase.firestore()

			const generateElement = doc => ({ detail: { id: doc.id, ...doc.data() }, id: doc.id })
			// initialize coordinations
			const rankingSnap = await db.collection("ranking").where("published", "==", true).limit(4).get()
			const rankings = rankingSnap.docs.map(generateElement)
			const pushCoordInformation = async (coordination, idx, array) => {
				const { detail: { clothes } } = coordination
				const top = await db.collection("top").doc(clothes.top).get()
				const pants = await db.collection("pants").doc(clothes.pants).get()
				array[idx].clothes = [top.data(), pants.data()]
			}
			await Promise.all(rankings.map(pushCoordInformation))
			this.rankings = [
				...rankings.sort((c1, c2) => c1.detail.likes > c2.detail.likes ? -1 : 1)
			]

			const coordinationSnap = await db.collection("ranking").where("author", "==", "Dol Lee").limit(3).get()
			const coordinations = coordinationSnap.docs.map(generateElement)
			await Promise.all(coordinations.map(pushCoordInformation))
			this.coordinations = [ ...coordinations ]

			// initialize clothes
			const clothes = {}
			const topSnap = await db.collection("top").orderBy("image").limit(2).get()
			const pantsSnap = await db.collection("pants").orderBy("image").limit(2).get()
			const pushClothInformation = doc => ({ id: doc.id, ...doc.data() })
			this.clothes = [...topSnap.docs, ...pantsSnap.docs].map(pushClothInformation).sort(() => Math.random() - 0.5)
		}
	}
</script>
