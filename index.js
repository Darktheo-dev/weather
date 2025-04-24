require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const text = await response.text();
    const data = JSON.parse(text);

    if (data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message });
    }

    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching weather data:", err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Weather API is running! Use /weather?city=CityName");
});

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
