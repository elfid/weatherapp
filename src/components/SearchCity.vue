<template>
    <div class="container search">
        <input 
        type="text" 
        class="search__iput iput" 
        placeholder="City Name..." 
        v-model.trim="search"
        @keydown.enter="getData"
        />
        <button class="search__button btn clickable" type="submit" @click="getData">Search</button>
        <span class="country" v-if="isSearched"><img :src="[getWeatherCountry ? flagIco(getWeatherCountry) : '']">{{getWeatherCountry}}</span>
        <div class="error" v-if="getError">No results found! Fix it and try again.</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            search: this.$store.state.search
        };
    },
    computed: {
        ...mapGetters(["isSearched", "getWeatherCountry", "getError"])
    },
    methods: {
        ...mapActions(["fetchWeatherData", "fetchCity"]),
        getData() {
            this.fetchCity(this.search);
            this.fetchWeatherData(this.search);
        },
        flagIco (link) {
            const linkFull = `https://www.countryflagicons.com/FLAT/16/${link}.png`; 
            return linkFull
        },
    }
};

</script>
