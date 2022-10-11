<script>
import axios from "axios";

export default {
  name: 'Cuaca',
  data: () => ({
    cuaca: {
      "coord": { "lon": 110.3666, "lat": -7.7296 },
      "weather": [{ "id": 804, "main": "Clouds", "description": "awan mendung", "icon": "04d" }],
      "base": "stations",
      "main": { "temp": 26.85, "feels_like": 29.16, "temp_min": 26.85, "temp_max": 26.85, "pressure": 1013, "humidity": 77, "sea_level": 1013, "grnd_level": 992 },
      "visibility": 10000,
      "wind": { "speed": 2.52, "deg": 168, "gust": 3.58 },
      "clouds": { "all": 100 }, 
      "dt": 1665452744,
      "sys": { "country": "ID", "sunrise": 1665440286, "sunset": 1665484342 },
      "timezone": 25200,
      "id": 1635660,
      "name": "Melati",
      "cod": 200
    },
    latitude: -7.7296003,
    longitude: 110.366628,
  }),

  computed: {
    tanggal() {
      return new Intl.DateTimeFormat('id', { dateStyle: 'full', timeStyle: 'short' }).format(this.cuaca.dt * 1000);
    },
    gambarCuaca() {
      return `http://openweathermap.org/img/wn/${this.cuaca.weather[0].icon}@2x.png`;
    },
    suhu() {
      return `${Math.round(this.cuaca.main.temp)}°C`;
    },
    terasaSeperti() {
      return `${Math.round(this.cuaca.main.feels_like)}°C`;
    },
    kelembapan() {
      return this.cuaca.main.humidity;
    },
    tekanan() {
      return this.cuaca.main.pressure;
    },
    kecepatanAngin() {
      // from m/s to km/h
      return Math.round(this.cuaca.wind.speed * 3.6);
    },
    deskripsi() {
      return this.cuaca.weather[0].description;
    },
    maksMin() {
      return `${Math.round(this.cuaca.main.temp_min)}°C/${Math.round(this.cuaca.main.temp_max)}°C`;
    },
  },


  methods: {
    getWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&lang=id&appid=724edd4b529beb144b3986c95d678b48`)
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
  <div class="row">

    <div class="col">
      <p class="text-center pt-1 mt-1">{{tanggal}}</p>
      <img :src="gambarCuaca" class="mx-auto d-block p-0" alt="...">
      <p class="text-center m-0 p-0 text-uppercase">{{deskripsi}}</p>
      <p class="temp text-center m-0 p-0">{{suhu}}</p>
    </div>

    <div class="col kecil">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><i class="fa-solid fa-cloud-sun"></i> Terasa seperti: {{terasaSeperti}}</li>
        <li class="list-group-item"><i class="fa-solid fa-temperature-half"></i> Maks/Min: {{maksMin}}</li>
        <li class="list-group-item"><i class="fa-solid fa-droplet"></i> Kelembapan: {{kelembapan}}%</li>
        <li class="list-group-item"><i class="fa-solid fa-arrows-to-circle"></i> Tekanan: {{tekanan}} hPa</li>
        <li class="list-group-item"><i class="fa-solid fa-wind"></i> Angin: {{kecepatanAngin}} Km/jam</li>
      </ul>
    </div>

  </div>
</template>

<style>
.kecil {
  font-size: 0.8rem;
}

.temp {
  font-size: 2rem;
  font-weight: 700;
}
</style>

