import { createStore } from "vuex";

export default createStore({
    state: {
        apiBase: "https://api.openweathermap.org/data/2.5/",
        defaultSearch: "Kyiv",
        search: "",
        apiKey: "e5ac8edcf4d266d3ec9a4e1c2ef76ab9",
        weatherData: {},
        isError: false,
    },
    getters: {
        getWeatherMain(state) {
            const { temp, feelsLike, description, icon, info, tempMin, tempMax } = state.weatherData;
            return {
                temp,
                feelsLike,
                description,
                info,
                icon,
                tempMin,
                tempMax
            };
        },
        getWeatherInfo(state) {
            const { wind, clouds, humidity } = state.weatherData;
            return {
                wind,
                clouds,
                humidity,
            };
        },
        getWeatherCity(state) {
            return state.weatherData.name;
        },
        getWeatherCountry(state) {
            return state.weatherData.country;
        },
        isSearched(state) {
            return state.search !== "";
        },
        getError(state) {
            return state.isError;
        },
    },
    mutations: {
        setSearch(state, search) {
            state.search = search.toLowerCase();
        },
        setWeatherData(state, data) {
            state.weatherData = data;
        },
        setError(state, value) {
            state.isError = value;
        },
    },
    actions: {
        async fetchWeatherData({ commit, state }, search) {
            try {
                commit("setSearch", search);
                const response = await fetch(
                    `${state.apiBase}weather?q=${search}&appid=${state.apiKey}&units=metric`
                ).then(response => {
                    return response.json()
                });
                const newWeatherData = {
                    name: response.name,
                    temp: response.main.temp,
                    tempMin: response.main.temp_min,
                    tempMax: response.main.temp_max,
                    feelsLike: response.main.feels_like,
                    description: response.weather[0].description,
                    icon: response.weather[0].icon,
                    info: response.weather[0].main,
                    wind: response.wind.speed,
                    humidity: response.main.humidity,
                    clouds: response.clouds.all,
                    country: response.sys.country,
                };
                commit("setWeatherData", newWeatherData);
                commit("setError", false);
            } catch (error) {
                console.log(error);
                commit("setError", true);
                commit("setWeatherData", {});
            }
        },
    },
    modules: {},
});
