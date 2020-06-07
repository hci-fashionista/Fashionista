<template>
	<main class="Index">
		<SideBar>
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
						<li v-for="(value, id, index) in clothes" :key="index">
							<AppClothwithRank :clothId="index" :detail="value" />
						</li>
					</ul>
				</div>
			</div>
			<div class="rankings">
				<h1>Ranking</h1>
				<div class="center">
					<ul class="coordinations_list">
						<li @click="showpopup(value.detail)" v-for="(value, name, index) in coordinations" :key="index">
							<CoordinationwithRank :clothes="value.clothes" :detail="value.detail" :index="index"/>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<RankingCoordinationDetail ref="coordinationChooser" :Coordinations="selected_info" v-if="selected_info">
        </RankingCoordinationDetail>
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
        grid-gap: 3vw;
        grid-auto-rows: minmax(100px, auto);

		& > li {
			margin: 20px 20px;
		}
	}
</style>

<script>
	import SideBar from "@/components/SideBar";
	import AppClothwithRank from "@/components/AppClothwithRank"
	import CoordinationwithRank from "@/components/CoordinationwithRank"
	import firebase from "@/src/firebase.js"
	import RankingCoordinationDetail from "@/components/RankingCoordinationDetail"

	export default {
		data() {
			return {
				coordinations: {},
				clothes: {},
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
				}
			}
		},
		components: {
			SideBar,
			AppClothwithRank,
			CoordinationwithRank,
			RankingCoordinationDetail
		},
		methods:{
			showpopup(coordi){
                console.log(coordi)
                this.selected_info = coordi
				if(this.$refs.coordinationChooser){
					this.$refs.coordinationChooser.open();
				}
					
            },
		},
		async mounted() {
			const db = firebase.firestore()

			// initialize coordinations
			const coordinations = {}
			const rankingSnap = await db.collection("ranking").get()
			rankingSnap.forEach((doc, idx) => {
				coordinations[doc.id] = { "detail": doc.data() }
			})
			const pushCoordInformation = async docid => {
				const { detail: { clothes } } = coordinations[docid]
				const top = await db.collection("top").doc(clothes.top).get()
				const pants = await db.collection("pants").doc(clothes.pants).get()
				coordinations[docid].clothes = [top.data(), pants.data()]
			}
			await Promise.all(Object.keys(coordinations).map(pushCoordInformation))
			this.coordinations = { ...coordinations }

			// initialize clothes
			const clothes = {}
			const topSnap = await db.collection("top").orderBy("image").limit(2).get()
			const pantsSnap = await db.collection("pants").orderBy("image").limit(2).get()
			const pushClothInformation = doc => { clothes[doc.id] = doc.data() }
			topSnap.forEach(pushClothInformation)
			pantsSnap.forEach(pushClothInformation)
			this.clothes = Object.keys(clothes).sort(() => Math.random() - 0.5).reduce((acc, key) => ({ ...acc, [key]: clothes[key] }), {})
		}
	}
</script>
