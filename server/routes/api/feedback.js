const logger = require('../../lib/logger');
const express = require('express');
const router = express.Router();
const FeedbackStore = require("../../stores/feedback");

router.post("/", (req, res) => {
    const attributes = req.body;
    FeedbackStore.createFeedback(attributes)
    .then((feedback) => {
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });
        res.write(JSON.stringify(feedback));
        res.end();
    })
    .catch((error) => {
        logger.error("error when create feedback", error);
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
