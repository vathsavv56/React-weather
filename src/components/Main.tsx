import { useState } from "react";
import { CiSearch } from "react-icons/ci";


const Main = () => {
  const [city, SetCity] = useState("");
  const [data, SetData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Fix: Form submission now triggers the API call
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      fetchData();
    }
  };

  // Fix: Environment variables are now correctly loaded from .env in project root
  const url = import.meta.env.VITE_WEATHER_API_URL;
  const key = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchData = async () => {
    // Fix: Prevent multiple simultaneous requests and clear previous errors
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${url}?q=${city}&appid=${key}&units=metric`,
      );

      // Fix: Check if the response is successful before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Fix: Check if the API returned an error (OpenWeather API returns errors with cod property)
      if (result.cod && result.cod !== 200) {
        throw new Error(result.message || "City not found");
      }

      console.log("Weather data:", result);
      SetData(result);
    } catch (err) {
      // Fix: Proper error handling with user-friendly messages
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch weather data";
      console.error("API Error:", errorMessage);
      setError(errorMessage);
      SetData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-250 h-150  flex items-center justify-center relative flex-col gap-10">
      <div
        id="main"
        className="flex items-center justify-between rounded-2xl shadow px-4 py-1 w-200"
      >
        <form onSubmit={handleSubmit} className="w-[99%] ">
          <input
            type="text"
            id="city"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              SetCity(e.target.value)
            }
            placeholder="Enter a city name"
             className="rounded-2xl p-5 h-12 focus:border-none focus:outline-none focus:shadow-none w-full"
            value={city}
          />
        </form>
        <CiSearch
          onClick={() => {
            if (city.trim()) {
              fetchData();
            }
          }}
          className={`cursor-pointer ${loading ? "opacity-50" : "hover:scale-110 transition-transform"} text-4xl rounded-2xl bg-black text-white p-2`}
        />
      </div>

      <div
        id="output"
        className="h-65 w-150 rounded-2xl overflow-auto shadow-lg p-6 bg-white text-black"
      >
        
        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-blue-600">Loading weather data...</p>
          </div>
        )}

        
        {error && (
          <div className="text-red-600 text-center">
            <p>Error: {error}</p>
            <p className="text-sm mt-2">
              Please check the city name and try again.
            </p>
          </div>
        )}

       
        {data && !loading && !error && (
          <div className="space-y-2">
            <h3 className="font-bold text-lg">
              {data.name}, {data.sys.country}
            </h3>
            <p className="text-2xl">{Math.round(data.main.temp)}°C</p>
            <p className="capitalize">{data.weather[0].description}</p>
            <p className="text-sm text-gray-600">
              Feels like {Math.round(data.main.feels_like)}°C
            </p>
            <p className="text-sm text-gray-600">
              Humidity: {data.main.humidity}%
            </p>
            <p className="text-xs text-gray-500">
              Coordinates: {data.coord.lat.toFixed(2)},{" "}
              {data.coord.lon.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
