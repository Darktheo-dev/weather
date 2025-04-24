
const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const cards = document.querySelector(".cards");

weatherform.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error.message);

// Load environment variables from .env (optional when running locally)
require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001; // Render uses dynamic port

app.use(cors()); // Allow requests from any origin

// Main route: Fetch weather by city
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log("🛰️ API URL:", apiUrl);

    const response = await fetch(apiUrl);
    const text = await response.text(); // Get raw response text for debugging
    console.log("📦 Raw response:", text);

    const data = JSON.parse(text);

    if (data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message });

    }
  } else {
    displayError("Please enter a city");
  }
});


async function getWeatherData(city) {
  const apiUrl = `https://frolicking-peony-f2233d.netlify.app/`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  cards.textContent = "";
  cards.style.display = "flex";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  cards.appendChild(cityDisplay);
  cards.appendChild(tempDisplay);
  cards.appendChild(humidityDisplay);
  cards.appendChild(descDisplay);
  cards.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  cards.textContent = "";
  cards.style.display = "flex";
  cards.appendChild(errorDisplay);
}


// Health check route
app.get("/", (req, res) => {
  res.send("✅ Weather API is running! Use /weather?city=CityName");
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});

