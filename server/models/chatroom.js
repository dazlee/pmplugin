const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatroomSchema = new Schema({
    name: {type: String, required: true},
}, {
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

module.exports = mongoose.model("Chatroom", ChatroomSchema);
