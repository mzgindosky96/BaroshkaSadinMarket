// Smooth Scrolling for Navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Language Data
const languageData = {
    en: {
        marketName: "Baroshka Sa'din Market",
        marketTagline: "For Fresh Groceries and Daily Needs",
        navHome: "Home",
        navProducts: "Products",
        navAbout: "About Us",
        navContact: "Contact",
        navPost: "Post",
        heroTitle: "Welcome to Baroshka Sa'din Market!",
        heroDescription: "Find everything you need at our market.",
        productsTitle: "Our Products",
        aboutTitle: "About Us",
        aboutDescription: "Baroshka Sa'din Market has been serving the community for over 2 years. We are committed to providing fresh, high-quality products at affordable prices. Our friendly staff is always here to help you find what you need.",
        contactTitle: "Contact Us",
        postTitle: "Create a Post",
        postSubmit: "Submit Post",
        postListTitle: "Recent Posts",
        postPlaceholderTitle: "Enter post title",
        postPlaceholderContent: "Write your post here...",
        postMediaLabel: "Upload Media (Image/Video):",
    },
    ku: {
        marketName: "Baroshka Sa'din Market",
        marketTagline: "Bo Frotna Kalupalen Nafmale U Xarn U Vaxarna",
        navHome: "Dastpek",
        navProducts: "Barham",
        navAbout: "About Us",
        navContact: "Paywandikrn",
        navPost: "Post",
        heroTitle: "Bxerbhen bo Baroshka Sa'din Market!",
        heroDescription: "har tshtaki dle ta bxazet ye l markete hay.",
        productsTitle: "Barhamen Ma",
        aboutTitle: "About Us",
        aboutDescription: "Baroshka Sa'din Market has been serving the community for over 2 years. We are committed to providing fresh, high-quality products at affordable prices. Our friendly staff is always here to help you find what you need.",
        contactTitle: "Paywandikrn",
        postTitle: "Postekê Biafirîne",
        postSubmit: "Postê bişîne",
        postListTitle: "Postên Dawî",
        postPlaceholderTitle: "Sernavê postê binivîse",
        postPlaceholderContent: "Posta xwe li vir binivîse...",
        postMediaLabel: "Medya bar bike (Wêne/Vîdeo):",
    },
    ar: {
        marketName: "سوق باروشكا سعدين",
        marketTagline: "للمواد الغذائية الطازجة والاحتياجات اليومية",
        navHome: "الرئيسية",
        navProducts: "المنتجات",
        navAbout: "من نحن",
        navContact: "اتصل بنا",
        navPost: "نشر",
        heroTitle: "مرحبًا بكم في سوق باروشكا سعدين!",
        heroDescription: "ابحث عن كل ما تحتاجه في سوقنا.",
        productsTitle: "منتجاتنا",
        aboutTitle: "من نحن",
        aboutDescription: "سوق باروشكا سعدين يخدم المجتمع منذ أكثر من عامين. نحن ملتزمون بتوفير منتجات طازجة وعالية الجودة بأسعار معقولة. فريق العمل الودود لدينا دائمًا هنا لمساعدتك في العثور على ما تحتاجه.",
        contactTitle: "اتصل بنا",
        postTitle: "إنشاء منشور",
        postSubmit: "إرسال المنشور",
        postListTitle: "المنشورات الأخيرة",
        postPlaceholderTitle: "أدخل عنوان المنشور",
        postPlaceholderContent: "اكتب منشورك هنا...",
        postMediaLabel: "رفع ملف (صورة/فيديو):",
    }
};

// Function to change language
function changeLanguage(lang) {
    const data = languageData[lang];
    if (!data) return;

    // Update all elements with language-specific content
    document.getElementById("market-name").textContent = data.marketName;
    document.getElementById("market-tagline").textContent = data.marketTagline;
    document.getElementById("nav-home").textContent = data.navHome;
    document.getElementById("nav-products").textContent = data.navProducts;
    document.getElementById("nav-about").textContent = data.navAbout;
    document.getElementById("nav-contact").textContent = data.navContact;
    document.getElementById("nav-post").textContent = data.navPost;
    document.getElementById("hero-title").textContent = data.heroTitle;
    document.getElementById("hero-description").textContent = data.heroDescription;
    document.getElementById("products-title").textContent = data.productsTitle;
    document.getElementById("about-title").textContent = data.aboutTitle;
    document.getElementById("about-description").textContent = data.aboutDescription;
    document.getElementById("contact-title").textContent = data.contactTitle;
    document.getElementById("post-title").textContent = data.postTitle;
    document.querySelector("#post-form button").textContent = data.postSubmit;
    document.querySelector("#post-list h3").textContent = data.postListTitle;
    document.getElementById("post-title-input").placeholder = data.postPlaceholderTitle;
    document.getElementById("post-content").placeholder = data.postPlaceholderContent;
    document.querySelector('label[for="post-media"]').textContent = data.postMediaLabel;

    // Update the selected language text in the dropdown
    document.getElementById("selected-language").textContent = data.navHome;

    // Update the HTML lang attribute
    document.documentElement.lang = lang;
}
// Function to fetch weather data
function fetchWeather() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const city = 'Duhok';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = '<p>Failed to load weather data.</p>';
        });
}

