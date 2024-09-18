import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);

  const currDate = new Date();
  const months = [
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

  const month = months[currDate.getMonth()];
  const day = currDate.getDate();
  const year = currDate.getFullYear();
  const formattedDate = `${month} ${day},${year}`;

  const API_KEY = "2266dac546c64e852826cd8fb33d1023";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const data = await response.json();
      console.log("data ::", data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.webp";
      case "Rain":
        return "/rain_with_cloud.webp";
      case "Mist":
        return "/Tornado.webp";
      case "Haze":
        return "/image.png";
      case "Clear":
        return "/image.png";
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>

              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                width="180px"
                alt="thunder"
              />

              <h2 className="container_degree">
                {(weatherData.main.temp - 273.15).toFixed(2)}
                <i className="material-symbols-rounded degree_icon">
                  radio_button_unchecked
                </i>
              </h2>

              <h2 className="country_per">{weatherData.weather[0].main}</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter city name"
                  className="input"
                  onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
