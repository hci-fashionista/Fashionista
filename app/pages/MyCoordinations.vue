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
						<p>Create</p>
					</li>
					<li @click="uploadRankingPopupOpen(coordination)" v-for="(coordination, index) in my_coordinations">
						<CoordinationwithRank :clothes="clothes_dict[coordination.id]" :detail="coordination" :index="index" />
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

		& li {
			cursor: pointer;
		}
	}

	.flex.coordinations > ul {
		list-style: none;
		padding: 0px 0px;
		justify-items: center;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 10px;
		grid-auto-rows: minmax(100px, auto);
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
	import TagInput from "@/components/TagInput"
	import firebase from "../src/firebase.js"
	import CoordinationwithRank from "@/components/CoordinationwithRank"
	import UploadRanking from "@/components/UploadRanking"
	import IconPlus from "@/images/IconPlus.svg?inline";

	const db = firebase.firestore()

	export default {
		data() {
			return {
				clothIds: [1,2,3,4,5,6,7,8,9],
				total_coordinations: [],
				my_coordinations: [],
				height: "150~160",
				weight: "50~60",
				clothes_dict: {},
				selected_info: null
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
			updateCloth() {
				this.total_coordinations = [];
				this.my_coordinations = [];
				this.clothes_dict = {};
				this.makeMyCoordinations();
			},
			makeMyCoordinations() {
				db.collection("ranking").get().then(async (querySnapshot)=>{
					await querySnapshot.forEach((doc)=>{
						// doc.data() is never undefined for query doc snapshots
						let dataObject = doc.data()
						dataObject["id"] = doc.id
						this.total_coordinations.push(dataObject)
					});
				})
				.then(async ()=>{
					await Promise.all(this.total_coordinations.map(async (coordination)=>{
						let clothes = coordination.clothes
						let docRef_top = db.collection("top").doc(clothes.top)
						let docRef_pants = db.collection("pants").doc(clothes.pants)
						this.clothes_dict[coordination.id] = []
						await docRef_top.get().then((data)=>{
							if (data.exists) {
								this.clothes_dict[coordination.id].push(data.data())
							} else {
							}
						})
						await docRef_pants.get().then((data)=>{
							if (data.exists) {
								this.clothes_dict[coordination.id].push(data.data())
							} else {
							}
						})
					}))
				})
				.then(()=>{
					this.my_coordinations = this.total_coordinations.filter(coordination => this.filtering(coordination))
					// this.selected_coordinations = JSON.parse(JSON.stringify(this.total_coordinations))
				})
			}
		},
		mounted() {
			this.makeMyCoordinations();
		},
		components: {
			AppClothwithRank,
			AppTag,
			TagInput,
			CoordinationwithRank,
			UploadRanking,
			IconPlus
		}
	}
</script>
