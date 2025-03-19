const apiKey = "608a3444dee0684943506dbb09198b8a";

const input = document.querySelector(".weather-city-input");
const weatherDetails = document.getElementById("weather-details");
const welcomeMessage = document.getElementById("welcome-message");

// ✅ Hide weather details on page load
weatherDetails.style.display = "none";

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const city = input.value.trim();
    if (city) {
      getWeather(city);
      input.value = "";
    }
  }
});

document.getElementById("search-btn").addEventListener("click", function(){
  const city = input.value.trim();
  if(city){
    getWeather(city);
    input.value = "";
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      document.querySelector(".city").textContent = `${data.name}, ${data.sys.country}`;
      document.querySelector(".temperature").textContent = `${data.main.temp}°C`;
      document.querySelector(".description").textContent = data.weather[0].description;
      document.querySelector(".icon img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      // ✅ Hide welcome message and show weather details
      welcomeMessage.style.display = "none";
      weatherDetails.style.display = "grid";
    })
    .catch(error => {
      alert("City not found!");
    });
}
