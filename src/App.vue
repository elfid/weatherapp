<template>
    <div @click="setSearchData([])">
        <search-city/>
        <current-weather/>
        <footer class="footer">
            <a target="_blank" href="https://www.freepik.com">designed by Wirestock - Freepik.com</a>
        </footer>
    </div>
</template> 

<script>
import SearchCity from '@/components/SearchCity.vue';
import CurrentWeather from "@/components/СurrentWeather.vue";

import { mapGetters, mapActions, mapMutations} from "vuex";
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
        ...mapMutations(["setSearchData"]),
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
