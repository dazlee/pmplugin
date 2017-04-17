const express = require("express");
const router = express.Router();

const AreaStore = require("../../stores/area");
const CityStore = require("../../stores/city");

router.post("/baby-compensation/city", (req, res) => {
	const { cityId, amount, url, dmUrl } = req.body;
	let attributes = {};
	if (amount) {attributes.babyCompensation = amount.trim();}
	if (url) {attributes.babyCompensationUrl = url.trim();}
	if (dmUrl) {attributes.babyCompensationDMUrl = dmUrl.trim();}

	AreaStore.updateAreasByCityId(cityId, attributes)
	.then(() => {
		res.status(200).send();
		res.end();
	})
	.catch((error) => {
		res.status(400).send(error);
		res.end();
	});
});
router.post("/baby-compensation/area", (req, res) => {
	const { areaId, amount, url, dmUrl } = req.body;
	let attributes = {};
	if (amount) {attributes.babyCompensation = amount.trim();}
	if (url) {attributes.babyCompensationUrl = url.trim();}
	if (dmUrl) {attributes.babyCompensationDMUrl = dmUrl.trim();}

	AreaStore.updateArea(areaId, attributes)
	.then(() => {
		res.status(200).send();
		res.end();
	})
	.catch((error) => {
		res.status(400).send(error);
		res.end();
	});
});

router.get("/baby-compensation/city/:cityId/area/:areaId", (req, res) => {
	const { cityId, areaId } = req.params;
	const promises = [CityStore.getCityById(cityId), AreaStore.getAreaByIdWithBabyCompensation(areaId), ]
	Promise.all(promises)
	.then(([city, area]) => {
		res.status(200).send({
			city: city,
			area: area
		});
		res.end();
	})
	.catch((error) => {
		res.status(400).send(error);
		res.end();
	});
});

module.exports = router;
