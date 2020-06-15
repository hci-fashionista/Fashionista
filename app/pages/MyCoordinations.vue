<template>
	<div class='flex center'>
		<div class="flex container">
			<div class="flex coordinations">
				<div class="flex heading">
					<h1>My Coordinations</h1>
					<div class="flex">
						<span @click="sortBy('date')" :class="fieldClass('date')"> ↓ Date </span>
						<span @click="sortBy('totalPrice')" :class="fieldClass('totalPrice')"> ↓ Price </span>
						<span @click="sortBy('likes')" :class="fieldClass('likes')"> ↓ Likes </span>
					</div>
				</div>
				<ul class="coordinations_list">
					<li class="create">
						<button @click="toGuideline">
							<IconPlus style="width: 5rem; height: 5rem; fill: var(--grey-300)" />
						</button>
						<p>Create By Guideline</p>
					</li>
					<li @click="uploadRankingPopupOpen(coordination.detail)" v-for="(coordination, index) in my_coordinations">
						<CoordinationwithRank :clothes="coordination.clothes" :detail="coordination.detail" :index="index" :new-item="sort_field === 'date' && index === 0"/>
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

	.flex.heading {
		align-items: center;

		& > h1 {
			margin-right: 30px;
		}

		& > div {
			font-size: 1.5rem;
		}

		& > div > span {
			margin: 0 30px;
			text-transform: capitalize;
			cursor: pointer;
		}
	}

	.greyed {
		color: var(--grey-550);
	}

	.flex.coordinations {
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

	export default {
		data() {
			return {
				my_coordinations: [],
				height: "150~160",
				weight: "50~60",
				clothes_dict: {},
				selected_info: null,
				sort_field: 'date'
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
			filtering(coordination) {
				return coordination.author === "Dol Lee"
			},
			toGuideline() {
				this.$router.push('/coordinations/new');
			},
			updateCloth(...args) {
				this.my_coordinations.forEach(coordination => {
					if (coordination.detail.id !== args[0])
						return
					coordination.detail.name = args[1],
					coordination.detail.description=args[2],
					coordination.detail.bodyShape= {
						height: args[3],
						weight: args[4]
					},
					coordination.detail.tags= args[5]
				})
			},
			sortBy(field) {
				this.sort_field = field
				this.my_coordinations = [
					...this.my_coordinations
						.sort((c1, c2) => c1.detail[field] > c2.detail[field] ? -1 : 1)
				]
			},
			fieldClass(field) {
				return {
					greyed: this.sort_field !== field
				}
			},
			async makeMyCoordinations() {
				/*NOTE:
				This function initializes `this.my_coordinations`.
				This is the structure of this.my_coordinations:
				[
					{
						id: (document id)
						detail: (document object of `ranking` collection)
						clothes: [
							(document object of `top` collection),
							(document object of `pants` collection)
						]
					}
				]*/
				const db = firebase.firestore()
				const rankingSnap = await db.collection("ranking").get()
				const coordinations = rankingSnap.docs.map(doc => ({
					detail: {
						id: doc.id,
						...doc.data()
					},
					id: doc.id
				}))
				const pushCoordInformation = async (coordination, idx) => {
					const { detail: { clothes } } = coordination
					const top = await db.collection("top").doc(clothes.top).get()
					const pants = await db.collection("pants").doc(clothes.pants).get()
					coordinations[idx].clothes = [top.data(), pants.data()]
				}
				await Promise.all(coordinations.map(pushCoordInformation))
				this.my_coordinations = [
					...coordinations
						.filter(c => this.filtering(c.detail))
						.sort((c1, c2) => c1.detail.date > c2.detail.date ? -1 : 1)
				]
			}
		},
		async mounted() {
			await this.makeMyCoordinations();
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
