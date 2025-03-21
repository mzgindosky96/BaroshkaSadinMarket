// Function to fetch and display the 3-day weather forecast for Dahuk
async function fetchWeather() {
    const apiKey = '79de4918edc0fb684a957d2e926c4eaa'; // Your OpenWeatherMap API key
    const city = 'Duhok,IQ';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "200") {
            displayWeather(data);
        } else {
            document.getElementById('weather-forecast').innerHTML = `<p>Error fetching weather data: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-forecast').innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
    }
}

// Function to display the weather data
function displayWeather(data) {
    const weatherForecast = document.getElementById('weather-forecast');
    weatherForecast.innerHTML = '';

    // Filter the data to get only the next 3 days
    const uniqueDates = new Set();
    let count = 0;

    data.list.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!uniqueDates.has(date) && count < 3) {
            uniqueDates.add(date);
            const temp = forecast.main.temp;
            const weatherDescription = forecast.weather[0].description;
            const icon = forecast.weather[0].icon;

            weatherForecast.innerHTML += `
                <div class="weather-day">
                    <h3>${date}</h3>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weatherDescription}">
                    <p>Temperature: ${temp}°C</p>
                    <p>Condition: ${weatherDescription}</p>
                </div>
            `;
            count++;
        }
    });
}

// Visitor and online counter
let totalVisitors = localStorage.getItem('totalVisitors') ? parseInt(localStorage.getItem('totalVisitors')) : 0;
let onlineCount = 0; // This will be a simple counter for the current session

function updateVisitorCount() {
    totalVisitors++;
    localStorage.setItem('totalVisitors', totalVisitors);
    document.getElementById('total-visitors').textContent = totalVisitors;
    onlineCount++;
    document.getElementById('online-count').textContent = onlineCount;
}

// Function to handle file uploads
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const fileInput = document.getElementById('file-input');
    const files = fileInput.files;
    const uploadStatus = document.getElementById('upload-status');
    const mediaGallery = document.getElementById('media-gallery');

    if (files.length === 0) {
        uploadStatus.textContent = 'Please select a file to upload.';
        return;
    }

    // Clear previous status message
    uploadStatus.textContent = '';

    // Display the uploaded files in the gallery
    Array.from(files).forEach(file => {
        const mediaItem = document.createElement('div');
        mediaItem.classList.add('media-item');

        const reader = new FileReader();
        reader.onload = function(e) {
            if (file.type.startsWith('image/')) {
                mediaItem.innerHTML = `<img src="${e.target.result}" alt="${file.name}">`;
            } else if (file.type.startsWith('video/')) {
                mediaItem.innerHTML = `<video controls><source src="${e.target.result}" type="${file.type}">Your browser does not support the video tag.</video>`;
            }
            mediaGallery.appendChild(mediaItem);
        };
        reader.readAsDataURL(file);
    });

    // Show upload success message
    uploadStatus.textContent = `Uploaded: ${files.length} file(s)`;
});

// Call the fetchWeather function when the page loads
window.onload = function() {
    fetchWeather();
    updateVisitorCount();
};
