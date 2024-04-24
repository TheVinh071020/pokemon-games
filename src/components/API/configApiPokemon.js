import axios from "axios";

export const ConfigApiPokemon = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});
