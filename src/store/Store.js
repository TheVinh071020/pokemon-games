import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listPokemon: [],
    cart: [],
    alertMessage: "",
  },
  mutations: {
    getAllPokemon(state, listPokemon) {
      state.listPokemon = listPokemon;
    },
    addToCart(state, pokemon) {
      state.cart.push(pokemon);
    },

    setCart(state, cartData) {
      state.cart = cartData;
    },

    setAlertMessage(state, message) {
      state.alertMessage = message;
    },
  },
  actions: {
    async getListPokemon({ commit }) {
      commit("getAllPokemon", listPokemon);
    },

    async catch({ commit }, catchedPokemon) {
      commit("addToCart", catchedPokemon);
    },

    setCart({ commit }, cartData) {
      commit("setCart", cartData);
    },

    // Hành động show alert
    showAlert({ commit }, message) {
      commit("setAlertMessage", message);
      setTimeout(() => {
        commit("setAlertMessage", "");
      }, 3000);
    },
  },
  getters: {
    getCartItems: (state) => state.cart,
    getAlertMessage: (state) => state.alertMessage,
  },
});
