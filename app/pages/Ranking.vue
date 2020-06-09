<template>
	<div class='root flex'>
		<div class="container flex">
			<div class="search flex">
				<h1>Preset</h1>
				<div class='preset'>
					<div v-if="isPresetOpen">
						<div class="body flex">
							<select id="height" name="height" v-model="height">
								<option value="all">All Height</option>
								<option value="-150">-150cm</option>
								<option value="150-160">150cm-160cm</option>
								<option value="160-170">160cm-170cm</option>
								<option value="170-180">170cm-180cm</option>
								<option value="180-190">180cm-190cm</option>
								<option value="190-">190cm-</option>
							</select>
							<select id="weight" name="weight" v-model="weight">
								<option value="all">All Weight</option>
								<option value="-50">-50kg</option>
								<option value="50-60">50kg-60kg</option>
								<option value="60-70">60kg-70kg</option>
								<option value="70-80">70kg-80kg</option>
								<option value="80-90">80kg-90kg</option>
								<option value="90-">90kg-</option>
							</select>
						</div>
						<div class="tag_area">
							<TagInput v-model="selected_tag_names"/>
						</div>
					</div>
					<div v-else></div>
					<div class="flex center collapse" :class="{'collapse--opened': isPresetOpen}">
						<div v-if="!isPresetOpen" class="flex center collapse-message">
							Toggle Preset
						</div>
						<button @click="togglePreset">
							<IconDropdown />
						</button>
					</div>
				</div>
			</div>
			<div class="rankings flex">
				<h1>Ranking</h1>
				<ul class="coordinations_list">
					<li @click="showpopup(coordination)" v-for="(coordination, index) in selected_coordinations" :key="coordination.id">
						<CoordinationwithRank :clothes="clothes_dict[coordination.id]" :detail="coordination" :index="index" />
					</li>
				</ul>
			</div>
			<RankingCoordinationDetail @reload="reload" ref="coordinationChooser" :Coordinations="selected_info" v-if="selected_info" />
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

	.search, .rankings{
		max-width: 1500px;
		width: 90%;
		flex-direction: column;

		& > h1 {
			margin-left: 0;
			align-self: start;
			font-size: 2.4rem;
		}
	}

	.rankings {
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
	import AppTag from "@/components/AppTag"
	import TagInput from "@/components/TagInput"
	import firebase from "../src/firebase.js"
	import CoordinationwithRank from "@/components/CoordinationwithRank"
	import RankingCoordinationDetail from "@/components/RankingCoordinationDetail"
	import IconDropdown from "@/images/IconDropdown.svg?inline";

	const db = firebase.firestore()
	export default {
		data() {
			return {
				selected_tag_names: [],
				total_coordinations: [],
				height: "all",
				weight: "all",
				clothes_dict: {},
				selected_info: null,
				isPresetOpen: true
			}
		},

		computed: {
			selected_coordinations() {
				return this.total_coordinations.filter(coordination => this.filtering(coordination));
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
			tagChanged(received){
				this.selected_tag_names = received
			},
			filtering(coordination){
				let coordination_height = coordination.bodyShape.height
				let coordination_weight = coordination.bodyShape.weight
				let selected_tags = this.selected_tag_names
				if(this.height !="all" && coordination_height != this.height){
					return false
				}
				else if(this.weight !="all" && coordination_weight != this.weight){
					return false
				}
				else{
					if(selected_tags.length < 1){
						return true
					}
					else if (coordination.tags.filter(tag => selected_tags.includes(tag)).length >= selected_tags.length){
						return true
					}
					else
						return false
				}

			},
			togglePreset(event) {
				this.isPresetOpen = !this.isPresetOpen
			},
			reload(...args){
				const db = firebase.firestore();
				let coordiRef = db.collection("ranking").doc(args[0]);
				let updateThings = coordiRef.update({
					likes : args[1]
				});

				this.total_coordinations.forEach(coordination => {
					if(coordination.id == args[0]){
						coordination.likes = args[1]
					}
				})
			}
		},
		mounted() {
			db.collection("ranking").get().then(async querySnapshot => {
				const total_coordinations = [];
				await querySnapshot.forEach((doc)=>{
					// doc.data() is never undefined for query doc snapshots
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
			AppTag,
			TagInput,
			CoordinationwithRank,
			RankingCoordinationDetail,
			IconDropdown
		}
	}
</script>
