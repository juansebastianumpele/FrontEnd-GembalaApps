<script>
import axios from "axios";

export default {
  name: "Cuaca",
  data: () => ({
    cuaca: {
      coord: { lon: 110.3666, lat: -7.7296 },
      weather: [
        { id: 804, main: "Clouds", description: "awan mendung", icon: "04d" },
      ],
      base: "stations",
      main: {
        temp: 26.85,
        feels_like: 29.16,
        temp_min: 26.85,
        temp_max: 26.85,
        pressure: 1013,
        humidity: 77,
        sea_level: 1013,
        grnd_level: 992,
      },
      visibility: 10000,
      wind: { speed: 2.52, deg: 168, gust: 3.58 },
      clouds: { all: 100 },
      dt: 1665452744,
      sys: { country: "ID", sunrise: 1665440286, sunset: 1665484342 },
      timezone: 25200,
      id: 1635660,
      name: "Melati",
      cod: 200,
    },
    latitude: -7.7296003,
    longitude: 110.366628,
  }),

  computed: {
    tanggal() {
      return new Intl.DateTimeFormat("id", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(this.cuaca.dt * 1000);
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
      return `${Math.round(this.cuaca.main.temp_min)}°C/${Math.round(
        this.cuaca.main.temp_max
      )}°C`;
    },
  },

  methods: {
    getWeather() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&lang=id&appid=724edd4b529beb144b3986c95d678b48`
        )
        .then((response) => {
          this.cuaca = response.data;
        });
    },
  },
  mounted() {
    this.getWeather();
  },
};
</script>

<template>
  <div class="row">
    <div class="col">
      <p class="text-left text-white pt-1 mt-1 ml-3" style="font-size: small">
        {{ tanggal }}
      </p>
    </div>
  </div>
  <div class="row mt--4">
    <div class="col-5">
      <img
        style="width: 80px"
        :src="gambarCuaca"
        class="d-block p-0 m-0"
        alt="..."
      />
      <p
        class="text-left text-white ml-2 mt--3 m-0 p-0 text-capitalize"
        style="font-size: small"
      >
        {{ deskripsi }}
      </p>
    </div>
    <div class="col-7 mt-3">
      <div class="row">
        <div class="col-12">
          <p class="temp text-white text-sm-left">
            {{ suhu }}
          </p>
          <p class="kecil text-sm-left text-white mt--3">
            Terasa Seperti
            {{ terasaSeperti }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col kecil">
      <div class="row">
        <div class="col-6 text-white">
          <i class="fa-solid fa-temperature-half"></i> Maks/Min:
          {{ maksMin }}
        </div>
        <div class="col-6 text-white">
          <i class="fa-solid fa-droplet"></i> Kelembapan: {{ kelembapan }}%
        </div>
      </div>
      <hr class="bg-white m-2 mr-4 ml--2" />
      <div class="row">
        <div class="col-6 text-white">
          <i class="fa-solid fa-arrows-to-circle"></i> Tekanan:
          {{ tekanan }} hPa
        </div>
        <div class="col-6 text-white">
          <i class="fa-solid fa-wind"></i> Angin: {{ kecepatanAngin }} Km/jam
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.kecil {
  font-size: 0.7rem;
}

.temp {
  font-size: 1.8rem;
  font-weight: 700;
}
</style>
