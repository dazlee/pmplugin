const logger = require("../lib/logger");
const express = require("express");
const router = express.Router();

const CityStore = require("../stores/city");
const AreaStore = require("../stores/area");
const AccessLogStore = require("../stores/access-log");

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
router.get("/:plugin/statistic", function (req, res) {
	const { plugin } = req.params;
	const promises = [
		CityStore.getAllCities(),
		AreaStore.getAllAreasWithBabyCompensation(),
		AccessLogStore.getAccessLogByTypeWithDate(plugin)
	];
	const baseUrl = global.HOSTNAME + ":" + global.PORT;
	const renderer = plugin + "-statistic";
	Promise.all(promises)
	.then(([cities, areas, accessLogs]) => {
		res.render(renderer, {
			cities, areas, accessLogs
		});
	})
	.catch((error) => {
		res.send("error");
		res.end();
	});
});

module.exports = router;
