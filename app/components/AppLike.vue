<template>
	<div>
		<span><img :src="thumbsup" alt="like button" width="20" height="20"></span>
		<span>{{ likes }}</span>
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
import thumbsup from '@/assets/thumbsup.png'

export default {
	data() {
		return {
			thumbsup
		}
	},
	props: {
		likes: Number
	}
}
</script>
