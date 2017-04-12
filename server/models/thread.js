const mongoose = require("mongoose");
const { Schema } = mongoose;

const ThreadSchema = new Schema({
    threadId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    pinned: {
        type: Boolean,
        defaultValue: false,
    },
    pinnedContent: {
        type: Object,
        defaultValue: {},
    },
    pinnedType: {
        type: String,
        defaultValue: "",
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
});

module.exports = mongoose.model("Thread", ThreadSchema);
