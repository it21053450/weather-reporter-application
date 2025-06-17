// API Configuration
const API_KEY = '76e2977f2b994837993125435251606'; // Replace with your WeatherAPI.com API key
const BASE_URL = 'https://api.weatherapi.com/v1';

// DOM Elements
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const themeToggle = document.getElementById('theme-toggle');
const loadingSpinner = document.getElementById('loading-spinner');
const weatherInfo = document.getElementById('weather-info');
const refreshBtn = document.getElementById('refresh-btn');

// Main Weather Card Elements
const temperature = document.getElementById('temperature');
const tempUnit = document.getElementById('temp-unit');
const weatherIcon = document.getElementById('weather-icon');
const weatherCondition = document.getElementById('weather-condition');
const feelsLike = document.getElementById('feels-like');
const lastUpdated = document.getElementById('last-updated');

// Highlights Elements
const temperatureHighlight = document.getElementById('temperature-highlight');
const feelsLikeHighlight = document.getElementById('feels-like-highlight');
const humidityHighlight = document.getElementById('humidity-highlight');
const humidityProgress = document.getElementById('humidity-progress');
const windSpeedHighlight = document.getElementById('wind-speed-highlight');
const windDirection = document.getElementById('wind-direction');
const uvIndexHighlight = document.getElementById('uv-index-highlight');
const uvLabel = document.getElementById('uv-label');

// Additional Info Elements
const visibility = document.getElementById('visibility');
const pressure = document.getElementById('pressure');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

// Footer Elements
const footerLastUpdated = document.getElementById('footer-last-updated');

// State
let currentCity = 'Colombo';

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

// Fetch Weather Data
async function fetchWeatherData(location) {
    try {
        showLoading();
        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not found');
        }

        const data = await response.json();
        updateWeatherUI(data);
        currentCity = location;
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

// Update Weather UI
function updateWeatherUI(data) {
    const { location, current, forecast } = data;
    const astro = forecast.forecastday[0].astro;
    
    // Main Weather Card
    document.getElementById('current-display-location').textContent = `${location.name}, ${location.region}, ${location.country}`;
    temperature.textContent = Math.round(current.temp_c);
    weatherIcon.src = `https:${current.condition.icon}`;
    weatherIcon.alt = current.condition.text;
    weatherCondition.textContent = current.condition.text;
    feelsLike.textContent = Math.round(current.feelslike_c);
    lastUpdated.textContent = new Date(current.last_updated_epoch * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Highlights
    temperatureHighlight.textContent = Math.round(current.temp_c);
    feelsLikeHighlight.textContent = Math.round(current.feelslike_c);

    humidityHighlight.textContent = current.humidity;
    humidityProgress.style.width = `${current.humidity}%`;

    windSpeedHighlight.textContent = current.wind_kph;
    windDirection.textContent = `${current.wind_dir} ${current.wind_mph} mph`;

    uvIndexHighlight.textContent = current.uv;
    updateUvLabel(current.uv);

    // Additional Info
    visibility.textContent = `${current.vis_km} km`;
    pressure.textContent = `${current.pressure_mb} mb`;
    sunrise.textContent = astro.sunrise;
    sunset.textContent = astro.sunset;

    // Footer
    footerLastUpdated.textContent = new Date(current.last_updated_epoch * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function updateUvLabel(uv) {
    let label = '';
    let className = '';
    if (uv <= 2) {
        label = 'Low';
        className = 'uv-low';
    } else if (uv <= 5) {
        label = 'Moderate';
        className = 'uv-moderate';
    } else if (uv <= 7) {
        label = 'High';
        className = 'uv-high';
    } else {
        label = 'Extreme';
        className = 'uv-extreme';
    }
    uvLabel.textContent = label;
    uvLabel.className = `uv-label ${className}`;
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

refreshBtn.addEventListener('click', () => {
    fetchWeatherData(currentCity);
});

// Initial load for Colombo
fetchWeatherData(currentCity); 