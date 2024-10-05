// Handles the display of weather details

import React from "react";
import WeatherCard  from "./WeatherCard";

const WeatherDetails = ({ cityWeatherArr, cityInfo }) => {
    return (
        <div className="weather-details">
            {cityWeatherArr.slice(0, 5).map((weather, index) => (
                <WeatherCard key={index} weather={weather} cityInfo={cityInfo} />
            ))}
        </div>
    );
};

export default WeatherDetails