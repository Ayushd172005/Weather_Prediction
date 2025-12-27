const API_KEY = "439d4b804bc8187953eb36d2a8c26a02"; // public demo key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");
  const error = document.getElementById("error");

  weatherResult.innerHTML = "";
  error.innerText = "";

  if (city === "") {
    error.innerText = "⚠️ Please enter a city name";
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
      <img src="${iconUrl}" alt="weather icon">
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${data.weather[0].main}</strong></p>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    error.innerText = "❌ City not found. Please try again.";
  }
}
