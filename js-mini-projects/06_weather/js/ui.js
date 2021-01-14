let weatherIcon = `https://openweathermap.org/img/wn/`;
class UI {
   printWeather(data) {
      let sys = calculation(data);
      let sunrise = sys.sunrise;
      let sunset = sys.sunset;
      let timezone = sys.timezone;

      displayWeather.innerHTML = `
         <ul id="grp-1" class="mrgn-b-1">
            <li>${data.main.temp}&deg;C</li>
            <li>Feels like ${data.main.feels_like}&deg;C</li>
            <li>${data.weather[0].main} <img src="${weatherIcon}${data.weather[0].icon}@2x.png" alt="weather"></li>
            <li>${data.name}, ${data.sys.country}</li>
         </ul>
         <ul id="grp-2" class="mrgn-b-1">
            <li>Max Temp: ${data.main.temp_max}&deg;C</li>
            <li>Min Temp: ${data.main.temp_min}&deg;C</li>
         </ul>
         <ul id="grp-3" class="mrgn-b-1">
            <li>Humidity: ${data.main.humidity}%</li>
            <li>Pressure: ${data.main.pressure} hPa</li>
         </ul>
         <ul id="grp-4">
            <li>Timezone: ${timezone}</li>
            <li>Sunrise: ${sunrise}</li>
            <li>Sunset: ${sunset}</li>
            <li>Wind: ${data.wind.speed} m/s at ${data.wind.deg}&deg;</li>
         </ul>
      `;
   }

   setErrorEvent() {
      userInput.style.boxShadow = '0 2px 10px #ff0505, 0 -2px 10px #ff0505';
      searchSection.style.boxShadow = '0 2px 10px #ff0505, 0 -2px 10px #ff0505';
   }
   toggleClass() {
      searchSection.classList.toggle('active', true);
      blur.classList.toggle('active', true);
   }
   focusInput() {
      userInput.focus();
   }
   clearEvents() {
      searchSection.classList.toggle('active', false);
      blur.classList.toggle('active', false);
      userInput.value = '';
      userInput.style.boxShadow = '';
      searchSection.style.boxShadow = '';
   }
   boxShadowRemove() {
      userInput.style.boxShadow = '';
      searchSection.style.boxShadow = '';
   }
}

function calculation(data) {
   let d1 = new Date(0);
   d1.setUTCSeconds(data.sys.sunrise);
   let sunrise = `${d1.getHours()} hr : ${d1.getMinutes()}m : ${d1.getSeconds()} s`;

   let d2 = new Date(0);
   d2.setUTCSeconds(data.sys.sunset);
   let sunset = `${d2.getHours()} hr : ${d2.getMinutes()} m : ${d2.getSeconds()} s`

   let timezone = `UTC ${data.timezone / 3600}`;

   return {
      sunrise,
      sunset,
      timezone
   }
}