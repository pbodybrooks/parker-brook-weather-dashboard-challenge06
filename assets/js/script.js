var fetchButton = document.getElementById('fetch-button');
let APIKey = "fe8c1985df685a70d00e6d5098ec6a2d";


$("#fetch-weather-button").on("click", function getCurrentWeather() {
    let city = $(this).siblings("#city-submit").val();
    let geoCodeURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(geoCodeURL)
        .then(function (response){
            return response.json();
        })
        .then(function (weatherData) {  
            console.log('Current Weather');   
            console.log(weatherData);       
            let lat = weatherData.coord.lat;
            let lon = weatherData.coord.lon;
            console.log("Latitude: " + lat + "   ||  Longitude: " + lon);
        
            let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            // console.log("Weather URL: " + queryWeatherURL);
            
            fetch(forecastURL)
                .then(function (response){
                    return response.json();
                })
                .then(function (forecastData) {
                    console.log('Five Day Forecast:');
                    console.log(forecastData);
                })
        })
})








// function getGeoAPI(city){
//     city = "Salt Lake City";
//     state = "UT";
//     country = "US";
//     // let geoCodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=10&appid=" + APIKey;
//     let geoCodeURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

//     fetch(geoCodeURL)
//         .then(function (response){
//             return response.json();
//         })
//         .then(function (data) {  
//             console.log('Fetch Response: \n-------------');   
//             console.log(data);       
//             let lat = data.coord.lat;
//             let lon = data.coord.lon;
//             console.log("Latitude: " + lat + "   ||  Longitude: " + lon);
        
//             let queryWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
//             console.log("Weather URL: " + queryWeatherURL);
            
//             fetch(queryWeatherURL)
//                 .then(function (response){
//                     return response.json();
//                 })
//                 .then(function (weatherData) {
//                     console.log('Fetch Response: \n-------------');
//                     console.log(weatherData);
//                 })
//         })
// }

// function getWeatherAPI(lat, lon){
//     let queryWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
//     console.log(queryWeatherURL);
//     fetch(queryWeatherURL)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (datas) {
//         console.log('Fetch Response \n-------------');
//         console.log(datas);
//     })
// }

// function getWeather(){
//     getGeoAPI();
//     // getWeatherAPI();
// }



