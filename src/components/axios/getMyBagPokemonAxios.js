import { ConfigApiMock } from "../api/configApiMock";

export const getMyBagPokemonAxios = async (currentUser) => {
  try {
    const response = await ConfigApiMock.get(`/cart?userId=${currentUser.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};
