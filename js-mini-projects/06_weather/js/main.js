const myLocation = document.getElementById('my-location');
const userInput = document.getElementById('city-name');
const submit = document.getElementById('location-submit');

const displayWeather = document.getElementById('display-weather');
const searchBar = document.getElementById('search-bar');
const searchSection = document.getElementById('search');
const blur = document.getElementById('blur');
const close = document.getElementById('close');

let weather = new WeatherAPI;
let ui = new UI;

//document reload event
document.addEventListener('DOMContentLoaded', (e) => {
   let city = localStorage.getItem('city');
   if (city === null) {
      //Calling Default Location
      weather.getWeather().then(data => {
         ui.printWeather(data);
      }).catch(err => console.log(err));
   } else {
      //Calling weather from saved location
      weather.getWeatherFromCity(city).then(data => {
         ui.printWeather(data);
      }).catch(err => console.log(err));
   }
});

//Weather in your location
myLocation.addEventListener('mouseup', (e) => {
   weather.getCurrentLoc().then(data => {
      weather.getWeatherFromLatLon(data.latitude, data.longitude).then(data => {
         localStorage.setItem('city', data.name);
         ui.printWeather(data);
         ui.clearEvents();
      }).catch(err => console.log(err))
   });

   e.preventDefault();
});

//Weather in custom location
submit.addEventListener('click', (e) => {
   let city = userInput.value;
   if (city === '') {
      //error message
      ui.setErrorEvent();
   } else {
      weather.getWeatherFromCity(city).then(data => {
         if (data.cod === '404') {
            //error message
            ui.setErrorEvent();
         } else {
            ui.clearEvents();
            localStorage.setItem('city', data.name);
            ui.printWeather(data);
         }
      }).catch(err => console.log(err))
   }
   e.preventDefault();
});

userInput.addEventListener('focus', ui.boxShadowRemove);
userInput.addEventListener('keydown', ui.boxShadowRemove)

searchBar.addEventListener('click', () => {
   ui.toggleClass();
   ui.focusInput();
});

close.addEventListener('click', ui.clearEvents);

