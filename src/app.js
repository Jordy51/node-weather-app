const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "jordy",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About me",
		name: "jordy",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		message: "I am a message",
		title: "Help",
		name: "jordy",
	});
});

// *********************************************************
app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "No address provided!",
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			forecastData = forecastData - 273;
			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.address,
			});
		});
	});
});
// *********************************************************

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}

	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "jordy",
		errorMessage: "Help article not found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "jordy",
		errorMessage: "Page not found",
	});
});

app.listen(PORT, () => {
	console.log("Server is up on port :- ", PORT);
});
