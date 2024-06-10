const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const apiKey = "ea302295a96940d99b4602a8c480c5da"; // Replace with your NewsAPI key
  const searchInput = document.getElementById("searchInput").value.trim();
  const newsContainer = document.getElementById("newsContainer");
  let dataArr = [];
  const apiUrl = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${apiKey}`;

    if(!searchInput) {
        alert("Please enter a search term.");
        return;
    }

    const fetchData = async () => {
        try {
            const resolve = await fetch(apiUrl);
            const data = await resolve.json();
            //Display the data
            newsContainer.innerHTML = JSON.stringify(data, null, 2);
        } catch(error){
            newsContainer.innerHTML = error;
        }
    };

    fetchData();

  /*
  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network error: ", res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      //Get the array of articles
      dataArr = data.articles;
      newsContainer.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      newsContainer.innerHTML = `Error: ${error.message}`;
    });
    */
});
