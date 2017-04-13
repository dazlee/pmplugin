const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
	country: {
		type: String,
		required: true
	},
    name: {
		type: String,
		required: true
	}
}, {
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

module.exports = mongoose.model("cities", CitySchema);
