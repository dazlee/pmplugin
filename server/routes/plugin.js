const logger = require("../lib/logger");
const express = require("express");
const router = express.Router();

const CityStore = require("../stores/city");
const AreaStore = require("../stores/area");

router.get("/:plugin", function (req, res) {
	const promises = [CityStore.getAllCities(), AreaStore.getAllAreas()]
	Promise.all(promises)
	.then(([cities, areas]) => {
		res.render("plugin", {
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
