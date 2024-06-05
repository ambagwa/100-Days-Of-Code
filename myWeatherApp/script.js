const cityContainer = document.getElementById("city-container");

let cityWeatherArr = [];

const apiKey = "351caa0c31bafe7d4bed244640457528";

const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const lat = document.getElementById("latitude").value;
  const lon = document.getElementById("longitude").value;

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json(); //converts the response to workable data
    })
    .then((data) => {
      //Extract the city name from the json
      const cityName = data.city.name;
      //Extract country code
      const countryCode = data.city.country;
      //Set the cityWeatherArr to the list of weather data
      cityWeatherArr = data.list;
      //populate the page with data
      displayWeatherDetails(cityWeatherArr, cityName, countryCode);
    })
    .catch((err) => console.error(`There was an error: ${err}`));
});

//Populate the UI with weather data
const displayWeatherDetails = (citiesWeatherList, cityName, countryCode) => {
  if (citiesWeatherList && citiesWeatherList.length > 0) {
    //Extract weather details
    const {
      dt_txt,
      main: { temp },
      weather: [{ description, icon }],
      wind: { speed },
    } = citiesWeatherList[0];

    //Variable for holding both cityName and countryCode
    const cityInfo = `${cityName}, ${countryCode}`;

    //Display the extracted weather data onto html
    cityContainer.innerHTML += `
            <div class="weather-card">
                <h2 class="city-name"><strong>${cityInfo}</strong></h2>
                <img class="weather-icon" 
                    src="http://openweathermap.org/img/wn/${icon}.png" 
                    alt="${description}"
                />
                <p class="date-text">Forecast at:</p>
                <p class="dt-txt">${dt_txt}</p>
                <p class="description"><strong>Sky:</strong> ${description}</p>
                <p class="temperature"><strong>Temp:</strong> ${temp} F</p>
                <p class="wind-speed"><strong>Wind speed:</strong> ${speed} m/s</p>
            </div>
        `;
  }
};
