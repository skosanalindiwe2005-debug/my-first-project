function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector(".current-city").textContent = response.data.name;
  document.querySelector("#current-temp").textContent = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").textContent = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").textContent =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `src ="${response.data.condition.icon_url}"`;

  document.querySelector("#current-date").textContent = formatDate(new Date());
}

function searchCity(city) {
  let apiKey = "a15t332fa59f4b3b71db27ddcdod075f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value.trim();
  if (city) searchCity(city);
}

document.querySelector("#search-form").addEventListener("submit", handleSearch);

searchCity("Paris");
