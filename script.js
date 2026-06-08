
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "ff25fa84c2071fd983007a0635f3d37b"; // keep private later

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        document.getElementById("result").innerHTML = "⏳ Loading...";

        const response = await fetch(url);

        if (!response.ok) {
            document.getElementById("result").innerHTML = "❌ City not found";
            return;
        }

        const data = await response.json();

        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById("result").innerHTML = `
            <h2>${data.name}</h2>
            <img src="${iconUrl}" />
            <p>🌡 ${data.main.temp}°C</p>
            <p>🌥 ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
        `;

        // 🌈 IMPROVED BACKGROUND HANDLING
        const weatherMain = data.weather[0].main;

        if (weatherMain === "Clouds") {
            document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        } else if (weatherMain === "Clear") {
            document.body.style.background = "linear-gradient(to right, #f7971e, #ffd200)";
        } else if (weatherMain === "Rain") {
            document.body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
        } else if (weatherMain === "Snow") {
            document.body.style.background = "linear-gradient(to right, #e6dada, #274046)";
        } else if (weatherMain === "Mist" || weatherMain === "Haze") {
            document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
        } else {
            // ✅ DEFAULT
            document.body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
        }

    } catch (error) {
        document.getElementById("result").innerHTML = "⚠️ Error fetching data";
    }
}