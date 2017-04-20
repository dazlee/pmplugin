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

module.exports = mongoose.model("access_log", AccessLogSchema);
