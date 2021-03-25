import React, { useState } from "react";
import { WiDaySunny, WiCloudy, WiDayRainMix, WiDaySnow } from "react-icons/wi";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const api = {
    key: "89f9f2b0052147081cdfe1540b19d6a4",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const dayBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let hours = d.getHours();
    let pmam = hours < 12 ? "AM" : "PM";
    let minutes = d.getMinutes();
    let min = minutes < 10 ? `0${minutes}` : minutes;
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${hours}:${min}${pmam}/${day},  ${date}, ${month}, ${year}`;
  };

  const Search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="app">
      <main className="container">
        <div className="search-box">
          <label htmlFor="country">Weather App</label>
          <br />
          <input
            type="text"
            placeholder="Enter a City Name..."
            name="country"
            className="search-bar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={Search}
          />
        </div>

        <div className="results-weather">
          {typeof weather.main != "undefined" ? (
            <>
              <div className="left-side">
                <div className="date">{dayBuilder(new Date())}</div>
                <div className="current-weather">
                  <div className="weather-icons">
                    <div>
                      {weather.weather[0].main === "Clouds" && (
                        <WiCloudy fontSize="8rem" />
                      )}
                      {weather.weather[0].main === "Clear" && (
                        <WiDaySunny fontSize="8rem" />
                      )}
                      {weather.weather[0].main === "Rain" && (
                        <WiDayRainMix fontSize="8rem" />
                      )}
                      {weather.weather[0].main === "Snow" && (
                        <WiDaySnow fontSize="8rem" />
                      )}
                    </div>

                    <div>
                      {weather.main.temp}
                      <sup>°C</sup>
                    </div>
                  </div>
                  <div className="weather">
                    {weather.weather[0].description}
                  </div>
                  <div className="more-info">
                    <div className="humidity">
                      <h3>Humidity</h3>
                      {weather.main.humidity} %
                    </div>
                    <div className="wind-speed">
                      <h3>Wind speed</h3>
                      {weather.wind.speed} Km/j
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="left-side">
              <div className="date">{dayBuilder(new Date())}</div>
              <div className="current-weather">
                <div className="weather-icons">
                  <div>
                    <WiDaySunny fontSize="8rem" />
                  </div>

                  <div>
                    0<sup>°C</sup>
                  </div>
                </div>
                <div className="weather">unKnown</div>
                <div className="more-info">
                  <div className="humidity">
                    <h3>Humidity</h3>
                    00 %
                  </div>
                  <div className="wind-speed">
                    <h3>Wind speed</h3>
                    00 Km/j
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
