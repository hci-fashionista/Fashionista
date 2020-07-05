import App from "@/App";
import Vue from "vue";
import swal from 'sweetalert'
import store from "@/src/store";
import router from "@/src/router";

new Vue({
	el: '#App',
	store,
	router,
	render(h) {
		return h(App);
	}
});
