// Weather Functions
async function fetchWeather() {
    const apiKey = '79de4918edc0fb684a957d2e926c4eaa';
    const city = 'Duhok,IQ';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        data.list ? displayWeather(data) : showWeatherError();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showWeatherError();
    }
}

function displayWeather(data) {
    const weatherContainer = document.querySelector('.weather-details');
    weatherContainer.innerHTML = '';
    
    // Aggregate daily forecasts
    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
        });
        if (!acc[date]) {
            acc[date] = {
                temp: Math.round(forecast.main.temp),
                description: forecast.weather[0].main,
                icon: getWeatherIcon(forecast.weather[0].id)
            };
        }
        return acc;
    }, {});

    // Create weather cards
    Object.entries(dailyForecasts).slice(0, 3).forEach(([day, forecast]) => {
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';
        weatherCard.innerHTML = `
            <div class="floating-icon">
                <i class="fas ${forecast.icon} weather-icon"></i>
            </div>
            <div class="temperature">${forecast.temp}°C</div>
            <div class="weather-condition">${forecast.description}</div>
            <p>${getWeatherMessage(forecast.description)}</p>
        `;
        weatherContainer.appendChild(weatherCard);
    });
}

function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return 'fa-bolt';
    if (weatherId >= 300 && weatherId < 600) return 'fa-cloud-rain';
    if (weatherId >= 600 && weatherId < 700) return 'fa-snowflake';
    if (weatherId === 800) return 'fa-sun';
    if (weatherId > 800) return 'fa-cloud';
    return 'fa-cloud-sun';
}

function getWeatherMessage(condition) {
    const messages = {
        'Clear': 'Perfect day for outdoor shopping!',
        'Clouds': 'Light cloud cover expected',
        'Rain': 'Don\'t forget your umbrella!',
        'Thunderstorm': 'Seek indoor shelter if storm occurs',
        'Snow': 'Watch for slippery surfaces'
    };
    return messages[condition] || 'Check back for updates!';
}

function showWeatherError() {
    document.querySelector('.weather-details').innerHTML = `
        <div class="weather-card error">
            <i class="fas fa-exclamation-triangle weather-icon"></i>
            <p>Unable to load weather data. Please try again later.</p>
        </div>
    `;
}

// Visitor Counter
let totalVisitors = localStorage.getItem('totalVisitors') || 0;
let onlineUsers = new Set();

function updateVisitorCount() {
    // Generate unique session ID
    const sessionId = sessionStorage.getItem('sessionId') || Date.now().toString();
    
    if (!sessionStorage.getItem('sessionId')) {
        totalVisitors++;
        localStorage.setItem('totalVisitors', totalVisitors);
        sessionStorage.setItem('sessionId', sessionId);
    }

    onlineUsers.add(sessionId);
    localStorage.setItem('onlineUsers', JSON.stringify([...onlineUsers]));
    
    document.getElementById('total-visitors').textContent = totalVisitors;
    document.getElementById('online-count').textContent = onlineUsers.size;
}

const VALID_SECRET_KEY = "Market2023!"; // Change this to your desired secret key

document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const secretKey = document.getElementById('secret-key').value;
    const fileInput = document.getElementById('file-input');
    
    if (secretKey !== VALID_SECRET_KEY) {
        document.getElementById('key-error').style.display = 'block';
        document.getElementById('upload-status').innerHTML = '';
        return;
    }

    document.getElementById('key-error').style.display = 'none';
    
    const files = fileInput.files;
    if (files.length === 0) {
        document.getElementById('upload-status').innerHTML = 'Please select at least one file.';
        return;
    }

    const gallery = document.getElementById('media-gallery');
    const statusDiv = document.getElementById('upload-status');
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const mediaElement = file.type.startsWith('image') 
                ? `<img src="${e.target.result}" alt="Uploaded image">`
                : `<video controls><source src="${e.target.result}" type="${file.type}"></video>`;
            
            const mediaContainer = document.createElement('div');
            mediaContainer.className = 'media-item';
            mediaContainer.innerHTML = mediaElement;
            gallery.prepend(mediaContainer);
        };
        reader.readAsDataURL(file);
    });

    statusDiv.innerHTML = `Successfully uploaded ${files.length} file(s)`;
    fileInput.value = '';
    document.getElementById('secret-key').value = '';
});
// Drag & Drop Handling
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    fileInput.files = e.dataTransfer.files;
    updateFileList();
});

// File Input Handling
fileInput.addEventListener('change', updateFileList);

function updateFileList() {
    const files = fileInput.files;
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';
    
    Array.from(files).forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <i class="fas fa-file-${file.type.startsWith('image') ? 'image' : 'video'}"></i>
            ${file.name} (${(file.size/1024/1024).toFixed(2)}MB)
        `;
        fileList.appendChild(fileItem);
    });
}

// Form Submission
document.getElementById('upload-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const statusDiv = document.getElementById('upload-status');
    const errorDiv = document.getElementById('key-error');
    const secretKey = document.getElementById('secret-key').value;
    
    // Reset messages
    statusDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    // Validate secret key
    if (secretKey !== VALID_SECRET_KEY) {
        errorDiv.style.display = 'flex';
        return;
    }

    // Show loading state
    statusDiv.innerHTML = `<i class="fas fa-spinner loading-spinner"></i> Uploading files...`;
    statusDiv.style.display = 'flex';
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Handle file previews
    const files = fileInput.files;
    const gallery = document.getElementById('media-gallery');
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const mediaElement = file.type.startsWith('image') 
                ? `<img src="${e.target.result}" alt="Uploaded content">`
                : `<video controls><source src="${e.target.result}" type="${file.type}"></video>`;
            
            const mediaItem = document.createElement('div');
            mediaItem.className = 'media-item';
            mediaItem.innerHTML = mediaElement;
            gallery.prepend(mediaItem);
        };
        reader.readAsDataURL(file);
    });

    // Show success message
    statusDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Successfully uploaded ${files.length} file(s)
    `;
    statusDiv.classList.add('success');
    
    // Reset form
    fileInput.value = '';
    document.getElementById('secret-key').value = '';
    document.getElementById('file-list').innerHTML = '';
    
    // Hide status after 3 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
});

// Price Table Editor
document.querySelectorAll('#prices tr').forEach(row => {
    row.addEventListener('dblclick', () => {
        const itemName = row.cells[0].textContent;
        const currentPrice = row.cells[1].textContent;
        const newPrice = prompt(`Edit price for ${itemName}:`, currentPrice);
        
        if (newPrice && newPrice !== currentPrice) {
            row.cells[1].textContent = newPrice;
            row.style.animation = 'highlightUpdate 1s';
            row.addEventListener('animationend', () => row.style.animation = '');
        }
    });
});

// Map Interaction
document.querySelector('#map iframe').addEventListener('click', () => {
    window.open(document.querySelector('#map iframe').src.replace('/embed', '/map'), '_blank');
});

// Initialize Page
window.addEventListener('load', () => {
    fetchWeather();
    updateVisitorCount();
    
    // Load existing online users
    const storedUsers = localStorage.getItem('onlineUsers');
    onlineUsers = new Set(storedUsers ? JSON.parse(storedUsers) : []);
    
    // Cleanup expired sessions
    window.addEventListener('beforeunload', () => {
        onlineUsers.delete(sessionStorage.getItem('sessionId'));
        localStorage.setItem('onlineUsers', JSON.stringify([...onlineUsers]));
    });
});

// Animation Keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes highlightUpdate {
        0% { background-color: #ffd70050; }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);
