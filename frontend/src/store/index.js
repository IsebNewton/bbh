import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './modules/alert.module'
import { parameter } from './modules/parameter.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        parameter,
        alert
    }
});