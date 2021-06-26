import service from '../services/service'
import { getError } from './utils'

const state = {
    availableParameters: []
}

const actions = {
	getParameter({ commit, dispatch }, parameterId) {
		var currPromise = service.getAll('parameters', parameterId).then(
			states => {
				commit('setAvailableParameters', states);
			},
			error => {
				dispatch('alert/error', getError(error), { root: true });
			}
		);
		return currPromise;
	},
	getParameters({ commit, dispatch }) {
		var currPromise = service.getAll('parameters').then(
			states => {
				commit('setAvailableParameters', states);
			},
			error => {
				dispatch('alert/error', getError(error), { root: true });
			}
		);
		return currPromise;
	},
	putParameter({ commit, dispatch }, parameterData) {
		var currPromise = service.putOne('parameters', parameterData.id, parameterData).then(
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
    setAvailableParameters(state, availableParameters) {
		if (availableParameters != undefined)
        	state.availableParameters = availableParameters.entities;
	},
	setCurrentEntity(entity, val) {
		console.log("current entity: ", entity, val)
	}
};

export const parameter = {
	namespaced: true,
	state,
	actions,
	mutations
};