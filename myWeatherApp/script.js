const cityContainer = document.getElementById("city-container");
const loadBtn = document.getElementById("load-btn");
const searchInput = document.getElementById("search");

searchInput.addEventListener("focus", () => {
    searchInput.parentNode.classList.add("input-focus");
});

searchInput.addEventListener("blur", () => {
    searchInput.parentNode.classList.remove("input-focus");
});

let cityWeatherArr = [];

const apiKey = "351caa0c31bafe7d4bed244640457528";
const lat = -1.2867282548085324;
const lon = 36.82059963452154;
//const part = "current,minutely,hourly";


const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

fetch(apiUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
    .then(data => {
        cityWeatherArr = [data];
        //populate the page with data
        displayWeatherDetails(cityWeatherArr);
    })
    .catch(err => console.error(`There was an error: ${err}`));



//Populate the UI with weather data
const displayWeatherDetails = cities => {
    cities.forEach(({
        weather: [{ description, icon}],
        main: { temp },
        wind: { speed },
        name
    }, index) => {//index shows the position of each weather card
        cityContainer.innerHTML += `
            <div id="${index}" class="weather-card">
                <h2 class="city-name">${name}</h2>
                <img class="weather-icon" 
                    src="http://openweathermap.org/img/wn/${icon}.png" 
                    alt="${description}"
                />
                <p class="description">${description}</p>
                <p class="temperature">Temp: ${temp} F</p>
                <p class="wind-speed">Wind speed: ${speed} m/s</p>
            </div>
        `;
    });
};