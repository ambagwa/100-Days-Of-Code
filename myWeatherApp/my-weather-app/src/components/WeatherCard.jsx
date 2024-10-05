// Display individua; weather forecast cards

import React from "react";

const WeatherCard = ({ weather, cityInfo }) => {
  const {
    dt_txt,
    main: { temp },
    weather: [{ description, icon }],
    wind: { speed },
  } = weather;

  return (
    <div className="weather-card">
      <h2 className="city-name">
        <strong>{cityInfo}</strong>
      </h2>
      <img
        className="weather-icon"
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
      />
      <p className="date-text">Forecast at: </p>
      <p className="dt-txt">{dt_txt}</p>
      <p className="description">
        <strong>Sky:</strong> {description}
      </p>
      <p className="temperature">
        <strong>Temp:</strong> {temp} F
      </p>
      <p className="wind-speed">
        <strong>Wind speed:</strong> {speed} m/s
      </p>
    </div>
  );
};
export default WeatherCard