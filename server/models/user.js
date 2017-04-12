const mongoose = require("mongoose");
const findOneOrCreate = require('mongoose-find-one-or-create');
const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
	id: String,
	from: String,
	name: String
}, {_id: false});
const UserSchema = new Schema({
    username: {
        type: String,
    },
    facebookId: String,
    profileUrl: String,
    password: String,
	provider: String,
	hasLoggedInWeb: {
		type: Boolean,
		default: false,
	},
    displayName: String,
    role: String,
    name: {
        lastName: String,
        firstName: String,
        middleName: String,
    },
    email: String,
    photos: String,

	// for client
    providers: [ProviderSchema],

	// for agent
	pageId: String,
	lineAtId: String,
	clientUserIds: [String],
});
UserSchema.plugin(findOneOrCreate);
UserSchema.methods.validPassword = function (password) {
    return this.password === password;
};

module.exports = mongoose.model("User", UserSchema);
