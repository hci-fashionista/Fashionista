import Index from "@/pages/Index.vue";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{ name: 'Index', path: '/', component: Index }
	]
});
