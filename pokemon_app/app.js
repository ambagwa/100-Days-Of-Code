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
    //Clear the DOM
    resultsDiv.innerHTML = "";

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
        <p id="pokemon_name"><strong>${name}</strong></p>
        <div id="types"><strong>Types:</strong> ${types}</div>
        <p id="pokemon_id"><strong>ID:</strong> ${id}</p>
        <p id="weight"><strong>Weight:</strong> ${weight}</p>
        <p id="height"><strong>Height:</strong> ${height}</p>
        <img src="${sprite}" alt="${name} image" id="sprite"> 
        
        <table>
            <tr>
                <th>Base</th>
                <th>Stats</th>
            </tr>
            <tr>
                <td id="hp"><strong>HP</strong> </td>
                <td>${hp}</td>
            </tr>
            <tr>
                <td id="speed"><strong>Speed</strong> </td>
                <td>${speed}</td>
            </tr>
            <tr>
                <td id=""><strong>Attack</strong> </td>
                <td>${attack}</td>
            </tr>
            <tr>
                <td id="defense"><strong>Defense</strong> </td>
                <td>${defense}</td>
            </tr>
            <tr>
                <td id="special_attack"><strong>Special attack</strong> </td>
                <td>${specialAttack}</td>
            </tr>
            <tr>
                <td id="special_defense"><strong>special defense</strong> </td>
                <td>${specialDefense}</td>
            </tr>
        </table>

    `;
  };
});
