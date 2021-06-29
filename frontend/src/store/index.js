import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './modules/alert.module'
import { color } from './modules/color.module'
import { parameter } from './modules/parameter.module'
import { product } from './modules/product.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        parameter,
        color,
        product,
        alert
    }
});