let apiKey = "cbe4bc31a43ff3543at23227e11o06d3";

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
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.getElementById("search-input").value;
  searchCity(city);
});

function searchCity(city) {
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector("#main-temperature").innerHTML =
    Math.round(celsiusTemperature);
});

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", function (event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
});

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(userPosition);
});

function userPosition(position) {
  let units = "metric";
  let positionUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&key=${apiKey}`;
  axios.get(positionUrl).then(displayWeather);
}

searchCity("New York");
