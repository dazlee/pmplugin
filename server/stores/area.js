const AreaModel = require("../models/area");
const projection = "cityId name babyCompensation";
const babyCompensationProjection = "cityId name babyCompensation";

function getAllAreas() {
	return AreaModel.find({}, projection).lean()
	.exec();
}
function getAreaByIdWithBabyCompensation(areaId) {
	return AreaModel.findOne({
		_id: areaId
	}, babyCompensationProjection).lean()
	.exec();
}
function updateAreasByCityId(cityId, attributes) {
	return AreaModel.update({
		cityId: cityId
	}, {
		$set: attributes
	}, {
		multi: true
	})
	.exec();
}
function updateArea(areaId, attributes) {
	return AreaModel.update({
		_id: areaId
	}, {
		$set: attributes
	})
	.exec();
}

module.exports = {
	getAllAreas,
	getAreaByIdWithBabyCompensation,
	updateArea,
	updateAreasByCityId
};
