import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const user = {
	namespace: true,

	state: {
		user: null
	},

	mutations: {
		setUser(state, user) {
			state.user = user;
		}
	},

	actions: {
		async login({ commit }, { id, password }) {
			//TODO
		}
	}
};

export default new Vuex.Store({
	modules: {
		user
	}
});
