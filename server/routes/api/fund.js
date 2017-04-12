const logger = require("../../lib/logger");
const express = require("express");
const router = express.Router();
const FundPromotionStore = require("../../stores/fund-promotion");

router.get("/promotion/:userId", (req, res) => {
	const { userId } = req.params;
    FundPromotionStore.getFundPromotion({userId})
    .then((rows) => {
        res.json(rows);
    })
    .catch((error) => {
        logger.error("error when getting fund promotion info", error);
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "bad request",
        }));
        res.end();
    });
});

module.exports = router;
