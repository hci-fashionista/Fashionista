<template>
	<div class="tag_input">
		<div class="selected">
			<AppTag class="tag" v-for="tagName in selected" :key="tagName" :name="tagName"></AppTag>
			<input class="search" type="text" v-model="searchText" @keydown="searchKeydown" key="input">
		</div>

		<div class="tags">
			<button class="toggle" :class="{'toggle--opened': isTagsOpen}" @click="onToggle">
				<transition name="Fade">
					<div v-if="isTagsOpen" key="all">All</div>
					<div v-else key="best">Best</div>
				</transition>
				<IconDropdown />
			</button>

			<div>
				<div class="foc" v-if="!isTagsOpen">
					<ul class="tags_list">
						<li v-for="tag in bestTags" :key="tag">
							<div>
								<AppTag class="tag"
									:name="tag"
									:selected="isSelected(tag)"
									selectable
									@select="tagClicked(tag)"
								/>
							</div>
						</li>
					</ul>
				</div>
				<transition-group class="tags_list" name="FadeMove" tag="ul" v-else>
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

	.toggle {
		cursor: pointer;
		background: transparent;
		border: none;
		outline: none;
		display: flex;
		align-items: center;
		font-family: "Roboto";
		font-weight: 300;
		font-size: 1.3rem;
		color: var(--blue-500);
		align-self: start;
		margin: 0px;
		padding: 0px 10px;


		&--opened svg {
			transform: rotate(180deg);
		}

		svg {
			margin-left: 20px;
			stroke: var(--blue-500);
			transition: all .4s ease;
		}
	}

	.tags {
		margin: 30px 30px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.tags_list {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		max-height: 300px;
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

	.Fade {
		&-enter-active, &-leave-active {
			transition: all .4s ease;
		}

		&-enter, &-leave-to {
			opacity: 0;
		}
	}
</style>

<script>
	import AppTag from "@/components/AppTag";
<<<<<<< HEAD
	document.addEventListener("DOMContentLoaded", function(){
		const details = document.getElementsByTagName("details")[0]
		// console.log(details)
		details.addEventListener("toggle", event => {
			if (details.open) {
				document.getElementsByTagName("h3")[0].innerHTML = "All"
				document.getElementsByClassName("best")[0].style.display = "none"
			}
			else {
				document.getElementsByTagName("h3")[0].innerHTML = "Best"
				document.getElementsByClassName("best")[0].style.display = "flex"
			}
		});
		console.log(document.getElementsByTagName("details")[0])
	});
=======
	import IconDropdown from "@/images/IconDropdown.svg?inline";
>>>>>>> Update TagInput using vue

	export default {
		data() {
			return {
				bestTags: ["slim",  "thick_legs", "inverted_triangle", "chubby", "long_arms", "large_face"],
				totalTags: [
					"slim",  "thick_legs", "inverted_triangle", "chubby", "long_arms", "large_face",
					"skinny_legs", "long_face", "long_legs", "short_legs", "wide_shoulders", "narrow_shoulders", "muscular",
					"paunchy", "pear", "circle", "rectangle", "hourglass", "long_waist", "short_arms"
				],
				tagName: [],
				selected: [],
				searchText: '',
				ableToDelete: false,
				isUserTagOpen: false
			};
		},

		computed: {
			candidates() {
				return this.totalTags.filter(name => {
					return name.toLowerCase().includes(this.searchText.toLowerCase());
				});
			},

			isTagsOpen() {
				return this.isUserTagOpen || this.searchText.length > 0;
			}
		},

		watch: {
			selected: function(newSelected){
				this.$emit('tagChanged', this.selected);
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
				if(event.key === ' ' || event.key === 'Tab' || event.key === "Enter") {
					event.preventDefault();

					if (this.candidates.length >= 1 && this.searchText.length > 0) {
						this.selected.push(this.candidates[0]);
						this.searchText = '';
					}
				}

				if (this.searchText.length === 0 && event.key === 'Backspace' && !event.repeat)
					this.selected.pop();
			},

			onToggle(event) {
				this.isUserTagOpen = !this.isUserTagOpen;
			}
		},

		components: {
			AppTag,
			IconDropdown
		}
	};
</script>
