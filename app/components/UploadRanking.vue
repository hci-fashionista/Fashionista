<template>
	<div class="coordination_detail">
		<div class="clothes">
			<div  v-for="cloth in this.clothes_item" :key="cloth.id">
				<img :src="cloth.image" alt="cloth image" width="100" height="100">
				<p>{{cloth.price}}</p>
			</div>
			<div class="color_match">
			</div>
		</div>

		<div class="texts">
			<p id="title">Title</p>
			<TextInput v-model="title_text"></TextInput>
			
			<p id="description">Description</p>
			<TextInput v-model="description_text"></TextInput>
			
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
		
		<p id="tags">Tags</p>
		<TagInput @tagChanged="tagChanged"/>
		
		<div class="button">
			<AppButton @click="saveCoordinationDetail">
				save
			</AppButton>
			<AppButton @click="uploadToRanking">
				Upload to Ranking
			</AppButton>
			<AppButton>
				To Shopping Cart
			</AppButton>
			<AppButton>
				Cancel
			</AppButton>
		</div>
	</div>
</template>

<style scoped>
	.coordination_detail {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
		max-width: 400px;

		background-color : var(--grey-850);
	}

	.clothes {
		display: flex;
	}

	.tags_list {
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		list-style: none;
	}

	.reviews {
		align-self: stretch;
	}

	.reviews_list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		max-height: 300px;
		overflow: auto;
		padding: 0;
	}

	#title, #description {
		font-family: Raleway;
		font-style: normal;
		font-weight: bold;
		font-size: 12.3882px;
		line-height: 15px;
	}

	#title_content, #description_content {
		font-family: Raleway;
		font-style: normal;
		font-weight: 500;
		font-size: 15.6691px;
		line-height: 18px;

		background: var(--grey-800);
		border-radius: 5px;

		padding : 5px;
	}

	#app_like {
		margin: auto;
	}

</style>

<script>
	import AppCloth from "@/components/AppCloth";
	import AppTag from "@/components/AppTag";
	import AppReview from "@/components/AppReview";
	import AppButton from "@/components/AppButton";
	import AppLike from "@/components/AppLike";
	import TextInput from "@/components/TextInput";
	import TagInput from "@/components/TagInput";
	import firebase from "@/src/firebase.js";
	
	export default {
		data() {
			return {
				clothes_item : [],
				title_text : "",
				description_text: "",
				selected_height : "",
				selected_weight : "",
				selected_tags: []
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
						'tags': ["skinny_leg", "small_face", "long_leg"],
						'likes': 0,
						'reviews': [{'review_id': "None", 'review_content': "None"}],
						'published': false,
						'author' : "Dol Lee"
					}
					
				}
			},
		},

		components: {
			AppCloth,
			AppButton,
			AppTag,
			AppLike,
			AppReview,
			TextInput,
			TagInput
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
			}
		},

		beforeMount() {
			this.makeClothesList()
		}
	}
</script>