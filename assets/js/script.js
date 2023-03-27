let city;
let state;
let country;

var fetchButton = document.getElementById('fetch-button');

let APIKey = "fe8c1985df685a70d00e6d5098ec6a2d";
let weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
// let geoCodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=10&appid=" + APIKey;
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// let byCityURL = "api.openweathermap.org/data/2.5/weather?q=city&appid=APIKey"
let queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;






city = "Salt Lake City";
state = "UT";
country = "US"

function getGeoAPI(city, state, country, APIKey){
    city = "Salt Lake City";
    state = "UT";
    country = "US";
    let geoCodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=10&appid=" + APIKey;
        fetch(geoCodeURL)
            .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let lat = data[0].lat;
            let lon = data[0].lon;
            console.log(lat,lon)
            return lat, lon;
        })
}

function getWeatherAPI(lat, lon, APIKey){
    let queryWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    fetch(queryWeatherURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

fetchButton.addEventListener('click', getGeoAPI);