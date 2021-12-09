// Retrieve location
//window.onload = fetchPosition();
console.log(navigator.language);

function fetchPosition(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  //let city = document.querySelector("#city");
  //city.innerHTML = `${position.name}`;
  //city.innerHTML = `Your latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
  let apiKey = "5d746e8f46d35c046956d77d0f16774f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

// Get weather data (via current location or search engine location)
function showTemperature(response) {
  console.log(response);

  // make variables
  temperatureCelsius = Math.round(response.data.main.temp);
  weatherDescription = response.data.weather[0].description;
  humidity = response.data.main.humidity;
  feltTemperature = Math.round(response.data.main.feels_like);
  country = response.data.sys.country;
  wind = Math.round(response.data.wind.speed);
  sunrise = formatSuntime(response.data.sys.sunrise) * 1000;
  sunset = formatSuntime(response.data.sys.sunset) * 1000;
  lastUpdate = formatDate(response.data.dt * 1000);
  city = response.data.name;
  iconCode = response.data.weather[0].icon;

  // insert variables into html
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let feltTemperatureElement = document.querySelector("#felt-temperature");
  let humidityElement = document.querySelector("#humidity");
  let countryCodeElement = document.querySelector("#country");
  let windSpeedElement = document.querySelector("#wind");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let lastUpdateElement = document.querySelector("#last-update");
  let iconElement = document.querySelector("#main-icon");

  temperatureElement.innerHTML = temperatureCelsius;
  descriptionElement.innerHTML = weatherDescription;
  cityElement.innerHTML = city;
  feltTemperatureElement.innerHTML = feltTemperature;
  humidityElement.innerHTML = humidity;
  countryCodeElement.innerHTML = country;
  windSpeedElement.innerHTML = wind;
  sunriseElement.innerHTML = sunrise;
  sunsetElement.innerHTML = sunset;
  lastUpdateElement.innerHTML = lastUpdate;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
}

// weather for city via search engine
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${city.value}`;
  apiKey = "5d746e8f46d35c046956d77d0f16774f";
  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

// Unit Conversion

function convertToCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "25";
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "77";
}

// formatted date from API
function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function formatSuntime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//let city = document.querySelector("#city-input");

// API
let apiKey = "5d746e8f46d35c046956d77d0f16774f";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(showTemperature);

// buttons
//let cityForm = document.querySelector("#city-form");
//cityForm.addEventListener("submit", showCity);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let positionButton = document.querySelector("#position-button");
positionButton.addEventListener("click", fetchPosition);

function search(city) {
  let apiKey = "5d746e8f46d35c046956d77d0f16774f";
  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

search("New York");
