<template>
	<div class="tag_input">
		<div class="selected">
			<AppTag class="tag" v-for="tagName in selected" :key="tagName" :name="tagName"></AppTag>
			<input class="search" type="text" v-model="searchText" @keydown="searchKeydown" key="input">
		</div>

		<div class="tags">
			<h3>Best</h3>
			<transition-group class="tags_list" name="FadeMove" tag="ul">
				<li v-for="tag in candidates" :key="tag">
					<div>
						<AppTag class="tag"
							:name="tag"
							:selected="isSelected(tag)"
							selectable
							@select="tagClicked(tag)"
						/>
					</div>
				</li>
			</transition-group>
		</div>
	</div>
</template>

<style scoped>
	.selected {
		display: flex;
		align-items: center;
		align-self: flex-start;
		flex-wrap: wrap;
		overflow: auto;
		border: 0.5px solid var(--grey-100);
		border-radius: 10px;
		min-height: 40px;
		padding: 5px 10px;
		margin: 0px 30px;

		.tag {
			margin: 0px 5px;
		}
	}

	.tags {
		margin: 30px 30px;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		h3 {
			font-family: "Roboto";
			font-weight: 300;
			color: var(--blue-500);
			align-self: start;
			margin: 0px;
			padding: 0px 10px;
		}
	}

	.tags_list {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		max-height: 300px;
		overflow: auto;
		margin: 0px;
		width: 100%;

		li {
			padding: 5px 10px;
		}
	}

	.search {
		border: none;
		background: transparent;
		align-self: stretch;
		flex: 1;
		outline: none;
	}
</style>

<script>
	import AppTag from "@/components/AppTag";

	export default {
		data() {
			return {
				totalTags: ["skinny_leg",  "small_face", "long_leg", "large_face"],
				tagName: ["skinny_leg",  "small_face", "long_leg", "large_face"],
				selected: [],
				searchText: '',
				ableToDelete: false
			};
		},

		computed: {
			candidates() {
				return this.totalTags.filter(name => {
					return name.toLowerCase().includes(this.searchText.toLowerCase());
				});
			}
		},

		methods: {
			tagClicked(name) {
				if(this.isSelected(name)) {
					this.selected.splice(
						this.selected.indexOf(name), 1
					);
				} else {
					this.selected.push(name);
					this.searchText = '';
				}
			},

			isSelected(name) {
				return this.selected.includes(name);
			},

			searchKeyup(event) {
				if(event.key === 'Backspace' && this.ableToDelete)
					this.selected.pop();
			},

			searchKeydown(event) {
				if(event.key === ' ' || event.key === 'Tab') {
					event.preventDefault();

					if (this.candidates.length >= 1 && this.searchText.length > 0) {
						this.selected.push(this.candidates[0]);
						this.searchText = '';
					}
				}

				if (this.searchText.length === 0 && event.key === 'Backspace' && !event.repeat)
					this.selected.pop();
			}
		},

		components: {
			AppTag
		}
	};
</script>
