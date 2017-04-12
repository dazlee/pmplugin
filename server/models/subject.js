const mongoose = require("mongoose");
const {Schema} = mongoose;

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    uri: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    postedAt: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
});

module.exports = mongoose.model("Subject", SubjectSchema);
