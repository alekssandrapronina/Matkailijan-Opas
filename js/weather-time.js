// OpenWeather API-avain
const openWeatherApiKey = '665ecd56dfc08dbb50feb8b8f5034e28';

// Kaupungit, joille näytetään sää
const cities = {
    paris: { name: 'Paris', country: 'FR' },
    tokyo: { name: 'Tokyo', country: 'JP' },
    newyork: { name: 'New York', country: 'US' }
};

// Sääkuvausten käännökset suomeksi
const weatherTranslations = {
    'clear sky': 'selkeää',
    'few clouds': 'vähän pilviä',
    'scattered clouds': 'hajanaisia pilviä',
    'broken clouds': 'rikkinäisiä pilviä',
    'shower rain': 'sadekuuroja',
    'rain': 'sade',
    'thunderstorm': 'ukkosmyrsky',
    'snow': 'lumisade',
    'mist': 'sumu',
    'overcast clouds': 'pilvistä',
    'light intensity shower rain': 'heikko sadekuuro'
};

// Funktio sään hakemiseen
function getWeather(city, elementId) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${openWeatherApiKey}&units=metric&lang=fi`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Virhe sään hakemisessa kaupungille ${city.name}: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const temp = data.main.temp;
            let description = data.weather[0].description;
            const windSpeed = data.wind.speed;
            const icon = data.weather[0].icon;
            const translatedDescription = weatherTranslations[description] || description;

            // Päivitetään tiedot jokaiselle kaupungille
            document.getElementById(`weather-${elementId}-temp`).textContent = temp.toFixed(1);
            document.getElementById(`weather-${elementId}-description`).textContent = translatedDescription;
            document.getElementById(`weather-${elementId}-wind`).textContent = windSpeed;
            document.getElementById(`weather-${elementId}-icon`).src = `http://openweathermap.org/img/wn/${icon}.png`;
        })
        .catch(error => {
            console.error('Virhe sään lataamisessa:', error);
            document.getElementById(`weather-${elementId}-temp`).textContent = 'Tietoja ei voitu ladata';
        });
}

// Päivitetään sää kaikille kaupungeille
Object.keys(cities).forEach(cityKey => {
    getWeather(cities[cityKey], cityKey);
});