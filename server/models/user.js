const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
    },
    password: String,
    displayName: String,
    role: String,
    email: String,
    photos: String
});
UserSchema.methods.validPassword = function (password) {
    return this.password === password;
};

module.exports = mongoose.model("User", UserSchema);
