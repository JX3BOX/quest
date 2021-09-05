import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sidebar : {
            class_id: null,
        },
        client : location.href.includes('origin') ? 'origin' : 'std',
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {}
});
