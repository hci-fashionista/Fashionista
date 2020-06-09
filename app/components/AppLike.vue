<template>
	<div @click="likeClicked()">
		<span><img :src="thumbsup" alt="like button" width="20" height="20"></span>
		<span id="likenum">{{ likes }}</span>
	</div>
</template>

<style scoped>
div {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 60px;
	font-size: 18px;
}

span {
	flex-grow: 1;
}

span:last-child {
	color: #4d4d4d;
}


</style>

<script>
import thumbsup from '@/images/thumbsup.png'

export default {
	data() {
		return {
			thumbsup,
			likes_copy: 0
		}
	},
	methods: {
		likeClicked(){
			this.likes_copy = this.likes_copy + 1
			this.$emit('newLikes', this.likes_copy);
		}
	},
	props: {
		likes: Number
	},
	mounted() {
		this.likes_copy = this.likes
	}
}
</script>
