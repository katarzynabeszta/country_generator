'use strict';

const input = document.querySelector('.search');
let countries = [];

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}

const getCountriesData = async () => {
    const response = await fetch ('https://restcountries.eu/rest/v2/all');
    if (response.status !== 200) {
        throw new Error('can not fetch data');
    }
    const data = await response.json();
    return data;
}

getCountriesData()
    .then(data => {
        countries.push(...data);
        console.log('resolved: ', data);
        
    })
    .catch(err => {
        console.log('rejected: ', err.message);
    });
    console.log(countries);


function generateCountry() {

    let countriesList = document.querySelector('.countries__list');
    countriesList.innerHTML = '';
    console.dir(countriesList);
  
    const inputCountry = input.value === '' ? null : input.value;
    console.log(inputCountry);

    if (inputCountry != null) {
        countries.forEach(country => {
            const countryName = country.name;
           
    
            if (countryName.toLowerCase().startsWith(inputCountry.toLowerCase())) {
             
                const {name, capital, population, flag, region} = country;
            
                console.log(capital);
                console.log(population);
                console.log(flag);
                console.log(region);
    
                countriesList.innerHTML = countriesList.innerHTML + '<li>' + '<p><b>Country:</b> ' + countryName + '</p>' + '<p><b>Capital:</b> ' + capital + '</p>' + '<p><b>Population:</b> ' + population + '</p>' + '<p><b>Region:</b> ' + region + '</p>' + '<p><b>Flag:</b><br>' + '<img src="' + flag + '"></p>'+'</li>';
            }
        });
    }
}

input.addEventListener('input', debounce(generateCountry, 2000, false));
