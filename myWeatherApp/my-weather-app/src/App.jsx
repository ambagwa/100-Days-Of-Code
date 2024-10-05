// Main component that manages the state and event handling

import React, { useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import WeatherDetails from "./components/WeatherDetails";
import "./App.css";
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [cityWeatherArr, setCityWeatherArr] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "351caa0c31bafe7d4bed244640457528";

  const fetchWeatherData = (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const cityName = data.city.name;
        const countryCode = data.city.country;
        setCityWeatherArr(data.list);
        setCityInfo(`${cityName}, ${countryCode}`);
        setError("");
      })
      .catch((error) => {
        setError(`Error: ${error.message}`);
        setCityWeatherArr([]);
        setCityInfo(null);
      });
  };

  return (
    <div className="App">
      <Header />
      <SearchForm fetchWeatherData={fetchWeatherData} />
      {error && <p className="error">{error}</p>}
      {cityInfo && cityWeatherArr.length > 0 && (
        <WeatherDetails cityWeatherArr={cityWeatherArr} cityInfo={cityInfo} />
      )}
    </div>
  );
}
