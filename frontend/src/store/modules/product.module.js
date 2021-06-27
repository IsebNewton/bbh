import service from '../services/service'
import { getError } from './utils'

const state = {
    availableProducts: []
}

const actions = {
	getProduct({ commit, dispatch }, productId) {
		var currPromise = service.getAll('products', productId).then(
			states => {
				commit('setAvailableProducts', states);
			},
			error => {
				dispatch('alert/error', getError(error), { root: true });
			}
		);
		return currPromise;
	},
	getProducts({ commit, dispatch }) {
		var currPromise = service.getAll('products').then(
			states => {
				commit('setAvailableProducts', states);
			},
			error => {
				dispatch('alert/error', getError(error), { root: true });
			}
		);
		return currPromise;
	},
	putProduct({ commit, dispatch }, productData) {
		var currPromise = service.putOne('products', productData.id, productData).then(
            entity => {
                commit('setCurrentEntity', entity);
            },
            error => {
                dispatch('alert/error', getError(error), { root: true });
            }
		);
		return currPromise;
	}
};

const mutations = {
    setAvailableProducts(state, availableProducts) {
		if (availableProducts != undefined)
        	state.availableProducts = availableProducts.entities;
	},
	setCurrentEntity(entity, val) {
		console.log("current entity: ", entity, val)
	}
};

export const product = {
	namespaced: true,
	state,
	actions,
	mutations
};
