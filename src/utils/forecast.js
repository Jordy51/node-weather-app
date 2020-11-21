const axios = require("axios");

const forecast = (latitude, longitude, callback) => {
	const openWeathermap = "https://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(latitude) + "&lon=" + encodeURIComponent(longitude) + "&appid=4c7e9b2923ccf09411c1e47ee4bbc2a7";

	axios({ url: openWeathermap, responseType: "json" })
		.then((response) => {
			if (response.data.cod != 200) {
				callback("Unable to find location!", undefined);
			} else {
				callback(undefined, response.data.main.temp);
			}
		})
		.catch(() => {
			callback("Unable to connect to weather services!", undefined);
		});
};

module.exports = forecast;
