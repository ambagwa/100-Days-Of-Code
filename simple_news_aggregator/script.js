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
            //newsContainer.innerHTML = JSON.stringify(data, null, 2);
            displayResults(data);

        } catch(error){
            newsContainer.innerHTML = error;
        }
    };

    fetchData();

    const displayResults = data => {
      //Deconstruct specific propertirs from the returned json data
      const { articles } = data;

      //Contents of articles: author, content, description, publishedat
      //source(name0), title, urltoImage, url
      newsContainer.innerHTML = articles.map(item => {
        const {
          author, 
          content, 
          description, 
          publishedAt,
          source: { id, name},
          title, 
          url,
          urlToImage
        } = item;

        return `
          <div class="one-piece">
            <h1 class="news-title">${title}</h1>
            <img src="${urlToImage}" alt="news=image" class="news-image">
            <p class="content">${content}</p>
            <a target="_blank" href="${url}" class="more-url">Click here to see full news ></a>
            <p class="author">${author}</p>
            <p class="date">${publishedAt}</p>
            <div class="bottom-div"></div>
          </div>
        `;
      });
    };

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
