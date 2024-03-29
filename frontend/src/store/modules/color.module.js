import service from '../services/service'
import { getError } from './utils'

const state = {
    availableColors: [],
	colorDict: {}
}

const actions = {
	getColor({ commit, dispatch }, colorId) {
		var currPromise = service.getAll('colors', colorId).then(
			states => {
				commit('setAvailableColors', states);
			},
			error => {
				dispatch('alert/error', getError(error), { root: true });
			}
		);
		return currPromise;
	},
	getColors({ commit, dispatch }) {
		var currPromise = service.getAll('colors').then(
			states => {
				commit('setAvailableColors', states);
			},
			error => {
				dispatch('alert/error', getError(error), { root: true });
			}
		);
		return currPromise;
	},
	putColor({ commit, dispatch }, colorData) {
		var currPromise = service.putOne('colors', colorData.id, colorData).then(
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
    setAvailableColors(state, availableColors) {
		if (availableColors != undefined)
        	state.availableColors = availableColors.entities;
			var dict = {};
			for (var i  = 0; i < availableColors.entities.length; i++) {
				dict[availableColors.entities[i].id] = availableColors.entities[i].color;
			}
			state.colorDict = dict;
	},
	setCurrentEntity(entity, val) {
		console.log("current entity: ", entity, val)
	}
};

export const color = {
	namespaced: true,
	state,
	actions,
	mutations
};
