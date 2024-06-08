document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.getElementById("movies-container");
  const searchBtn = document.getElementById("search-btn");
  const moreBtn = document.getElementById("next-button");
  let startingIndex = 0;
  let endingIndex = 6;

  searchBtn.addEventListener("click", () => {
    const apiKey = "1c5a17c1";
    //Get the value of the title and remove any whitespace
    let titleQuery = document.getElementById("input").value.trim();
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
        moviesArr = data.Search;

        //Clear the page
        moviesContainer.innerHTML = "";

        //display the first six elements
        displayMovies(moviesArr.slice(startingIndex, endingIndex));

        //Show next button if there are more than 6 results
        if (moviesArr.length > 6) {
          moreBtn.style.display = "block";
        } else {
          moreBtn.style.display = "none";
        }

        console.log(moviesArr);
      })
      .catch((error) => {
        moviesContainer.innerHTML = `
          <p style="font-size: 20px; font-weight: 700; color: red;">${error}</p>
        `;
      });

    const displayMovies = (movies) => {
      movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-element");
        movieElement.innerHTML = `
            <img class="poster" src="${movie.Poster}" alt="${movie.Title} Poster">
            <h2 class="title">${movie.Title}</h2>
            <p class="detail">Movie type: ${movie.Type}</p>
            <p class="detail">Year: ${movie.Year}</p>
            <p class="detail">movie ID: ${movie.imdbID}</p>
          `;
        moviesContainer.appendChild(movieElement);
      });
    };

    //functionality fo rthe more button
    moreBtn.addEventListener("click", () => {
      startingIndex += 6;
      endingIndex += 6;

      //display the next results
      displayMovies(moviesArr.slice(startingIndex, endingIndex));

      //hide the button if there are no more results
      if (moviesArr.length <= endingIndex) {
        moreBtn.style.display = "none";
      }
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
});
