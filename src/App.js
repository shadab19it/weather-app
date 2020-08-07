import React, { useState, useEffect, Suspense } from "react";
import "./App.scss";
import { fetchWeather } from "./service/fetchWeather";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Axios from "axios";
const DetailsBox = React.lazy(() => import("./components/DetailsBox"));
const SearchBox = React.lazy(() => import("./components/SearchBox"));

const Loading = () => {
  return (
    <div className='loader'>
      <Loader type='TailSpin' color='#2d6cdf' height={80} width={80} />
    </div>
  );
};

const Error = ({ error }) => {
  return (
    <div className='error-box'>
      <h2 className='error'>{error}</h2>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isOline, setOnline] = useState("onn");

  window.addEventListener("online", () => {
    setOnline("onn");
  });
  window.addEventListener("offline", () => {
    setOnline("off");
  });

  const onError = (err) => {
    setError(err);
  };

  const Search = async (e) => {
    if (e.key === "Enter" || (e === "Enter") & (isOline === "on")) {
      setLoading(true);
      if (query !== "") {
        const data = await fetchWeather(query, onError);
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
      <div className='weather-app'>
        <h1 className='title'>Search Weather Report !</h1>
        {error && <Error error={error} />}
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBox query={query} setQuery={setQuery} Search={Search} />
        </Suspense>
        {loading && <Loading />}
        {weather && (
          <Suspense fallback={<div>Loading...</div>}>
            <DetailsBox weather={weather} />
          </Suspense>
        )}
        {isOline === "off" ? <h3>You are Offline</h3> : ""}
      </div>
      <div className='footer'>Shadab &copy; 2020</div>
    </div>
  );
};

export default App;
