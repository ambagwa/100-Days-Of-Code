const apiKey = "1c5a17c1";
const title = "Prison+break";
const apiUrl = `http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`;
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