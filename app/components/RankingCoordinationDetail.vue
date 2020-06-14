<template>
	<AppPopup ref='popup'>
		<div class="coordination_detail">
			<div class="clothes">
				<div  v-for="cloth in this.clothes_item" :key="cloth.id">
					<AppCloth :cloth="cloth"/>
				</div>
				<div class="color_match">
					<ColorScore :colors="this.Coordinations.colors" />
				</div>
			</div>

			<div class="textAndReview">
				<div class="texts">
					<p id="title">Title</p>
					<p id="title_content">{{this.Coordinations.name}}</p>

					<p id="description">Description</p>
					<p id="description_content">{{this.Coordinations.description}}</p>

					<p id="tag">Tags</p>
					<ul class="tags_list">
						<li v-for="tag_name in this.Coordinations.tags" :key="tag_name">
							<AppTag class="apptag" :name="tag_name"></AppTag>
						</li>
					</ul>
				</div>

				<div class="reviews">
					<p id="review">Reviews</p>
					<hr>
					<AppLike id="app_like" @newLikes="newLikes" :likes="this.Coordinations.likes"></AppLike>
					<hr>
					<ul class="reviews_list">
						<li v-if="this.Coordinations.reviews.length == 0">
							There is no review. You can write first review!
						</li>
						<li v-for="(review_set,i) in this.Coordinations.reviews" :key="i">
							<AppReview :id="review_set.review_id" :content="review_set.review_content"></AppReview>
						</li>
					</ul>
					<hr>
					<template v-if="!immutable">
						<div class="review_input">
							<input class="review_text" type="text" @keyup.enter="submitReview" v-model="my_review">
							<button class="review_submit" @click="submitReview" >submit</button>
						</div>
						<hr>
					</template>
				</div>
			</div>

			<div class="button">
				<AppButton color="primary" full-width @click="uploadShoppingCart" v-if="!immutable">
					<IconCart id="cart" />
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
		justify-content: space-between;
		align-items: center;
		padding: 30px;
		max-width: 1000px;
		width: 90vw;
		border-radius: 10px;

		background-color : var(--grey-900);

	}

	.clothes {
		display: flex;
		margin-bottom: 30px;
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

	.textAndReview {
		display: flex;
		width: 100%;
	}

	.texts {
		width: 100%;
		margin: 10px;
	}

	.tags_list {
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		list-style: none;

		overflow: auto;
		max-height: 150px;
	}

	.apptag {
		margin-left : 5px;
		margin-bottom: 10px;
	}

	.reviews {
		align-self: stretch;
		width: 100%;
		margin: 10px;
	}

	.reviews_list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		max-height: 300px;
		overflow: auto;
		padding: 0;

		li {
			padding-bottom: 5px;
		}
	}

	.review_input {
		display: flex;
		justify-content: flex-end;

		font-family: var(--main-font);
		font-style: normal;
		font-weight: normal;
		font-size: 13px;
		line-height: 21px;
	}

	.review_text {
		border: none;
		background: var(--grey-750);
		border-radius: 18px;
		flex: 1;
		margin-right: 10px;

		&:focus {
			outline: none;
		}
	}

	.review_submit {
		cursor: pointer;
		color: var(--grey-100);
		background: var(--grey-700);
		font-family: var(--main-font);
		font-size: 13px;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		transition: all .4s ease;
	}

	#title, #description, #tag, #review {
		font-family: var(--main-font);
		font-style: normal;
		font-weight: bold;
		font-size: 20px;
		line-height: 15px;
	}

	#title_content, #description_content {
		font-family: var(--main-font);
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 18px;

		background: var(--grey-800);
		border-radius: 5px;

		padding : 5px;
	}

	#app_like {
		margin: auto;
	}

	.buttons {
		display:flex;
		margin-top: 20px;

		button {
			display: flex;
			align-items: center;
			font-size: 1.0rem;
			margin: 0 10px;

			#cart {
				width: 1.5rem;
				height: 1.5rem;
				margin-right: 10px;
			}
		}
	}

</style>

<script>
	import AppButton from "@/components/AppButton";
	import AppCloth from "@/components/AppCloth";
	import AppLike from "@/components/AppLike";
	import AppPopup from "@/components/AppPopup";
	import AppReview from "@/components/AppReview";
	import AppTag from "@/components/AppTag";
	import ColorScore from "@/components/ColorScore";
	import IconCart from "@/images/IconCart.svg?inline";
	import TextInput from "@/components/TextInput";
	import firebase from "@/src/firebase.js";


	const db = firebase.firestore();

	export default {
		data() {
			return {
				clothes_item : [],
				my_review: ""
			}
		},
		watch: {
			Coordinations () {
				this.clothes_item=[];
				this.makeClothesList();
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
			immutable: Boolean
		},

		components: {
			AppCloth,
			ColorScore,
			AppButton,
			AppTag,
			AppLike,
			AppReview,
			TextInput,
			AppPopup,
			IconCart
		},

		methods: {
			makeClothesList() {
				const db = firebase.firestore();

				let topRef = db.collection("top").doc(this.Coordinations.clothes.top);
				let pantsRef = db.collection("pants").doc(this.Coordinations.clothes.pants);
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

			submitReview() {
				if(this.my_review == ""){
					return;
				}
				this.Coordinations.reviews.push({'review_id': "Dol Lee", 'review_content': this.my_review});
				const updateReview = this.Coordinations.reviews;
				const db = firebase.firestore();

				let coordiRef = db.collection("ranking").doc(this.Coordinations.id);
				let updateThings = coordiRef.update({
					reviews : updateReview
				});
				this.my_review = "";
			},

			open() {
				this.$refs.popup.open();
			},

			close() {
				this.$refs.popup.close();
			},

			async uploadShoppingCart() {
				await db.collection('cart').add(this.Coordinations);
				this.$router.push('/cart');
			},
			newLikes(newlikes){
				if(this.immutable)
					return;

				this.$emit('reload', this.Coordinations.id, newlikes);
			},
		},

		mounted() {
			this.makeClothesList()
		}
	}
</script>
