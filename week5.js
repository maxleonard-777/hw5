// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.
window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
let weatherButton = document.querySelector(`.get-weather`)
  // When the "get weather" button is clicked:
weatherButton.addEventListener (`click`, async function(event) {
    // - Ignore the default behavior of the button
event.preventDefault()
    // - Get a reference to the element containing the user-entered location
let location = document.querySelector(`#location`)
    // - Get the user-entered location from the element's value
let definedLocation = location.value 
    // - Get a reference to the element containing the user-entered number of days
let days = document.querySelector(`#days`)
    // - Get the user-entered number of days from the element's value
let definedDays = days.value 
    // - Check to see if the user entered anything; if so:
if (definedLocation.length > 0) {
      // - Construct a URL to call the WeatherAPI.com API
let url = `https://api.weatherapi.com/v1/forecast.json?key=45a3cb0d58c947788dd11853213004&q=${definedLocation}&days=${definedDays}`
      // - Fetch the url, wait for a response, store the response in memory
let response = await fetch(url)
      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()
      // - Write the json-formatted data to the JavaScript console
      console.log(json)
      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
let place = json.location
let currentWeather = json.current
let forecast = json.forecast
let currentElement = document.querySelector(`.current`)
currentElement.innerHTML = `<div class="text-center space-y-2">
<div class="font-bold text-3xl">Current Weather for ${place.name}, ${place.region}</div>
<div class="font-bold">
  <img src="https:${currentWeather.condition.icon}" class="inline-block">
  <span class="temperature">${currentWeather.temp_f}</span>° 
  and
  <span class="conditions">${currentWeather.condition.text}</span>
</div>
</div>
`
//just figure out how to get the data from the nth day that you need. Icon and temp and description. it is an array 
let forecastElement = document.querySelector(`.forecast`)

forecastElement.innerHTML = `
<div class="text-center space-y-2">
<div class="font-bold text-3xl">${definedDays} Day Forecast</div> </div>`

// repeat as many times as the number of days entered by the user the forecast HTML
for (let i = 0; i < definedDays; i++) { 
let forecastday = forecast.forecastday[i]
// console.log(forecastday)
// console.log(forecastday.day.maxtemp_f)
// console.log(forecastday.day.condition.text)

// don't want to overwrite the HTML so use insert adjacent 
forecastElement.insertAdjacentHTML("beforeend",`
<div class="text-center space-y-8">

<div>
  <img src="https:${forecastday.day.condition.icon}" class="mx-auto">
  <h1 class="text-2xl text-bold text-gray-500">${forecastday.date}</h1>
  <h2 class="text-xl">High ${forecastday.day.maxtemp_f}° – ${forecastday.day.mintemp_f}°</h2>
  <p class="text-gray-500">${forecastday.day.condition.text}</h1>
</div>
<div>
`
)
}
}
})
})