// Feature #1
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function getTime(rawDate) {
  const currentTime = document.querySelector("#time-string");
  const now = new Date(rawDate);

  let hours = now.getHours() > 9 ? now.getHours() : "0" + now.getHours();
  let minutes =
    now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes();

  let day = days[now.getDay()];

  currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}

// Current temperature
const apiKey = `d0bec9d6480b2df7e1b8e4642f141337`;

function forecast_data(response) {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  for (const forecast of response.data.list) {
    const date = new Date(forecast.dt_txt);
    let hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    let minutes =
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    const day = document.createElement("span");
    day.innerText = `${date.getDate()} ${
      days[date.getDay()]
    } ${hours}:${minutes}`;

    const img = document.createElement("img");
    img.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
    img.id = "currentIcon";
    const p = document.createElement("p");
    p.classList = `m-0`;
    p.innerText = `${Math.round(forecast.main.temp)}°C`;

    const description = document.createElement("small");
    description.innerText = forecast.weather[0].description;
    description.classList = `text-capitalize`;

    const forDay = document.createElement("div");
    forDay.id = "forDay";

    forDay.appendChild(day);
    forDay.appendChild(img);
    forDay.appendChild(description);
    forDay.appendChild(p);
    list.appendChild(forDay);
  }
}

function changeBackgroung(response) {
  const background = document.querySelector("#background");
  //background.innerHTML = `${response.data.weather[0].main}`;
  const mainWeather = response.data.weather[0].description.toLowerCase();
  let bgcolor;
  if (mainWeather.includes("cloud")) {
    bgcolor = `background: linear-gradient(180deg, rgba(177,187,187,1) 19%, rgba(156,163,162,0.8538283062645011) 82%);`;
  } else if (mainWeather.includes("clear")) {
    bgcolor = `background: linear-gradient(180deg, rgba(208,232,231,1) 19%, rgba(238,244,243,0.8538283062645011) 82%);`;
  }else if (mainWeather.includes("rain")){
    bgcolor = `background: linear-gradient(180deg, rgba(159,169,177,1) 19%, rgba(8,35,83,0.7442396313364055) 82%);`
  }else{
    bgcolor=`background-image:url(background.jpg)`;
  }

  background.style = bgcolor;
  console.log(mainWeather);
}

function showTemperature(response) {
  const cityInputTag = document.querySelector("#type-city");
  cityInputTag.value = ``;
  getTime(response.data.dt * 1000);
  const forUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(forUrl).then(forecast_data);

  let showCurrentCity = document.querySelector("#cityName");
  showCurrentCity.innerHTML = `${response.data.name}`;

  celsiusTemperature = response.data.main.temp;

  let tempNow = document.querySelector("#tempNow");
  tempNow.innerHTML = Math.round(celsiusTemperature);

  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let weatherSituation = document.querySelector("#weatherSituation");
  weatherSituation.innerHTML = `Humidity:${response.data.main.humidity}% <br/>
  Wind speed: ${response.data.wind.speed} mph`;

  // let forecastData = document.querySelector("#forDay");
  // forecastData.innerHTML = ``;

  const currentIcon = document.querySelector("#currentIcon");
  const iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  currentIcon.src = iconUrl;

  changeBackgroung(response);
}
// Search

function search(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  const cityInputTag = document.querySelector("#type-city");
  search(cityInputTag.value);
}

const searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

function myCurrentTemperature(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
// Fetch via geolocation
function showCity() {
  navigator.geolocation.getCurrentPosition(myCurrentTemperature);
}

const currentTemperature = document.querySelector("#currentTemperature");
currentTemperature.addEventListener("click", showCity);

// For Header List
function searchByHeader(event) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.innerText}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

const headerList = document.querySelectorAll("#headerList li");
for (let i = 0; i < headerList.length; i++) {
  headerList[i].addEventListener("click", searchByHeader);
}
//Convertation
let celsiusTemperature = null;
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#tempNow");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempNow.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempNow = document.querySelector("#tempNow");
  tempNow.innerHTML = Math.round(celsiusTemperature);
}

const fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

const celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// City by default
search("London");
