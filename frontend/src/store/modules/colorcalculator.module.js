
const state = {
    calculatedArea: 0,
    color: null
}

const getters = {
    getArea: state => {
        return state.calculatedArea;
    },
    getColor: state => {
        return state.color;
    }
};

const actions = {
};

const mutations = {
    setArea (state, area) {
        state.calculatedArea = area;
    },
    setColor (state, color) {
        state.color = color;
    }
};

export const colorcalculator = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};