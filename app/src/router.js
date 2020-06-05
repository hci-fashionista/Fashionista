import Index from "@/pages/Index.vue";
import Guideline from "@/pages/Guideline";
import Ranking from "@/pages/Ranking.vue"

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{ name: 'Index', path: '/', component: Index },
		{ name: 'Ranking', path: '/ranking', component: Ranking },
		{ name: 'Guideline', path: '/coordinations/new', component: Guideline }
	],

	mode: 'history'
});
