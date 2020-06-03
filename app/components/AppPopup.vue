<template>
	<transition name="Fade">
		<div class="Popup" v-if="opened">
			<div class="Popup__backdrop" @click="close"></div>

			<div class="Popup__contents">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<style scoped>
	.Popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: auto;

		&__backdrop {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, .7);
		}

		&__contents {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				opened: false
			};
		},

		methods: {
			open() {
				this.opened = true;
			},

			close() {
				this.opened = false;
			},

			toggle() {
				this.opened = !this.opened;
			}
		}
	};
</script>
