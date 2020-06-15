<template>
	<div class="tag_input"  :class="{'small': this.small}">
		<div class="selected">
			<AppTag class="tag"
				v-for="tagName in selected"
				:key="tagName" :name="tagName"
				selected selectable
				@select="tagClicked(tagName)"
			/>

			<div class="searchbox">
				<input class="search" type="text" placeholder="type tag"
					v-model="searchText" @keydown="searchKeydown" key="input" autofocus
				>
			</div>
		</div>

		<div class="tags">
			<button class="toggle" :class="{'toggle--opened': isTagsOpen}" @click="onToggle">
				<transition name="FadeMove">
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
		border: 0.5px solid var(--grey-550);
		border-radius: 10px;
		min-height: 40px;
		padding: 5px 10px;
		margin: 0px 30px;

		.tag {
			margin: 0px 5px;
		}
	}

	.small{
		.selected {
			min-height: 30px;
			margin: 0px;
			padding: 5px;
			overflow: auto;
			max-height: 60px;
		}

		.tag {
			font-size: 12px;
			margin: 5px;
		}

		.searchbox {
			padding: 0px;
			margin: 5px;
			line-height: 12px;
			border-radius: 20px;
			width: 35%;
		}

		.search {
			font-size: 12px;
		}

		.toggle {
			font-size: 12px;
			padding-bottom: 10px;
		}

		.tags_list {
			padding-left : 0px;
			overflow: auto;
			max-height: 100px;

			li {
				padding: 0px;
			}
		}

		.tags {
			margin: 0px;
			padding-top: 15px;
			flex-direction: column;
		}
	}

	.searchbox{
		background-color: var(--grey-750);
		width: 10%;
		height: 25px;
		border-radius: 50px;
		padding: 0 20px;
		line-height: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.search{
		width: 100%;
		font-family: var(--main-font);
		font-size: medium;
		text-align: center;
	}

	.toggle {
		cursor: pointer;
		background: transparent;
		border: none;
		outline: none;
		display: flex;
		align-items: center;
		font-weight: 400;
		font-family: var(--main-font);
		font-size: 1.3rem;
		color: var(--blue-500);
		align-self: start;
		margin: 0px;
		padding: 0px 10px;


		&--opened svg {
			transform: rotate(180deg);
		}

		svg {
			margin-left: 10px;
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
	import IconDropdown from "@/images/IconDropdown.svg?inline";

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
				searchText: '',
				ableToDelete: false,
				isUserTagOpen: false
			};
		},

		model: {
			prop: 'already_selected',
			event: 'tagChanged'
		},

		props: {
			already_selected: {
				type: Array,
				default: () => []
			},

			small: {
				type: Boolean,
				default: false
			}
		},

		computed: {
			candidates() {
				return this.totalTags.filter(name => {
					return name.toLowerCase().includes(this.searchText.toLowerCase());
				});
			},

			isTagsOpen() {
				return this.isUserTagOpen || this.searchText.length > 0;
			},

			selected: {
				get() {
					return this.already_selected;
				},

				set(newSelected) {
					this.$emit('tagChanged', newSelected);
				}
			}
		},

		methods: {
			mutate(fn) {
				const newSelected = this.selected.slice();
				fn(newSelected);

				this.selected = newSelected;
			},

			tagClicked(name) {
				if(this.isSelected(name)) {
					this.mutate(selected => selected.splice(selected.indexOf(name), 1));
				} else {
					this.mutate(selected => selected.push(name));
					this.searchText = '';
				}
			},

			isSelected(name) {
				return this.selected.includes(name);
			},

			searchKeyup(event) {
				if(event.key === 'Backspace' && this.ableToDelete)
					this.mutate(selected => selected.pop());
			},

			searchKeydown(event) {
				if(event.key === ' ' || event.key === 'Tab' || event.key === "Enter") {
					event.preventDefault();

					if (this.candidates.length >= 1 && this.searchText.length > 0) {
						if(this.isSelected(this.candidates[0])){
							return null
						}
						this.mutate(selected => selected.push(this.candidates[0]));
						this.searchText = '';
					}
				}

				if (this.searchText.length === 0 && event.key === 'Backspace' && !event.repeat)
					this.mutate(selected => selected.pop());
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
