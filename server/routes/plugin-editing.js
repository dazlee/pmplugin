const logger = require("../lib/logger");
const express = require("express");
const router = express.Router();

const CityStore = require("../stores/city");
const AreaStore = require("../stores/area");

router.get("/:plugin", function (req, res) {
	const promises = [CityStore.getAllCities(), AreaStore.getAllAreasWithBabyCompensation()]
	const baseUrl = global.HOSTNAME + ":" + global.PORT;
	Promise.all(promises)
	.then(([cities, areas]) => {
		res.render("plugin-editing", {
			baseUrl: baseUrl,
			type: req.params.plugin,
			cities: cities,
			areas: areas
		});
	})
	.catch((error) => {
		res.send("error");
		res.end();
	});
});
router.get("/:plugin/simulation", function (req, res) {
	const promises = [CityStore.getAllCities(), AreaStore.getAllAreasWithBabyCompensation()]
	const baseUrl = global.HOSTNAME + ":" + global.PORT;
	Promise.all(promises)
	.then(([cities, areas]) => {
		res.render("plugin-simulation", {
			baseUrl: baseUrl,
			type: req.params.plugin,
			cities: cities,
			areas: areas
		});
	})
	.catch((error) => {
		res.send("error");
		res.end();
	});
});

module.exports = router;
