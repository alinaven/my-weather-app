// API
let apiKey = "5d746e8f46d35c046956d77d0f16774f";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(showTemperature);

// Retrieve location
function fetchPosition(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5d746e8f46d35c046956d77d0f16774f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

// Get weather data (via current location or search engine location)
function showTemperature(response) {
  // make variables
  temperatureCelsius = Math.round(response.data.main.temp);
  weatherDescription = response.data.weather[0].description;
  humidity = response.data.main.humidity;
  feltTemperature = Math.round(response.data.main.feels_like);
  country = response.data.sys.country;
  wind = Math.round(response.data.wind.speed);
  sunrise = formatSuntime(response.data.sys.sunrise * 1000);
  sunset = formatSuntime(response.data.sys.sunset * 1000);
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
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "5d746e8f46d35c046956d77d0f16774f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                    <div class="weather-forecast-date">${formatDay(
                      forecastDay.dt
                    )}</div>
                    <img src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt="" width="42">
                <div class="weather-forecast temperatures">
                    <span class="weather-forecast-temp-max">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="weather-forecast-temp-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                </div>
                </div>
          
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

function search(city) {
  let apiKey = "5d746e8f46d35c046956d77d0f16774f";
  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let positionButton = document.querySelector("#position-button");
positionButton.addEventListener("click", fetchPosition);
