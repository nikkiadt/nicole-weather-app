let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
function getHours2Digits() {
  return String(now.getHours()).padStart(2, "0");
}
let hour = getHours2Digits(now);
function getMinutes2Digits() {
  return String(now.getMinutes()).padStart(2, "0");
}
let minute = getMinutes2Digits(now);
let date = document.querySelector("#date");
date.innerHTML = `${day} ${hour}:${minute}`;

let weatherForm = document.querySelector("#weather-form");
weatherForm.addEventListener("submit", handleSubmit);

function displayWeatherConditions(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "4eb0104eed7720d373d92522833cf75b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.getElementById("search-input").value;
  searchCity(city);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(userPosition);
}

function userPosition(position) {
  let apiKey = "4eb0104eed7720d373d92522833cf75b";
  let units = "metric";
  let positionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(positionUrl).then(displayWeatherConditions);
}
