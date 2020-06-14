<template>
	<div class="root flex">
		<div class="container flex">
			<div class="cart flex">
				<h1>Shopping Cart</h1>
				<ul class="coordinations_list">
					<li @click="showpopup(coordination)" v-for="(coordination, index) in total_coordinations" :key="coordination.id">
						<CoordinationwithRank :clothes="clothes_dict[coordination.id]" :detail="coordination" :index="index" />
					</li>
				</ul>
			</div>
			<RankingCoordinationDetail
				ref="coordinationChooser"
				:Coordinations="selected_info"
				v-if="selected_info"
				immutable
			/>
		</div>
	</div>
</template>

<style scoped>
	.flex {
		display: flex;

		& .center {
			justify-content: center;
		}

		&.root {
			flex-direction: column;
			align-items: center;
		}

		&.container{
			width: 80vw;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	.search, .cart{
		max-width: 1500px;
		width: 90%;
		flex-direction: column;

		& > h1 {
			margin-left: 0;
			align-self: start;
			font-size: 2.4rem;
		}
	}

	.cart {
		& > h1 {
			margin-bottom: 0;
		}
	}

	.search {
		& .preset {
			border: 0.5px solid var(--grey-700);
			border-radius: 10px;
		}
	}

	.collapse {
		& > button {
			border: none;
			cursor: pointer;
			outline: none;
			display: flex;
			background: transparent;
			align-items: center;
			font-family: var(--main-font);
			font-weight: 300;
			font-size: 1.3rem;
			color: var(--blue-500);
			align-self: start;
			margin: 10px 0;
			padding: 0px 10px;
		}

		&--opened svg {
			transform: rotate(180deg);
		}

		& svg {
			stroke: var(--grey-300);
			transition: all .4s ease;
		}

		&-message {
			color: var(--grey-300);
			font-weight: bold;
			font-size: 1rem;
			margin-top: 10px;
		}
	}

	.body {
		align-self: flex-start;
		margin: 30px 30px;
		display: flex;
		width: 22%;

		& > select{
			min-width: 130px;
			width: 50%;
			min-height: 40px;
			border-radius: 10px;
			padding: 10px;
			font-size: medium;
			margin-right: 20px;
		}
	}

	.tag_area {
		width: 100%;
		align-self: flex-start;
	}

	.coordinations_list {
		list-style: none;
		padding: 0px 0px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 10px;
		grid-auto-rows: minmax(100px, auto);

		& > li {
			margin: 20px 20px;
		}
	}
</style>

<script>
	import AppClothwithRank from "@/components/AppClothwithRank"
	import firebase from "../src/firebase.js"
	import CoordinationwithRank from "@/components/CoordinationwithRank"
	import RankingCoordinationDetail from "@/components/RankingCoordinationDetail"


	const db = firebase.firestore()
	export default {
		data() {
			return {
				selected_tag_names: [],
				total_coordinations: [],
				clothes_dict: {},
				selected_info: null
			}
		},

		methods: {
			showpopup(coordi){
				this.selected_info = coordi
				this.$nextTick(() => {
					if(this.$refs.coordinationChooser)
						this.$refs.coordinationChooser.open();
				});
			},
		},
		mounted() {
			db.collection("cart").get().then(async querySnapshot => {
				const total_coordinations = [];
				await querySnapshot.forEach((doc)=>{
					let dataObject = doc.data()
					dataObject["id"] = doc.id
					if(dataObject["published"]){
						total_coordinations.push(dataObject)
					}
				});

				return total_coordinations;
			})
			.then(async total_coordinations => {
				await Promise.all(total_coordinations.map(async (coordination)=>{
					let clothes = coordination.clothes
					let docRef_top = db.collection("top").doc(clothes.top)
					let docRef_pants = db.collection("pants").doc(clothes.pants)
					this.clothes_dict[coordination.id] = []
					await docRef_top.get().then((data)=>{
						if (data.exists) {
							this.clothes_dict[coordination.id].push(data.data())
						}
					})
					await docRef_pants.get().then((data)=>{
						if (data.exists) {
							this.clothes_dict[coordination.id].push(data.data())
						}
					})
				}))

				return total_coordinations
			})
			.then(total_coordinations => {
				this.total_coordinations = total_coordinations.sort(function(coord1, coord2){
					return coord2.likes - coord1.likes
				})
			})
		},
		components: {
			AppClothwithRank,
			CoordinationwithRank,
			RankingCoordinationDetail
		}
	}
</script>
