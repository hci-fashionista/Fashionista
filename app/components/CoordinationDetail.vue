<template>
	<div class="coordination_detail">
		<div class="clothes">
			<div class="color_match">
			</div>
		</div>

		<div class="texts">
			<p id="title">Title</p>
			<p id="title_content">{{title}}</p>
			<p id="description">Description</p>
			<p id="description_content">{{description}}</p>
		</div>
		<ul class="tags">
			<li v-for="tag_name in tag_names" :key="tag_name">
				<AppTag :name="tag_name"></AppTag>
			</li>
		</ul>
		<div class="reviews">
			<hr>
			<AppLike id="app_like" :likes="12"></AppLike>
			<hr>
			<ul class="reviews_list">
				<li v-for="review_set in review_array" :key="review_set">
					<AppReview :id="review_set.id" :content="review_set.content"></AppReview>
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
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
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
	import AppTag from "@/components/AppTag";
	import AppReview from "@/components/AppReview";
	import AppButton from "@/components/AppButton";
	import AppLike from "@/components/AppLike";

	export default {

		props: {
			tag_names: {
				type: Array,
				default: []
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
				default: [
					{id: "None", content: "None"}
				]
			}
		},

		components: {
			AppButton,
			AppTag,
			AppLike,
			AppReview
		}
	}
</script>
