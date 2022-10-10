<script>
import axios from "axios";

export default {
  name: 'Cuaca',
  data: () => ({
    cuaca: {
      "coord":
        { "lon": 110.3666, "lat": -7.7296 },
      "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
      "base": "stations",
      "main": {
        "temp": 300.7,
        "feels_like": 303.54,
        "temp_min": 300.7,
        "temp_max": 300.7,
        "pressure": 1010,
        "humidity": 75,
        "sea_level": 1010,
        "grnd_level": 988
      },
      "visibility": 10000,
      "wind": { "speed": 2.59, "deg": 187, "gust": 2.95 },
      "rain": { "1h": 0.22 },
      "clouds": { "all": 100 },
      "dt": 1665388716,
      "sys": { "country": "ID", "sunrise": 1665353915, "sunset": 1665397945 },
      "timezone": 25200,
      "id": 1635660,
      "name": "Melati",
      "cod": 200
    }
  }),
  methods: {
    getWeather() {
      axios.get('https://api.openweathermap.org/data/2.5/weather?lat=-7.7296003&lon=110.366628&appid=724edd4b529beb144b3986c95d678b48')
        .then(response => {
          this.cuaca = response.data;
          console.log(this.cuaca);
        })
    }
  },
  mounted() {
    this.getWeather()
  }
}
</script>

<template>
  <div>
    
    <div>
      <img src="http://openweathermap.org/img/wn/10d@2x.png" class="mx-auto d-block p-0" alt="...">
      <p class="temp p-0">36 °C</p>
    </div>

    <ul class="list-group list-group-flush">
      <li class="list-group-item"><i class="fa-solid fa-temperature-half"></i> Maks/Min</li>
      <li class="list-group-item"><i class="fa-solid fa-droplet"></i> Kelembapan</li>
      <li class="list-group-item"><i class="fa-solid fa-arrows-to-circle"></i> Tekanan</li>
      <li class="list-group-item"><i class="fa-solid fa-wind"></i> Angin</li>
    </ul>
  </div>
</template>

<style>
.temp {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto;
  padding: 0 auto;
  text-align: center;
}
</style>

