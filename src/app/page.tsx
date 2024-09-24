'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface WeatherProps {
  name: string;
  main: {
    temp: string;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
    }
  ];
}
export default function Home() {
  const [city, setCity] = useState('Tokyo');
  const [weather, setWeather] = useState<null | WeatherProps>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const url = `api/weather/?city=${city}`;

      try {
        const response = await axios.get(url);

        setWeather(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      <h1>天気予報アプリ</h1>
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='都市名を入力'
      />
      {weather && (
        <div>
          <h2>{weather.name}の天気</h2>
          <p>気温: {weather.main.temp}°C</p>
          <p>天気: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
