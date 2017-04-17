const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
	cityId: {
		type: String,
		required: true,
	},
    name: {
		type: String,
		required: true
	},
	babyCompensation: {
		type: String
	},
	babyCompensationUrl: {
		type: String
	},
	babyCompensationDMUrl: {
		type: String
	}
}, {
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

module.exports = mongoose.model("areas", AreaSchema);
