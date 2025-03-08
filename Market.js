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
        navPost: "Post", // New Post Link
        heroTitle: "Welcome to Baroshka Sa'din Market!",
        heroDescription: "Find everything you need at our market.",
        productsTitle: "Our Products",
        aboutTitle: "About Us",
        aboutDescription: "Baroshka Sa'din Market has been serving the community for over 2 years. We are committed to providing fresh, high-quality products at affordable prices. Our friendly staff is always here to help you find what you need.",
        contactTitle: "Contact Us",
        postTitle: "Create a Post", // New Post Title
        postSubmit: "Submit Post", // New Post Submit Button
        postListTitle: "Recent Posts", // New Post List Title
        postPlaceholderTitle: "Enter post title", // New Post Title Placeholder
        postPlaceholderContent: "Write your post here...", // New Post Content Placeholder
        postMediaLabel: "Upload Media (Image/Video):", // New Media Upload Label
    },
    ku: {
        welcomeMessage: "Bxerbhen bo Baroshka Sa'din Market! Bdlexo bazarbka.",
        marketName: "Baroshka Sa'din Market",
        marketTagline: "Bo Frotna Kalupalen Nafmale U Xarn U Vaxarna",
        navHome: "Dastpek",
        navProducts: "Barham",
        navAbout: "About Us",
        navContact: "Paywandikrn",
        navPost: "Post", // New Post Link
        heroTitle: "Bxerbhen bo Baroshka Sa'din Market!",
        heroDescription: "har tshtaki dle ta bxazet ye l markete hay.",
        productsTitle: "Barhamen Ma",
        aboutTitle: "About Us",
        aboutDescription: "Baroshka Sa'din Market has been serving the community for over 2 years. We are committed to providing fresh, high-quality products at affordable prices. Our friendly staff is always here to help you find what you need.",
        contactTitle: "Paywandikrn",
        postTitle: "Postekê Biafirîne", // New Post Title
        postSubmit: "Postê bişîne", // New Post Submit Button
        postListTitle: "Postên Dawî", // New Post List Title
        postPlaceholderTitle: "Sernavê postê binivîse", // New Post Title Placeholder
        postPlaceholderContent: "Posta xwe li vir binivîse...", // New Post Content Placeholder
        postMediaLabel: "Medya bar bike (Wêne/Vîdeo):", // New Media Upload Label
    },
    ar: {
        welcomeMessage: "مرحبًا بكم في سوق باروشكا سعدين! استمتع بالتسوق.",
        marketName: "سوق باروشكا سعدين",
        marketTagline: "للمواد الغذائية الطازجة والاحتياجات اليومية",
        navHome: "الرئيسية",
        navProducts: "المنتجات",
        navAbout: "من نحن",
        navContact: "اتصل بنا",
        navPost: "نشر", // New Post Link
        heroTitle: "مرحبًا بكم في سوق باروشكا سعدين!",
        heroDescription: "ابحث عن كل ما تحتاجه في سوقنا.",
        productsTitle: "منتجاتنا",
        aboutTitle: "من نحن",
        aboutDescription: "سوق باروشكا سعدين يخدم المجتمع منذ أكثر من عامين. نحن ملتزمون بتوفير منتجات طازجة وعالية الجودة بأسعار معقولة. فريق العمل الودود لدينا دائمًا هنا لمساعدتك في العثور على ما تحتاجه.",
        contactTitle: "اتصل بنا",
        postTitle: "إنشاء منشور", // New Post Title
        postSubmit: "إرسال المنشور", // New Post Submit Button
        postListTitle: "المنشورات الأخيرة", // New Post List Title
        postPlaceholderTitle: "أدخل عنوان المنشور", // New Post Title Placeholder
        postPlaceholderContent: "اكتب منشورك هنا...", // New Post Content Placeholder
        postMediaLabel: "رفع ملف (صورة/فيديو):", // New Media Upload Label
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
    document.getElementById("nav-post").textContent = data.navPost; // New Post Link
    document.getElementById("hero-title").textContent = data.heroTitle;
    document.getElementById("hero-description").textContent = data.heroDescription;
    document.getElementById("products-title").textContent = data.productsTitle;
    document.getElementById("about-title").textContent = data.aboutTitle;
    document.getElementById("about-description").textContent = data.aboutDescription;
    document.getElementById("contact-title").textContent = data.contactTitle;
    document.getElementById("post-title").textContent = data.postTitle; // New Post Title
    document.querySelector("#post-form button").textContent = data.postSubmit; // New Post Submit Button
    document.querySelector("#post-list h3").textContent = data.postListTitle; // New Post List Title
    document.getElementById("post-title-input").placeholder = data.postPlaceholderTitle; // New Post Title Placeholder
    document.getElementById("post-content").placeholder = data.postPlaceholderContent; // New Post Content Placeholder
    document.querySelector('label[for="post-media"]').textContent = data.postMediaLabel; // New Media Upload Label

    // Update the HTML lang attribute
    document.documentElement.lang = lang;
}

// Add event listeners to language switcher buttons
document.getElementById("lang-en").addEventListener("click", () => changeLanguage("en"));
document.getElementById("lang-ku").addEventListener("click", () => changeLanguage("ku"));
document.getElementById("lang-ar").addEventListener("click", () => changeLanguage("ar"));

// Set default language to English on page load
changeLanguage("en");

// Update Footer Year Dynamically
document.getElementById("footer-year").textContent = new Date().getFullYear();

// Handle Post Submission with Media Upload
document.getElementById("post-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("post-title-input").value;
    const content = document.getElementById("post-content").value;
    const mediaFile = document.getElementById("post-media").files[0];

    if (title && content) {
        const postList = document.getElementById("posts");
        const postItem = document.createElement("li");
        postItem.innerHTML = `<strong>${title}</strong><p>${content}</p>`;

        // Display uploaded media if available
        if (mediaFile) {
            const mediaURL = URL.createObjectURL(mediaFile);
            if (mediaFile.type.startsWith("image")) {
                postItem.innerHTML += `<img src="${mediaURL}" alt="Uploaded Media" style="max-width: 100%; height: auto;">`;
            } else if (mediaFile.type.startsWith("video")) {
                postItem.innerHTML += `<video controls style="max-width: 100%; height: auto;"><source src="${mediaURL}" type="${mediaFile.type}">Your browser does not support the video tag.</video>`;
            }
        }

        postList.appendChild(postItem);

        // Clear the form
        document.getElementById("post-form").reset();
    }
});
