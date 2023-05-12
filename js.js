// Feature #1
function getTime(){
let currentTime = document.querySelector("#time-string");
let now = new Date();

let hours = now.getHours() > 9 ? now.getHours() : "0" + now.getHours();
let minutes = now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes();

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

currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}

setInterval(getTime, 1000)

// Feature#2
// function searchForCity(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#type-city");

//   let cityName = document.querySelector("h1");
//   if (searchInput.value) {
//     cityName.innerHTML = `${searchInput.value}`;
//   }
// }

// let cityForm = document.querySelector("#search-form");
// cityForm.addEventListener("submit", searchForCity);

// Feature#3
// let celsiusType = document.querySelector("#celsius");
// let farengateType = document.querySelector("#farengate");
// function handlTemperature(temp, type) {
//   let temperature = document.querySelector("#number");
//   if (type === "celsius") {
//     temperature.innerHTML = `8`;
//     celsiusType.className = "active-temp";
//     farengateType.className = "";
//   } else {
//     temperature.innerHTML = `55`;
//     farengateType.className = "active-temp";
//     celsiusType.className = "";
//   }
// }

// celsiusType.addEventListener("click", function () {
//   handlTemperature(8, "celsius");
// });

// farengateType.addEventListener("click", function () {
//   handlTemperature(55, "farengate");
// });




// Current temperature
const apiKey = `d0bec9d6480b2df7e1b8e4642f141337`;


function showTemperature(response) {
  console.log(response.data);
  let showCurrentCity = document.querySelector("#cityName");
  showCurrentCity.innerHTML = `${response.data.name}`
  
  let tempNow = document.querySelector("#tempNow");
  tempNow.innerHTML = `${Math.round(response.data.main.temp)}`
  
  let weatherDescription = document.querySelector("#weatherDescription")
  weatherDescription.innerHTML = `${response.data.weather[0].description}`
  
  let weatherSituation = document.querySelector("#weatherSituation");
  weatherSituation.innerHTML =`Humidity:${response.data.main.humidity}% <br/>
  Wind speed: ${response.data.wind.speed} mph`
  
  const currentIcon = document.querySelector("#currentIcon");
  const iconUrl = ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  currentIcon.src = iconUrl;
}
// Search

function cityLocation(event){
  event.preventDefault()
  const cityInputTag = document.querySelector("#type-city")
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputTag.value}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemperature)
}


const searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", cityLocation)

function myCurrentTemperature(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
// Fetch via geolocation
function showCity(){
  navigator.geolocation.getCurrentPosition(myCurrentTemperature);
}

  
const currentTemperature = document.querySelector("#currentTemperature");
currentTemperature.addEventListener("click", showCity);

// For Header List
function searchByHeader(event){
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.innerText}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemperature)
}

const headerList = document.querySelectorAll("#headerList li");

for (let i=0; i<headerList.length; i++){
  headerList[i].addEventListener("click", searchByHeader)
}
