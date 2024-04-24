import axios from "axios";

export const getListPokemonAxios = async (offset, pageLength) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageLength}&offset=${offset}`
    );
    const listPokemon = [];
    for (let pokemon of response.data.results) {
      try {
        const pokemonDetails = await axios.get(pokemon.url);
        listPokemon.push({
          id: pokemonDetails.data.id,
          name: pokemonDetails.data.name,
          abilities: pokemonDetails.data.abilities,
          stats: pokemonDetails.data.stats,
          types: pokemonDetails.data.types,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.data.id}.png`,
        });
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    }
    const totalProducts = response.data.count;
    const totalPages = Math.ceil(totalProducts / pageLength);
    return { listPokemon, totalProducts, totalPages };
  } catch (error) {
    console.error("Error fetching Pokemon list", error);
    throw error;
  }
};
