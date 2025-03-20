// Multilingual Support Data
const translations = {
    en: {
        title: "Baroshka Sa'din Market",
        tagline: "Fresh Groceries & Daily Needs",
        products: "Products",
        pricing: "Pricing",
        weather: "Weather",
        addProduct: "Add Product",
        about: "About Us",
        contact: "Contact",
        news: [
            "Seasonal discounts on fresh produce available now!",
            "Store Timings: Open daily from 9:00 AM to 10:00 PM.",
            "Special Offer: Free delivery for orders over $50!"
        ],
        successMessage: "Product added successfully!",
        errorMessage: "Please fill out all fields before submitting!"
    },
    ku: {
        title: "بازار بەرەشکە سەعەدین",
        tagline: "تازە فەرهەنگ و کارە رۆژانە",
        products: "کاڵاکان",
        pricing: "نرخەکان",
        weather: "هەوا",
        addProduct: "زیادکردنی کاڵا",
        about: "دەربارە",
        contact: "پەیوەندی",
        news: [
            "هەواڵە نوێ: داخرینەکان بەرەشی تازە دەستپێ دەکات!",
            "کاتەکان: دکانەکان کەوتنە ناوەندەکان 9:00 - 10:00",
            "فرصەتە تایبەتی: ڕەشاندن بێ به‌ها بۆ زیاتر لە $50!"
        ],
        successMessage: "کاڵا بەسەرکەوتویی زیادکرا!",
        errorMessage: "تکایە هەموو خانەکان پڕبکەوە پێش ناردن!"
    },
    ar: {
        title: "سوق باروشكا سعدين",
        tagline: "البقالة الطازجة والاحتياجات اليومية",
        products: "المنتجات",
        pricing: "الأسعار",
        weather: "الطقس",
        addProduct: "إضافة منتج",
        about: "معلومات عنا",
        contact: "تواصل",
        news: [
            "آخر الأخبار: تخفيضات موسمية على المنتجات الطازجة متوفرة الآن!",
            "مواعيد العمل: مفتوح يوميًا من 9:00 صباحًا إلى 10:00 مساءً.",
            "عرض خاص: توصيل مجاني للطلبات التي تزيد عن 50 دولارًا!"
        ],
        successMessage: "تمت إضافة المنتج بنجاح!",
        errorMessage: "يرجى ملء جميع الحقول قبل الإرسال!"
    },
};

// Language Switcher Functionality
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', () => {
    const selectedLang = languageSelect.value;
    const translation = translations[selectedLang];

    // Update header content
    document.querySelector('.brand h1').textContent = translation.title;
    document.querySelector('.brand p').textContent = translation.tagline;

    // Update navigation links
    const navLinks = document.querySelectorAll('.nav li a');
    navLinks[0].textContent = translation.products;
    navLinks[1].textContent = translation.pricing;
    navLinks[2].textContent = translation.weather;
    navLinks[3].textContent = translation.addProduct;
    navLinks[4].textContent = translation.about;
    navLinks[5].textContent = translation.contact;

    // Update news ticker content
    const tickerContainer = document.querySelector('.ticker');
    tickerContainer.innerHTML = ""; // Clear existing news
    translation.news.forEach(newsItem => {
        const newsElement = document.createElement('p');
        newsElement.classList.add('ticker-item');
        newsElement.textContent = newsItem;
        tickerContainer.appendChild(newsElement);
    });
});

// Set Default Language on Page Load
window.addEventListener('load', () => {
    const defaultLanguage = 'en'; // Default to English
    languageSelect.value = defaultLanguage;
    languageSelect.dispatchEvent(new Event('change'));

    // Fetch weather data
    fetchWeather();
});

// Fetch Weather Data
async function fetchWeather() {
    const apiKey = "Bw1Vv1Wl7kkvghyCYTANnWqBXDwJ3p8D"; // Your API key
    const locationKey = "208947"; // Location Key for Duhok, Iraq
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Update weather widget
        document.getElementById('weather-location').textContent = `Location: Duhok, Iraq`;
        document.getElementById('weather-temperature').textContent = `Temperature: ${data[0].Temperature.Metric.Value}°C`;
        document.getElementById('weather-condition').textContent = `Condition: ${data[0].WeatherText}`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('weather-location').textContent = "Location: Unable to load";
        document.getElementById('weather-temperature').textContent = "Temperature: Unable to load";
        document.getElementById('weather-condition').textContent = "Condition: Unable to load";
    }
}

// Handle New Product Submission
const productForm = document.querySelector('.new-product-form');
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = document.getElementById('product-name').value.trim();
    const productDescription = document.getElementById('product-description').value.trim();
    const productPrice = document.getElementById('product-price').value.trim();
    const productImage = document.getElementById('product-image').files[0];

    if (productName && productDescription && productPrice && productImage) {
        alert(translations[languageSelect.value].successMessage);

        // Clear form fields after successful submission
        productForm.reset();
    } else {
        alert(translations[languageSelect.value].errorMessage);
    }
});

// Dynamic Footer Year
const footerYear = document.getElementById('footer-year');
footerYear.textContent = new Date().getFullYear();
