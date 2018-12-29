export default class Search {
    constructor(city, country) {
        this.city = city;
        this.country = country;
    }

    async searchCity() {
        try {
            const responce = await fetch(`${apiCall().proxy}/api.openweathermap.org/data/2.5/find?q=${this.city},${this.country}&type=accurate&mode&APPID=${apiCall().key}`);
            this.similarCities = await responce.json();
            this.similarCities = this.similarCities.list;
            //console.log(this.similarCities);
        } catch(error) {
            console.log(error);
        }
    }

    async forecast(cityID) {
        try {
            const responce = await fetch(`${apiCall().proxy}/api.openweathermap.org/data/2.5/forecast?id=${cityID}&APPID=${apiCall().key}`);
            const data = await responce.json();
            //console.log(data);
            return data;
        } catch(error) {
            console.log(error);
        }
    }
}

function apiCall() {
    return {
        key: '5b8c5eeb25f857779b05b152522ed488',
        proxy: 'https://cors-anywhere.herokuapp.com'
    }
}