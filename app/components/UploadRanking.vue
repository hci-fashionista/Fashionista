<template>
	<div>
		<AppPopup ref='popup' @popupClose= "deleteAll">
			<div class="coordination_detail">
				<div class="clothes">
					<p id="title">Clothes</p>
					<div @click="showpopupCloth(cloth)" v-for="cloth in this.clothes_item" :key="cloth.id">
						<AppCloth :cloth="cloth"/>
					</div>
					<div class="color_match">
						<p id="color_match_score">Color Match Score</p>
						<ColorScore :colors="this.Coordinations.colors" />
					</div>
				</div>

				<div class="textAndTag">
					<div class="texts">
						<p id="title">Title *</p>
						<TextInput class="textinput" v-model="title_text" id="tit_text"></TextInput>

						<p id="description">Description *</p>
						<TextInput class="textinput" v-model="description_text" id="des_text"></TextInput>

						<p id="heightweight">Body Shape *</p>
						<div class="select_list">
							<div>
								<label> Height </label>
								<select v-model="selected_height">
									<option disabled value="">height</option>
									<option>-150</option>
									<option>150-160</option>
									<option>160-170</option>
									<option>170-180</option>
									<option>180-190</option>
									<option>190-</option>
								</select>
							</div>
							<div>
								<label> Weight </label>
								<select v-model="selected_weight">
									<option disabled value="">weight</option>
									<option>-50</option>
									<option>50-60</option>
									<option>60-70</option>
									<option>70-80</option>
									<option>80-90</option>
									<option>90-</option>
								</select>
							</div>
						</div>
					</div>

					<div class="tag_input_div">
						<p id="tags">Tags *</p>
						<TagInput v-model="selected_tags" small/>
					</div>
				</div>

				<div class="buttons">
					<AppButton @click="saveCoordinationDetail" :disabled="canSave" :color="btnSave">
						{{saveMsg}}
					</AppButton>
					
					
					<AppButton class="uploadRanking" @click="uploadToRanking" :disabled="canUpload" :color="btnUpload">
						<div class="uploadPopUp" @click="clickEvent">
							<IconUpload id="upload"/>
							{{uploadMsg}}
						</div>
					</AppButton>
					
					<AppButton>
						<IconCart id="cart" />
						To Shopping Cart
					</AppButton>
					<AppButton @click="close">
						Cancel
					</AppButton>
				</div>
			</div>
		</AppPopup>
		<DetailPopup ref="clothChooser" not_selectable :info="selected_info_cloth" v-if="selected_info_cloth" />
	</div>
</template>


<style scoped>
	.coordination_detail {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
		max-width: 1000px;
		width: 90vw;
		border-radius: 10px;

		background-color : var(--grey-900);
	}

	.clothes {
		display: flex;
		margin-bottom: 20px;
	}

	.color_match {
		display: flex;
		flex-direction: column;
		justify-items: center;
		padding-left: 10px;

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
		width: 100%;
	}

	.texts, .tag_input_div{
		width: 100%;
		margin: 10px;
		flex: 1;
	}

	.textinput >>> input {
		width: 100%;

		font-family: var(--main-font);
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

	.select_list {
		display: flex;
		justify-content: space-around;
	}

	#title, #description, #heightweight, #tags{
		font-family: var(--main-font);
		font-style: normal;
		font-weight: bold;
		font-size: 20px;
		line-height: 15px;
	}

	label, #color_match_score {
		font-family: var(--main-font);
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
	}

	.buttons {
		display:flex;
		margin-top: 20px;

		.uploadRanking{
			padding: 0px;
		}
		.uploadPopUp{
			padding: 10px 20px;
		}
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

			#upload {
				width: 1.2rem;
				height: 1.2rem;
				margin-right: 10px;
			}

			&.primary svg {
				fill: var(--grey-900) !important;
			}
		}
	}

</style>

