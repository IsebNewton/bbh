import service from '../services/service'
import { getError } from './utils'

const state = {
    isAuthorized: false
}

const actions = {
	getAuth({ commit, dispatch }, colorId) {
		var currPromise = service.getAll('auth', colorId).then(
			states => {
				commit('setIsAuthorized', states);
			},
			error => {
                commit('setIsUnauthorized');
				dispatch('alert/error', getError(error), { root: true });
			}
		);
		return currPromise;
	},
	postAuth({ commit, dispatch }, labelData) {
		var currPromise = service.postOne('auth', labelData).then(
            entity => {
                commit('setIsAuthorized', entity);
            },
            error => {
                commit('setIsUnauthorized');
                dispatch('alert/error', getError(error), { root: true });
            }
		);
		return currPromise;
	},
	deleteAuth({ commit, dispatch }) {
		var currPromise = service.delete('auth').then(
            entity => {
                commit('setIsUnauthorized');
            },
            error => {
                dispatch('alert/error', getError(error), { root: true });
            }
		);
		return currPromise;
	}
};

const mutations = {
    setIsAuthorized(state, isAuthorized) {
		if (isAuthorized != undefined) {
            state.isAuthorized = true;
        }	
	},
    setIsUnauthorized(state) {
        state.isAuthorized = false;
	}
};

export const auth = {
	namespaced: true,
	state,
	actions,
	mutations
};
