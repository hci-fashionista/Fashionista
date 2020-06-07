<template>
	<button class="tag is_selectable"
		:class="{'is_selected': selected}"
		@click="$emit('select')"
		v-if="selectable">

		{{ nameWithHash }}
	</button>
	<div class="tag is_selected" v-else>
		{{ nameWithHash }}
	</div>
</template>

<style scoped>
	.tag {
		font-family: var(--main-font);
		height: 25px;
		background-color: var(--grey-750);
		border: none;
		border-radius: 50px;
		padding: 0 20px;
		line-height: 25px;
		font-size: medium;
		text-align: center;
		user-select: none;

		&.is_selectable {
			cursor: pointer;
			outline: none;
		}
	}

	.is_selected {
		background-color: var(--blue-800);
	}
</style>

<script>
	export default {
		computed: {
			nameWithHash(){
				return "#" + this.name
			}
		},

		props: {
			name: {
				type: String,
				default: "None"
			},

			selectable: {
				type: Boolean
			},

			selected: {
				type: Boolean
			}
		}
	}
</script>
