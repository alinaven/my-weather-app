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

// Retrieve location
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

// Get Data
function showTemperature(response) {
  console.log(response);

  // make variables
  temperatureCelsius = Math.round(response.data.main.temp);
  weatherDescription = response.data.weather[0].description;

  // insert variables into html
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temperatureCelsius;

  let description = document.querySelector("#description");
  description.innerHTML = weatherDescription;

  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}`;
}

// show city
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  apiKey = "5d746e8f46d35c046956d77d0f16774f";
  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

// define time information
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
let currentDay = days[now.getDay()];
console.log(currentDay);
let hours = now.getHours();
let minutes = now.getMinutes();
console.log(`${hours}:${minutes}`);
let currentDate = `${currentDay} ${hours}:${minutes}`;
console.log(currentDate);

let lastupdate = document.querySelector(".last-update");
lastupdate.innerHTML = currentDate;
console.log(lastupdate);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let city = document.querySelector("#city-input");

let apiKey = "5d746e8f46d35c046956d77d0f16774f";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(showTemperature);

let positionButton = document.querySelector("#position-button");
positionButton.addEventListener("click", fetchPosition);
