import { ConfigApiPokemon } from "../api/configApiPokemon";

export const getDetailPokemonAxios = async (pokemonId) => {
  try {
    const response = await ConfigApiPokemon.get(`/${pokemonId}`);
    const pokemon = {
      id: response.data.id,
      name: response.data.name,
      imageUrl: response.data.sprites.front_default,
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map((ability) => ({
        ability: {
          name: ability.ability.name,
        },
        is_hidden: ability.is_hidden,
      })),
      types: response.data.types.map((type) => ({
        type: {
          name: type.type.name,
          url: type.type.url,
        },
      })),
    };
    const chartData = response.data.stats.map((stat) => ({
      base_stat: stat.base_stat,
      name: stat.stat.name,
      url: stat.stat.url,
    }));
    return { pokemon, chartData };
  } catch (error) {
    console.error("Error fetching Pokemon details:", error)
  }
};
