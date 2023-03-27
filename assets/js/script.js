const APIKey = "fe8c1985df685a70d00e6d5098ec6a2d";
const fetchButton = document.getElementById('fetch-button');
const input = document.querySelector('#city-input');
const button = document.querySelector('#save-button');
const cityList = document.querySelector('#city-list');
// let city = document.querySelector('#city-input').value;


$("#save-button").on("click", getWeather);
$("#save-button").on("click", saveCity);

// $("#save-button").on("click", function () {
//     getWeather();
//     saveCity();
// })

function getWeather() {
  let city = $(this).siblings("#city-input").val();

  let weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      console.log('Current Weather');
      console.log(weatherData);
      let lat = weatherData.coord.lat;
      let lon = weatherData.coord.lon;
      console.log("Latitude: " + lat + "   ||  Longitude: " + lon);
      getForecast(lat, lon);
    });
}

function getForecast(lat, lon) {
  let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastData) {
      console.log('Five Day Forecast:');
      console.log(forecastData);
    });
}

function saveCity () {
    // get the current list of cities from local storage
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    // get the city name the user submitted in the input field + convert to title case for *aesthetics*
    const cityName = toTitleCase(input.value.trim());
    // check if the city name already exists in the stored list of cities
    const cityExists = cities.includes(cityName);
    // ff the city doesn't exist, add it to the list and save it to local storage
    if (!cityExists) {
      cities.push(cityName);
      localStorage.setItem('cities', JSON.stringify(cities));
    }
    // reset the input field to an empty string
    input.value = '';
    // display the updated list of cities as clickable buttons
    displayCities(cities);
};

// display the list of cities as clickable search buttons
function displayCities(cities) {
  cityList.innerHTML = '';
  cities.forEach(cityName => {
    const button = document.createElement('button');
    button.classList.add("city-button");
    button.textContent = cityName;
    button.addEventListener('click', () => {
      getWeather(cityName);
    });
    cityList.appendChild(button);
  });
}

// button.classList.contains('answer').addEventListener("click", getWeather(button.textContent))

// display saved city searches
const cities = JSON.parse(localStorage.getItem('cities')) || [];
displayCities(cities);

// clear local storage, removing all saved city searches
$("#clear-cities").on("click", function() {
    localStorage.clear();
    location.reload();
})

// this function just changes whatever the user's input was to title case so it looks nicer
// the original code I wrote only changed the first word's to uppercase rather than every word (ex. Salt lake city)
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}






/////////////////////////////////////////////////// GRAVEYARD ///////////////////////////////////////////////////

// ---- ORIGINAL SINGLE FUNCTION -----

// $("#save-button").on("click", function getWeather() {
//     let city = $(this).siblings("#city-input").val();
//     // saveCityHistory(city)
//     let geoCodeURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

//     fetch(geoCodeURL)
//         .then(function (response){
//             return response.json();
//         })
//         .then(function (weatherData) {  
//             console.log('Current Weather');   
//             console.log(weatherData);       
//             let lat = weatherData.coord.lat;
//             let lon = weatherData.coord.lon;
//             console.log("Latitude: " + lat + "   ||  Longitude: " + lon);
        
//             let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
//             // console.log("Weather URL: " + queryWeatherURL);
            
//             fetch(forecastURL)
//                 .then(function (response){
//                     return response.json();
//                 })
//                 .then(function (forecastData) {
//                     console.log('Five Day Forecast:');
//                     console.log(forecastData);
//                 })
//         })
// })
// ---- ------------------ -----



// ---- ORIGINAL SAVE HISTORY FUNCTION -----
// function saveCityHistory(city) {
//     // capitalize the city name in case the user did not so that it looks perty
//     let enteredCity = city.charAt(0).toUpperCase() + city.slice(1);
//     console.log("changed city name: " + enteredCity);

//     let savedCityHistory = JSON.parse(localStorage.getItem("savedCities")) || [];
//     let saveCity = {"name": enteredCity};
//     // localStorage.setItem("saveCity", JSON.stringify(saveCity));
//     savedCityHistory.push(saveCity);

//     localStorage.setItem("savedCities", JSON.stringify(savedCityHistory));
// ---- ------------------ -----



// ---- UPDATED SAVE HISTORY FUNCTION -----
// button.addEventListener('click', () => {
//   // get the current list of cities from local storage
//   const cities = JSON.parse(localStorage.getItem('cities')) || [];
//   // get the city name the user submitted in the input field + convert to title case for *aesthetics*
//   const cityName = toTitleCase(input.value.trim());
//   // check if the city name already exists in the stored list of cities
//   const cityExists = cities.includes(cityName);
//   // ff the city doesn't exist, add it to the list and save it to local storage
//   if (!cityExists) {
//     cities.push(cityName);
//     localStorage.setItem('cities', JSON.stringify(cities));
//   }
//   // reset the input field to an empty string
//   input.value = '';
//   // display the updated list of cities as clickable buttons
//   displayCities(cities);
// });
// ---- ------------------ -----







