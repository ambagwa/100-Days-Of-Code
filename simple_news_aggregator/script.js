document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  const moreBtn = document.getElementById("more-btn");
  const loadingIndicator = document.getElementById("loading");
  let searchHistoryDiv = document.createElement("div");
  const newsContainer = document.getElementById("newsContainer");
  let searchHistory = [];
  let dataArr = [];
  let startingIndex = 0;
  let endingIndex = 9;

  searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (!searchInput) {
      alert("Please enter a search term.");
      return;
    }

    const apiKey = "ea302295a96940d99b4602a8c480c5da";
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${apiKey}`;

    newsContainer.innerHTML = "";
    hideSearchHistory();

    const fetchData = async () => {
      try {
        loadingIndicator.style.display = "block";
        const resolve = await fetch(apiUrl);
        const data = await resolve.json();
        loadingIndicator.style.display = "none";

        if (data.articles) {
          dataArr = data.articles;
          displayResults();
        } else {
          newsContainer.innerHTML = `<p>No results found for "${searchInput}".</p>`;
        }

        if (!searchHistory.includes(searchInput)) {
          searchHistory.push(searchInput);
        }
      } catch (error) {
        loadingIndicator.style.display = "none";
        newsContainer.innerHTML =
          "<p>Error loading news. Please try again later.</p>";
        console.error(error);
      }
    };

    fetchData();
  });

  moreBtn.style.display = "none";

  var masonryInstance = new Masonry(newsContainer, {
    itemSelector: ".news-card",
  });

  masonryInstance.on("layoutComplete", () => console.log("Layout Complete"));

  const hideSearchHistory = () => {
    searchHistoryDiv.innerHTML = "";
  };

  const displayResults = () => {
    const slicedData = dataArr.slice(
      startingIndex,
      startingIndex + endingIndex
    );

    if (dataArr.length > endingIndex) {
      moreBtn.style.display = "block";
    } else {
      moreBtn.style.display = "none";
    }

    newsContainer.innerHTML += slicedData
      .map((item) => {
        const { author, content, publishedAt, title, url, urlToImage } = item;

        return `
          <div class="col mb-2 news-card">
            <div class="card bg-altdarksubtle">
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

    if (startingIndex < dataArr.length) {
      moreBtn.style.display = "block";
    } else {
      moreBtn.style.display = "none";

      let newButton;
      if (!newButton) {
        newButton = document.createElement("button");
        newButton.className = "btn btn-info position-relative";
        newButton.id = "clear-btn";
        newButton.textContent = "Clear results";

        newButton.addEventListener("click", () => {
          newsContainer.innerHTML = "";
          dataArr = [];
          startingIndex = 0;
          updateSearchHistory();
        });

        document.body.appendChild(newButton);
      }

      //Append searchHistoryDiv if not already appended
      if (!document.body.contains(searchHistoryDiv)) {
        document.body.appendChild(searchHistoryDiv);
      }
    }
  };

  const updateSearchHistory = () => {
    searchHistoryDiv.innerHTML = `
      <h3 class="h4 mt-4">Search History</h3>
      <ul style="list-style-type: none;">
        ${searchHistory.map((term) => `<li>${term}</li>`).join("")}
      </ul>
    `;
  };

  moreBtn.addEventListener("click", () => {
    displayResults();
  });
});
