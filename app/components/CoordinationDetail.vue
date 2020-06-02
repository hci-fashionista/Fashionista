<template>
	<div class="coordination_detail">
		<div class="clothes">
			<div class="color_match">
			</div>
		</div>

		<div class="texts">
			<p id="title">Title</p>
			<TextInput v-if="editable" v-model="title_text"></TextInput>
			<p v-else id="title_content">{{title}}</p>
			
			<p id="description">Description</p>
			<TextInput v-if="editable" v-model="description_text"></TextInput>
			<p v-else id="description_content">{{description}}</p>
			
			<template v-if="editable">
				<p id="heightweight">Body Shape</p>
				<div class="select_list">
					<select v-model="selected_height">
						<option disabled value="">Height</option>
						<option>~150</option>
						<option>150~160</option>
						<option>160~170</option>
						<option>170~180</option>
						<option>180~190</option>
						<option>190~</option>
					</select>
					<select v-model="selected_weight">
						<option disabled value="">Weight</option>
						<option>~50</option>
						<option>50~60</option>
						<option>60~70</option>
						<option>70~80</option>
						<option>80~90</option>
						<option>90~</option>
					</select>
				</div>
			</template>
			<p id="tags">Tags</p>
		</div>
		
		<ul class="tags_list">
			<li v-for="tag_name in tag_names" :key="tag_name">
				<AppTag :name="tag_name"></AppTag>
			</li>
		</ul>
		
		<template v-if="editable == false">
			<div class="reviews">
				<hr>
				<AppLike id="app_like" :likes="12"></AppLike>
				<hr>
				<ul class="reviews_list">
					<li v-for="(review_set,i) in review_array" :key="i">
						<AppReview :id="review_set.id" :content="review_set.content"></AppReview>
					</li>
				</ul>
				<hr>
			</div>
		</template>
		
		<div class="button">
			<AppButton v-if="editable">
				Upload to Ranking
			</AppButton>
			<AppButton>
				To Shopping Cart
			</AppButton>
			<AppButton v-if="editable">
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
	}

	.select_list {
		display: flex;
		padding-bottom : 10px;
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

	#title, #description, #heightweight, #tags {
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
	import AppTag from "@/components/AppTag";
	import AppReview from "@/components/AppReview";
	import AppButton from "@/components/AppButton";
	import AppLike from "@/components/AppLike";
	import TextInput from "@/components/TextInput";

	export default {
		data() {
			return {
				title_text : "",
				description_text: "",
				selected_height : "",
				selected_weight : ""
			};
		},

		props: {
			tag_names: {
				type: Array,
				default: () => ["skinny_leg", "small_face", "long_leg"]
			},
			title: {
				type: String,
				default : "None"
			},
			description: {
				type: String,
				default : "None"
			},
			review_array: {
				type: Array,
				default: () => [
					{id: "None", content: "None"}
				]
			},
			editable : {
				type : Boolean,
				default : true
			}
		},

		components: {
			AppButton,
			AppTag,
			AppLike,
			AppReview,
			TextInput
		}
	}
</script>
