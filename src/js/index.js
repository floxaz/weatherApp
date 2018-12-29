// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';
import { showNav, prepareNavForm, goUpNav } from './views/navView';

// state of the application
const state = {};


const controlSearch = async (cityField, countryField) => {
    // 1 control if it's a mobile device
    if(window.innerWidth <= 500) {
        state.mobile = true;
    } else {
        state.mobile = false;
    }
    // 2 get query from view
    const city = searchView.getInput(cityField, countryField).cityQuery;
    const country = searchView.getInput(cityField, countryField).countryQuery;

    if(city && country) {

        // 3 new search object and add to state
        state.search = new Search(city, country);

        // 4 search for city
        await state.search.searchCity();

        // 5 prepare UI for results
        //searchView.moveHeaderTop(state.mobile);
        searchView.clearResults(state.mobile);
        searchView.clearInput();
        if(state.mobile) {
            showNav();
            searchView.removeForm();
            //searchView.unableForm();
            //prepareNavForm();
        }
        searchView.renderLoader(state.mobile, city);
        searchView.changeHeading(city);

        // 6 search for forecast
        const forecast = await state.search.forecast(state.search.similarCities[0].id);

        // 7 render results on UI
        searchView.removeLoader(state.mobile);
        if(!state.mobile) {
            searchView.renderResults(forecast.list);
        } else {
            searchView.removeForecastSection();
            searchView.addForecastSectionMob();
            searchView.renderResultsMob(forecast.list);
        }
    } else {
        alert('city or country is not indicated');
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // prevent reload of the page
    controlSearch(elements.cityInput, elements.countryInput);
});

elements.mobForm.addEventListener('submit', e => {
    e.preventDefault();
    goUpNav();
    controlSearch(elements.cityInputMob, elements.countryInputMob);
})


