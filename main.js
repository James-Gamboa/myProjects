// Utilizando la API https://pokeapi.co debe crear un app que obtenga la lista de todos los Pokemones, y crear un select con los nombres de cada uno, de manera que cuando se selecciona uno se muestre información del mismo.
// Debe mostrar mínimo la siguiente información:
// Nombre, 
// imagen, 
// altura, 
// peso,
// habilidades (solo nombre de habilidades)
// Y los stats: Nombre y base_stat

// El endpoint base para obtener la lista de pokemones seria: https://pokeapi.co/api/v2/pokemon?offset=110&limit=100

// Sin embargo, para obtener la información detalla de cada pokemon debe consultar el endpoint específico del pokemon seleccionado.

const pokemonListDiv = document.querySelector("#pokemon-list");
const pokemonSelect = document.createElement("select");
// @ts-ignore
pokemonListDiv.appendChild(pokemonSelect);

const pokemonDetailDiv = document.querySelector("#pokemon-detail");
const pokemonName = document.createElement("h2");
const pokemonImage = document.createElement("img");
const pokemonHeight = document.createElement("p");
const pokemonWeight = document.createElement("p");
const pokemonAbilities = document.createElement("p");
const pokemonStats = document.createElement("ul");

getPokemonList().then((pokemonList) => {
  pokemonList.forEach((pokemon) => {
    const option = document.createElement("option");
    option.value = pokemon.name;
    option.textContent = pokemon.name;
    pokemonSelect.appendChild(option);
  });
});

pokemonSelect.addEventListener("change", (event) => {
  // @ts-ignore
  const selectedPokemonName = event.target.value;
  getPokemonDetails(selectedPokemonName).then((pokemon) =>
    showPokemonDetails(pokemon)
  );
});

async function getPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

async function getPokemonDetails(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function showPokemonDetails(pokemon) {
  pokemonName.textContent = pokemon.name;
  pokemonImage.src = pokemon.sprites.other["official-artwork"].front_default;
  pokemonImage.alt = pokemon.name;
  pokemonHeight.textContent = `Height: ${pokemon.height}`;
  pokemonWeight.textContent = `Weight: ${pokemon.weight}`;
  const abilities = pokemon.abilities.map((ability) => ability.ability.name);
  pokemonAbilities.textContent = `Abilities: ${abilities.join(", ")}`;
  pokemonStats.innerHTML = "";
  pokemon.stats.forEach((stat) => {
    const statItem = document.createElement("li");
    statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    pokemonStats.appendChild(statItem);
  });

  // @ts-ignore
  pokemonDetailDiv.innerHTML = "";
  // @ts-ignore
  pokemonDetailDiv.appendChild(pokemonName);
  // @ts-ignore
  pokemonDetailDiv.appendChild(pokemonImage);
  // @ts-ignore
  pokemonDetailDiv.appendChild(pokemonHeight);
  // @ts-ignore
  pokemonDetailDiv.appendChild(pokemonWeight);
  // @ts-ignore
  pokemonDetailDiv.appendChild(pokemonAbilities);
  // @ts-ignore
  pokemonDetailDiv.appendChild(pokemonStats);
}
