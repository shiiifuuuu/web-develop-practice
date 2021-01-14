class WeatherAPI {
   //openweathermap.org/api
   constructor() {
      //initial location
      this.lat = 23.6763;
      this.lon = 90.4573;

      this.apiKey = 'e18e2c253f6e33bd87f605b802c0f703';
   }
   getCurrentLoc() {
      return new Promise((resolve, reject) => {
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
               resolve({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
               });
               reject((err) => err);
            });
         }
      });
   }

   async getWeather() {
      let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&&units=metric`);

      return await weather.json();
   }
   async getWeatherFromCity(city) {
      let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&&units=metric`);

      return await weather.json();
   }
   async getWeatherFromLatLon(lat, lon) {
      let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&&units=metric`);

      return await weather.json();
   }
}