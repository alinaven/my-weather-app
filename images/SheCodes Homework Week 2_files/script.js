function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
}

let city = document.querySelector("#city-input");

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

city = "New York";
apiKey = "5d746e8f46d35c046956d77d0f16774f";
apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function showTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  temperatureCelsius = Math.round(response.data.main.temp);
  temperature.innerHTML = temperatureCelsius;
}
axios.get(apiURL).then(showTemperature);

let selectedCity = document.querySelector("#city");
selectedCity = city;
