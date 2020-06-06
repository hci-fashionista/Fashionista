import Index from "@/pages/Index.vue";
import Guideline from "@/pages/Guideline";
import Ranking from "@/pages/Ranking.vue";
import MyCoordinations from "@/pages/MyCoordinations.vue";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{ name: 'Index', path: '/', component: Index },
		{ name: 'Ranking', path: '/ranking', component: Ranking },
		{ name: 'MyCoordinations', path: '/mypage', component: MyCoordinations },
		{ name: 'Guideline', path: '/coordinations/new', component: Guideline }
	],

	mode: 'history'
});
