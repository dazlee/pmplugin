const express = require("express");
const router = express.Router();

const AreaStore = require("../../stores/area");

router.post("/baby-compensation/city", (req, res) => {
	const { cityId, amount } = req.body;
	AreaStore.updateAreasByCityId(cityId, {
		babyCompensation: amount
	})
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
	const { areaId, amount } = req.body;
	AreaStore.updateArea(areaId, {
		babyCompensation: amount
	})
	.then(() => {
		res.status(200).send();
		res.end();
	})
	.catch((error) => {
		res.status(400).send(error);
		res.end();
	});
});

module.exports = router;
