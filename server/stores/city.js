const CityModel = require("../models/city");
const projection = "name";

function getAllCities() {
	return CityModel.find({}, projection).sort({_id: 1}).lean()
	.exec();
}
function getCityById(cityId) {
	return CityModel.findOne({
		_id: cityId
	}, projection).lean()
	.exec();
}

module.exports = {
	getAllCities,
	getCityById
};
