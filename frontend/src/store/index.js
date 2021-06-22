import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './modules/alert.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        alert
    }
});