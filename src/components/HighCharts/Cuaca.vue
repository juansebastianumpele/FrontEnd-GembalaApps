<script>
import axios from "axios";
import { mapActions, mapState } from "pinia";
import d$user from "@/stores/user";


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
    perkiraaanCuaca: {
      city:
      {
        id: 1630681,
        name: "Candi Prambanan",
        coord:
        {
          lon: 110.4616,
          lat: -7.7165
        },
        country: "ID",
        population: 44925,
        timezone: 25200
      },
      cod: 200,
      message: 3.3570573,
      cnt: 1,
      list: [{
        dt: 1669780800,
        sunrise: 1669759857,
        sunset: 1669804965,
        temp: {
          day: 27.6,
          min: 22.76,
          max: 27.79,
          night: 22.76,
          eve: 25.56,
          morn: 23.2
        },
        feels_like: {
          day: 30.03,
          night: 23.44,
          eve: 26.23,
          morn: 23.98
        },
        pressure: 1010,
        humidity: 71,
        weather: [{
          id: 500,
          main: "Rain",
          description: "hujan rintik-rintik",
          icon: "10d"
        }],
        speed: 4.37,
        deg: 211,
        gust: 4.32,
        clouds: 97,
        pop: 0.44,
        rain: 1.27
      }]
    },
    appid: '724edd4b529beb144b3986c95d678b48',
  }),
  computed: {
    ...mapState(d$user, ["g$userPeternakan"]),
    tanggal() {
      return new Intl.DateTimeFormat("id", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(this.cuaca.dt * 1000);
    },
    gambarCuaca() {
      return `https://openweathermap.org/img/wn/${this.cuaca.weather[0].icon}@2x.png`;
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
    arahAngin() {
      if (this.cuaca.wind.deg >= 0 && this.cuaca.wind.deg <= 22.5) {
        return "Utara ↓";
      } else if (this.cuaca.wind.deg > 22.5 && this.cuaca.wind.deg <= 67.5) {
        return "Timur Laut ↙";
      } else if (this.cuaca.wind.deg > 67.5 && this.cuaca.wind.deg <= 112.5) {
        return "Timur ←";
      } else if (this.cuaca.wind.deg > 112.5 && this.cuaca.wind.deg <= 157.5) {
        return "Tenggara ↖";
      } else if (this.cuaca.wind.deg > 157.5 && this.cuaca.wind.deg <= 202.5) {
        return "Selatan ↑";
      } else if (this.cuaca.wind.deg > 202.5 && this.cuaca.wind.deg <= 247.5) {
        return "Barat Daya ↗";
      } else if (this.cuaca.wind.deg > 247.5 && this.cuaca.wind.deg <= 292.5) {
        return "Barat →";
      } else if (this.cuaca.wind.deg > 292.5 && this.cuaca.wind.deg <= 337.5) {
        return "Barat Laut ↘";
      } else if (this.cuaca.wind.deg > 337.5 && this.cuaca.wind.deg <= 360) {
        return "Utara ↓";
      }
    },
    deskripsi() {
      return this.cuaca.weather[0].description;
    },
    maksMin() {
      return `${Math.round(this.cuaca.main.temp_min)}°C/${Math.round(
        this.cuaca.main.temp_max
      )}°C`;
    },
    curahHujan() {
      return this.cuaca.rain ? `${this.cuaca.rain["1h"]} mm` : '---';
    },
  },

  methods: {
    async getWeather() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.g$userPeternakan.latitude}&lon=${this.g$userPeternakan.longitude}&units=metric&lang=id&appid=${this.appid}`
        )
        .then((response) => {
          this.cuaca = response.data;
        });
    },
    async getWeatherPrediction() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${this.latitude}&lon=${this.longitude}&units=metric&lang=id&cnt=1&appid=${this.appid}`
        )
        .then((response) => {
          this.perkiraaanCuaca = response.data;
        });
    },
  },
  async mounted() {
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
      <img style="width: 80px" :src="gambarCuaca" class="d-block p-0 m-0" alt="..." />
      <p class="text-left text-white ml-2 mt--3 m-0 p-0 text-capitalize" style="font-size: small">
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
  <div class="row mt-3 mr--3">
    <div class="col kecil">
      <div class="row">
        <div class="col-5 text-white">
          <i class="fa-solid fa-cloud-rain"></i> Curah Hujan:
          {{ curahHujan }}
        </div>
        <div class="col-7 text-white">
          <i class="fa-solid fa-droplet"></i> Kelembapan: {{ kelembapan }}%
        </div>
      </div>
      <hr class="bg-white m-2 mr-4 ml--1" />
      <div class="row">
        <div class="col-5 text-white">
          <i class="fa-solid fa-arrows-to-circle"></i> Tekanan:
          {{ tekanan }} hPa
        </div>
        <div class="col-7 text-white">
          <i class="fa-solid fa-wind"></i> Angin: {{ kecepatanAngin }} Km/jam
          dari {{ arahAngin }}
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
