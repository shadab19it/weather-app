import React from "react";

const DetailsBox = ({ weather }) => {
  return (
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
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather-icon' />
      </div>
      <div className='desc'>{weather.weather[0].description}</div>
    </div>
  );
};

export default DetailsBox;
