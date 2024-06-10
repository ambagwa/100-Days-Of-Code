const apiKey = 'ea302295a96940d99b4602a8c480c5da'; // Replace with your NewsAPI key
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const newsContainer = document.getElementById('newsContainer');
const apiUrl = `https://newsapi.org/v2/everything?q=rain+in+kenya&apiKey=${apiKey}`;
let dataArr = [];

fetch(apiUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error("Network error: ", res.statusText);
        }
        return res.json();
    })
    .then(data => {
        dataArr = data;
        newsContainer.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        newsContainer.innerHTML = `Error: ${error.message}`;
    });