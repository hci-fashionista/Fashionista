<template>
	<div class='flex center'>
		<div class="flex container">
			<div class="flex coordinations">
				<h1>My Coordinations</h1>
				<ul class="coordinations_list">
					<li class="create">
						<button @click="toGuideline">
							<IconPlus style="width: 5rem; height: 5rem; fill: var(--grey-300)" />
						</button>
						<p>Create By Guideline</p>
					</li>
					<li @click="uploadRankingPopupOpen(coordination)" v-for="(coordination, index) in my_coordinations">
						<CoordinationwithRank :clothes="clothes_dict[coordination.id]" :detail="coordination" :index="index" :new-item="index === 0"/>
					</li>
				</ul>
			</div>
			<UploadRanking ref="uploadRankingPopup" :Coordinations="selected_info" v-if="selected_info" @updateCloth="updateCloth" />
		</div>
	</div>
</template>

<style scoped>
	.flex {
		display: flex;

		&.center {
			justify-content: center;
		}

		&.container{
			width: 80vw;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	.coordinations {
		max-width: 1500px;
		flex-direction: column;

		& > h1 {
			margin-bottom: 0;
			align-self: start;
			font-size: 2.4rem;
		}
	}

	.flex.coordinations > ul {
		list-style: none;
		padding: 0px 0px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 10px;
		width: 100%;

		& > .create {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 20px 20px;

			& > p {
				font-size: 20px;
				margin: 10px;
				text-align: center;
			}

			& > button {
				width: 160px;
				height: 160px;
				border: none;
				border-radius: 10px;
				cursor: pointer;
				outline: none;
				align-self: center;
				font-size: 100px;
				background-color: var(--grey-750)
			}
		}

		& > li {
			margin: 20px 20px;
		}
	}
</style>

<script>
	import AppClothwithRank from "@/components/AppClothwithRank"
	import AppTag from "@/components/AppTag"
	import firebase from "../src/firebase.js"
	import CoordinationwithRank from "@/components/CoordinationwithRank"
	import UploadRanking from "@/components/UploadRanking"
	import IconPlus from "@/images/IconPlus.svg?inline";

	const db = firebase.firestore()

	export default {
		data() {
			return {
				my_coordinations: [],
				height: "150~160",
				weight: "50~60",
				clothes_dict: {},
				selected_info: null
			}
		},

		computed: {
			new_coordinations() {
				return this.my_coordinations;
			}
		},

		methods: {
			uploadRankingPopupOpen(coordi) {
				this.selected_info = coordi;
				this.$nextTick(() => {
					if(this.$refs.uploadRankingPopup)
						this.$refs.uploadRankingPopup.open();
				});
			},
			filtering(coordination){
				if (coordination.author == "Dol Lee") {
					return true;
				}
				else {
					return false;
				}
			},
			toGuideline() {
				this.$router.push('/coordinations/new');
			},
			updateCloth(...args) {
				this.my_coordinations.forEach(coordination => {
					if(coordination.id == args[0]){
						coordination.name = args[1],
						coordination.description=args[2],
						coordination.bodyShape= {
							height: args[3],
							weight: args[4]
						},
						coordination.tags= args[5]
					}
				})
			},
			makeMyCoordinations() {
				db.collection("ranking").get().then(async (querySnapshot)=>{
					const total_coordinations = [];

					await querySnapshot.forEach((doc)=>{
						// doc.data() is never undefined for query doc snapshots
						let dataObject = doc.data()
						dataObject["id"] = doc.id
						total_coordinations.push(dataObject)
					});

					return total_coordinations
				})
				.then(async total_coordinations =>{
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

					return total_coordinations;
				})
				.then(total_coordinations => {
					this.my_coordinations = total_coordinations
						.filter(coordination => this.filtering(coordination))
						.sort((c1, c2) => c1.date < c2.date ?  -1 : 1)
				})
			}
		},
		mounted() {
			this.makeMyCoordinations();
		},
		components: {
			AppClothwithRank,
			AppTag,
			CoordinationwithRank,
			UploadRanking,
			IconPlus
		}
	}
</script>
