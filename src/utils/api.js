export const fetchPokemonImages = async (limit = 6) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await res.json();
    const fetches = data.results.map(pokemon => fetch(pokemon.url));

    const detailResponses = await Promise.all(fetches)
    const details = await Promise.all(detailResponses.map(res => res.json()));

    return details.map(item => {
      let itemImage = item.sprites?.other?.home?.front_default;
      if (!itemImage) {
        itemImage = item.sprites?.front_default ?? "";
      }
      return {
        name: item.name,
        image: itemImage
      }
    });
  } catch (error) {
    console.log("Failed to fetch Pokémon:", error);
    return []
  }
}