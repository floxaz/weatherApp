import { elements } from './base';

export const getInput = (cityField, countryField) => {
    return {
        cityQuery: cityField.value,
        countryQuery: countryField.value
    };
};

export const clearInput = () => {
    elements.cityInput.value = '';
    elements.countryInput.value = '';
};

export const removeForm = () => {
    elements.searchForm.classList.add('search--unvisible');
}

export const unableForm = () => {
    elements.searchForm.classList.add('mobile-nav__search');
    elements.searchForm.classList.remove('search');
}

export const changeHeading = city => {
    elements.heading.textContent = city;
};

const kelvinToCelcius = kelvin => {
    return Math.round(kelvin - 273.15);
};

const forecastDay = today => {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return week[today];
}

//forecastDay();

const renderForecast = (day, today) => {
    const markup = `
    <div class="forecast__day forecast__day--1">
            <div class="forecast__date">${forecastDay(today)}</div>
            <figure class="forecast__condition">
                    <img src="img/weather-icons/${day.weather[0].description.replace(' ', '-')}.svg" alt="weather-state">
            </figure>
            <div class="forecast__temp">${kelvinToCelcius(day.main.temp)}<span class="forecast__scale">&#176;</span></div>
            <div class="forecast__details">
                <img src="img/weather-icons/002-drop.svg" alt="humidity">
                <p class="forecast__humidity">${day.main.humidity}</p>
                <img src="img/weather-icons/001-wind-1.svg" alt="humidity">
                <p class="forecast__wind">${day.wind.speed}</p>
            </div>
    </div>
    `;
    elements.sectionForecast.insertAdjacentHTML('beforeend', markup);
};

const loader = spinnerClass => {
    return `
    <svg class="${spinnerClass}">
        <use xlink:href="img/symbol-defs.svg#icon-spinner9"></use>
    </svg>
    `;
}

export const renderForecastMobFirstDay = (day, today) => {
    const markup = `
    <div class="mobile-forecast__today">
            <p class="mobile-forecast__main-temp">${kelvinToCelcius(day.main.temp)}<span class="mobile-forecast__main-scale">&#176;</span></p>
            <figure class="mobile-forecast__main-condition">
                <img src="img/weather-icons/${day.weather[0].description.replace(' ', '-')}.svg" alt="weather-state">
            </figure>
            <p class="mobile-forecast__main-date">${forecastDay(today)}</p>
    </div>
    <div class="mobile-forecast__others"></div>
    `;
    elements.sectionForecastMob.insertAdjacentHTML('beforeend', markup);
};

export const renderForecastMobOthers = (day, today) => {
    const markup = `
    <div class="mobile-forecast__day">
            <p class="mobile-forecast__date">${forecastDay(today)}</p>
                <figure class="mobile-forecast__condition">
                    <img src="img/weather-icons/${day.weather[0].description.replace(' ', '-')}.svg" alt="weather-state">
                </figure>
            <p class="mobile-forecast__max">${kelvinToCelcius(day.main.temp_max)}</p>
            <p class="mobile-forecast__min">${kelvinToCelcius(day.main.temp_min)}</p>
    </div>
    `;
    document.querySelector('.mobile-forecast__others').insertAdjacentHTML('beforeend', markup);
};

export const renderResults = days => {
    let today = new Date().getDay();
    for(let i = 0; i <= days.length - 1; i += 8) {
        renderForecast(days[i], today);
        today++;
        if(today > 6) {
            today = 0;
        }
    }
};

export const renderResultsMob = days => {
    let today = new Date().getDay();
    renderForecastMobFirstDay(days[0], today);
    today++;
    if(today > 6) {
        today = 0;
    }
    for(let i = 8; i <= days.length - 1; i += 8) {
        renderForecastMobOthers(days[i], today);
        today++;
        if(today > 6) {
            today = 0;
        }
    }
};

export const clearResults = mobile => {
    if(mobile) {
        elements.sectionForecastMob.innerHTML = '';
    } else {
        elements.sectionForecast.innerHTML = '';
    }
};

export const removeForecastSection = () => {
    elements.sectionForecast.classList.add('forecast--desappear');
}

export const addForecastSectionMob = () => {
    elements.sectionForecastMob.classList.add('mobile-forecast--appeared');
}

export const renderLoader = (mobile, city) => {
    if(!elements.sectionForecast.classList.contains('forecast--desappear') || !mobile) {
        elements.sectionForecast.insertAdjacentHTML('beforeend', loader('forecast__loader'));
    } else {
        elements.sectionForecastMob.insertAdjacentHTML('beforeend', loader('mobile-forecast__loader'));
    }

};

export const removeLoader = mobile => {
    if(mobile) {
        elements.sectionForecastMob.innerHTML = '';
    } else {
        elements.sectionForecast.innerHTML = '';
    }
};

export const moveHeaderTop = mobile => {
    if(mobile) {
        elements.header.style.marginTop = '0';
    }
};