// Function to display weather data
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = ''; // Clear loading message

    // Group forecasts by day
    const dailyForecasts = {};
    data.list.forEach(forecast => {
        const date = forecast.dt_txt.split(' ')[0];
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
        }
        dailyForecasts[date].push(forecast);
    });

    // Display the next 3 days
    const days = Object.keys(dailyForecasts).slice(0, 3);
    days.forEach(day => {
        const dayForecasts = dailyForecasts[day];
        const date = new Date(day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const tempMin = Math.min(...dayForecasts.map(f => f.main.temp_min));
        const tempMax = Math.max(...dayForecasts.map(f => f.main.temp_max));
        const weatherDescription = dayForecasts[0].weather[0].description;

        const dayWeather = document.createElement('div');
        dayWeather.className = 'day-weather';
        dayWeather.innerHTML = `
            <h3>${date}</h3>
            <p>${weatherDescription}</p>
            <p>Temperature: ${tempMin}°C - ${tempMax}°C</p>
        `;
        weatherInfo.appendChild(dayWeather);
    });
}

// Fetch weather data when the page loads
fetchWeather();

// Add event listeners to language switcher dropdown
document.querySelectorAll('.language-option').forEach(button => {
    button.addEventListener('click', function () {
        const selectedLang = this.getAttribute('data-lang');
        changeLanguage(selectedLang);
    });
});

// Set default language to English on page load
changeLanguage("en");

// Update Footer Year Dynamically
document.getElementById("footer-year").textContent = new Date().getFullYear();

// Handle Post Submission
document.getElementById('post-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('post-title-input').value;
    const content = document.getElementById('post-content').value;
    const mediaFile = document.getElementById('post-media').files[0];

    if (!title || !content) {
        alert("Please fill in both the title and content fields.");
        return;
    }

    const postList = document.getElementById('posts');
    const postItem = document.createElement('li');
    postItem.innerHTML = `<strong>${title}</strong><p>${content}</p>`;

    // Display uploaded media if available
    if (mediaFile) {
        const mediaURL = URL.createObjectURL(mediaFile);
        if (mediaFile.type.startsWith('image')) {
            postItem.innerHTML += `<img src="${mediaURL}" alt="Uploaded Media" style="max-width: 100%; height: auto;">`;
        } else if (mediaFile.type.startsWith('video')) {
            postItem.innerHTML += `<video controls style="max-width: 100%; height: auto;"><source src="${mediaURL}" type="${mediaFile.type}">Your browser does not support the video tag.</video>`;
        }
    }

    postList.appendChild(postItem);

    // Save post to local storage
    savePostToLocalStorage(title, content, mediaFile);

    // Clear the form
    document.getElementById('post-form').reset();
});

// Visitor Counter and Online Users Tracker
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve or initialize visitor count from localStorage
    let visitorCount = localStorage.getItem("visitorCount") || 0;
    visitorCount = parseInt(visitorCount) + 1; // Increment visitor count
    localStorage.setItem("visitorCount", visitorCount); // Save updated count
    document.getElementById("visitor-count").textContent = visitorCount;

    // Online Users Tracker
    let onlineUsers = localStorage.getItem("onlineUsers") || 0;
    onlineUsers = parseInt(onlineUsers);

    // Simulate online users (for demonstration purposes)
    // In a real-world scenario, this should be handled by a backend service
    function updateOnlineUsers() {
        onlineUsers = Math.floor(Math.random() * 100); // Random number for demo
        localStorage.setItem("onlineUsers", onlineUsers);
        document.getElementById("online-users").textContent = onlineUsers;
    }

    // Update online users every 5 seconds
    setInterval(updateOnlineUsers, 5000);
    updateOnlineUsers(); // Initial call
});

// Save Posts to Local Storage
function savePostToLocalStorage(title, content, mediaFile) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = { title, content };

    if (mediaFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            post.mediaURL = e.target.result;
            post.mediaType = mediaFile.type;
            localStorage.setItem('posts', JSON.stringify(posts));
        };
        reader.readAsDataURL(mediaFile);
    }

    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Load Posts from Local Storage
function loadPostsFromLocalStorage() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('posts');
    postList.innerHTML = ''; // Clear existing posts

    posts.forEach(post => {
        const postItem = document.createElement('li');
        postItem.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p>`;
        if (post.mediaURL) {
            if (post.mediaType.startsWith('image')) {
                postItem.innerHTML += `<img src="${post.mediaURL}" alt="Uploaded Media" style="max-width: 100%; height: auto;">`;
            } else if (post.mediaType.startsWith('video')) {
                postItem.innerHTML += `<video controls style="max-width: 100%; height: auto;"><source src="${post.mediaURL}" type="${post.mediaType}">Your browser does not support the video tag.</video>`;
            }
        }
        postList.appendChild(postItem);
    });
}

// Load posts from local storage on page load
loadPostsFromLocalStorage();

// Image Slider Functionality
let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function moveSlide(n) {
    slideIndex += n;
    if (slideIndex < 0) slideIndex = totalSlides - 1;
    else if (slideIndex >= totalSlides) slideIndex = 0;
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

// Auto-slide every 5 seconds
setInterval(() => moveSlide(1), 5000);
