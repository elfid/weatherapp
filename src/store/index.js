import { createStore } from "vuex";

export default createStore({
    state: {
        apiBase: "https://api.openweathermap.org/data/2.5/",
        defaultSearch: "Kyiv",
        search: "",
        apiKey: "e5ac8edcf4d266d3ec9a4e1c2ef76ab9",
        weatherData: {},
        isError: false,
        lastData: {},
        apiCityBase: "http://api.geonames.org/searchJSON?",
        searchData: [],
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
        getSearchData(state) {
            return state.searchData;
        }
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
        setSearchData(state, searchData) {
            state.searchData = searchData;
        }
    },
    actions: {
        async fetchWeatherData({ commit, state }, search) {
            try {
                commit("setSearch", search);
                let response = await fetch(
                    `${state.apiBase}weather?q=${search}&appid=${state.apiKey}&units=metric`
                ).then(response => {
                    console.log(response)
                    return response.json()
                });
                commit("setError", true);
                let newWeatherData;
                if (response.cod !== +'200') {
                    console.log('ne 200')
                    newWeatherData = this.lastData;
                    commit("setError", true);
                } else {
                    newWeatherData = {
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
                    this.lastData = newWeatherData
                    commit("setError", false);
                }
                commit("setWeatherData", newWeatherData);
            } catch (error) {
                console.log(error, "ERROR");
            }
        },
        async fetchCity({ commit, state }, search) {
            try {
                let response = await fetch(
                    `${state.apiCityBase}name_startsWith=${search}&maxRows=3&country=UA&username=elfid`
                ).then(response => {
                    console.log(response, 'apiCityBase1111')
                    return response.json()
                });
                let newSearchData = [];
                response.geonames.forEach((item) => {
                    const itemData = item.toponymName;
                    newSearchData.push(itemData);
                });
                commit("setSearchData", newSearchData)
                console.log(newSearchData, 'apiCityBase2222', state.searchData)
            } catch (error) {
                console.log(error, "ERROR");
            }
        },
    },
    modules: {},
});
