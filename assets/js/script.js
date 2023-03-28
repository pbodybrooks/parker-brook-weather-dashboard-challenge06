// API key:
const APIKey = "fe8c1985df685a70d00e6d5098ec6a2d";

// Global Selectors
const input = document.querySelector('#city-input');
const button = document.querySelector('#save-button');
const cityList = document.querySelector('#city-list');
const cityDisplayMax = 15;


// this listens for the enter key rather than a click because its more intuitive
$("#city-input").keydown(function(event) {
    if (event.keyCode === 13) {
        // prevent default is needed because the save button will otherwise try to take in "city" as an object
        event.preventDefault();
        // if keydown detected, click save button
        $("#save-button").click();
    }
});

// this listens for a click on the Get Weather! button 
$("#save-button").on("click", function (event) {
    event.preventDefault();
    // set city to the value entered into the input
    const city = $("#city-input").val();
    // get the weather, feed it city
    getWeather(city);
    // save the city to local storage
    saveCity();
})

// getWeather does two things when fed a city: it gets the weather, and stores the latitude and longitude in variables
function getWeather(city) {
    let weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log("Weather URL: " + weatherURL);
    // fetch URL
    fetch(weatherURL)
        .then(function (response) {
        // get JSON format response
        return response.json();
        })
        // get weather data
        .then(function (weatherData) {
        console.log('Current Weather in ' + city);
        console.log(weatherData);
        // store latitude and longitude values for getForecast
        let lat = weatherData.coord.lat;
        let lon = weatherData.coord.lon;
        console.log("Latitude: " + lat + "   ||  Longitude: " + lon);
        // call getForecast and feed it lat, lon, and city (not required)
        getForecast(lat, lon, city);
        });
}

// get forecast takes in latitude and longitude (And city simply for console log) to return 5-day forecast data
function getForecast(lat, lon, city) {
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
    console.log("Forecast URL: " + forecastURL);
    fetch(forecastURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (forecastData) {
        console.log('Five Day Forecast in ' + city);
        console.log(forecastData);
        });
}

// saveCity saves the city to local storage if it is not already there
function saveCity () {
    // get the current list of cities from local storage
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    // get the city name the user submitted in the input field + convert to title case for *aesthetics*
    const cityName = toTitleCase(input.value.trim());
    // check if the city name already exists in the stored list of cities
    const cityExists = cities.includes(cityName);
    // if the city doesn't exist, add it to the list and save it to local storage
    if (!cityExists) {
      cities.push(cityName);
      // remove cities beyond cityDisplayMax value
      if (cities.length >= cityDisplayMax) {
        cities.shift();
        }
      localStorage.setItem('cities', JSON.stringify(cities));
    }
    // reset the input field to an empty string
    input.value = '';
    // display the updated list of cities as clickable buttons
    displayCities(cities);
};

// display the list of cities as clickable search buttons
function displayCities(cities) {
    // reverse cityList so that most recent searches are at the top
  cities = cities.reverse();  
  cityList.innerHTML = '';
  // for each city, create a button with class "city-button" and an event listener to run getWeather for that city
  cities.forEach(cityName => {
    const button = document.createElement('button');
    button.classList.add("city-button");
    // create a var cityName out of the buttons text content
    button.textContent = cityName;
    button.addEventListener('click', () => {
        // give getWeather the city name as an argument 
        getWeather(cityName);
    });
    cityList.appendChild(button);
  });
}

// display saved city searches at all times
const cities = JSON.parse(localStorage.getItem('cities')) || [];
displayCities(cities);

// allows user clear local storage, removing all saved city searches
$("#clear-cities").on("click", function() {
    localStorage.clear();
    location.reload();
})

// this function just changes whatever the user's input was to title case so it looks nicer when stored
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







