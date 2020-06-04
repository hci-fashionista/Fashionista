import Index from "@/pages/Index.vue";
import Ranking from "@/pages/Ranking.vue"
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{ name: 'Index', path: '/', component: Index },
		{ name: 'Ranking', path: '/ranking', component: Ranking }
	],

	mode: 'history'
});
