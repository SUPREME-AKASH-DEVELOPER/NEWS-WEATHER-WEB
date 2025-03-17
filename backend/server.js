const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000; // Use Render's provided port or fallback to 4000

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from frontend
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    credentials: true // Allow cookies and credentials
}));

// Serve static files (if any)
app.use(express.static('public'));

// Fetch news based on category or query
app.get('/news', async (req, res) => {
    const { query, category } = req.query;
    let url = '';

    if (query) {
        url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
    } else {
        // Remove the country parameter to fetch global news
        url = `https://newsapi.org/v2/top-headlines?category=${category || 'general'}&apiKey=${NEWS_API_KEY}`;
    }

    try {
        console.log("Fetching News from:", url);
        const response = await axios.get(url, {
            headers: {
                'Host': 'newsapi.org',
                'User-Agent': 'MyNewsApp/1.0',
                'Accept': 'application/json'
            }
        });

        if (!response.data || !response.data.articles) {
            throw new Error('Invalid response from News API');
        }

        res.json(response.data);
    } catch (error) {
        console.error('News API Error:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch news', 
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Fetch weather based on latitude and longitude
app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
        console.log("Fetching Weather from:", url);
        const response = await axios.get(url);

        // Validate the response data
        if (!response.data || !response.data.weather) {
            throw new Error('Invalid response from Weather API');
        }

        // Send the response back to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch weather data', 
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined // Include stack trace in development
        });
    }
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.message);
    res.status(500).json({ 
        error: 'Internal server error', 
        details: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Include stack trace in development
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
});