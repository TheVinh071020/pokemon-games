import { ConfigApiPokemon } from "../api/configApiPokemon";
import { ConfigApiMock } from "../api/configApiMock";

export const getPokemonWithUserIdAxios = async (
  pokemonId,
  currentUser,
  username
) => {
  try {
    const response = await ConfigApiPokemon.get(`/${pokemonId}`);
    const cart = {
      pokemonId: response.data.id,
      userId: Number(currentUser.id),
      newNamePokemon: username,
      imageUrl: response.data.sprites.front_default,
      height: response.data.height,
      weight: response.data.weight,
      stats: response.data.stats.map((stat) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
        url: stat.stat.url,
      })),
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
      createAt: new Date().toLocaleString(),
      status: 0,
    };

    const result = await ConfigApiMock.post("/cart", cart);
    return result.data;
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
  }
};
