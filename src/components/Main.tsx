import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiCloudSun } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
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
    <div className="w-full max-w-md mx-auto flex items-center justify-center relative flex-col gap-6 sm:gap-8 lg:gap-10 px-4">
      {/* Search Section */}
      <div
        id="main"
        className="flex items-center justify-between rounded-2xl shadow-lg px-3 py-2 sm:px-4 sm:py-2 w-full bg-white/80 backdrop-blur-sm"
      >
        <form onSubmit={handleSubmit} className="flex-1 mr-2">
          <input
            type="text"
            id="city"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              SetCity(e.target.value)
            }
            placeholder="Enter a city name"
            className="rounded-2xl px-4 py-3 sm:px-5 sm:py-4 h-10 sm:h-12 focus:border-none focus:outline-none focus:shadow-none w-full text-sm sm:text-base"
            value={city}
          />
        </form>
        <CiSearch
          onClick={() => {
            if (city.trim()) {
              fetchData();
            }
          }}
          className={`cursor-pointer ${
            loading ? "opacity-50" : "hover:scale-110 transition-transform"
          } text-2xl sm:text-3xl lg:text-4xl rounded-xl sm:rounded-2xl bg-black text-white p-2 sm:p-2 flex-shrink-0`}
        />
      </div>

      {/* Results Section */}
      <div
        id="output"
        className="min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl overflow-auto shadow-2xl p-4 sm:p-6 lg:p-8 bg-white/90 backdrop-blur-sm"
      >
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-2 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
              <p className="text-blue-600 text-sm sm:text-base font-medium">
                Loading weather...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center min-h-[200px] flex items-center justify-center">
            <div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-lg sm:text-2xl"><IoIosWarning/></span>
              </div>
              <p className="text-red-600 font-medium mb-2 text-sm sm:text-base">
                {error}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                Please check the city name and try again.
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {data && !loading && !error && (
          <div className="text-center w-full">
            {/* City Info */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-800 mb-1">
                {data.name}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">
                {data.sys.country}
              </p>
            </div>

            {/* Temperature */}
            <div className="mb-4 sm:mb-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-800 mb-2">
                {Math.round(data.main.temp)}°
              </div>
              <p className="text-lg sm:text-xl text-gray-600 capitalize font-medium">
                {data.weather[0].description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="bg-gray-50/50 rounded-xl p-2 sm:p-3">
                <p className="text-gray-500 mb-1">Feels like</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {Math.round(data.main.feels_like)}°C
                </p>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-2 sm:p-3">
                <p className="text-gray-500 mb-1">Humidity</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {data.main.humidity}%
                </p>
              </div>
            </div>

            {/* Coordinates */}
            <p className="text-xs text-gray-400 mt-4 sm:mt-6">
              {data.coord.lat.toFixed(2)}, {data.coord.lon.toFixed(2)}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && !error && (
          <div className="text-center min-h-50 flex items-center justify-center">
            <div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-lg sm:text-2xl"><CiCloudSun/></span>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                Search for a city to see weather
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
