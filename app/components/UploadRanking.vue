<template>
	<AppPopup ref='popup'>
		<div class="coordination_detail">
			<div class="clothes">
				<div  v-for="cloth in this.clothes_item" :key="cloth.id">
					<AppClothwithObject :cloth="cloth"/>
				</div>
				<div class="color_match">
					<ColorScore :colors="this.Coordinations.colors" />
				</div>
			</div>

			<div class="textAndTag">
				<div class="texts">
					<p id="title">Title</p>
					<TextInput class="textinput" v-model="title_text"></TextInput>
					
					<p id="description">Description</p>
					<TextInput class="textinput" v-model="description_text"></TextInput>
					
					<p id="heightweight">Body Shape</p>
					<div class="select_list">
						<select v-model="selected_height">
							<option disabled value="">Height</option>
							<option>-150</option>
							<option>150-160</option>
							<option>160-170</option>
							<option>170-180</option>
							<option>180-190</option>
							<option>190-</option>
						</select>
						<select v-model="selected_weight">
							<option disabled value="">Weight</option>
							<option>-50</option>
							<option>50-60</option>
							<option>60-70</option>
							<option>70-80</option>
							<option>80-90</option>
							<option>90-</option>
						</select>
					</div>
				</div>
				
				<div class="tag_input_div">
					<p id="tags">Tags</p>
					<TagInput :already_selected="this.Coordinations.tags" @tagChanged="tagChanged" small/>
				</div>
			</div>
			
			<div class="buttons">
				<AppButton @click="saveCoordinationDetail">
					save
				</AppButton>
				<AppButton @click="uploadToRanking">
					Upload to Ranking
				</AppButton>
				<AppButton>
					To Shopping Cart
				</AppButton>
				<AppButton @click="close">
					Cancel
				</AppButton>
			</div>
		</div>
	</AppPopup>
</template>


<style scoped>
	.coordination_detail {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
		max-width: 2000px;
		border-radius: 10px;

		background-color : var(--grey-900);
	}

	.clothes {
		display: flex;
		margin-bottom: 20px;
	}

	.color_match {
		display: flex;

		& >>> .flex {
			font-size : 20px;
		}

		& >>> .dot {
			width: 30px;
			height: 30px;
		}
	}

	.textAndTag {
		display: flex;
	}

	.texts, .tag_input_div{
		width: 100%;
		margin: 10px;
	}

	.textinput >>> input {
		width: 100%;

		font-family: Raleway;
		font-style: normal;
		font-weight: 500;
		font-size: 16px;

		background: var(--grey-800);
		border-radius: 5px;

		padding : 5px;

		&:focus {
			outline: none;
		}
	}

	#title, #description, #heightweight, #tags {
		font-family: Raleway;
		font-style: normal;
		font-weight: bold;
		font-size: 13px;
		line-height: 15px;
	}

	.buttons {
		display:flex;
		
		& >>> button {
			font-size: 13px;
		}

		& > * {
			margin: 5px;
		}
	}

</style>

<script>
	import AppClothwithObject from "@/components/AppClothwithObject";
	import ColorScore from "@/components/ColorScore";
	import AppTag from "@/components/AppTag";
	import AppReview from "@/components/AppReview";
	import AppButton from "@/components/AppButton";
	import AppLike from "@/components/AppLike";
	import TextInput from "@/components/TextInput";
	import TagInput from "@/components/TagInput";
	import AppPopup from "@/components/AppPopup";
	import firebase from "@/src/firebase.js";
	
	export default {
		data() {
			return {
				clothes_item : [],
				title_text : this.Coordinations.name,
				description_text: this.Coordinations.description,
				selected_height : this.Coordinations.bodyShape.height,
				selected_weight : this.Coordinations.bodyShape.weight,
				selected_tags: this.Coordinations.tags
			}
		},
		props: {
			Coordinations :{
				type: Object,
				default : ()=>{
					return {
						'id': '0nZifbU3OmmfCI6wRfSY',
						'name': "None",
						'description': "None",
						'totalPrice': 22000,
						'colors': ['파란색', '데님'],
						'clothes': ['1033001', '1014964'],
						'bodyShape': {
							'height': '180-190',
							'weight': '80-90'
						},
						'tags': ["skinny_legs", "long_legs"],
						'likes': 0,
						'reviews': [{'review_id': "None", 'review_content': "None"}],
						'published': false,
						'author' : "Dol Lee"
					}
					
				}
			},
		},

		components: {
			AppClothwithObject,
			ColorScore,
			AppButton,
			AppTag,
			AppLike,
			AppReview,
			TextInput,
			TagInput,
			AppPopup
		},

		methods: {
			tagChanged(received){
                this.selected_tags = received;
            },
			clothesList(clothId) {
				const db = firebase.firestore();
				
				let topRef = db.collection("top").doc(clothId);
				let pantsRef = db.collection("pants").doc(clothId);
				let getTopDoc = topRef.get()
					.then(doc => {
						if (doc.exists) {
							let data = {
								name : doc.data().name,
								id : doc.id,
								price : doc.data().price,
								image : doc.data().image
							}
							this.clothes_item.push(data);
						}
					})
					.catch(err => {
					});
				let getPantsDoc = pantsRef.get()
					.then(doc => {
						if (doc.exists) {
							let data = {
								name : doc.data().name,
								id : doc.id,
								price : doc.data().price,
								image : doc.data().image
							}
							this.clothes_item.push(data);
						}
					})
					.catch(err => {
					});

			},
			makeClothesList() {
				for (var i=0; i< this.Coordinations.clothes.length; i++){
					this.clothesList(this.Coordinations.clothes[i])
				}
			},
			saveCoordinationDetail() {
				const db = firebase.firestore();
				
				let coordiRef = db.collection("myCoordinations").doc(this.Coordinations.id);
				let updateThings = coordiRef.update({
					name: this.title_text,
					description: this.description_text,
					bodyShape: {
						height: this.selected_height,
						weight: this.selected_weight
					},
					tags: this.selected_tags
				});
			},
			uploadToRanking() {
				if(this.Coordinations.published){
					return;
				}
				const db = firebase.firestore();
				
				let coordiRef = db.collection("myCoordinations").doc(this.Coordinations.id);
				let updateThings = coordiRef.update({
					published: true
				});
			},
			
			open() {
				this.$refs.popup.open();
			},

			close() {
				this.$refs.popup.close();
			}
		},

		beforeMount() {
			this.makeClothesList()
		},

		mounted() {
			this.open()
		}
	}
</script>