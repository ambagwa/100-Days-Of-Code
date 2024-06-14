//const nameOrId = "pikachu";
const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu`;
let dataArr = [];
//console.log(apiUrl);

const fetchData = async () => {
    try {
        const resolve = await fetch(apiUrl);
        const data = await resolve.json();

        dataArr = data;

        console.log(data);

    }
    catch (error){
        console.error("Error fetching data:", error);
    }
};

fetchData();