<template >
    <div class="container search">
        <input 
        type="text" 
        class="search__iput iput" 
        placeholder="City Name..." 
        v-model.trim="search"
        @keydown.enter="getData"
        @input="autocomplite"
        />
        <button class="search__button btn clickable" type="submit" @click="getData">Search</button>
        <span class="country" v-if="isSearched"><img :src="[getWeatherCountry ? flagIco(getWeatherCountry) : '']">{{getWeatherCountry}}</span>
        <div class="acomplit" v-if="getSearchData[0]">
            <ul class="acomplit__list">
                <li class="acomplit__item" v-for="(item) in getSearchData" :key="item" @click="setSearchCity">{{ item }}</li>
            </ul>
        </div>
        <div class="error" v-if="getError">No results found! Fix it and try again.</div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
    data() {
        return {
            search: this.$store.state.search
        };
    },
    computed: {
        ...mapGetters(["isSearched", "getWeatherCountry", "getError", "getSearchData"])
    },
    methods: {
        ...mapActions(["fetchWeatherData", "fetchCity"]),
        ...mapMutations(["setSearchData"]),
        getData() {
            this.fetchWeatherData(this.search);
        },
        flagIco (link) {
            const linkFull = `https://www.countryflagicons.com/FLAT/16/${link}.png`; 
            return linkFull
        },
        setSearchCity (e) {
            const liElem = e.target.closest("li").innerHTML;
            this.getSearchData.forEach((item) => {
                if (item === liElem) {
                    this.search = item;
                    this.setSearchData([]);
                    this.getData();
                }
            })
        },
        autocomplite () {
            this.$emit('input', this.search);
                this.fetchCity(this.search);
        }
    }
};

</script>
