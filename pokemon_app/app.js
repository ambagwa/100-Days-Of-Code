const searchBtn = document.getElementById("search-button");
const resultsDiv = document.getElementById("results");
let dataArr = [];
//console.log(apiUrl);

searchBtn.addEventListener("click", () => {
  const nameOrId = document.getElementById("search-input").value;
  const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`;
  if (!nameOrId) {
    alert("Enter pokemon name or Id");
    return;
  }

  const fetchData = async () => {
    try {
      const resolve = await fetch(apiUrl);
      const data = await resolve.json();

      displayResults(data);
    } catch (error) {
      resultsDiv.innerHTML(error);
    }
  };

  fetchData();

  const displayResults = (data) => {
    //extract stats from the data object
    const stats = {};
    data.stats.forEach((stat) => {
      stats[stat.stat.name] = stat.base_stat;
    });

    //Access the properties inside the stats object
    const hp = stats.hp;
    const attack = stats.attack;
    const defense = stats.defense;
    const speed = stats.speed;
    const specialAttack = stats["special-attack"];
    const specialDefense = stats["special-defense"];

    //Access other properties directly from the data object
    const types = data.types.map((type) => type.type.name).join(", ");
    const height = data.height;
    const weight = data.weight;
    const id = data.id;
    const name = data.name;
    const sprite = data.sprites.front_default;

    //upload DOM with the fetched data
    resultsDiv.innerHTML += `
        <img src="${sprite}" alt="pokemon image" id="sprite">
        <div id="types">${types}</div>
        <p id="pokemon_name">${name} </p>
        <p id="pokemon_id">${id}</p>
        <p id="weight">Pokemon weight: ${weight}</p>
        <p id="height">pokemon height: ${height}</p>
        <p id="hp">HP: ${hp}</p>
        <p id="speed">Speed: ${speed}</p>
        <p id="attack">Attack: ${attack}</p>
        <p id="defense">Defense: ${defense}</p>
        <p id="special_attack">Special attack: ${specialAttack}</p>
        <p id="special_defense">Special defense: ${specialDefense}</p>
    `;
  };
});
