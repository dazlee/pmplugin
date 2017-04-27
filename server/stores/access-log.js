const AccessLogModel = require("../models/access-log");
const accessLogProjection = "type content createdAt";

function createAccessLog(attributes) {
	return AccessLogModel.create(attributes);
}
function getAccessLogByType(type) {
	return new Promise(function (resolve, reject) {
		AccessLogModel.find({
			type
		}, accessLogProjection)
		.sort({createdAt: -1})
		.lean()
		.exec(function (error, accessLogs) {
			if (error) {
				reject(error);
				return;
			}
			var parsedAccessLogs = accessLogs.map(function (accessLog) {
				return Object.assign({}, accessLog, accessLog.content);
			});
			resolve(parsedAccessLogs);
		});
	});
}
function getAccessLogByTypeWithDate(type) {
	return new Promise(function (resolve, reject) {
		AccessLogModel.aggregate([
			{
				$match: {
					type: "baby-compensation"
				}
			},
			{
				$project: {
					content: "$content",
					type: "$type",
					year: {
						$year: "$createdAt"
					},
					month: {
						$month: "$createdAt"
					},
					day: {
						$dayOfMonth: "$createdAt"
					}
				}
			},
			{
				$project: {
					content: "$content",
					type: "$type",
					date: {
						$concat: [
							{"$substr": ["$year", 0, -1]},
							"/",
							{"$substr": ["$month", 0, -1]},
							"/",
							{"$substr": ["$day", 0, -1]}
						]
					}
				}
			},
			{
				$group: {
					_id: {
						content: "$content",
						date: "$date"
					},
					count: {
						$sum: 1
					}
				}
			},
			{
				$project: {
					_id: "$_id.date",
					content: "$_id.content",
					type: "$_id.type",
					date: "$_id.date",
					count: "$count"
				}
			}
		], function (error, result) {
			if (error) {
				reject(error);
				return;
			}
			resolve(result);
		});
	});
}

module.exports = {
	createAccessLog,
	getAccessLogByType,
	getAccessLogByTypeWithDate
};
