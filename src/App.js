import React, { useState, useEffect } from "react";
import "./App.scss";
import { fetchWeather } from "./service/fetchWeather";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "react-loader-spinner";

const OnlineChecker = ({ isOline }) => {
  if (isOline === "onn") {
    return (
      <h2 className='online'>
        <div className='onn'>You are back to Online</div>
      </h2>
    );
  } else if (isOline === "off") {
    return (
      <h2 className='online'>
        <div className='off'>You are offline</div>
      </h2>
    );
  } else {
    return <div></div>;
  }
};

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isOline, setOnline] = useState("");

  window.addEventListener("online", () => {
    setOnline("onn");
  });
  window.addEventListener("offline", () => {
    setOnline("off");
  });

  const onError = (err) => {
    setError(err);
  };

  setTimeout(() => {
    setOnline("");
  }, 6000);

  const Search = async (e) => {
    if (e.key === "Enter" || e === "Enter") {
      setLoading(true);
      if (query !== "") {
        const data = await fetchWeather(query, onError);
        console.log(data);
        setWeather(data);
        setQuery("");
        setLoading(false);
        if (data) {
          setError("");
        }
      } else {
        setLoading(false);
        setError("Please Enter any City Name");
      }
    }
  };

  return (
    <div className='App'>
      <OnlineChecker isOline={isOline} />
      <div className='weather-app'>
        <h1 className='title'>Search Weather Report !</h1>
        {error ? (
          <div className='error-box'>
            <h2 className='error'>{error}</h2>
          </div>
        ) : (
          ""
        )}
        <div className='search-box'>
          <div className='icon' onClick={() => Search("Enter")}>
            <BsSearch />
          </div>
          <input
            type='text'
            placeholder='Search..'
            value={query}
            className='search-field'
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={Search}
          />
        </div>
        {loading ? (
          <div className='loader'>
            <Loader type='TailSpin' color='#2d6cdf' height={80} width={80} />
          </div>
        ) : (
          ""
        )}

        {weather && (
          <div className='details-box'>
            <div className='name'>
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </div>
            <div className='city-temp'>
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className='icon'>
              <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt='weather-icon' />
            </div>

            <div className='desc'>{weather?.weather[0].description}</div>
          </div>
        )}
      </div>
      <div className='footer'>Shadab &copy; 2020</div>
    </div>
  );
};

export default App;
