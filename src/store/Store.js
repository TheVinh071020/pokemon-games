// store.js
import Vue from "vue";
import Vuex from "vuex";
import { ConfigApiPokemon } from "../components/API/configApiPokemon";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, pokemon) {
      state.cart.push(pokemon);
    },
  },
  actions: {
    async catch({ commit }, id) {
      const response = await ConfigApiPokemon.get(`/${id}`);
      const pokemon = response.data;
      const dateTime = new Date().toLocaleString();
      console.log("Pokemon caught:", pokemon);
      commit("addToCart", { ...pokemon, dateTime });
    },
  },
  getters: {
    getCartItems: (state) => state.cart,
  },
});
