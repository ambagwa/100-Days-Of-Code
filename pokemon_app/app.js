const nameOrId = document.getElementById("search-input").value;
const searchBtn = document.getElementById("search-button");
const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`;
let dataArr = [];
//console.log(apiUrl);

searchBtn.addEventListener("click", () => {
    if (!nameOrId) {
        alert("Enter pokemon name or Id");
    }

  const fetchData = async () => {
    try {
      const resolve = await fetch(apiUrl);
      const data = await resolve.json();

      dataArr = data;

      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  const displayResults = (data) => {
    //extract stats from the data object
    const stats = {};
    data.stats.forEach(stat => {
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
    const types= data.types.map(type => type.type.name).join(", ");
    const height = data.height;
    const weight = data.weight;
    const id = data.id;
    const name = data.name;
  };
});
