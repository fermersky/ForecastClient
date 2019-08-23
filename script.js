$(function() {
    displayWeather('London');

    $('.searchbtn').on('click', function() {
        displayWeather($('.citytxt').val());
    });

    function displayWeather(city) {
        $.ajax({
            type: 'GET',
            url: `https://api.apixu.com/v1/forecast.json?key=5339c42f14fc4aa3906155456192208&q=${city}&days=5`,

            success: function(data) {
                // display info about current weather

                $('.city').text(data.location.name + ', ' + data.location.country);
                $('.date').text(data.location.localtime);

                $('.weather-img').attr('src', 'http:' + data.current.condition.icon);
                $('.weather-text').text(data.current.condition.text);

                $('.temp_c').text(data.current.temp_c + '°C');

                // weather extra info
                $('.wind').text(`Wind: ${data.current.wind_kph} kph`);
                $('.precip').text(`Precip: ${data.current.precip_mm} mm`);
                $('.preasure').text(`Preasure: ${data.current.pressure_mb} mb`);

                // weather forecast html container
                let foreactsContainer = $('.forecast-weather');

                foreactsContainer.empty();

                data.forecast.forecastday.forEach(weather => {
                    const weatherTemplate = `
                    <div class="weather-onday">
                        <p class="forecast-weekday">${/^\w+/.exec(new Date(weather.date).toString())}</p>
                        <p class="forecast-date">${weather.date}</p>
                        <img
                            class="weather-img"
                            src="http:${weather.day.condition.icon}"
                            alt=""
                        />
                        <p class="forecast-tempc">${Math.floor(weather.day.maxtemp_c)}°C</p>
                    </div>
                `;

                    foreactsContainer.append(weatherTemplate);
                });

                console.log(data);
            }
        });
    }
});
