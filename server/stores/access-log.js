const AccessLogModel = require("../models/access-log");

function createAccessLog(attributes) {
	return AccessLogModel.create(attributes);
}

module.exports = {
	createAccessLog
};
