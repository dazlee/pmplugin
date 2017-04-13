const fixtureTWCityArea = require("./fixture-tw-city-area");

exports.init = function () {
	var promises = [fixtureTWCityArea.init()];
	return Promise.all(promises);
};
