import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context/LocationContext.jsx";

export const useWeather = () => {
  const { selected } = useContext(LocationContext);

  const [weatherData, setWeatherData] = useState({
    location: "",
    temparature: "",
    climate: "",
    time: "",
    tempMax: "",
    tempMin: "",
    humidity: "",
    wind: "",
    cloudy: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    msg: "",
  });

  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading({
        ...loading,
        state: true,
        msg: "Fetching weather data...",
      });

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );
      if (!response.ok) {
        const errMsg = `fatching weather data is failed with status ${response.status}`;
        throw new Error(errMsg);
      }

      const data = await response.json();

      const updateWeatherData = {
        ...weatherData,
        location: data?.name,
        temparature: data?.main?.temp,
        climate: data?.weather[0]?.main,
        time: data?.dt,
        tempMax: data?.main?.temp_max,
        tempMin: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        wind: data?.wind?.speed,
        cloudy: data?.clouds?.all,
        longitude: longitude,
        latitude: latitude,
      };
      setWeatherData(updateWeatherData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading({
        ...loading,
        state: false,
        msg: "",
      });
    }
  };

  useEffect(() => {
    setLoading({
      ...loading,
      state: true,
      msg: "Fetching weather data...",
    });

    if (selected.latitude && selected.longitude) {
      fetchWeatherData(selected.latitude, selected.longitude);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      });
    }
  }, [selected.latitude, selected.longitude]);

  return {
    weatherData,
    loading,
    error,
  };
};
