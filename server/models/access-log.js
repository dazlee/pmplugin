const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccessLogSchema = new Schema({
	type: {
		type: String,
		required: true,
		enum: ["baby-compensation"]
	},
	content: {
		type: Schema.Types.Mixed,
		required: true
	}
}, {
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});
// AccessLogSchema.post('find', function(accessLogs, next) {
// 	console.log('find() returned ' + JSON.stringify(accessLogs));
// 	var accessLogs2 = accessLogs.map(function (accessLog) {
// 		return Object.assign({}, accessLog, accessLog.content);
// 	});
// 	//return accessLogs2;
// 	next(null, accessLogs2)
// 	console.log(accessLogs2);
// 	console.log(next);
// 	console.log(arguments);
// });

module.exports = mongoose.model("access_log", AccessLogSchema);
