import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    alertMessage: "",
  },
  mutations: {
    addToCart(state, pokemon) {
      state.cart.push(pokemon);
      console.log(state.cart);
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
      console.log(this.$store.state.cart);

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
