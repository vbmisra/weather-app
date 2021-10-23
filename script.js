//variables
var inputEl = document.querySelector("input[name=city");
var submitBtn = document.querySelector("#searchbtn");
var previousCitiesContainer = document.querySelector("#previous-cities");
var forecast = document.querySelector("#forecast");
var mainEl = document.querySelector("#main-card");
var formEl = document.querySelector("form");

var openWeathApiKey = "10fe0fd42f12afcfb8e21c50bee24186";
var city = "bakersfield";
var geoLocateCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+ city + ",US&limit=5&appid="+openWeathApiKey;

fetch(geoLocateCityUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var cityInfo = data[0]
        var getWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+cityInfo.lat +"&lon="+cityInfo.lon +"&exclude=minutely,hourly&units=imperial&appid="+openWeathApiKey

        fetch(getWeatherUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(weatherData){
            console.log(weatherData)
            
            var cityNameEl = document.createElement("h2")
            cityNameEl.textContent = city
            mainEl.append(cityNameEl)

            var cityWeatherList = document.createElement("ul")

            var temp = document.createElement("li")
            temp.textContent = "Temperature: "+weatherData.current.temp+" F"
            cityWeatherList.append(temp)

            var wind = document.createElement("li")
            wind.textContent = "Wind Speed: "+weatherData.current.wind_speed+" mph"
            cityWeatherList.append(wind)

        mainEl.append(cityWeatherList)
 
var forecastTitle = document.createElement("h2")
forecastTitle.textContent= "5-day forecast"
forecast.append(forecastTitle)

for (var i = 0; i < 5; i++) {
    var dayXWeather = weatherData.daily[i]
    var dayXweatherCard = document.createElement('ul')
    var date = moment.unix(dayXWeather.sunrise).format("DD/MM/YYYY")

    var temp = document.createElement("li")
    temp.textContent = "Temperature: "+dayXWeather.current.temp+" F"
    dayXweatherCard.append(temp)

    var wind = document.createElement("li")
    wind.textContent = "Wind Speed: "+dayXWeather.current.wind_speed+" mph"
    dayXweatherCard.append(wind)

    mainEl.append(dayXweatherCard)
}

        })
    })

formEl.addEventListener("submit", function(e) {
    e.preventDefault()
    var searchValue = inputEl.value.trim()

    if(searchValue) {
        return
    }

    var newBtn=document.createElement("button")

    newBtn.textContent = searchValue
    newBtn.setAttribute("data-value", searchValue)
    
    newBtn.addEventListener("click", function(){console.log("clicked")})
    previousCitiesContainer.append(newBtn)
})

function searchBtnClicked (){

}