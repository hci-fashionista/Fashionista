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
			<p id="title_content">{{this.Coordinations.name}}</p>
			
			<p id="description">Description</p>
			<p id="description_content">{{this.Coordinations.description}}</p>
			
		</div>
		
		<ul class="tags_list">
			<li v-for="tag_name in this.Coordinations.tags" :key="tag_name">
				<AppTag :name="tag_name"></AppTag>
			</li>
		</ul>
		
		<div class="reviews">
			<hr>
			<AppLike id="app_like" :likes="12"></AppLike>
			<hr>
			<ul class="reviews_list">
				<li v-for="(review_set,i) in this.Coordinations.reviews" :key="i">
					<AppReview :id="review_set.review_id" :content="review_set.review_content"></AppReview>
				</li>
			</ul>
			<hr>
		</div>
		
		<div class="button">
			<AppButton>
				To Shopping Cart
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
				clothes_item : []
			}
		},
		props: {
			Coordinations :{
				type: Object,
				default : ()=>{
					return {
						'id': 'None',
						'name': "None",
						'description': "None",
						'totalPrice': 22000,
						'colors': [],
						'clothes': ['1306665', '1014964'],
						'bodyShape': {
							'height': '180-190',
							'weight': '80-90'
						},
						'tags': ["skinny_leg", "small_face", "long_leg"],
						'likes': 0,
						'reviews': [{'review_id': "None", 'review_content': "None"}],
						'published': true,
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
			}
		},

		beforeMount() {
			this.makeClothesList()
		}
	}
</script>