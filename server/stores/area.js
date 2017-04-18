const AreaModel = require("../models/area");
const projection = "cityId name";
const babyCompensationProjection = "cityId name babyCompensation babyCompensationRestriction babyCompensationUrl babyCompensationDMUrl";

function getAllAreas() {
	return AreaModel.find({}, projection).sort({_id: 1}).lean()
	.exec();
}
function getAllAreasWithBabyCompensation() {
	return AreaModel.find({}, babyCompensationProjection).sort({_id: 1}).lean()
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
	getAllAreasWithBabyCompensation,
	getAreaByIdWithBabyCompensation,
	updateArea,
	updateAreasByCityId
};
