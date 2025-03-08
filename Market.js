// Smooth Scrolling for Navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Welcome Banner Display
window.onload = function() {
    const banner = document.getElementById("welcome-banner");
    banner.style.display = "block"; // Show the banner when page loads

    // Close the banner when the user clicks the close button
    document.getElementById("close-banner").addEventListener("click", function() {
        banner.style.display = "none";
    });

    // Automatically hide the banner after 5 seconds
    setTimeout(() => {
        banner.style.display = "none";
    }, 5000);
};

// Language Switcher Functionality
const languageData = {
    en: {
        welcomeMessage: "Welcome to Baroshka Sa'din Market! Enjoy your shopping.",
        marketName: "Baroshka Sa'din Market",
        marketTagline: "For Fresh Groceries and Daily Needs",
        navHome: "Home",
        navProducts: "Products",
        navAbout: "About Us",
        navContact: "Contact",
        heroTitle: "Welcome to Baroshka Sa'din Market!",
        heroDescription: "Find everything you need at our market.",
        productsTitle: "Our Products",
        aboutTitle: "About Us",
        aboutDescription: "Baroshka Sa'din Market has been serving the community for over 2 years. We are committed to providing fresh, high-quality products at affordable prices. Our friendly staff is always here to help you find what you need.",
        contactTitle: "Contact Us"
    },
    ku: {
        welcomeMessage: "Bxerbhen bo Baroshka Sa'din Market! Bdlexo bazarbka.",
        marketName: "Baroshka Sa'din Market",
        marketTagline: "Bo Frotna Kalupalen Nafmale U Xarn U Vaxarna",
        navHome: "Dastpek",
        navProducts: "Barham",
        navAbout: "About Us",
        navContact: "Paywandikrn",
        heroTitle: "Bxerbhen bo Baroshka Sa'din Market!",
        heroDescription: "har tshtaki dle ta bxazet ye l markete hay.",
        productsTitle: "Barhamen Ma",
        aboutTitle: "About Us",
        aboutDescription: "Baroshka Sa'din Market has been serving the community for over 2 years. We are committed to providing fresh, high-quality products at affordable prices. Our friendly staff is always here to help you find what you need.",
        contactTitle: "Paywandikrn"
    }
};

// Function to change language
function changeLanguage(lang) {
    const data = languageData[lang];
    if (!data) return;

    // Update all elements with language-specific content
    document.getElementById("welcome-message").textContent = data.welcomeMessage;
    document.getElementById("market-name").textContent = data.marketName;
    document.getElementById("market-tagline").textContent = data.marketTagline;
    document.getElementById("nav-home").textContent = data.navHome;
    document.getElementById("nav-products").textContent = data.navProducts;
    document.getElementById("nav-about").textContent = data.navAbout;
    document.getElementById("nav-contact").textContent = data.navContact;
    document.getElementById("hero-title").textContent = data.heroTitle;
    document.getElementById("hero-description").textContent = data.heroDescription;
    document.getElementById("products-title").textContent = data.productsTitle;
    document.getElementById("about-title").textContent = data.aboutTitle;
    document.getElementById("about-description").textContent = data.aboutDescription;
    document.getElementById("contact-title").textContent = data.contactTitle;
}

// Add event listeners to language switcher buttons
document.getElementById("lang-en").addEventListener("click", () => changeLanguage("en"));
document.getElementById("lang-ku").addEventListener("click", () => changeLanguage("ku"));

// Set default language to English on page load
changeLanguage("en");

// Update Footer Year Dynamically
document.getElementById("footer-year").textContent = new Date().getFullYear();
