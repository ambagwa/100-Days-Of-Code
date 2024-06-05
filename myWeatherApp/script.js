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


const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

fetch(apiUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();//converts the response to workable data
    })
    .then(data => {
        //Extract the city name from the json
        const cityName = data.city.name;
        //Set the cityWeatherArr to the list of weather data
        cityWeatherArr = data.list;
        //populate the page with data
        displayWeatherDetails(cityWeatherArr, cityName);
    })
    .catch(err => console.error(`There was an error: ${err}`));



//Populate the UI with weather data
const displayWeatherDetails = (citiesWeatherList, cityName) => {
    if (citiesWeatherList && citiesWeatherList.length > 0) {
        //Extract weather details
        const { dt_txt, main: { temp }, weather: [{ description, icon }],
            wind: { speed }} = citiesWeatherList[0];

        //Display the extracted weather data onto html
        cityContainer.innerHTML += `
            <div class="weather-card">
                <h2 class="city-name"><strong>${cityName}</strong></h2>
                <p class="dt-txt description">${dt_txt}</p>
                <img class="weather-icon" 
                    src="http://openweathermap.org/img/wn/${icon}.png" 
                    alt="${description}"
                />
                <p class="description">${description}</p>
                <p class="temperature">Temp: ${temp} F</p>
                <p class="wind-speed">Wind speed: ${speed} m/s</p>
            </div>
        `;
    };
};