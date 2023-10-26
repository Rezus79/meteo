
document.addEventListener("DOMContentLoaded", function () {
    // Récupérer la clé API depuis conf.json
    fetch('config/conf.json')
        .then(response => response.json())
        .then(data => {
            const apiKey = data.apiKey;
            
            // Fonction pour récupérer les données météo
            function fetchWeatherData() {
                const ville = data.ville; 
                const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=${apiKey}&units=metric&lang=fr`;
                

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        const weatherInfo = document.getElementById("info-meteo");
                        weatherInfo.innerHTML = `Conditions météorologiques à ${ville}: ${data.weather[0].description}`;
                        const temperature = document.getElementById("temperature");
                        temperature.innerHTML = `la température à ${ville} sera de : ${data.main.temp} degrés`;
                        
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des données météo : " + error);
                    });
            }

            // Appel initial pour afficher les données météo
            fetchWeatherData();

            // Mise à jour des données météo toutes les heures
            setInterval(fetchWeatherData, 3600000); // 3600000 ms = 1 heure
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de la clé API : " + error);
        });
});