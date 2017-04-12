const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ownerUsername: {
        type: String,
        required: true,
    },
    chatroomId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
});

module.exports = mongoose.model("Channel", ChannelSchema);
