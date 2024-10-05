// Handles user input for latitude and longitude

import React, { useState } from "react";

const SearchForm = ({ fetchWeatherData }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSearch = () => {
    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude);
    }
  };

  return (
    <div className="search-container">
      <div className="input-group">
        <label htmlFor="latitude">Latitude: </label>
        <input
          type="number"
          id="latitude"
          value={latitude}
          placeholder="-1.2867282548085324"
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="longitude">Longitude: </label>
        <input
          type="number"
          id="longitude"
          value={longitude}
          placeholder="36.82059963452154"
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
export default SearchForm