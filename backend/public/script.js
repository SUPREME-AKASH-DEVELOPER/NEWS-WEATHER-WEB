// const backendUrl = "https://news-weather-web.onrender.com"; // Replace with Render backend URL in production
const backendUrl = 'http://localhost:4000'

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const themeToggle = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
});

// Fetch Weather
async function fetchWeather(lat = 28.6139, lon = 77.2090) {
    try {
        const res = await fetch(`${backendUrl}/weather?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
            throw new Error(`Weather fetch failed with status: ${res.status}`);
        }
        const data = await res.json();
        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const weatherCondition = data.weather[0].main.toLowerCase();

        // Set dynamic background based on weather condition
        document.body.className = weatherCondition;

        document.getElementById('weather-info').innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <img src="${weatherIcon}" alt="${data.weather[0].description}">
            <p>Temperature: ${(data.main.temp - 273.15).toFixed(1)}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Fetch News
async function fetchNews(query = '', category = 'general') {
    console.log("fetchNews called with query:", query, "and category:", category);
    try {
        let url;
        if (query) {
            url = `${backendUrl}/news?query=${query}`;
        } else {
            url = `${backendUrl}/news?category=${category}`;
        }

        console.log("Fetching news from:", url);
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`News fetch failed with status: ${res.status}`);
        }
        const data = await res.json();
        console.log("News data received:", data);

        const newsContainer = document.getElementById('news-info');
        newsContainer.innerHTML = '';

        if (!data.articles || data.articles.length === 0) {
            // Fallback: Fetch general news if no articles are found
            if (category !== 'general') {
                console.log("No articles found for category. Fetching general news...");
                fetchNews('', 'general');
                return;
            }
            newsContainer.innerHTML = `<p>No news found for "${query || category}". Try another category or search term.</p>`;
            return;
        }

        data.articles.forEach(article => {
            newsContainer.innerHTML += `
                <div class="news-item">
                    <img src="${article.urlToImage || 'https://example.com/images/default.jpg'}" alt="News">
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        const newsContainer = document.getElementById('news-info');
        newsContainer.innerHTML = `<p>Failed to fetch news. Please try again later.</p>`;
    }
}

// Search News
function searchNews(event) {
    if (event.key === "Enter") {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) {
            console.error("Search input field not found!");
            return;
        }

        const query = searchInput.value.trim();
        console.log("Search triggered with query:", query);

        if (query.length > 0) {
            fetchNews(query);
            searchInput.value = ''; // Clear input after search
        }
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");

    if (!searchInput) {
        console.error("Error: Search input field not found in the DOM!");
    } else {
        searchInput.addEventListener("keypress", searchNews);
    }

    // Fetch user's location-based weather
    navigator.geolocation.getCurrentPosition(
        (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            console.warn("Geolocation not available. Using default location.");
            fetchWeather();
        }
    );

    // Fetch default news on page load
    fetchNews();
});