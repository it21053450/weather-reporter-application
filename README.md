# Weather Reporter 🌤️

A modern and responsive web application that provides current weather information for any location worldwide. Built with a professional and intuitive user interface, it offers a seamless weather checking experience.

## ✨ Features

-   **Current Weather:** Displays real-time temperature, condition, and "feels like" temperature.
-   **Location Search:** Easily search for weather information for any city.
-   **Weather Highlights:** Get quick insights into humidity, wind speed and direction, and UV Index with visual indicators.
-   **Additional Information:** View crucial details like visibility, atmospheric pressure, sunrise, and sunset times.
-   **Dark/Light Mode:** Toggle between beautiful dark and light themes for comfortable viewing.
-   **Responsive Design:** Optimized for a flawless experience across all devices and screen sizes.
-   **Loading States:** Smooth loading indicators for a better user experience.

## 🚀 Technologies Used

-   **HTML5:** Structure and content.
-   **CSS3:** Modern styling with CSS variables for theming and responsive design (Flexbox & Grid).
-   **JavaScript (ES6+):** Dynamic content updates and API interactions.
-   **[WeatherAPI.com](https://www.weatherapi.com/)**: Reliable and free weather data API.
-   **[Font Awesome 6](https://fontawesome.com/):** Beautiful and scalable vector icons.

## 🛠️ Setup and Usage

Follow these simple steps to get the Weather Reporter up and running on your local machine:

### 1. Get your API Key

To fetch weather data, you'll need a free API key from WeatherAPI.com:

1.  Go to [WeatherAPI.com](https://www.weatherapi.com/).
2.  Sign up for a free account.
3.  Once registered, navigate to your dashboard to find your API key.

### 2. Configure the API Key

Open the `script.js` file in your project and replace `YOUR_API_KEY` with the actual API key you obtained from WeatherAPI.com:

```javascript
const API_KEY = 'YOUR_API_KEY'; // Replace with your WeatherAPI.com API key
```

### 3. Run the Application

There are two easy ways to run the application:

#### Option 1: Open `index.html` Directly

Simply double-click the `index.html` file in your project folder, or drag and drop it into your web browser. The application will open immediately.

#### Option 2: Use a Local Development Server (Recommended for full functionality)

For a more robust local development experience, especially if you encounter any browser security restrictions (e.g., related to fetching data locally), you can use a simple HTTP server. If you have Python installed, you can use its built-in server:

1.  Open your terminal or command prompt.
2.  Navigate to your project directory:
    ```bash
    cd your-project-directory
    ```
3.  Install `http-server` globally (if you haven't already):
    ```bash
    npm install -g http-server
    ```
4.  Run the server:
    ```bash
    http-server
    ```
5.  Open your web browser and go to `http://localhost:8080` (or the address shown in your terminal).

To stop the server, press `Ctrl + C` in your terminal.

## 📝 Usage

-   The application will initially display weather data for **Colombo, Sri Lanka**.
-   Use the search bar at the top right to look up weather for any city worldwide.
-   Toggle between **dark mode** and **light mode** using the moon/sun icon in the header.
-   Click the **Refresh Weather** button at the bottom to update the current weather data for the displayed location.

## 🌐 Browser Support

This application is designed to work seamlessly on all modern web browsers that support:

-   ES6+ JavaScript
-   CSS Variables
-   Fetch API

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details (if you plan to add one). 
