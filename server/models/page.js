const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = new Schema({
	role: {
		type: String,
		enum: ["admin", "agent"]
	},
	name: String,
    pageId: String,
	accessToken: String,
    pageUrl: String,
	pageMessagerUrl: String
});

module.exports = mongoose.model("Pages", PageSchema);
