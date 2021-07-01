import service from '../services/service'
import { getError } from './utils'

const state = {
    availableParameters: [],
	parameterDict: {},
	parameters: {}
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
	putParameter({ commit, dispatch }, parameters) {
		var currPromise = service.putAll('parameters', parameters).then(
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
		if (availableParameters != undefined) {
			state.availableParameters = availableParameters.entities;
			var dict = {};
			var dict2 = {};
			for (var i  = 0; i < availableParameters.entities.length; i++) {
				if (dict[availableParameters.entities[i].group] == null) {
					dict[availableParameters.entities[i].group] = [availableParameters.entities[i]];
				}
				else {
					dict[availableParameters.entities[i].group].push(availableParameters.entities[i]);
				}
				dict2[availableParameters.entities[i].id] = availableParameters.entities[i].value.toString();
			}
			state.parameterDict = dict;
			state.parameters = dict2;
		}
        	
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
