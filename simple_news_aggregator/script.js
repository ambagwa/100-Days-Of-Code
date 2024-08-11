document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  const moreBtn = document.getElementById("more-btn");
  const loadingIndicator = document.getElementById("loading");
  let searchHistory = [];
  let searchHistoryDiv = document.createElement("div");
  //const newsContainer = document.getElementById("newsContainer");

  moreBtn.style.display = "none";
  
  const hideSearchHistory = () => {
    searchHistoryDiv.innerHTML = "";
  };

  searchButton.addEventListener("click", () => {
    const apiKey = "ea302295a96940d99b4602a8c480c5da";
    const searchInput = document.getElementById("searchInput").value.trim();
    const newsContainer = document.getElementById("newsContainer");
    let dataArr = [];
    let startingIndex = 0;
    let endingIndex = 6;
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${apiKey}`;

    newsContainer.innerHTML = "";

    hideSearchHistory();

    if (!searchInput) {
      alert("Please enter a search term.");
      return;
    }

    const fetchData = async () => {
      try {
        //Show loading indicator
        loadingIndicator.style.display = "block";
        const resolve = await fetch(apiUrl);
        const data = await resolve.json();
        //hide loading indicator
        loadingIndicator.style.display = "none";

        dataArr = data.articles;
        //Display the data
        //newsContainer.innerHTML = JSON.stringify(data, null, 2);
        displayResults();

        moreBtn.style.display = "block";
      } catch (error) {
        newsContainer.innerHTML = error;
      }
    };

    fetchData();

    const displayResults = () => {
      const slicedData = dataArr.slice(
        startingIndex,
        startingIndex + endingIndex
      );

      //Contents of articles: author, content, description, publishedat
      //source(name0), title, urltoImage, url
      newsContainer.innerHTML += slicedData
        .map((item) => {
          const {
            author,
            content,
            description,
            publishedAt,
            source: { id, name },
            title,
            url,
            urlToImage,
          } = item;

          return `
          <div class="col">
            <div class="card news-card">
              <img src="${urlToImage}" alt="news=image" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
                <a target="_blank" href="${url}" class="link-opacity-100-hover link-offset-2 link-offset-3-hover link-underline-opacity-0 link-underline-opacity-100-hover">
                  For full news >
                </a>
              </div>
              <div class="card-footer">
                <p class="card-text">${author}</p>
                <p class="card-text">${publishedAt}</p>
                <div class="bottom-div"></div>
              </div>
            </div>
          </div>
        `;
        })
        .join("");

      startingIndex += endingIndex;

      if (startingIndex > endingIndex) {
        moreBtn.style.display = "none";
        let newButton = document.createElement("button");
        newButton.className = "btn btn-info position-absolute start-50";
        newButton.id = "clear-btn";
        newButton.textContent = "Clear Results";

        //Append the button to the newsContainer
        document.body.appendChild(newButton);

        newButton.addEventListener("click", () => {
          newsContainer.innerHTML = "";
          dataArr = [];
          startingIndex = 0;
          newButton.style.display = "none";

          let displayHistoryBtn = document.createElement("button");
          displayHistoryBtn.className =
            "btn btn-info position-absolute start-50";
          displayHistoryBtn.textContent = "Display search history";

          document.body.appendChild(displayHistoryBtn);

          if (searchInput && !searchHistory.includes(searchInput)) {
            searchHistory.push(searchInput);
            displayHistoryBtn.addEventListener("click", () => {
              updateSearchHistory();
              displayHistoryBtn.style.display = "none";
            });

            //Append searchHistoryDiv if not already appended
            if (!document.body.contains(searchHistoryDiv)) {
              document.body.appendChild(searchHistoryDiv);
            }
          }
        });
      }
    };

    const updateSearchHistory = () => {
      searchHistoryDiv.innerHTML = `
      <h3 class="h4 mt-4">Search History</h3>
      <ul>
        ${searchHistory.map((term) => `<li>${term}</li>`).join("")}
      </ul>
    `;
    };

    moreBtn.addEventListener("click", () => {
      displayResults();
    });
  });
});