<script>
	import AppCloth from "@/components/AppCloth";
	import ColorScore from "@/components/ColorScore";
	import AppTag from "@/components/AppTag";
	import AppReview from "@/components/AppReview";
	import AppButton from "@/components/AppButton";
	import AppLike from "@/components/AppLike";
	import TextInput from "@/components/TextInput";
	import TagInput from "@/components/TagInput";
	import AppPopup from "@/components/AppPopup";
	import firebase from "@/src/firebase.js";
	import DetailPopup from "@/components/DetailPopup"


	import IconCart from "@/images/IconCart.svg?inline";
	import IconPlus from "@/images/IconPlus.svg?inline";
	import IconUpload from "@/images/IconUpload.svg?inline";
	import swal from 'sweetalert'

	export default {
		data() {
			return {
				clothes_item : [],
				title_text : this.Coordinations.name,
				description_text: this.Coordinations.description,
				selected_height : this.Coordinations.bodyShape.height,
				selected_weight : this.Coordinations.bodyShape.weight,
				selected_tags: [...this.Coordinations.tags],
				selected_info_cloth: {
					brand: 'Gap',
					color: '데님',
					'delivery-date': 2,
					gender: 'M',
					image: 'https://image.msscdn.net/images/goods_img/20190416/1014964/1014964_2_125.jpg',
					image_large: 'https://image.msscdn.net/images/goods_img/20180813/827198/827198_2_500.jpg',
					name: '멋쟁이 청바지',
					price: 10000,
					size: ['XS', 'S', 'M', 'L', 'XL'],
					type: 'pants'
				}
			}
		},
		computed: {
			saveMsg() {
				if(this.canSave) return "Already Saved!";
				else return "save";
			},
			uploadMsg() {
				if(this.Coordinations.published) return "Alreday Upload to Ranking!";
				else return "Upload to Ranking";
			},
			canSave() {
				if(this.title_text != this.Coordinations.name) return false;
				if(this.description_text != this.Coordinations.description) return false;
				if(this.selected_height != this.Coordinations.bodyShape.height) return false;
				if(this.selected_weight != this.Coordinations.bodyShape.weight) return false;
				if(JSON.stringify(this.selected_tags) != JSON.stringify(this.Coordinations.tags)) return false;
				return true;
			},
			btnSave() {
				if(this.canSave) return "default";
				else return "primary";
			},
			canUpload() {
				if(this.Coordinations.published) return true;
				if(this.title_text && this.description_text && this.selected_height !="height" && this.selected_weight !="weight" && this.selected_tags.length) return false;
				return true;
			},
			btnUpload() {
				if(this.canUpload) return "default";
				else return "primary";
			},
			notfill() {
				let notfilled_input = []
				if (this.title_text == ""){
					notfilled_input.push("Title")
				}
				if (this.description_text == ""){
					notfilled_input.push("Description")
				}
				if (this.selected_height == "height"){
					notfilled_input.push("Height")
				}
				if (this.selected_weight == "weight"){
					notfilled_input.push("Weight")
				}
				if (this.selected_tags.length == 0){
					notfilled_input.push("Tags")
				}
				return notfilled_input
			}
		},
		watch: {
			Coordinations() {
				this.title_text = this.Coordinations.name;
				this.description_text = this.Coordinations.description;
				this.selected_height = this.Coordinations.bodyShape.height;
				this.selected_weight = this.Coordinations.bodyShape.weight;
				this.selected_tags= [...this.Coordinations.tags];
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
			AppCloth,
			ColorScore,
			AppButton,
			AppTag,
			AppLike,
			AppReview,
			TextInput,
			TagInput,
			AppPopup,
			IconCart,
			IconUpload,
			IconPlus,
			DetailPopup
		},

		methods: {
			makeClothesList() {
				const db = firebase.firestore();

				let topRef = db.collection("top").doc(this.Coordinations.clothes.top);
				let pantsRef = db.collection("pants").doc(this.Coordinations.clothes.pants);
				let getTopDoc = topRef.get()
					.then(doc => {
						if (doc.exists) {
							let data = doc.data();
							data.id = doc.id;
							this.clothes_item.push(data);
						}
					})
					.catch(err => {
					});
				let getPantsDoc = pantsRef.get()
					.then(doc => {
						if (doc.exists) {
							let data = doc.data();
							data.id = doc.id;
							this.clothes_item.push(data);
						}
					})
					.catch(err => {
					});
			},
			saveCoordinationDetail() {
				const db = firebase.firestore();

				let coordiRef = db.collection("ranking").doc(this.Coordinations.id);
				let updateThings = coordiRef.update({
					name: this.title_text,
					description: this.description_text,
					bodyShape: {
						height: this.selected_height,
						weight: this.selected_weight
					},
					tags: this.selected_tags
				});
				this.$emit('updateCloth', this.Coordinations.id, this.title_text, this.description_text, this.selected_height, this.selected_weight, this.selected_tags);
			},
			uploadToRanking() {
				if(this.Coordinations.published){
					return;
				}
				const db = firebase.firestore();

				let coordiRef = db.collection("ranking").doc(this.Coordinations.id);
				let updateThings = coordiRef.update({
					published: true
				});
				this.saveCoordinationDetail();
				this.$router.push('/ranking');
			},

			open() {
				this.$refs.popup.open();
			},

			close() {
				this.deleteAll();
				this.$refs.popup.close();
			},

			deleteAll() {
				this.title_text = this.Coordinations.name;
				this.description_text = this.Coordinations.description;
				this.selected_height = this.Coordinations.bodyShape.height;
				this.selected_weight = this.Coordinations.bodyShape.weight;
				this.selected_tags = [...this.Coordinations.tags];
			},

			showpopupCloth(cloth){
				console.log("click");
				this.selected_info_cloth = cloth;
				if(this.$refs.clothChooser){
					this.$refs.clothChooser.open();
				}
			},
			clickEvent(){
				console.log(this.notfill)
				if(this.notfill.length != 0){
					let alert_text = "Please fill in "
					this.notfill.forEach(function(item){
						alert_text = alert_text + item + ", "
					})
					swal("Oops", alert_text.slice(0, -2), "warning");
				}
				
			}
		},

		mounted() {
			this.makeClothesList()
		}
	}
</script>
