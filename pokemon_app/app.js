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
});

const displayResults = () => {};
