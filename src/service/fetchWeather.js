import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_key = "c3b214593b0229751cae1e5773975c42";

export const fetchWeather = async (query, onError) => {
  try {
    const { data } = await axios(`${URL}${query}&appid=${API_key}`);
    return data;
  } catch (err) {
    onError("Pleace Enter a Valid  City Name");
  }
};
