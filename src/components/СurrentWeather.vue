<template>
<div class="currentWeather" >
        <div class="container">
            <div class="currentWeather__wrapper">
                    <div class="location">
                        <div class="location__city">
                            {{getWeatherCity}}, 
                            {{getWeatherCountry}}
                        </div>
                        <div class="location__data">
                            {{ new Date().toLocaleDateString('en-GB') }}
                        </div>
                    </div>
                    <div class="currentWeather__weather">
                            Feels Like: {{getWeatherMain.feelsLike}}&#176;C
                        </div>
                    <div class="currentWeather__now" style="background-image:none">
                        <div class="currentWeather__temperature">{{getWeatherMain.temp}} 
                            <span class="temperature__C">&#176;C</span> 
                            <span class="temperature__img"><img :src="[getWeatherMain.icon ? weatherImg(getWeatherMain.icon) : '']"  alt="weather-icon" /></span>
                            <span class="temperature__min">Min:<br>{{getWeatherMain.tempMin}}</span>
                            <span class="temperature__max">Max:<br>{{getWeatherMain.tempMax}}</span>
                        </div>
                        <div class="currentWeather__weather">
                            {{getWeatherMain.description}}
                        </div>
                    </div>
                    <div class="weather__info">
                        <span><vue-feather type="wind" size="18px"></vue-feather> <span class="info">{{getWeatherInfo.wind}} m/s</span></span>
                        <span><vue-feather type="droplet" size="18px"></vue-feather> <span class="info">{{getWeatherInfo.clouds}} %</span></span>
                        <span><vue-feather type="cloud" size="18px"></vue-feather> <span class="info">{{getWeatherInfo.humidity}} %</span></span>
                    </div>
                </div>
            <!-- <div class="col-6 currentWeather__hourly">
                <nav class="hourly__wrapper">
                    <li class="hourly__item">
                        <span>Time</span>
                        <img
                        src="http://openweathermap.org/img/wn/10d.png"
                        alt="weather-icon" />
                        <span>Temperature</span>
                        <span>rain?</span>
                        <span>wind</span>
                    </li>
                </nav>
            </div> -->
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import VueFeather from 'vue-feather';



export default {
    data() {
        return {}
    },
    components: {
        VueFeather
    },
    computed: {
        ...mapGetters(["getWeatherMain", "getWeatherCity", "getWeatherCountry", "getWeatherInfo"])
    },
    methods: {
        weatherImg (weather) {
            const linkFull = ` https://openweathermap.org/img/wn/${weather}.png`; 
            return linkFull
        }
    }
};
</script>
