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

function displayWeatherConditions(response) {
  document.querySelector("#city-name").innerHTML = response.data.city;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
}

let apiUrl = `https://api.shecodes.io/weather/v1/current?query="Paris"&key=${apiKey}`;
axios.get(apiUrl).then(displayWeatherConditions);
