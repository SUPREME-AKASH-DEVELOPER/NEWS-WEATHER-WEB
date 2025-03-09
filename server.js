const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.use(express.static('public'));

// Fetch news based on category or query
app.get('/news', async (req, res) => {
    const { query, category } = req.query;
    let url = '';

    if (query) {
        // Search for news in India based on the query
        url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
    } else {
        // Fetch top headlines from India based on category
        url = `https://newsapi.org/v2/top-headlines?country=in&category=${category || 'general'}&apiKey=${NEWS_API_KEY}`;
    }

    try {
        console.log("Fetching News from:", url);
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('News API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Fetch weather based on latitude and longitude
app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on https://news-weather-web.onrender.com:${port}`);
});