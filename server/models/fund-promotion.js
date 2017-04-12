const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FundPromotionSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    funds: [Schema.Types.Mixed]
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
});

module.exports = mongoose.model("FundPromotion", FundPromotionSchema);
