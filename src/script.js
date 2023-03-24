let apiKey = "cbe4bc31a43ff3543at23227e11o06d3";
let units = "metric";

function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayWeather(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#main-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <div class="weather-forecast-date">${formatForecastDay(
            forecastDay.time
          )}</div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"/>
          <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperatures-max">${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
          <span class="weather-forecast-temperatures-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
           </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.getElementById("search-input").value;
  searchCity(city);
});

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(userPosition);
});

function userPosition(position) {
  let positionUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&key=${apiKey}`;
  axios.get(positionUrl).then(displayWeather);
}

searchCity("Tallinn");
