
const state = {
    visible: false,
    type: null,
    message: null,
    dismissCountDown: null,
    dismissSecs: 5,
    activeToasts: []
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }, message) {
        commit('clear', message);
    }
};

const mutations = {
    success(state, message) {
        var currToast = {
            dismissSecs: state.dismissSecs,
            message: message,
            type: 'success'
        };
        state.activeToasts.push(currToast);
        state.visible = true;
        state.dismissCountDown = state.dismissSecs;
        state.type = 'success';
        state.message = message;
        setTimeout(function(){
            state.visible = false;
            state.dismissCountDown = 0;
            console.log("success: ",state);
        }.bind(this),state.dismissSecs * 1000)
    },
    error(state, message) {
        var currToast = {
            dismissSecs: state.dismissSecs,
            message: message,
            type: 'danger'
        };
        state.activeToasts.push(currToast);

        state.visible = true;
        state.dismissCountDown = state.dismissSecs;
        state.type = 'danger';
        state.message = message;
        setTimeout(function(){
            state.visible = false
            state.dismissCountDown = 0;
        }.bind(this),state.dismissSecs * 1000)
    },
    clear(state) {
        state.activeToasts = [];
        state.visible = false;
        state.dismissCountDown = 0;
        state.type = null;
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
