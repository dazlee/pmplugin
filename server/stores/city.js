const CityModel = require("../models/city");
const projection = "name";

function getAllCities() {
	return CityModel.find({}, projection).lean()
	.exec();
}

module.exports = {
	getAllCities
};
