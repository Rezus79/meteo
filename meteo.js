
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
                        const infoMeteo = document.getElementById("info-meteo");
                        infoMeteo.innerHTML = `${data.weather[0].description} `;
                        const icone = document.getElementById("icone");
                        icone.innerHTML = `<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png></img>`;
                        const temperature = document.getElementById("temperature");
                        temperature.innerHTML = ` ${data.main.temp} ° C`;
                        const localisation = document.getElementById("loc");
                        localisation.innerHTML = ` ${ville}`;
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des données météo : " + error);
                    });
            }

            // Appel initial pour afficher les données météo
            fetchWeatherData();

            // Mise à jour des données météo toutes les heures, 3600000 ms = 1 heure
            setInterval(fetchWeatherData, 3600000); 
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de la clé API : " + error);
        });
});