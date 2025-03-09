# NEWS-WEATHER-WEB🌐

Welcome to the **Indian News App**! This web application provides the latest news and weather updates specifically for India. It fetches news articles from various categories (e.g., Technology, Sports, Politics) and displays real-time weather information based on the user's location.

---

## Features ✨

- **Latest News**: Get the latest news articles from India across multiple categories.
- **Weather Updates**: Real-time weather information based on your location.
- **Search Functionality**: Search for specific news articles.
- **Dark Mode**: Toggle between light and dark themes for better readability.
- **Responsive Design**: Works seamlessly on all devices (desktop, tablet, mobile).

---

## Technologies Used 🛠️

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **APIs**:
  - [NewsAPI](https://newsapi.org/) for fetching news articles.
  - [OpenWeatherMap API](https://openweathermap.org/api) for weather data.
- **Deployment**: Render (Backend), Netlify (Frontend)

---

## Screenshots 📸

![Home Page](screenshots/home.png)
*Home Page with News and Weather Sections*

![Dark Mode](screenshots/dark-mode.png)
*Dark Mode Enabled*

---

## How to Use 🚀

### 1. Clone the Repository
```bash
git clone https://github.com/SUPREME-AKAKSH-DEVELOPER/NEWS-WEATHER-WEB.git
cd NEWS-WEATHER-WEB
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```plaintext
NEWS_API_KEY=your_news_api_key
WEATHER_API_KEY=your_weather_api_key
```

### 4. Run the App Locally
```bash
node server.js
```
Visit `http://localhost:3000` in your browser.

---

## API Endpoints 🔗

- **Fetch News**: `/news?category=<category>`
  - Example: `/news?category=technology`
- **Search News**: `/news?query=<search-term>`
  - Example: `/news?query=india`
- **Fetch Weather**: `/weather?lat=<latitude>&lon=<longitude>`
  - Example: `/weather?lat=28.6139&lon=77.2090`

---

## Deployment 🌍

### Backend (Render)
- The backend is deployed on **Render**.
- Live URL: `https://indian-news-app.onrender.com`

### Frontend (Netlify)
- The frontend is deployed on **Netlify**.
- Live URL: `https://indian-news-app.netlify.app`

---

## Contributing 🤝

Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License 📜

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments 🙏

- Thanks to [NewsAPI](https://newsapi.org/) and [OpenWeatherMap](https://openweathermap.org/) for providing the APIs.
- Special thanks to the open-source community for inspiration and support.

---

## Contact 📧

For any questions or feedback, feel free to reach out:
- **Name**: Akash
- **Email**: badalakki11@gmail.com
- **GitHub**: [SUPREME-AKASH-DEVELOPER](https://github.com/SUPREME-AKASH-DEVELOPER)

---

```

---

### **How to Add the README File**
1. Create a new file in your project directory named `README.md`.
2. Copy and paste the above content into the file.
3. Customize the content (e.g., replace `your_news_api_key`, `your_weather_api_key`, and other placeholders with your actual details).
4. Save the file.

---

### **Optional: Add Screenshots**
1. Take screenshots of your app (e.g., home page, dark mode, etc.).
2. Save them in a folder named `screenshots` in your project directory.
3. Update the `![Home Page](screenshots/home.png)` and `![Dark Mode](screenshots/dark-mode.png)` links in the README file to point to your actual screenshots.

---

### **Push the README File to GitHub**
1. Stage the changes:
   ```bash
   git add README.md
   ```
2. Commit the changes:
   ```bash
   git commit -m "Add README file"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```
