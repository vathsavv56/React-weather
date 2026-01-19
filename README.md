# Weather App

A beautiful, minimal weather application built with React, TypeScript, and Vite. Get real-time weather information for any city worldwide.

## 🌐 Live Demo

**[View Live App](https://react-weather-ten.vercel.app/)**

## ✨ Features

- **Real-time weather data** from OpenWeatherMap API
- **Clean, modern UI** with glassmorphism design
- **Responsive design** that works on all devices
- **Loading and error states** for better UX
- **Search functionality** with form submission and click handlers
- **Temperature, humidity, and weather conditions** display

## 🚀 Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- OpenWeatherMap API
- Vercel (deployment)

## 🛠️ Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📱 Usage

1. Enter a city name in the search field
2. Press Enter or click the search icon
3. View real-time weather information including:
   - Current temperature
   - Weather description
   - "Feels like" temperature
   - Humidity percentage

---
