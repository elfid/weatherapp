<template>
    <search-city/>
    <current-weather/>
</template> 

<script>
import SearchCity from '@/components/SearchCity.vue';
import CurrentWeather from "@/components/СurrentWeather.vue";

import { mapGetters, mapActions } from "vuex";
export default {
    name: "App",
    components: {
        SearchCity,
        CurrentWeather,
    },
    computed: {
        ...mapGetters(["isSearched"])
    },
    methods: {
        ...mapActions(["fetchWeatherData"]),
        initData() {
            this.fetchWeatherData(this.$store.state.defaultSearch);
        }
    },
    created() {
        this.initData();
    }
};
</script>
<style lang="scss">
@import "./assets/css/style.scss";
</style>
