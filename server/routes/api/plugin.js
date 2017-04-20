const express = require("express");
const router = express.Router();
const logger = require("../../lib/logger");

const AreaStore = require("../../stores/area");
const CityStore = require("../../stores/city");
const AccessLogStore = require("../../stores/access-log");

router.post("/baby-compensation/city", (req, res) => {
	const { cityId, amount, restriction, url, dmUrl } = req.body;
	let attributes = {};
	if (amount) {attributes.babyCompensation = amount.trim();}
	if (restriction) {attributes.babyCompensationRestriction = restriction.trim();}
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
	const { areaId, amount, restriction, url, dmUrl } = req.body;
	let attributes = {};
	if (amount) {attributes.babyCompensation = amount.trim();}
	if (restriction) {attributes.babyCompensationRestriction = restriction.trim();}
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

		const logDoc = {
			type: "baby-compensation",
			content: {
				city: {
					_id: city._id,
					name: city.name,
					country: city.country
				},
				area: {
					_id: area._id,
					name: area.name
				},
				category: "query"
			}
		};

		AccessLogStore.createAccessLog(logDoc)
		.then(() => {
			logger.info("api access", logDoc);
		});
	})
	.catch((error) => {
		res.status(400).send(error);
		res.end();
	});
});

router.get("/baby-compensation/city/:cityId/area/:areaId/l", (req, res) => {
	const { cityId, areaId } = req.params;
	const { c } = req.query;
	const promises = [CityStore.getCityById(cityId), AreaStore.getAreaByIdWithBabyCompensation(areaId), ]
	Promise.all(promises)
	.then(([city, area]) => {
		if (c) {
			const logDoc = {
				type: "baby-compensation",
				content: {
					city: {
						_id: city._id,
						name: city.name,
						country: city.country
					},
					area: {
						_id: area._id,
						name: area.name
					},
					category: c
				}
			};

			AccessLogStore.createAccessLog(logDoc)
			.then(() => {
				logger.info("api access", logDoc);
			});
		}

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
