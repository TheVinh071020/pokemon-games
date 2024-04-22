import Vue from "vue";
import Vuex from "vuex";
import { ConfigApiPokemon } from "../components/API/configApiPokemon";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    alertMessage: "",
  },
  mutations: {
    addToCart(state, pokemon) {
      state.cart.push(pokemon);
    },
    setAlertMessage(state, message) {
      state.alertMessage = message;
    },
  },
  actions: {
    async catch({ commit }, catchedPokemon) {
      commit("addToCart", catchedPokemon);
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
