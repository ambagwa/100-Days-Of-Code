const moviesContainer = document.getElementById("movies-container");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const apiKey = "1c5a17c1";
  //Get the value of the title and remove any whitespace
  let titleQuery = document.getElementById("input").ariaValueMax.trim();
  const titleSpecific = "Antman";
  //const apiUrlPoster = `http://img.omdbapi.com/?s=${title}&apikey=${apiKey}`;

  if (titleQuery === "") {
    alert("Please enter a movie/series title!");
    return;
  }

  //Replace all whitespaces with a + sign
  titleQuery = titleQuery.replace(/\s+/g, "+");

  const apiUrl = `http://www.omdbapi.com/?s=${titleQuery}&apikey=${apiKey}`;
  let moviesArr = [];

  fetch(apiUrl)
    .then((resolve) => {
      if (!resolve.ok) throw new Error("Poor network response");

      return resolve.json();
    })
    .then((data) => {
      //check if the returned data is false, indicating an error from api
      if (data.Response === "False") throw new Error(data.Error);

      //populate the array with data from the json
      moviesArr = [data];

      //Clear the page
      moviesContainer.innerHTML = "";

      console.log(moviesArr);
    })
    .catch((error) => {
      console.log(error);
    });
});

//https://www.omdbapi.com/?s=batman&apikey=1c5a17c1

//http://img.omdbapi.com/?s=batman&apikey=$1c5a17c1

//Function to toggle the side navigation bar at the top right of the page
const toggleNav = () => {
  const nav = document.getElementById("nav");
  if (nav.style.width === "250px") {
    nav.style.width = "0";
  } else {
    nav.style.width = "250px";
  }
};
