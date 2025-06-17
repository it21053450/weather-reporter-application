// API Configuration
const API_KEY = '76e2977f2b994837993125435251606'; // Replace with your WeatherAPI.com API key
const BASE_URL = 'https://api.weatherapi.com/v1';

// DOM Elements
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const themeToggle = document.getElementById('theme-toggle');
const loadingSpinner = document.getElementById('loading-spinner');
const weatherInfo = document.getElementById('weather-info');
const unitToggle = document.getElementById('unit-toggle');
const refreshBtn = document.getElementById('refresh-btn');
const addFavoriteBtn = document.getElementById('add-favorite-btn');
const favoritesList = document.getElementById('favorites-list');
const currentDate = document.getElementById('current-date');
const currentTime = document.getElementById('current-time');

// Weather Info Elements
const cityName = document.getElementById('city-name');
const country = document.getElementById('country');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const uvIndex = document.getElementById('uv-index');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

// State
let currentLocation = 'Colombo';
let isCelsius = true;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Update Date and Time
function updateDateTime() {
    const now = new Date();
    currentDate.textContent = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    currentTime.textContent = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Show Loading Spinner
function showLoading() {
    loadingSpinner.style.display = 'block';
    weatherInfo.style.opacity = '0.5';
}

// Hide Loading Spinner
function hideLoading() {
    loadingSpinner.style.display = 'none';
    weatherInfo.style.opacity = '1';
}

// Convert Temperature
function convertTemperature(temp) {
    return isCelsius ? temp : (temp * 9/5) + 32;
}

// Update Temperature Display
function updateTemperatureDisplay(temp) {
    const convertedTemp = Math.round(convertTemperature(temp));
    temperature.textContent = convertedTemp;
    temperature.innerHTML += isCelsius ? '°C' : '°F';
}

// Fetch Weather Data
async function fetchWeatherData(location) {
    try {
        showLoading();
        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=yes&alerts=no`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not found');
        }

        const data = await response.json();
        updateWeatherUI(data);
        updateHourlyForecast(data);
        updateAirQuality(data);
        updateSunTimes(data);
        updateForecast(data);
        currentLocation = location;
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

// Update Weather UI
function updateWeatherUI(data) {
    const { location, current } = data;
    
    cityName.textContent = location.name;
    country.textContent = location.country;
    updateTemperatureDisplay(current.temp_c);
    feelsLike.textContent = Math.round(convertTemperature(current.feelslike_c));
    humidity.textContent = current.humidity;
    windSpeed.textContent = current.wind_kph;
    uvIndex.textContent = current.uv;
    
    weatherIcon.src = `https:${current.condition.icon}`;
    weatherIcon.alt = current.condition.text;
}

// Update Hourly Forecast
function updateHourlyForecast(data) {
    const hourlyContainer = document.getElementById('hourly-forecast');
    hourlyContainer.innerHTML = '';

    const hours = data.forecast.forecastday[0].hour;
    const currentHour = new Date().getHours();

    for (let i = currentHour; i < currentHour + 24; i++) {
        const hour = hours[i % 24];
        const hourElement = document.createElement('div');
        hourElement.className = 'hourly-item';
        
        const time = new Date(hour.time);
        hourElement.innerHTML = `
            <div>${time.getHours()}:00</div>
            <img src="https:${hour.condition.icon}" alt="${hour.condition.text}">
            <div>${Math.round(convertTemperature(hour.temp_c))}°</div>
        `;
        
        hourlyContainer.appendChild(hourElement);
    }
}

// Update Air Quality
function updateAirQuality(data) {
    const aqiContainer = document.getElementById('air-quality');
    const aqi = data.current.air_quality;
    
    const aqiValue = Math.round(aqi['us-epa-index']);
    const aqiLabel = getAQILabel(aqiValue);
    
    aqiContainer.innerHTML = `
        <div class="aqi-value">${aqiValue}</div>
        <div class="aqi-label">${aqiLabel}</div>
    `;
}

function getAQILabel(value) {
    const labels = {
        1: 'Good',
        2: 'Moderate',
        3: 'Unhealthy for Sensitive Groups',
        4: 'Unhealthy',
        5: 'Very Unhealthy',
        6: 'Hazardous'
    };
    return labels[value] || 'Unknown';
}

// Update Sun Times
function updateSunTimes(data) {
    const { sunrise: sunriseTime, sunset: sunsetTime } = data.forecast.forecastday[0].astro;
    sunrise.textContent = sunriseTime;
    sunset.textContent = sunsetTime;
}

// Update 3-Day Forecast
function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date);
        const forecastElement = document.createElement('div');
        forecastElement.className = 'forecast-item';
        
        forecastElement.innerHTML = `
            <div>${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <div>${Math.round(convertTemperature(day.day.maxtemp_c))}°</div>
            <div>${Math.round(convertTemperature(day.day.mintemp_c))}°</div>
        `;
        
        forecastContainer.appendChild(forecastElement);
    });
}

// Favorites Management
function updateFavoritesList() {
    favoritesList.innerHTML = '';
    favorites.forEach(favorite => {
        const li = document.createElement('li');
        li.textContent = favorite;
        li.addEventListener('click', () => fetchWeatherData(favorite));
        favoritesList.appendChild(li);
    });
}

function addToFavorites() {
    if (!favorites.includes(currentLocation)) {
        favorites.push(currentLocation);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesList();
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherData(location);
    }
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherData(location);
        }
    }
});

unitToggle.addEventListener('change', (e) => {
    isCelsius = e.target.value === 'celsius';
    fetchWeatherData(currentLocation);
});

refreshBtn.addEventListener('click', () => {
    fetchWeatherData(currentLocation);
});

addFavoriteBtn.addEventListener('click', addToFavorites);

// Initialize
updateFavoritesList();
fetchWeatherData(currentLocation); 