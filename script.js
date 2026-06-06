async function getWeather() {
    const city = document.getElementById("city").value;

    const apiKey = "ff25fa84c2071fd983007a0635f3d37b";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("result").innerHTML = "❌ City not found";
            return;
        }

        document.getElementById("result").innerHTML = `
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            <p><b>${data.weather[0].main}</b></p>
            <p>🌡️ Temp: ${data.main.temp}°C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind: ${data.wind.speed} km/h</p>
        `;

    } catch (error) {
        document.getElementById("result").innerHTML = "⚠️ Error fetching data";
    }
}