const movieContainer = document.getElementById("movie-container");

const apiKey = "1c5a17c1";
const titleQuery = "Prison+break";
const titleSpecific = "Antman";
const apiUrl = `http://www.omdbapi.com/?s=${titleQuery}&apikey=${apiKey}`;
//const apiUrlPoster = `http://img.omdbapi.com/?s=${title}&apikey=${apiKey}`;

fetch(apiUrl)
  .then(resolve => {
    if (!resolve.ok) throw new Error("Poor network response");

    return resolve.json();
  })
  .then(data => {
    //check if the returned data is false, indicating an error from api
    if ( data.Response === "False") throw new Error(data.Error);

    console.log(data);
  })
  .catch("There has been a problem with your fetch operation");

  //https://www.omdbapi.com/?s=batman&apikey=1c5a17c1

  //http://img.omdbapi.com/?s=batman&apikey=$1c5a17c1

  const toggleNav = () => {
    const nav = document.getElementById("nav");
    if (nav.style.width === "250px"){
        nav.style.width = "0";
    } else {
        nav.style.width = "250px";
    }
  };